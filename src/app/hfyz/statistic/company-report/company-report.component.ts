import { Component, OnInit } from '@angular/core';
import { CompanyReportService } from './company-report.service';
import { TdLoadingService } from '@covalent/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-company-report',
    templateUrl: './company-report.component.html',
    styleUrls: ['./company-report.component.css']
})
export class CompanyReportComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    companyReportList: any[];

    constructor(private _companyReportService: CompanyReportService,
        private _loadingService: TdLoadingService,
        private toastr: ToastsManager) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.companyReportList = [];
    }

    ngOnInit() {
        this.loadData()
    }

    /**
     * 加载表格数据
     */
    loadData() {
        this._loadingService.register()
        this._companyReportService.list().subscribe(
            res => {
                this._loadingService.resolve()
                if (res.result === 'success') {
                    this.companyReportList = res.resultList;
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
}
