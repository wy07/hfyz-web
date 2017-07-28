export class GnssData {
  static getRealTimeInfo(realTimeGnssData: GnssData) {
    const html = `
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

  static getRealTimeMonitorInfo(realTimeGnssData: GnssData) {
    const html = `
      <button id="monitor-info-btn" class="btn btn-info">实时信息</button>
      <button id="monitor-action-btn" class="btn btn-info">车辆操作</button>
      <div id="monitor-info-content">
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
      </div>
      <div id="monitor-action-content">
        <button type="button" class="btn btn-warning col-sm-12">点名</button><br/>
        <button type="button" class="btn btn-warning col-sm-12">拍照</button><br/>
        <button type="button" class="btn btn-warning col-sm-12">文本信息下发</button><br/>
        <button type="button" class="btn btn-warning col-sm-12">设置电话回拨</button><br/>
      </div>
    `;
    return html;
  }

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
    public alarmState: number) {
  }
}
