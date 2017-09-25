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

    manageStatusId: any;
    manageRangeId: any;
    levelId: any;

    frontPhoto: any;
    sidePhoto: any;
    frontPhotobase64String: any;
    sidePhotobase64String: any;
    isNewFrontPhoto: boolean;
    isNewSidePhoto: boolean;
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
        this.manageStatusId = '';
        this.levelId = '';
        this.manageRangeId = [];

        this.frontPhoto = [];
        this.sidePhoto = [];
        this.isNewFrontPhoto = false;
        this.isNewSidePhoto = false;
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
        this.freightStation.manageStatus = {id:  this.manageStatusId};
        this.freightStation.level = {id: this.levelId};
        for (const item of this.manageRangeId) {
            this.manageRangeSelected.push({id: item});
        }
        this.freightStation.manageRange = this.manageRangeSelected;
        this.formData.delete('freightStation');
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
        this.frontPhoto = [];
        const files = fileInput.target.files;
        this.frontPhotoName = '';
        this.newfrontPhoto = false;
        if (files.length > 0) {
            this.frontPhotoName = files[0].name;
            this.newfrontPhoto = true;
            this.isNewFrontPhoto = true;
            this.formData.append('frontPhoto', files[0], files[0].fileName);
            this.showImg(files[0], this.frontPhoto);
        }
    }

    sidePhotoChangeEvent(fileInput: any) {
        this.sidePhoto = [];
        const files = fileInput.target.files;
        this.sidePhotoName = '';
        this.newsidePhoto = false;
        if (files.length > 0) {
            this.sidePhotoName = files[0].name;
            this.newsidePhoto = true;
            this.isNewSidePhoto = true;
            this.formData.append('sidePhoto', files[0], files[0].fileName);
            this.showImg(files[0], this.sidePhoto);
        }
    }

    showImg(photo, img) {
            const file = photo;
            const reader = new FileReader();
            reader.onload = function (e: any) {
                const image = new Image();
                image.src = e.target.result;
                image.onload = function (evt) {
                    const imgWidth = image.width;
                    const imgHeight = image.height;
                    img.push({ img: e.target.result});
                };
            };
            reader.readAsDataURL(file);
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
                    this.manageStatusId = this.freightStation.manageStatus;
                    this.manageRangeId = this.freightStation.manageRange;
                    this.levelId = this.freightStation.level;
                    this.completedDate = new Date(this.freightStation.completedDate);
                    this.buildDate = new Date(this.freightStation.buildDate);
                    this.checkDate = new Date(this.freightStation.checkDate);
                    this.operateDate = new Date(this.freightStation.operateDate);
                    this.frontPhotobase64String = this.freightStation.frontPhotobase64String;
                    this.sidePhotobase64String = this.freightStation.sidePhotobase64String;

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
        this.freightStation.manageStatus = {id:  this.manageStatusId};
        this.freightStation.level = {id: this.levelId};
        for (const item of this.manageRangeId) {
            this.manageRangeSelected.push({id: item});
        }
        this.freightStation.manageRange = this.manageRangeSelected;
        delete this.freightStation['frontPhotobase64String'];
        delete this.freightStation['sidePhotobase64String'];
        this.formData.delete('freightStation');
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
        this.manageRangeId = [];
        this.manageStatusId = '';
        this.levelId = '';
        this.frontPhoto = [];
        this.sidePhoto = [];
        this.isNewSidePhoto = false;
        this.isNewFrontPhoto = false;
        this.sidePhotobase64String = '';
        this.frontPhotobase64String = '';
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
        if (this._regularService.isBlank(this.freightStation.sn)) {
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
        if (this._regularService.isBlank(this.manageStatusId)) {
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
        if (this._regularService.isBlank(this.levelId)) {
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
        if (this.manageRangeId.length <= 0) {
            this._toastr.error('经营范围不能为空！');
            return false;
        }
        if (this.freightStation.sn.length !== 9) {
            this._toastr.error('请输入正确的货运站编号！');
            return false;
        }
        return true;
    }
}
