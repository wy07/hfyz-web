import {RegularService} from '../../common/shared/regular.service';
import {Component, OnInit, Injector} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {CarService} from "../shared/car.service";
import {LayoutComponent} from "../../layout/main-tab/layout.component";
@Component({
  selector: 'car-list',
  templateUrl: 'car-list.component.html'
})

export class CarListComponent implements OnInit {
  max:number;
  currentPage:number;
  totalCars:number;

  cars: any[];
  businessTypes: any[];
  businessType:string;
  licenseNo:string;
  layoutComponent:any;

  constructor(private toastr: ToastsManager
    , private regularService: RegularService
    , private carService: CarService
    , private inj: Injector) {
    this.max=10;
    this.currentPage=0;
    this.totalCars=0;
    this.cars=[];
    this.licenseNo='';
    this.businessTypes=[{label: '班线客车', value: '班线客车'},{label: '旅游包车', value: '旅游包车'},{label: '危险品运输车', value: '危险品运输车'}]
    this.businessType=this.businessTypes[0].value;
    this.layoutComponent = this.inj.get(LayoutComponent);
  }

  ngOnInit() {
    this.loadDate();
  }

  search(){
    this.loadDate();
  }

  loadDate(offset = 0){
    if(this.regularService.isBlank(this.businessType)){
      this.toastr.error('请选择行业类别');
      return false;
    }
    this.carService.search(this.businessType,this.licenseNo,this.max, offset).subscribe(
      res => {
        this.cars = res.carList;
        this.totalCars = res.carCount;
      }
    );
  }

  paginate(event){
    if(this.currentPage!=event.page){
      this.currentPage=event.page;
      this.loadDate(this.max*event.page);
    }
  }

  showRealTimeMap(item){
    let menu={name:'实时数据',icon:'fa-map',code:'realTimeMap',inputs:{frameNo:item.frameNo,id:item.frameNo}};
    this.layoutComponent.addTab(menu);
  }

  showHistoryMapp(item){
    let menu={name:'历史数据',icon:'fa-map',code:'historyMap',inputs:{frameNo:item.frameNo,id:item.frameNo}};
    this.layoutComponent.addTab(menu);
  }

}
