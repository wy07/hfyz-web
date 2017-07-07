var realTimePoint;

var historyMap;
var maplet= null;

var mapObject = (function() {
  return {
    initMap: function (elm) {
      console.log("initMap");
      this.clean();
      oo = true;
      maplet = new Maplet(elm);
      maplet.addControl(new MStandardControl());
      maplet.centerAndZoom(new MPoint(116.35566, 39.93218), 12);
      maplet.resize(document.getElementById(elm).clientWidth, document.documentElement.clientHeight - 200);//初始化地图宽和高
      window.onresize = function () {//自适应地图宽和高
        maplet.resize(document.getElementById(elm).clientWidth, document.documentElement.clientHeight - 200);
      };
    },
    clean:function () {
      if(maplet){
        console.log("in  clean");
        maplet.clearOverlays(false);
      }
    },

    initHistoryMap: function (elm) {
      console.log("initHistoryMap");
      this.clean();
      // maplet = new Maplet(elm);
      // maplet.addControl(new MStandardControl());
      // maplet.centerAndZoom(new MPoint(116.35566, 39.93218), 12);
      // maplet.resize(document.getElementById(elm).clientWidth, document.documentElement.clientHeight - 200);//初始化地图宽和高
      // window.onresize = function () {//自适应地图宽和高
      //   maplet.resize(document.getElementById(elm).clientWidth, document.documentElement.clientHeight - 200);
      // };
    },

    realTimePoint: function (geoPoint, info) {
      if (realTimePoint) {
        maplet.clearOverlays(true);
      }

      realTimePoint = new MPoint(geoPoint);
      var realTimeMarker = new MMarker(
        realTimePoint,
        new MIcon("assets/images/car.png", 64, 32),
        new MInfoWindow("详细信息", info)
      );
      maplet.addOverlay(realTimeMarker);
      realTimeMarker.openInfoWindow();
    },

    historyPoints: function (geoPoint, alarmState, info) {
      var historyPoint = new MPoint(geoPoint);
      var historyMarker = new MMarker(
        historyPoint,
        new MIcon(alarmState == 0 ? "assets/images/green.png" : "assets/images/red.png", 16, 16),
        new MInfoWindow("详细信息", info)
      );
      maplet.addOverlay(historyMarker);
    }
  }

})(mapObject||{});
