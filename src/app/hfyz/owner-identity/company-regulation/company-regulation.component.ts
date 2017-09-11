import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { ToastsManager } from 'ng2-toastr';
import { CompanyRegulationService } from './company-regulation.service';
import { DatePipe } from '@angular/common';
import { zh } from '../../common/shared/zh';
import {RegularService} from '../../common/shared/regular.service';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

@Component({
    selector: 'app-company-regulation',
    templateUrl: './company-regulation.component.html',
    styleUrls: ['./company-regulation.component.css']
})
export class CompanyRegulationComponent implements OnInit {
    action: string;
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;
    ownerName: string; // 搜索条件-业户名称
    regulationName: string;
    systemType = {id: '', name: ''};
    dateBegin: Date; // 搜索条件-起始时间
    dateEnd: Date; // 搜索条件-结束时间
    upload: any[];
    regulationList: any[];
    formData: FormData;
    file: boolean;
    fileSize: number;
    zh = zh;
    formTitle: string;
    regulation: any;
    systemTypeList: any;
    constructor(private _regulationService: CompanyRegulationService,
        private _regularService: RegularService,
        private _customDialogService: CustomDialogService,
        private _loadingService: TdLoadingService,
        private _toastr: ToastsManager,
        private datePipe: DatePipe) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;

        this.ownerName = '';
        this.dateBegin = null;
        this.dateEnd = null;
        this.action = 'list';
        this.upload = [];
        this.regulationList = [];
        this.file = false;
        this.regulation = {};
        this.systemTypeList = [];
    }

    ngOnInit() {
        this.getSystemTypeList();
        this.loadData();
    }

    getSystemTypeList() {
        this._loadingService.register();
        this._regulationService.getSystemTypeList().subscribe(res => {
            this._loadingService.resolve();
            this.systemTypeList = res.systemTypeList;
        })
    }

    /**
     * 加载表格数据
     */
    loadData() {
        const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : ''
        const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : ''
        this._loadingService.register()
        this._regulationService.search(this.ownerName, begin, end, this.systemType.id, this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.regulationList = res.resultList;
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
                } else {
                    this._toastr.error(res.errors)
                }
            }
        )
    }

    /**
     * 分页插件p-paginator方法
     * @param event
     */
    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.loadData();
        }
    }

    /**
     * 搜索
     */
    search() {
        if (this.validate()) {
            this.pageFirst = 0;
            this.pageOffset = 0;
            this.loadData();
        }
    }

    /**
     * 重置搜索条件
     */
    reset() {
        this.ownerName = '';
        this.systemType = {id: '', name: ''};
        this.dateBegin = null;
        this.dateEnd = null;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData();
    }

    /**
     * 搜索参数验证
     */
    validate() {
        let flag = true
        if (this.dateBegin && this.dateEnd) {
            if (this.dateBegin > this.dateEnd) {
                flag = false;
                this._toastr.error('开始时间不能大于结束时间！');
            }
        }
        if ((this.dateBegin || this.dateEnd) && !(this.dateBegin && this.dateEnd)) {
            flag = false
            this._toastr.error('起止时间必须全部填写！')
        }
        return flag
    }

    onCreate() {
        this.action = 'create';
        this.regulationName = '';
        this.systemType = {id: '', name: ''};
        this.file = false;
        this.formData = new FormData();
    }

    back() {
        this.action = 'list';
        this.regulation = {};
        this.systemType = {id: '', name: ''};
    }

    fileChangeEvent(fileInput: any) {
        this.file = false;
        const files = fileInput.target.files;
        if (files.length > 0) {
            this.formData = new FormData();
            this.file = true;
            this.fileSize = files[0].size;
            if (this.fileSize > this._regulationService.MAXFILESIZE) {
                return;
            }
            this.formData.append('upload', files[0], files[0].fileName);
        }
    }

    onSave() {
        if (!this.validate_create()) {
            return;
        }
        this.formData.delete('regulationName');
        this.formData.delete('systemTypeId');
        this.formData.append('regulationName', JSON.stringify(this.regulationName));
        this.formData.append('systemTypeId', JSON.stringify(this.systemType.id));
        this._loadingService.register();
        this._regulationService.save(this.formData).subscribe(
            res => {
                this._loadingService.resolve();
                    this._toastr.info('新增成功');
                    this.systemType = {id: '', name: ''};
                    this.loadData();
                    this.action = 'list';
                    this.file = false;
            }
        )

    }

    onEdit(regulation) {
        this.action = 'update';
        this.formTitle = '编辑';
        this.preEdit(regulation.id)
    }

    preEdit(id) {
        this._loadingService.register();
        this._regulationService.edit(id).subscribe(
            res => {
                this._loadingService.resolve();
                this.regulation = res.regulation;
                this.systemType = this.systemTypeList.find(obj => obj.id === res.regulation.systemTypeId)
                console.log('==systemType====' + JSON.stringify(this.systemType));
            }
        );

    }

    update() {
        if (!this.validate_update()) {
            return;
        }
        this._loadingService.register();
        this.regulation.systemTypeId = this.systemType.id
        this._regulationService.update(this.regulation.id, this.regulation).subscribe(
            res => {
                this._loadingService.resolve();
                this.action = 'list';
                this.systemType = {id: '', name: ''};
                this._toastr.success('修改成功');
                this.loadData()
            }
        );
    }

    onDelete(regulation) {
        const msg = '确认删除管理制度为【' + regulation.regulationName + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._regulationService.delete(regulation.id).subscribe(
                    res => {
                        this._loadingService.resolve();
                        this.loadData();
                        this._toastr.info(`成功移除管理制度——` + regulation.regulationName);
                    }
                );
            }
        })
    }

    validate_create() {
        if (!this.regulationName) {
            this._toastr.error('请输入制度名称！');
            return false;
        }
        if (!this.file) {
            this._toastr.error('请选择一个文件！');
            return false;
        }
        if (this.fileSize > this._regulationService.MAXFILESIZE) {
            this._toastr.error('选择的文件过大，请重新选择！');
            return false;
        }
        return true;
    }

    validate_update() {
        if (this._regularService.isBlank(this.regulation.regulationName)) {
            this._toastr.error('请输入制度名称！');
            return false;
        }
        if (this._regularService.isBlank(this.regulation.fileName)) {
            this._toastr.error('请输入文件名称！');
            return false;
        }
        return true;
    }
}
