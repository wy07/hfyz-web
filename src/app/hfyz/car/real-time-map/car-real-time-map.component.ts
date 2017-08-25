import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { RegularService } from '../../common/shared/regular.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { OwnerIdentityService } from '../../owner-identity/shared/owner-identity.service';
import { CarService } from '../../car/shared/car.service';
import { EventBuservice } from './../../common/shared/eventbus.service';
import { GnssData } from '../../common/shared/gnss-data';

declare var Maplet: any;
declare var mianMapObject: any;
declare var MPoint: any;
declare var MMarker: any;
declare var MIcon: any;
declare var MInfoWindow: any;
// declare var realTimeMaplet: any;

@Component({
  selector: 'app-car-real-time-map',
  templateUrl: './car-real-time-map.component.html',
  styleUrls: ['./car-real-time-map.component.css']
})
export class CarRealTimeMapComponent implements OnInit {
  realTimeDataTOP10 = [];
  realTimeDataAlarmTOP10 = [];

  companys: SelectItem[];
  company: string;
  carsGroupByCompany: any;
  realTimeMaplet: any;
  multipleCarPoints: any;

  cars: SelectItem[];
  selectCars: any[];

  currentRealTimeAccordion: string;
  companyName: string;


  lng: number;
  lat: number;

  constructor(private _toastr: ToastsManager
    , private _regularService: RegularService
    , private datePipe: DatePipe
    , private _eventBuservice: EventBuservice
    , private _ownerService: OwnerIdentityService
    , private _carService: CarService) {
    this.lng = 117.126826;
    this.lat = 31.852467;
    this.currentRealTimeAccordion = 'multipleCar';
    this.companys = [];
    this.carsGroupByCompany = {};
    this.cars = [];
    this.selectCars = [];
    this.multipleCarPoints = {};
    this.companyName = sessionStorage.getItem('companyName');
  }

  ngOnInit() {
    this.realTimeMaplet = new Maplet('realTimeMap')
    mianMapObject.initMap(this.realTimeMaplet, 'realTimeMap');
  }


  onRealTimeAccordion(currentAccordion) {
    this.currentRealTimeAccordion = currentAccordion;

    if (currentAccordion === 'multipleCar') {
      if (this.companys.length === 0) {
        this.getCompanys();
      }
    }
  }

  getCompanys() {
    this.companys = [];
    this.carsGroupByCompany = {};
    this._ownerService.all().subscribe(
      res => {
        for (const item of res.companys) {
          this.companys.push({ label: item.name, value: item.code });
        }
      }
    )
  }

  companySelectChange(event) {
    this.cars = [];
    if (this._regularService.isBlank(event.value)) {
      this.cars = [];
      return
    }

    if (this.carsGroupByCompany.hasOwnProperty(event.value)) {

      for (const item of this.carsGroupByCompany[event.value]) {
        this.cars.push({ label: `${item.licenseNo}(${item.carPlateColor})`, value: item.licenseNo });
      }
    } else {
      this.getCompanyCars(event.value)
    }

  }
  getCompanyCars(companyCode) {
    this._carService.getCompanyCars(companyCode).subscribe(
      res => {
        for (const item of res.cars) {
          this.cars.push({ label: `${item.licenseNo}(${item.carPlateColor})`, value: item.licenseNo });
        }
      }
    )
  }

  carSelected(licenseNo) {
    if (this.selectCars.length === 0) {
      this.clearListAndFrameNo();
    }
    return this.selectCars.findIndex(x => x.value === licenseNo) > -1;
  }

  carSelectChange(event, item) {
    const carIndex = this.selectCars.findIndex(x => x.value === event.target.value);
    if (!event.target.checked) {
      if (carIndex > -1) {
        this.realTimeDataTOP10 = this.realTimeDataTOP10.filter(res => res.plateNo !== item.value);
        this.realTimeDataAlarmTOP10 = this.realTimeDataAlarmTOP10.filter(res => res.plateNo !== item.value);
        this._eventBuservice.unregisterHandler(item.value);
        this.removeMultipleCarPoint(item.value);
        this.selectCars.splice(carIndex, 1);
      }
    }

    if (carIndex < 0) {
      this.addCar(item, true);
    }
  }

  addCar(item, isPush) {
    if (isPush) {
      this.selectCars.push(item);
    }
    this.lng += 0.001;
    this.lat += 0.001;
    const point: any = {
      dateStr: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      plateColor: 1,
      plateNo: item.value,
      posEncrypt: 0,
      geoPoint: `${this.lng},${this.lat}`,
      gpsSpeed: '60',
      totalMileage: 1,
      recSpeed: 60,
      direction: 100,
      altitude: 0,
      vehicleState: 3,
      alarmState: 1
    }
    this.realTimeDataTOP10.push(point)
    mianMapObject.resetCenter(this.realTimeMaplet, this.lng, this.lat)
    this.addMultipleCarPoint(`${this.lng},${this.lat}`,
      item.value,
      GnssData.getRealTimeInfo(point),
      23);
  }

  addMultipleCarPoint(geoPoint, carNo, info, direction) {
    if (this.multipleCarPoints[carNo]) {
      this.realTimeMaplet.removeOverlay(this.multipleCarPoints[carNo])
    }
    const point = new MPoint(geoPoint);
    const marker = new MMarker(
      point,
      new MIcon(`<img class='con' id='icon_combine_${carNo}' src='assets/images/car0.png'  width='24px' height='48px'/>
      <br/><span style='margin-left:-20px;width:100px;display:block;font-size:10px;color:red'> ${carNo} </span>`
        , 24, 48),
      new MInfoWindow('详细信息', info)
    );
    this.realTimeMaplet.addOverlay(marker);
    this.multipleCarPoints[carNo] = marker;
    mianMapObject.setDirection(`icon_combine_${carNo}`, direction);
  }

  removeCar(licenseNo) {
    const carIndex = this.selectCars.findIndex(x => x.value === licenseNo);
    if (carIndex > -1) {
      this.removeMultipleCarPoint(licenseNo);
      this.selectCars.splice(carIndex, 1);
    }
  }

  showCar(licenseNo) {
    this.showMultipleCarPoint(licenseNo);
  }

  clearCompanysAndCars() {
    this._eventBuservice.closeEventBus();
    this.companys = [];
    this.company = '';
    this.carsGroupByCompany = {};
    this.cars = [];
    this.selectCars = [];
    this.realTimeDataTOP10 = [];
    this.realTimeDataAlarmTOP10 = [];
    // mianMapObject.clean();
  }

  clearListAndFrameNo() {
    this._eventBuservice.closeEventBus();
    this.realTimeDataTOP10 = [];
    this.realTimeDataAlarmTOP10 = [];
    // mianMapObject.clean();
  }

  showMultipleCarPoint(carNo) {
    if (this.multipleCarPoints[carNo]) {
      this.realTimeMaplet.centerAndZoom(this.multipleCarPoints[carNo].pt, 12);
      this.multipleCarPoints[carNo].openInfoWindow();
    }
  }
  removeMultipleCarPoint(carNo) {
    if (this.multipleCarPoints[carNo]) {
      this.realTimeMaplet.removeOverlay(this.multipleCarPoints[carNo])
    }
  }

}
