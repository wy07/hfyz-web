export class PassLineBusinessBasicInfo {
    constructor(
        public id: string,
        public lineCode: string,                    // 线路编号
        public ownerName: string,                   // 业户名称*
        public companyCode: string,                 // 业户编码(组织机构代码）*
        public licenseCharacter: string,            // 经营许可证字
        public licenseNo: string,                   // 经营许可证号
        public busType: string,                     // 班车类别
        public startStationName: string,            // 起点站
        public endStationName: string,              // 终点站
        public stopStation: string,                 // 途经站点
        public mainPoint: string,                   // 途经主要站点
        public dayTimes: string,                    // 日发班次
        public businessWay: string,                 // 经营方式
        public licenseDecideBookNo: string,         // 许可决定书编号
        public decideTime: string,                  // 许可日期
        public decideOrc: string,                   // 许可机构
        public beginTime: string,                   // 有效起始日期
        public endTime: string,                     // 有效起始日期
        public licenseType: string,                 // 牌证类别
        public businessSituation: string,           // 营运状态
        public changeLicenseTimes: string,          // 补换证次数
        public generalinfoChangeTimes: string,      // 一般信息变更次数
        public businessinfoChangeTimes: string,     // 营运状态变更次数
        public inputTotalCar: string,               // 投入的车辆总数
        public inputTotalSeat: string,              // 投入车辆的座位总数
        public totalLinePlate: string,              // 线路牌总数
    ) { }
}
