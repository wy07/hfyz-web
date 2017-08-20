import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { ToastsManager } from 'ng2-toastr';
import { CompanyRegulationService } from './company-regulation.service';
import { DatePipe } from '@angular/common';
import { zh } from '../../common/shared/zh';

@Component({
    selector: 'app-company-regulation',
    templateUrl: './company-regulation.component.html',
    styleUrls: ['./company-regulation.component.css']
})
export class CompanyRegulationComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    ownerName: string; // 搜索条件-业户名称
    dateBegin: Date; // 搜索条件-起始时间
    dateEnd: Date; // 搜索条件-结束时间

    regulationList: any[];
    zh = zh;
    constructor(private _regulationService: CompanyRegulationService,
        private _loadingService: TdLoadingService,
        private toastr: ToastsManager,
        private datePipe: DatePipe) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;

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
     */
    loadData() {
        const begin = this.dateBegin ? this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm:ss') : ''
        const end = this.dateEnd ? this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm:ss') : ''
        this._loadingService.register()
        this._regulationService.search(this.ownerName, begin, end, this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.regulationList = res.resultList;
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
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
