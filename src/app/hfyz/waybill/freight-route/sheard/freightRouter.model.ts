export class FreightRouter {

    constructor(
        public id: string,
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
