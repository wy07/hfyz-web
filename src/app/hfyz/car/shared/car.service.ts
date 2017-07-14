import {Injectable} from "@angular/core";
import {Restangular} from "ngx-restangular";

@Injectable()
export class CarService {


  constructor(public restangular: Restangular) {
  }


  search(businessType, licenseNo, max, offset) {
    return this.restangular.all('cars').customGET('search', {
      businessType: businessType,
      licenseNo: licenseNo,
      max: max,
      offset: offset
    });
  }
}
