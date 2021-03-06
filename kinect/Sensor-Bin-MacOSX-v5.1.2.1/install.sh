#!/bin/sh -e

usage="
Usage: $0 [OPTIONS]
Installs PrimeSense Sensor Driver to current machine.

-i,--install
	Installs PrimeSense Sensor Driver (default mode)
-u,--uninstall
	Uninstalls PrimeSense Sensor Driver.
-c,--cross-compile-rootfs <path>
	Used for cross-compiling. Installs PrimeSense Sensor Driver to <path> instead of '/'.
-h,--help
	Shows this help screen.
"

OS_NAME=`uname -s`

#--avin mod--
case $OS_NAME in
Darwin)
    MODULES="libXnDeviceSensorV2KM.dylib libXnDeviceFile.dylib"
    ;;
*)
    MODULES="libXnDeviceSensorV2KM.so libXnDeviceFile.so"
    ;;
esac

RULES_FILE="55-primesense-usb.rules"
#--avin mod--
MODPROBE_BLACKLIST="blacklist-gspca-kinect.conf"

# create file list
SCRIPT_DIR=`pwd`/`dirname $0`

LIB_FILES=`ls $SCRIPT_DIR/Lib/*`
BIN_FILES=`ls $SCRIPT_DIR/Bin/*`

rootfs=

# parse command line
while [ "$1" ]; do
	case $1 in
	-i|--install)
		install=yes
		;;
	-u|--uninstall)
		uninstall=yes
		;;
	-c|--cross-staging-dir)
		shift
		rootfs=$1
		;;
	-h|--help)
		echo "$usage"
		exit 0
		;;
	*)
		echo "Unrecognized option $1"
		exit 1
	esac
	shift
done

# default mode is install
if [ ! "$install" = yes ] && [ ! "$uninstall" = yes ]; then
	install=yes
fi

# validity check
if [ "$install" = yes ] && [ "$uninstall" = yes ]; then
	echo "-i and -u flags cannot be used together!"
	exit 1
fi

INSTALL_LIB=$rootfs/usr/local/lib
INSTALL_BIN=$rootfs/usr/bin
INSTALL_ETC=$rootfs/usr/local/etc/primesense
INSTALL_RULES=$rootfs/local/etc/udev/rules.d
SERVER_LOGS_DIR=$rootfs/var/log/primesense/XnSensorServer
#--avin mod--
MODPROBE_CONF_DIR=$rootfs/local/etc/modprobe.d

# make all calls into OpenNI run in this filesystem
export OPEN_NI_INSTALL_PATH=$rootfs
# make sure the staging dir OpenNI is the one being run
export LD_LIBRARY_PATH=$INSTALL_LIB

if [ "$install" = yes ]; then
	printf "Installing PrimeSense Sensor\n"
	printf "****************************\n\n"

    # create config dir
    printf "creating config dir $INSTALL_ETC..."
    mkdir -p $INSTALL_ETC
    printf "OK\n"

    # Copy shared libraries
    printf "copying shared libraries..."
    cp $LIB_FILES $INSTALL_LIB
    printf "OK\n"

    # Copy executables
    printf "copying executables..."
    cp $BIN_FILES $INSTALL_BIN
    printf "OK\n"

    # register modules
    for module in $MODULES; do
        printf "registering module '$module' with OpenNI..."
		$INSTALL_BIN/niReg -r $INSTALL_LIB/$module $INSTALL_ETC
        printf "OK\n"
    done

    # copy config file
    printf "copying server config file..."
#--avin mod--
    cp Config/GlobalDefaultsKinect.ini $INSTALL_ETC
    printf "OK\n"

    # make server run as root
    printf "setting uid of server..."
    chown root $INSTALL_BIN/XnSensorServer
    chmod +s $INSTALL_BIN/XnSensorServer
    printf "OK\n"

    # create server log dir
    printf "creating server logs dir..."
    mkdir -p $SERVER_LOGS_DIR
    # make this dir readable and writable by all (we allow anyone to delete logs)
    chmod a+w $SERVER_LOGS_DIR
    printf "OK\n"

    if [ "`uname -s`" != "Darwin" ]; then
        # install USB rules (so that PrimeSense sensors will be mounted with write permissions)
        printf "installing usb rules..."
        cp Install/$RULES_FILE $INSTALL_RULES
        printf "OK\n"
		#--avin mod--
        printf "installing modprobe blacklist..."
        cp Install/$MODPROBE_BLACKLIST $MODPROBE_CONF_DIR
        printf "OK\n"
    fi

	printf "\n*** DONE ***\n\n"

elif [ "$uninstall" = yes ]; then

	printf "Uninstalling PrimeSense Sensor\n"
	printf "******************************\n\n"

    # unregister modules
    for module in $MODULES; do
    	printf "unregistering module '$module' from OpenNI..."
        if $INSTALL_BIN/niReg -u $INSTALL_LIB/$module; then
            printf "OK\n"
        fi
    done

    # delete shared libraries
    printf "removing shared libraries..."
    for filename in $LIB_FILES; do
        rm -f $INSTALL_LIB/`basename $filename`
    done
    printf "OK\n"

    # delete executables
    printf "removing executables..."
    for filename in $BIN_FILES; do
        rm -f $INSTALL_BIN/`basename $filename`
    done
    printf "OK\n"

    # delete config dir
    printf "removing config dir..."
	rm -rf $INSTALL_ETC
    printf "OK\n"

    if [ "`uname -s`" != "Darwin" ]; then
        # remove USB rules
        printf "removing usb rules..."
	    rm -f $INSTALL_RULES/$RULES_FILE
        printf "OK\n"
		#--avin mod--
        printf "removing modprobe blacklist..."
        rm -f $MODPROBE_CONF_DIR/$MODPROBE_BLACKLIST
        printf "OK\n"
    fi

	printf "\n*** DONE ***\n\n"

fi
