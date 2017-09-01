import { TdLoadingService } from '@covalent/core';
import { MapService } from './../../map/shared/map.service';
import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { DatePipe } from '@angular/common';
import { zh } from './../../common/shared/zh';
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
  historyLocations = [];
  warnings = [];

  companys: SelectItem[];
  company: string;
  carsGroupByCompany: any;
  realTimeMaplet: any;
  multipleCarPoints: any;

  cars: SelectItem[];
  selectCars: any[];

  currentAccordion: string;
  companyName: string;


  licenseNo: string;
  realTimeGnssData: GnssData;

  eventBus: any;

  constructor(private _toastr: ToastsManager
    , private _regularService: RegularService
    , private datePipe: DatePipe
    , private _eventBuservice: EventBuservice
    , private _ownerService: OwnerIdentityService
    , private _carService: CarService
    , private _mapService: MapService
    , private _loadingService: TdLoadingService) {
    this.companys = [];
    this.carsGroupByCompany = {};
    this.cars = [];
    this.selectCars = [];
    this.multipleCarPoints = {};
    this.companyName = sessionStorage.getItem('companyName');

    this.licenseNo = '';
    this.realTimeGnssData = null;

    this.onAccordion('multipleCar');
  }

  ngOnInit() {
    this.realTimeMaplet = new Maplet('realTimeMap')
    mianMapObject.initMap(this.realTimeMaplet, 'realTimeMap');
  }


  onAccordion(currentAccordion) {
    if (this.currentAccordion !== currentAccordion) {
      this.clearCompanysAndCars();
    }
    this.currentAccordion = currentAccordion;
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
      this._toastr.error('请选择企业！');
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
    return this.selectCars.findIndex(x => x.value === licenseNo) > -1;
  }

  carSelectChange(event, item) {
    const carIndex = this.selectCars.findIndex(x => x.value === event.target.value);
    if (!event.target.checked && carIndex > -1) {
      this.historyLocations = this.historyLocations.filter(res => res.plateNo !== item.value);
      this.warnings = this.warnings.filter(res => res.plateNo !== item.value);
      const $this = this;
      this._eventBuservice.unregisterHandler('realTime', item.value, res => {
        $this.getMultipleRealTimeGnssDataByEventBus(res.msg, 'realTimeData');
      });
      this.removeMultipleCarPoint(item.value);
      this.selectCars.splice(carIndex, 1);
    }
    if (carIndex < 0) {
      this.addCar(item, true);
    }
  }

  addCar(item, isPush) {
    if (isPush) {
      this.selectCars.push(item);
    }
    this._loadingService.register();
    this._carService.getWarningAndHistorys(item.value, 1).subscribe(
      res => {
        this._loadingService.resolve();
        if (res.warnings.length > 0) {
          this.warnings.push(res.warnings[0])
        }
        if (res.historyLocations.length > 0) {
          const location = res.historyLocations[0];
          this.historyLocations.push(location);
          const pointData = {
            'dateStr': location.dateStr,
            'plateColor': location.plateColor,
            'plateNo': location.plateNo,
            'posEncrypt': location.posEncrypt,
            'geoPoint': location.geoPoint,
            'gpsSpeed': location.gpsSpeed,
            'totalMileage': location.totalMileage,
            'recSpeed': location.recSpeed,
            'direction': location.direction,
            'altitude': location.altitude,
            'vehicleState': location.vehicleState,
            'alarmState': location.alarmState
          };
          const val = pointData.geoPoint.split(',');
          mianMapObject.resetCenter(this.realTimeMaplet, val[0], val[1]);
          this.addMultipleCarPoint(pointData.geoPoint,
            item.value,
            GnssData.getRealTimeInfo(pointData),
            pointData.direction);
        }
        this.registerMultipleHandler(item.value);
      }
    );
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
    if (this.realTimeMaplet) {
      this.realTimeMaplet.clearOverlays(true);
    }
    this._eventBuservice.closeEventBus('realTime');
    // this.companys = [];
    this.company = '';
    // this.carsGroupByCompany = {};
    this.cars = [];
    this.selectCars = [];
    this.historyLocations = [];
    this.warnings = [];
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


  getRealTimeMap() {
    this.clearCompanysAndCars();

    if (!this.licenseNo) {
      this._toastr.error('请输入车牌号');
      return false;
    }
    this._loadingService.register();
    this._carService.getWarningAndHistorys(this.licenseNo, 10).subscribe(
      res => {
        this._loadingService.resolve();
        this.historyLocations = res.historyLocations;
        this.warnings = res.warnings;
        this.initCar(this.historyLocations);
        this.registerHandler();
      }
    );
  }

  initCar(list) {
    if (list.length > 0) {
      const data = {
        'dateStr': list[0].dateStr,
        'plateColor': list[0].plateColor,
        'plateNo': list[0].plateNo,
        'posEncrypt': list[0].posEncrypt,
        'geoPoint': list[0].geoPoint,
        'gpsSpeed': list[0].gpsSpeed,
        'totalMileage': list[0].totalMileage,
        'recSpeed': list[0].recSpeed,
        'direction': list[0].direction,
        'altitude': list[0].altitude,
        'vehicleState': list[0].vehicleState,
        'alarmState': list[0].alarmState
      };
      this.getRealTimeGnssDataByEventBus(data, 'histroyData');
    }
  }

  getRealTimeGnssDataByEventBus(data, type) {
    this.realTimeGnssData = {
      'dateStr': data.dateStr,
      'plateColor': data.plateColor,
      'plateNo': data.plateNo,
      'posEncrypt': data.posEncrypt,
      'geoPoint': data.geoPoint,
      'gpsSpeed': data.gpsSpeed,
      'totalMileage': data.totalMileage,
      'recSpeed': data.recSpeed,
      'direction': data.direction,
      'altitude': data.altitude,
      'vehicleState': data.vehicleState,
      'alarmState': data.alarmState
    };
    if (type !== 'histroyData') {
      this._mapService.processingDataList(this.historyLocations, this.realTimeGnssData);
    }
    this.addSingleCarPoint(this.realTimeGnssData.geoPoint,
      GnssData.getRealTimeInfo(this.realTimeGnssData),
      this.realTimeGnssData.direction);
  }


  addSingleCarPoint(geoPoint, info, direction) {
    this.realTimeMaplet.clearOverlays(true);
    const point = new MPoint(geoPoint);
    const marker = new MMarker(
      point,
      new MIcon('<img class="con" id="icon_realTime" src="assets/images/car0.png"  width="24px" height="48px"/>', 24, 48),
      new MInfoWindow('详细信息', info)
    );
    this.realTimeMaplet.addOverlay(marker);
    marker.openInfoWindow();
    mianMapObject.setDirection('icon_realTime', direction);
  }

  registerHandler() {
    const $this = this;
    this._eventBuservice.carRealTimeRegisterHandler('realTime', this.licenseNo, res => {
      $this.getRealTimeGnssDataByEventBus(res.msg, 'realTimeData');
    })
  }

  registerMultipleHandler(licenseNo) {
    const $this = this;
    this._eventBuservice.carRealTimeRegisterHandler('realTime', licenseNo, res => {
      $this.getMultipleRealTimeGnssDataByEventBus(res.msg, 'realTimeData');
    })
  }

  getMultipleRealTimeGnssDataByEventBus(data, type) {
    const pointData = {
      'dateStr': data.dateStr,
      'plateColor': data.plateColor,
      'plateNo': data.plateNo,
      'posEncrypt': data.posEncrypt,
      'geoPoint': data.geoPoint,
      'gpsSpeed': data.gpsSpeed,
      'totalMileage': data.totalMileage,
      'recSpeed': data.recSpeed,
      'direction': data.direction,
      'altitude': data.altitude,
      'vehicleState': data.vehicleState,
      'alarmState': data.alarmState
    };
    if (type !== 'histroyData') {
      this._mapService.processingDataList(this.historyLocations, pointData);
    }

    this.addMultipleCarPoint(pointData.geoPoint,
      pointData.plateNo,
      GnssData.getRealTimeInfo(pointData),
      pointData.direction);
  }

}
