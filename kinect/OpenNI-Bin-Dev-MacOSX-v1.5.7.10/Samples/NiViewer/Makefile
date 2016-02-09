include ../Build/Common/CommonDefs.mak

BIN_DIR = ../Bin

INC_DIRS = \
	../../Include =/usr/include/ni \
	./

SRC_FILES = ./*.cpp

ifeq ("$(OSTYPE)","Darwin")
	LDFLAGS += -framework OpenGL -framework GLUT
else
	USED_LIBS += glut GL
endif

USED_LIBS += OpenNI

EXE_NAME = NiViewer

LIB_DIRS += ../../Lib
include ../Build/Common/CommonCppMakefile

