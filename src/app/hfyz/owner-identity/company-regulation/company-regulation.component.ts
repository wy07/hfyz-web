import {Component, OnInit} from '@angular/core';
import {TdLoadingService} from '@covalent/core';
import {ToastsManager} from 'ng2-toastr';
import {CompanyRegulationService} from './company-regulation.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-company-regulation',
    templateUrl: './company-regulation.component.html',
    styleUrls: ['./company-regulation.component.css']
})
export class CompanyRegulationComponent implements OnInit {
    max: number;   // 表格行数
    page: number;   // 当前页数
    total: number;  // 总数

    ownerName: string; // 搜索条件-业户名称
    dateBegin: Date; // 搜索条件-起始时间
    dateEnd: Date; // 搜索条件-结束时间

    regulationList: any[];

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

        this.regulationList = []
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
}
