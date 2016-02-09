Installer une Kinect sur Mac OSX
==============

Pré-requis
--------------
- Ins­tal­ler XCode
- Outils de ligne de com­mande pour Xcode: Pour ins­tal­ler le outil de ligne de com­mande ouvert XCode, aller XCode> Ouvrir l’outil de déve­lop­peur> Plus d’outils de déve­lop­pe­ment. Connectez-vous en tant que déve­lop­peur d’Apple, et télé­char­ger l’outil de ligne de com­mande pour votre sys­tème d’exploitation.
- Ins­tal­ler XQuartz
- Ins­tal­ler MacPorts
- Ins­tal­ler CMake

Ins­tal­la­tion
--------------

**Lib­tool**

Ouvrez Ter­mi­nal (Appli­ca­tions → Uti­li­taires → Ter­mi­nal) et exé­cu­tez la com­mande suivante :

*sudo port install libtool*

**Libusb**

Ouvrez Ter­mi­nal et exé­cu­tez (exac­te­ment) la com­mande suivante :

*sudo port install libusb +universal*

**Télé­char­ge­ments**

- Sensor-Bin-MacOSX-v5.1.2.1

- OpenNI-Bin-Dev-MacOSX-v1.5.4.0

- NITE-Bin-Dev-MacOSX-v1.5.2.21

- OpenNI-MacOSX-x64-2.2

**Ins­tal­ler OpenNI Nite**

Tout d’abord, je vous recom­mande la créa­tion d’un dos­sier nommé “Kinect” dans “Docu­ments” (non néces­saires, faire que pour des rai­sons d’organisation).

Télé­char­ger la ver­sion du SDK OpenNI et l’extraire dans le dos­sier “Kinect“.

Ouvrir une fenetre dans Ter­mi­nal.

Chan­ger de réper­toire dans le dos­sier OpenNI SDK :

cd [chemin vers le bon dossier]
Exé­cu­tez la com­mande à installer :

*sudo ./install.sh*

**Ins­tal­ler Pri­me­sense Nite**

Télé­char­ger “NITE-Bin-MacOSX-Dev-v1.5.2.21“.

Chan­ger de réper­toire dans le dos­sier NITE-Bin-MacOSX-Dev-v1.5.2.21

cd [chemin vers le bon dossier]

*sudo ./install.sh*


--------------


**Pour MacOsX El Capi­tan :**

- Redé­mar­rer l’ordinteur en Mode Reco­very (rede­mar­rer et appuyer sur les touches Cmd + R)
- Ouvrir Ter­mi­nal (Menu Uti­li­taires > Terminal)
- Taper cette ligne + Entrée : csrutil disable
- Redé­mar­rer l’ordinateur normalement
 
--------------


Extra­yez le contenu du dos­sier “Kinect”. Ouvrir un ter­mi­nal, allez dans le réper­toire “NITE-Bin-MacOSX-Dev-v1.5.2.21″ Exé­cu­tez la commande:

*sudo . /install.sh*

--------------

**Pour MacOsX El Capi­tan :**

- Redé­mar­rer l’ordinteur en Mode Reco­very (rede­mar­rer et appuyer sur les touches Cmd + R)
- Ouvrir Ter­mi­nal (Menu Uti­li­taires > Terminal)
- Taper cette ligne + Entrée : csrutil enable
- Redé­mar­rer l’ordinateur normalement

--------------

Lancer la Kinect
==============

###myLib docs see documentation [here](myLib/README.md)

chmod +x compile_kinect.sh

chmod +x run_kinect.sh

./compile_kinect.sh

./run_kinect.sh
