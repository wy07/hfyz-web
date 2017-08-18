export class PassLinePhysicalBasicInfo {
    constructor(
        public id: string,
        public modifyTime: string,                  // 更新时间
        public lineName: string,                    // 线路名称
        public lineCode: string,                    // 线路编码
        public businessArea: string,                // 经营区域
        public lineType: string,                    // 线路类型
        public startPlace: string,                  // 始发地
        public endPlace: string,                    // 目的地
        public mainPoint: string,                   // 途径主要地点
        public startAdminDivsionCode: string,       // 起点行政区划代码
        public startAdminDivsionName: string,       // 起点行政区划名称
        public endAdminDivsionCode: string,         // 终点行政区划代码
        public endAdminDivsionName: string,         // 终点行政区划名称
        public lineMileAge: string,                 // 线路里程
        public highwayMileAge: string,              // 高速里程
        public percentage: string,                  // 占总里程的百分比
        public highwayEntry: string,                // 高速入口
        public highwayExit: string,                 // 高速出口
        public highway: string,                     // 是否高速
        public villageLine: string,                 // 是否农村客运
        public travelLine: string,                  // 是否旅游线路
        public busLine: string,                     // 是否公交线路

    ) {
    }
}
