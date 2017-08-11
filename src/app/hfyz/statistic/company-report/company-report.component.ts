import {Component, OnInit} from '@angular/core';
import {CompanyReportService} from './company-report.service';
import {TdLoadingService} from '@covalent/core';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-company-report',
    templateUrl: './company-report.component.html',
    styleUrls: ['./company-report.component.css']
})
export class CompanyReportComponent implements OnInit {
    max: number;   // 表格行数
    page: number;   // 当前页数
    total: number;  // 总数

    companyReportList: any[];

    constructor(private _companyReportService: CompanyReportService,
                private _loadingService: TdLoadingService,
                private toastr: ToastsManager) {
        this.max = 10;
        this.page = 0;
        this.total = 0;
        this.companyReportList = [];
    }

    ngOnInit() {
        this.loadData()
    }

    /**
     * 加载表格数据
     * @param {number} offset
     */
    loadData(offset = 0) {
        this._loadingService.register()
        this._companyReportService.list().subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.companyReportList = res.resultList
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
}
