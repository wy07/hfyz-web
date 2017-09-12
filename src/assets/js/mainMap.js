// var realTimeMaplet;
var multipleCarPoints=new Object();
var monitorBtn = "info";

var mianMapObject = (function () {
    return {
        initMap: function (obj, elm) {
            // this.clean();
            oo = true;
            obj.addControl(new MStandardControl());
            obj.centerAndZoom(new MPoint(116.35566, 39.93218), 12);

            obj.resize(document.getElementById(elm).clientWidth - 20, document.documentElement.clientHeight - 300);//初始化地图宽和高
            window.onresize = function () {//自适应地图宽和高
                obj.resize(document.getElementById(elm).clientWidth - 20, document.documentElement.clientHeight - 300);
            };
        },
        resetCenter: function (obj, lng, lat) {
            obj.centerAndZoom(new MPoint(lng, lat), 12)
        },
        resetCenterAndScope: function (obj, lng, lat, scope) {
            obj.centerAndZoom(new MPoint(lng, lat), scope)
        },
        clean: function (obj) {
            if (obj) {
                console.log("in  clean");
                obj.clearOverlays(false);
            }
        },
        setDirection:function (key,direction){
            console.log(new Date())
            console.log(key+":"+direction)
            var $icon = $('#'+key);
            $icon.css('transform', 'rotate(' + direction + 'deg)');//设置车辆方向
            $icon.css('-ms-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-moz-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-o-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-webkit-transform', 'rotate(' + direction + 'deg)');
        },
        showMonitorContent:function(){
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
    }
})(mianMapObject || {});


$(document).on("click", "button[id='monitor-info-btn']", function () {
    monitorBtn = 'info';
    mianMapObject.showMonitorContent()
});

$(document).on("click", "button[id='monitor-action-btn']", function () {
    monitorBtn = 'action';
    mianMapObject.showMonitorContent()
});
