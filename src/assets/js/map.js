var realTimePoint;

var historyMap;
var maplet= null;
var monitorBtn="info";

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
    reload:function () {
      maplet.centerAndZoom(new MPoint(116.35566, 39.93218), 12);
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

    realTimePoint: function (geoPoint, info,direction) {
      maplet.centerAndZoom(new MPoint(117.126826, 31.852467), 12);
      if (realTimePoint) {
        maplet.clearOverlays(true);
      }

      realTimePoint = new MPoint(geoPoint);
      var realTimeMarker = new MMarker(
        realTimePoint,
        getDirectionMIcon(direction),
        new MInfoWindow("详细信息", info)
      );
      maplet.addOverlay(realTimeMarker);
      realTimeMarker.openInfoWindow();
    },

    realTimeMonitorPoint: function (geoPoint, info,direction) {
      if (realTimePoint) {
        maplet.clearOverlays(true);
      }
      realTimePoint = new MPoint(geoPoint);
      var realTimeMarker = new MMarker(
        realTimePoint,
        getDirectionMIcon(direction),
        new MInfoWindow("详细信息", info)
      );
      maplet.addOverlay(realTimeMarker);
      realTimeMarker.openInfoWindow();
      showMonitorContent();
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

$(document).on("click","button[id='monitor-info-btn']",function(){
  monitorBtn='info';
  showMonitorContent()
});

$(document).on("click","button[id='monitor-action-btn']",function(){
  monitorBtn='action';
  showMonitorContent()
});

function showMonitorContent(){
  if(monitorBtn=='action'){
    $("#monitor-action-content").show();
    $("#monitor-info-content").hide();
    $("#monitor-action-btn").addClass(' disabled');
    $("#monitor-info-btn").removeClass(' disabled');
  }else{
    $("#monitor-info-content").show();
    $("#monitor-action-content").hide();
    $("#monitor-info-btn").addClass(' disabled');
    $("#monitor-action-btn").removeClass(' disabled');
  }
}

function getDirectionMIcon(direction) {
  if(direction<=45||direction>=315){
    return new MIcon("assets/images/car0.png", 24, 48,0,0);
  }else if(direction<=135){
    return new MIcon("assets/images/car1.png", 48, 24,0,0);
  }else if(direction<=225){
    return new MIcon("assets/images/car2.png", 24, 48,0,0);
  }else{
    return new MIcon("assets/images/car3.png", 48, 24,0,0);
  }
}

