import {Component, OnInit} from '@angular/core';
import {TdLoadingService} from '@covalent/core';
import {ToastsManager} from 'ng2-toastr';
import {CompanyRegulationService} from './company-regulation.service';
import {DatePipe} from '@angular/common';
import {zh} from '../../common/shared/zh';

@Component({
    selector: 'app-company-regulation',
    templateUrl: './company-regulation.component.html',
    styleUrls: ['./company-regulation.component.css']
})
export class CompanyRegulationComponent implements OnInit {
    max: number;   // 表格行数
    page: number;   // 当前页数
    total: number;  // 总数
    action: string;
    ownerName: string; // 搜索条件-业户名称
    regulationName: string;
    dateBegin: Date; // 搜索条件-起始时间
    dateEnd: Date; // 搜索条件-结束时间
    upload: any[];
    regulationList: any[];
    formData: FormData;
    file: boolean;
    MAXFILESIZE = 5242880;
    zh = zh;
    constructor(private _regulationService: CompanyRegulationService,
                private _loadingService: TdLoadingService,
                private toastr: ToastsManager,
                private datePipe: DatePipe) {
        this.max = 10;
        this.page = 0;
        this.total = 0;
        this.ownerName = '';
        this.dateBegin = null;
        this.dateEnd = null;
        this.action = 'list';
        this.upload = [];
        this.regulationList = [];
        this.file = false;
    }

    ngOnInit() {
        this.loadData()
    }

    /**
     * 加载表格数据
     * @param {number} offset
     */
    loadData(offset = 0) {
        const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : ''
        const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : ''
        this._loadingService.register()
        this._regulationService.search(this.ownerName, begin, end, this.max, offset).subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.regulationList = res.resultList
                    this.total = res.total
                } else {
                    this.toastr.error(res.errors)
                }
            }
        )
    }

    /**
     * 分页插件p-paginator方法
     * @param event
     */
    paginate(event) {
        if (this.page !== event.page) {
            this.page = event.page;
            this.loadData(this.max * event.page);
        }
    }

    /**
     * 搜索
     */
    search() {
        if (this.validate()) {
            this.loadData()
        }
    }

    /**
     * 重置搜索条件
     */
    reset() {
        this.ownerName = '';
        this.dateBegin = null;
        this.dateEnd = null;
    }

    /**
     * 搜索参数验证
     */
    validate() {
        let flag = true
        if (this.dateBegin && this.dateEnd) {
            if (this.dateBegin > this.dateEnd) {
                flag = false;
                this.toastr.error('开始时间不能大于结束时间！');
            }
        }
        if ((this.dateBegin || this.dateEnd) && !(this.dateBegin && this.dateEnd)) {
            flag = false
            this.toastr.error('起止时间必须全部填写！')
        }
        return flag
    }

    onCreate() {
        this.action = 'create';
        this.regulationName = '';
        this.file = false;
        this.formData = new FormData();
    }
    return() {
        this.action = 'list';
    }
    fileChangeEvent(fileInput: any) {
        this.file = false;
        this.formData = new FormData();
        const files = fileInput.target.files;
        if (files.length > 0) {
            this.file = true;
            if (files[0].size > this.MAXFILESIZE) {
                this.toastr.info('选择的文件过大，请重新选择！');
                return;
            }
            this.formData.append('upload', files[0], files[0].fileName)
        }
    }
    onSave() {
        console.log(this.file);
        if (!this.validate_create()) {
            return;
        }
        this.formData.append('regulationName', JSON.stringify(this.regulationName));
        this._regulationService.save(this.formData).subscribe(
            res => {
                if (res.result === 'success') {
                    this.toastr.info('新增成功');
                    this.loadData();
                    this.action = 'list';
                    this.file = false;
                }
            }
        )
    }

    validate_create() {
        if (!this.regulationName) {
            this.toastr.error('请输入制度名称！');
            return false;
        }
        if (!this.file) {
            this.toastr.error('请选择一个文件！');
            return false;
        }
        return true;
    }
}
