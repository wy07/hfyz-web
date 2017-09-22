import { Component, OnInit } from '@angular/core';
import { FreightStationService} from './sheard/freight-station.service';
import { ToastsManager } from 'ng2-toastr';
import { RegularService } from '../../common/shared/regular.service';
import { TdLoadingService } from '@covalent/core';
import { CustomDialogService } from '../../common/shared/custom-dialog.service';
import { zh } from '../../common/shared/zh'
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-freight-station',
    templateUrl: './freight-station.component.html',
    styleUrls: ['./freight-station.component.css']
})
export class FreightStationComponent implements OnInit {
    freightStationList: any;
    freightStation: any;
    dangerousTypes: any;
    manageStatus: any;
    freightStationLevels: any;
    title: any;
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;
    pageFlag: string;
    zh = zh;
    formData: FormData;

    completedDate: Date;
    buildDate: Date;
    checkDate: Date;
    operateDate: Date;
    manageRangeSelected: any;
    frontPhotoName: any;
    sidePhotoName: any;

    newfrontPhoto: boolean;
    newsidePhoto: boolean;

    constructor(private _freightStationService: FreightStationService
        , private _toastr: ToastsManager
        , private _regularService: RegularService
        , private _customDialogService: CustomDialogService
        , private _loadingService: TdLoadingService
        , private datePipe: DatePipe) {

        this.freightStationList = [];
        this.freightStation = {};
        this.dangerousTypes = [];
        this.manageStatus = [];
        this.freightStationLevels = [];
        this.pageFlag = 'LIST';
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.frontPhotoName = '';
        this.sidePhotoName = '';

        this.completedDate = null;
        this.buildDate = null;
        this.checkDate = null;
        this.operateDate = null;
        this.manageRangeSelected = [];

        this.newfrontPhoto = false;
        this.newsidePhoto = false;
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this._loadingService.register()
        this._freightStationService.list(this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.freightStationList = res.freightStationList
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
                } else {
                    this._toastr.error(res.errors);
                }
            }
        )
    }
    onCreate() {
        this.pageFlag = 'ADD'
        this.title = '新增'
        this.clear();
        this._loadingService.register();
        this._freightStationService.relatedList().subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    for (const item of res.dangerousTypeList) {
                        this.dangerousTypes.push({ label: item.name, value: item.id });
                    }
                    for (const item of res.manageStatusList) {
                        this.manageStatus.push({ label: item.name, value: item.id });
                    }
                    for (const item of res.freightStationLevelList) {
                        this.freightStationLevels.push({ label: item.name, value: item.id });
                    }
                } else {
                    this._toastr.error(res.errors);
                }
            }
        )
    }
    onSubmit() {
        if (!this.validation()) {
           return;
        }
        this.freightStation.completed = this.datePipe.transform(this.completedDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.build =  this.datePipe.transform(this.buildDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.check = this.datePipe.transform(this.checkDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.operate =  this.datePipe.transform(this.operateDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.manageStatus = {id:  this.freightStation.manageStatus};
        this.freightStation.level = {id: this.freightStation.level};
        for (const item of this.freightStation.manageRange) {
            this.manageRangeSelected.push({id: item});
        }
        this.freightStation.manageRange = this.manageRangeSelected;
        this.formData.append('freightStation', JSON.stringify(this.freightStation));

        this._loadingService.register();
        this._freightStationService.save(this.formData).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.pageFlag = 'LIST';
                    this.initData();
                    this._toastr.success('保存成功！');
                } else {
                    this._toastr.error(res.errors);
                }
            });
    }
    selectCity(event) {
        const districtCode = event.value.split('/');
        this.freightStation.districtName = event.name;
        this.freightStation.districtCode = districtCode[2];
    }

    frontPhotoChangeEvent(fileInput: any) {
        const files = fileInput.target.files;
        this.frontPhotoName = '';
        this.newfrontPhoto = false;
        if (files.length > 0) {
            this.frontPhotoName = files[0].name;
            this.newfrontPhoto = true;
            this.formData.append('frontPhoto', files[0], files[0].fileName);
        }
    }

    sidePhotoChangeEvent(fileInput: any) {
        const files = fileInput.target.files;
        this.sidePhotoName = '';
        this.newsidePhoto = false;
        if (files.length > 0) {
            this.sidePhotoName = files[0].name;
            this.newsidePhoto = true;
            this.formData.append('sidePhoto', files[0], files[0].fileName);
        }
    }

    showDetail(id) {
        this.pageFlag = 'DETAIL'
        this.onEdit(id);
    }

    onEdit(id) {
        this.clear();
        if (this.pageFlag !== 'DETAIL') {
            this.pageFlag = 'EDIT'
            this.title = '编辑'
            this.newsidePhoto = true;
            this.newfrontPhoto = true;
        }
        this._loadingService.register();
        this._freightStationService.edit(id).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.freightStation = res.freightStation;
                    this.completedDate = new Date(this.freightStation.completedDate);
                    this.buildDate = new Date(this.freightStation.buildDate);
                    this.checkDate = new Date(this.freightStation.checkDate);
                    this.operateDate = new Date(this.freightStation.operateDate);
                    for (const item of res.dangerousTypeList) {
                        this.dangerousTypes.push({ label: item.name, value: item.id });
                    }
                    for (const item of res.manageStatusList) {
                        this.manageStatus.push({ label: item.name, value: item.id });
                    }
                    for (const item of res.freightStationLevelList) {
                        this.freightStationLevels.push({ label: item.name, value: item.id });
                    }
                } else {
                    this._toastr.error(res.errors);
                }
            });
    }

    onUpdate() {
        if (!this.validation()) {
            return;
        }
        this.freightStation.completed = this.datePipe.transform(this.completedDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.build =  this.datePipe.transform(this.buildDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.check = this.datePipe.transform(this.checkDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.operate =  this.datePipe.transform(this.operateDate, 'yyyy-MM-dd HH:mm:ss');
        this.freightStation.manageStatus = {id:  this.freightStation.manageStatus};
        this.freightStation.level = {id: this.freightStation.level};
        for (const item of this.freightStation.manageRange) {
            this.manageRangeSelected.push({id: item});
        }
        this.freightStation.manageRange = this.manageRangeSelected;
        this.formData.append('freightStation', JSON.stringify(this.freightStation));

        this._loadingService.register();
        this._freightStationService.update(this.formData, this.freightStation.id).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.pageFlag = 'LIST';
                    this.initData();
                    this._toastr.success('修改成功！');
                } else {
                    this._toastr.error(res.errors);
                }
            });
    }

    onDelete(freightStation) {
        const msg = '确认删除货运站为【' + freightStation.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._freightStationService.delete(freightStation.id).subscribe(
                    res => {
                        this._loadingService.resolve();
                        this._toastr.info('删除成功！');
                        this.pageFirst = 0;
                        this.initData();
                    }
                );
            }
        });
    }

    onBack() {
        this.pageFlag = 'LIST';
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

    onCancel() {
        this.clear();
        this.pageFlag = 'LIST';
    }

    clear() {
        this.freightStation = {};
        this.completedDate = null;
        this.buildDate = null;
        this.checkDate = null;
        this.operateDate = null;
        this.manageRangeSelected = [];
        this.frontPhotoName = '';
        this.sidePhotoName = '';
        this.formData = new FormData();
        this.dangerousTypes = [];
        this.manageStatus = [];
        this.freightStationLevels = [];
    }

    validation() {
        if (this._regularService.isBlank(this.freightStation.name)) {
            this._toastr.error('货运站名称不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.approvalNumber)) {
            this._toastr.error('批准文号不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.cn)) {
            this._toastr.error('货运站编号不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.address)) {
            this._toastr.error('详细地址不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.districtName)) {
            this._toastr.error('行政区划名称不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.manageStatus)) {
            this._toastr.error('经营状态不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.buildDate)) {
            this._toastr.error('建站日期不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.completedDate)) {
            this._toastr.error('竣工日期不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.checkDate)) {
            this._toastr.error('验收日期不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.operateDate)) {
            this._toastr.error('投入营运日期不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.level)) {
            this._toastr.error('货运站级别不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.scale)) {
            this._toastr.error('投资规模不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.coverArea)) {
            this._toastr.error('占地面积不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.buildArea)) {
            this._toastr.error('建筑面积不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.height)) {
            this._toastr.error('货运站高度不能为空！');
            return false;
        }
        if (this.pageFlag === 'ADD' && this._regularService.isBlank(this.frontPhotoName)) {
            this._toastr.error('正面照片不能为空！');
            return false;
        }
        if (this.pageFlag === 'ADD' && this._regularService.isBlank(this.sidePhotoName)) {
            this._toastr.error('侧面照片不能为空！');
            return false;
        }
        if (this.pageFlag === 'EDIT' && !this.newfrontPhoto) {
            this._toastr.error('正面照片不能为空！');
            return false;
        }
        if (this.pageFlag === 'EDIT' && !this.newsidePhoto) {
            this._toastr.error('侧面照片不能为空！');
            return false;
        }
        if (this._regularService.isBlank(this.freightStation.manageRange)) {
            this._toastr.error('危险品运输类型不能为空！');
            return false;
        }
        if (this.freightStation.cn.length !== 9) {
            this._toastr.error('请输入正确的货运站编号！');
            return false;
        }
        return true;
    }
}
