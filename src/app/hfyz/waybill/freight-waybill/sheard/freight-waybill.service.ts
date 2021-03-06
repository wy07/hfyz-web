import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class FreightWaybillService {
    area: any;
    constructor(public restangular: Restangular) {
        this.area = { departArea: '', arriveArea: '' }
    }

    setArea(area) {
        this.area = { departArea: area.departArea, arriveArea: area.arriveArea }
    }

    getArea() {
        return this.area;
    }

    search(vehicleNo, ownerName, dateBegin, dateEnd, max, offset, status?) {
        return this.restangular.all('freight-waybills').customGET('search', {
            vehicleNo: vehicleNo,
            ownerName: ownerName,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            status: status,
            max: max,
            offset: offset
        })
    }

    show(id, action = '') {
        return this.restangular.one('freight-waybills', id).customGET('show', {action: action})
    }

    getCompanyDangerousCarsInfo(companyCode) {
        return this.restangular.one('companys', companyCode).customGET('dangerous-cars-info', {})
    }

    getCarInfo(vehicleNo) {
        return this.restangular.one('cars').customGET('infos', { vehicleNo: vehicleNo })
    }

    getViaLand(companyCode, startDistrictCode, endDistrictCode) {
        return this.restangular.one('freight-routers', companyCode).customGET('get-viaLand',
            { startDistrictCode: startDistrictCode, endDistrictCode: endDistrictCode })
    }

    save(freightWaybill) {
        return this.restangular.one('freight-waybills').customPOST(freightWaybill, 'save');
    }

    edit(id) {
        return this.restangular.one('freight-waybills', id).customGET('edit');
    }

    update(freightWaybill) {
        return this.restangular.one('freight-waybills', freightWaybill.id).customPOST(freightWaybill, 'update');
    }

    delete(id) {
        return this.restangular.one('freight-waybills', id).customDELETE('delete', {});
    }

    getEmergencyPlanByDangerousType(dangerousTypeId) {
        return this.restangular.one('emergency-plans', dangerousTypeId).customGET('get-emergency-plan-by-dangerous-type')
    }

    submit(id) {
        return this.restangular.one('freight-waybills', id).customPOST({}, 'submit');
    }

    export(vehicleNo, ownerName, dateBegin, dateEnd) {
        return this.restangular.all('freight-waybills').customGET('export',
            {vehicleNo: vehicleNo, ownerName: ownerName, dateBegin: dateBegin, dateEnd: dateEnd});
    }
}
