var realTimePoint;

var historyMap;
var maplet = null;
var monitorBtn = "info";

var combineQueryPoints=new Object();

var mapObject = (function () {
    return {
        initMap: function (elm) {
            console.log("initMap");
            this.clean();
            oo = true;
            maplet = new Maplet(elm);
            maplet.addControl(new MStandardControl());
            maplet.centerAndZoom(new MPoint(116.35566, 39.93218), 12);
            maplet.resize(document.getElementById(elm).clientWidth - 20, document.documentElement.clientHeight - 400);//初始化地图宽和高
            window.onresize = function () {//自适应地图宽和高
                maplet.resize(document.getElementById(elm).clientWidth - 20, document.documentElement.clientHeight - 400);
            };
        },
        resetCenter:function(lng,lat){
            maplet.centerAndZoom(new MPoint(lng, lat), 12)
        },
        reload: function () {
            maplet.centerAndZoom(new MPoint(116.35566, 39.93218), 12);
        },
        clean: function () {
            if (maplet) {
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

        realTimePoint: function (geoPoint, info, direction) {
            maplet.centerAndZoom(new MPoint(117.126826, 31.852467), 12);
            if (realTimePoint) {
                maplet.clearOverlays(true);
            }

            realTimePoint = new MPoint(geoPoint);
            var realTimeMarker = new MMarker(
                realTimePoint,
                new MIcon('<img class="con" id="icon_realTime" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48),
                new MInfoWindow("详细信息", info)
            );

            maplet.addOverlay(realTimeMarker);
            realTimeMarker.openInfoWindow();

            var $icon = $('#icon_realTime');
            $icon.css('transform', 'rotate(' + direction + 'deg)');//设置车辆方向
            $icon.css('-ms-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-moz-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-o-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-webkit-transform', 'rotate(' + direction + 'deg)');
        },

        realTimeMonitorPoint: function (geoPoint, info, direction) {
            if (realTimePoint) {
                maplet.clearOverlays(true);
            }

            realTimePoint = new MPoint(geoPoint);
            var realTimeMarker = new MMarker(
                realTimePoint,
                new MIcon('<img class="con" id="icon_realTimeMonitor" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48),
                new MInfoWindow("详细信息", info)
            );

            maplet.addOverlay(realTimeMarker);
            realTimeMarker.openInfoWindow();
            showMonitorContent();
            var $icon = $('#icon_realTimeMonitor');
            $icon.css('transform', 'rotate(' + direction + 'deg)');//设置车辆方向
            $icon.css('-ms-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-moz-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-o-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-webkit-transform', 'rotate(' + direction + 'deg)');

        },

        historyPoints: function (geoPoint, alarmState, info) {
            var historyPoint = new MPoint(geoPoint);
            var historyMarker = new MMarker(
                historyPoint,
                new MIcon(alarmState == 0 ? "assets/images/green.png" : "assets/images/red.png", 16, 16),
                new MInfoWindow("详细信息", info)
            );
            maplet.addOverlay(historyMarker);
        },

        removecombineQueryPoint:function (carNo) {
            if (combineQueryPoints[carNo]){
                maplet.removeOverlay(combineQueryPoints[carNo])
            }
        },

        combineQueryPoint:function (geoPoint,carNo, info, direction){
            if (combineQueryPoints[carNo]){
                maplet.removeOverlay(combineQueryPoints[carNo])
            }

            var point = new MPoint(geoPoint);
            var marker = new MMarker(
                point,
                new MIcon('<img class="con" id="icon_realTimeMonitor" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48),
                new MInfoWindow("详细信息", info)
            );

            maplet.addOverlay(marker);
            combineQueryPoints[carNo]=marker;
            // marker.openInfoWindow();
            var $icon = $('#icon_combine_'+carNo);
            $icon.css('transform', 'rotate(' + direction + 'deg)');//设置车辆方向
            $icon.css('-ms-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-moz-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-o-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-webkit-transform', 'rotate(' + direction + 'deg)');
        }
    }

})(mapObject || {});

$(document).on("click", "button[id='monitor-info-btn']", function () {
    monitorBtn = 'info';
    showMonitorContent()
});

$(document).on("click", "button[id='monitor-action-btn']", function () {
    monitorBtn = 'action';
    showMonitorContent()
});

function showMonitorContent() {
    if (monitorBtn == 'action') {
        $("#monitor-action-content").show();
        $("#monitor-info-content").hide();
        $("#monitor-action-btn").addClass(' disabled');
        $("#monitor-info-btn").removeClass(' disabled');
    } else {
        $("#monitor-info-content").show();
        $("#monitor-action-content").hide();
        $("#monitor-info-btn").addClass(' disabled');
        $("#monitor-action-btn").removeClass(' disabled');
    }
}

