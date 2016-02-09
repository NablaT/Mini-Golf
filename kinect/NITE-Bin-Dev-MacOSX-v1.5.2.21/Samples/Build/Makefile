include Common/CommonDefs.mak

.PHONY: all

NETPROJ = 
ifneq "$(realpath /usr/bin/gmcs)" ""
	NETPROJ += Boxes.net
endif

all: $(NETPROJ) Boxes Boxes.java CircleControl Players PointServer PointViewer SceneAnalysis SingleControl TrackPad 


.PHONY: Boxes
Boxes:
	$(MAKE) -C ../Boxes

.PHONY: Boxes.java
Boxes.java:
	$(MAKE) -C ../Boxes.java

.PHONY: Boxes.net
Boxes.net:
	$(MAKE) -C ../Boxes.net

.PHONY: CircleControl
CircleControl:
	$(MAKE) -C ../CircleControl

.PHONY: Players
Players:
	$(MAKE) -C ../Players

.PHONY: PointServer
PointServer:
	$(MAKE) -C ../PointServer

.PHONY: PointViewer
PointViewer:
	$(MAKE) -C ../PointViewer

.PHONY: SceneAnalysis
SceneAnalysis:
	$(MAKE) -C ../SceneAnalysis

.PHONY: SingleControl
SingleControl:
	$(MAKE) -C ../SingleControl

.PHONY: TrackPad
TrackPad:
	$(MAKE) -C ../TrackPad
