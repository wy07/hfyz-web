export class GnssData {
  constructor(public dateStr: string,
              public plateColor: number,
              public plateNo: string,
              public posEncrypt: number,
              public geoPoint: string,
              public gpsSpeed: number,
              public totalMileage: number,
              public recSpeed: number,
              public direction: number,
              public altitude: number,
              public vehicleState: number,
              public alarmState: number,) {
  }

  static  getRealTimeInfo(realTimeGnssData: GnssData) {
    let html = `
      车牌号码：${realTimeGnssData.plateNo}<br/>
      车辆颜色：${realTimeGnssData.plateColor}<br/>
      经纬度：${realTimeGnssData.geoPoint}<br/>
      速度：${realTimeGnssData.gpsSpeed}km/h<br/>
      总里程数：${realTimeGnssData.totalMileage}<br/>
      行驶记录速度：${realTimeGnssData.recSpeed}km/h<br/>
      方向：${realTimeGnssData.direction}<br/>
      海拔高度：${realTimeGnssData.altitude}<br/>
      车辆状态：${realTimeGnssData.vehicleState}<br/>
      报警状态：${realTimeGnssData.alarmState}<br/>
      更新时间：${realTimeGnssData.dateStr}
    `;
    return html;
  }
}
