export class FreightWaybill {

    constructor(
        public id: string,
        public vehicleNo: string, // 车牌号
        public licenseNo: string, // 挂车车牌号
        public frameNo: string, // 车架号
        public carPlateColor: String, // 车辆颜色
        public carType: String, // 车辆类型
        public carSize: String, // 车辆尺寸
        public companyCode: string, // 业户编码
        public ownerName: string, // 业户名称
        public dangerousName: string, // 危险品名称
        public dangerousType: {id: '', name: ''}, // 危险品分类
        public ratifiedPayload: string, // 核定载重质量,kg
        public emergencyPlan: {id: '', name: '', describe: ''}, // 应急预案
        public price: string, // 运输价格 元/车
        public operatedType: string, // 是否经营性运输
        public loadedType: string, // 装载or卸载
        public fullLoaded: string, // 是否满载
        public amount: string, // 装载量
        public mile: string, // 运输距离
        public departTime: string, // 运输出场时间
        public driver: {name: '', wokeLicenseNo: '', phone: ''}, // 运输出场时间
        public supercargo: {name: '', wokeLicenseNo: '', phone: ''}, // 押运员姓名
        public consignCompany: string, // 托运单位
        public backTime: string, // 托运会回场时间
        public departArea: string,  // 出发地
        public arriveArea: string,  // 目的地
        public status: string,  // 状态
        public routerName: string,
        public startProvince: string,
        public startProvinceCode: string,
        public startCity: string,
        public startCityCode: string,
        public startDistrict: string,
        public startDistrictCode: string,
        public endProvince: string,
        public endProvinceCode: string,
        public endCity: string,
        public endCityCode: string,
        public endDistrict: string,
        public endDistrictCode: string,
        public viaLand: string,
        public provenance?: string,
        public destination?: string,
    ) { }
}
