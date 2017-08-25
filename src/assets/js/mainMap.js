// var realTimeMaplet;
var multipleCarPoints=new Object();

var mianMapObject = (function () {
    return {
        initMap: function (obj, elm) {
            // this.clean();
            oo = true;
            obj.addControl(new MStandardControl());
            obj.centerAndZoom(new MPoint(116.35566, 39.93218), 12);


            console.log("clientWidth:" + document.getElementById(elm).clientWidth)
            console.log("clientHeight:" + document.getElementById(elm).clientHeight)

            obj.resize(document.getElementById(elm).clientWidth - 20, document.documentElement.clientHeight - 300);//初始化地图宽和高
            window.onresize = function () {//自适应地图宽和高
                obj.resize(document.getElementById(elm).clientWidth - 20, document.documentElement.clientHeight - 300);
            };
        },
        resetCenter: function (obj, lng, lat) {
            obj.centerAndZoom(new MPoint(lng, lat), 12)
        },
        multipleCarPoint:function (geoPoint,carNo, info, direction){
            if (multipleCarPoints[carNo]){
                realTimeMaplet.removeOverlay(multipleCarPoints[carNo])
            }
            var point = new MPoint(geoPoint);
            var marker = new MMarker(
                point,
                new MIcon('<img class="con" id="icon_realTimeMonitor" src="assets/images/car0.png"  width="24px" height="48px"/><br/><span style="margin-left:-20px;width:100px;display:block;font-size:10px;color:red">'+carNo+'</span>', 24, 48),
                new MInfoWindow("详细信息", info)
            );

            realTimeMaplet.addOverlay(marker);
            multipleCarPoints[carNo]=marker;
            var $icon = $('#icon_combine_'+carNo);
            $icon.css('transform', 'rotate(' + direction + 'deg)');//设置车辆方向
            $icon.css('-ms-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-moz-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-o-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-webkit-transform', 'rotate(' + direction + 'deg)');
        },
        setDirection:function (key,direction){
            var $icon = $('#'+key);
            $icon.css('transform', 'rotate(' + direction + 'deg)');//设置车辆方向
            $icon.css('-ms-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-moz-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-o-transform', 'rotate(' + direction + 'deg)');
            $icon.css('-webkit-transform', 'rotate(' + direction + 'deg)');
        },
        showMultipleCarPoint:function (carNo) {
            if (multipleCarPoints[carNo]){
                realTimeMaplet.centerAndZoom(multipleCarPoints[carNo].pt,12);
                multipleCarPoints[carNo].openInfoWindow();
            }
        },
        removeMultipleCarPoint:function (carNo) {
            if (multipleCarPoints[carNo]){
                realTimeMaplet.removeOverlay(multipleCarPoints[carNo])
            }
        }
    }
})(mianMapObject || {});