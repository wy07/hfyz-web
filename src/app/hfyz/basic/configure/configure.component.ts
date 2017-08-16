import {Component, OnInit} from '@angular/core';
import {RegularService} from '../../common/shared/regular.service';
import {ToastsManager} from 'ng2-toastr';
import {ConfigureService} from './shared/configure.service';
import {TdLoadingService} from "@covalent/core";

@Component({
    selector: 'configure',
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {
    configureList: any[];
    configure: any;
    displayDialog: boolean;
    configureTitle: string;
    max: number;
    total: number;
    currentPage: number;

    constructor(private _toastr: ToastsManager
        , private _configureService: ConfigureService
        , private _regularService: RegularService
        , private _loadingService: TdLoadingService) {
        this.displayDialog = false;
        this.clearConfigure();
        this.max = 10;
    }

    ngOnInit() {
        this.initData();
    }

    initData(offset = 0) {
        this._loadingService.register();
        this._configureService.list(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.configureList = res.configureList;
                this.total = res.total;
            }
        );
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

    onEdit(id) {
        this.clearConfigure();
        this.configureTitle = `编辑`;
        this.displayDialog = true;
        this.preEdit(id);
    }

    preEdit(id) {
        this._configureService.edit(id).subscribe(
            res => {
                if (res.result === 'success') {
                    this.configure = res.configure;
                } else {
                    this._toastr.error('获取数据失败');
                }
            }
        );
    }

    update() {
        if (!this.validate()) {
            return;
        }
        this._configureService.update(this.configure.id, this.configure).subscribe(
            res => {
                this._toastr.success('保存成功');
                this.initData();
                this.displayDialog = false;
            }
        );
    }

    cancle() {
        this.displayDialog = false;
    }

    validate() {
        if (this._regularService.isBlank(this.configure.name)) {
            this._toastr.error('名称不能为空');
            return false;
        }
        if (this._regularService.isBlank(this.configure.configValue)) {
            this._toastr.error('值不能为空');
            return false;
        }
        return true;
    }

    clearConfigure() {
        this.configure = {};
    }

}
