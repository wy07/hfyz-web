import {InfoPublishService} from './info-publish.service';
import {Component, OnInit, Injector, Renderer} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {RegularService} from '../../common/shared/regular.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {RoleService} from '../../basic/role/role.service';
import {SelectItem} from 'primeng/primeng';
import {tokenReference} from '@angular/compiler';
import {UserService} from '../../basic/user/user.service';
import {DatePipe} from '@angular/common';
import {TdLoadingService} from "@covalent/core";
import {zh} from "../../common/shared/zh";

@Component({
    selector: 'info-publish',
    templateUrl: './info-publish.component.html',
    styleUrls: ['../../layout/layout.component.css'],
})
export class InfoPublishComponent implements OnInit {
    publishList: any[];
    userList: any[];
    selectedType = '政策法律法规';
    selectedStutas = '起草';
    infoStatus: SelectItem[];
    infoType: SelectItem[];
    type: number;
    displayDialog: boolean;
    user: any;
    userName: any;
    actionStr: string;

    infoaudit: any;
    title: any;
    textTitle: string;
    dateCreate: Date;
    dateBegin: Date;
    dateEnd: Date;

    congfig: any;
    max: number;
    total: number;
    currentPage: number;
    isAdd: boolean;
    currentUser: string;
    currentUserId: number;
    zh = zh;

    constructor(private _toastr: ToastsManager
        , private infoPublishService: InfoPublishService
        , private _regularService: RegularService
        , private datePipe: DatePipe
        , private _authService: AuthService
        , private _loadingService: TdLoadingService) {
        console.log('========InfoPublishComponent==========');
        this.displayDialog = false;

        this.congfig = {
            toolbar: [
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
                {
                    name: 'insert',
                    items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'
                        , 'Iframe']
                },
                {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']},
                {name: 'document', items: ['Source', 'NewPage', 'Preview']},
                '/',
                {name: 'styles', items: ['Styles', 'Format']},
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']},
                {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
                },
                {name: 'tools', items: ['Maximize', '-', 'About']},
                {name: 'colors', items: ['TextColor', 'BGColor']}
            ],
            filebrowserUploadUrl: '/filemanager/index.html'
        };


        this.infoType = [];

        this.infoType.push({label: '政策法律法规', value: '政策法律法规'});
        this.infoType.push({label: '行业标准', value: '行业标准'});
        this.infoType.push({label: '通报信息', value: '通报信息'});
        this.infoType.push({label: '通知信息', value: '通知信息'});
        this.infoType.push({label: '公告信息', value: '公告信息'});
        /* this.infoType.push({label: '政策法律法规', value: {id: 1, name: '政策法律法规', code: 'ZCFLFG'}});
         this.infoType.push({label: '行业标准', value: {id: 2, name: '行业标准', code: 'HYBZ'}});
         this.infoType.push({label: '通报信息', value: {id: 3, name: '通报信息', code: 'TBXX'}});
         this.infoType.push({label: '通知信息', value: {id: 4, name: '通知信息', code: 'TZXX'}});
         this.infoType.push({label: '公告信息', value: {id: 5,  name: '公告信息', code: 'GGXX'}});*/
        this.dateEnd = null;
        // const a = new Date().getTime() - ( 1000 * 3600 * 24);
        this.dateBegin = null;
        this.infoStatus = [];
        this.infoStatus.push({label: '起草', value: '起草'});
        /*this.infoStatus.push({label: '起草', value: {id: 1, name: '起草', code: 'QC'}});
         this.infoStatus.push({label: '待审核', value: {id: 2, name: '待审核', code: 'DSH'}});
         this.infoStatus.push({label: '已通过', value: {id: 3, name: '已通过', code: 'YTG'}});
         this.infoStatus.push({label: '已拒绝', value: {id: 4, name: '已拒绝', code: 'YJJ'}});*/
        // this.layoutComponent = this.inj.get(LayoutComponent);
        this.currentUser = this._authService.getCurrentUser('name')
        this.currentUserId = this._authService.getCurrentUser('id');
        this.user = {id: '', operator: this.currentUserId};
        this.infoaudit = {};
        this.actionStr = 'list';
        this.max = 10;
    }

    ngOnInit() {
        this.initData();
    }

    /*  initData() {
     this.infoPublishService.list(this.currentUserId).subscribe(
     res => {
     this.publishList = res.publishList;
     }
     );
     }*/

    initData(offset = 0) {
        this._loadingService.register();
        this.infoPublishService.list(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.publishList = res.publishList.publishList;
                this.total = res.publishList.total;
            }
        );
    }

    // 点击分页按钮
    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

    onCreate() {
        this.infoaudit = {};
        this.isAdd = true;
        this.actionStr = 'details';

    }

    onSearch(offset = 0) {
        const dateBegin = this.datePipe.transform(this.dateBegin, 'yyyy-MM-dd HH:mm');
        const dateEnd = this.datePipe.transform(this.dateEnd, 'yyyy-MM-dd HH:mm');
        console.log(dateBegin)
        this._loadingService.register();
        this.infoPublishService.search(this.textTitle, dateBegin ? dateBegin : '', dateEnd ? dateBegin : '', this.max, offset).subscribe(
            res => {
                // this.publishList = res.publishList;
                this._loadingService.resolve();
                this.publishList = res.publishList.publishList;
                this.total = res.publishList.total;
            }
        );
    }

    onReset() {
        this.textTitle = '';
        this.dateBegin = null;
        this.dateEnd = null;
    }

    onEdit(infoaudit) {
        this.infoPublishService.edit(infoaudit.id).subscribe(
            res => {
                if (res.result === 'success') {
                    this.infoaudit = res.infoaudit;
                    this.isAdd = false;
                    this.actionStr = 'details';
                } else {
                    this._toastr.error('获取数据失败');
                }
            }
        );
    }

    onSaveNew() {
        this.displayDialog = true;
    }

    onSure() {
        if (this.validate()) {
            this.infoaudit.status = 0;
            this.infoaudit.publisher = {id: this.currentUserId};
            this.infoPublishService.save(this.infoaudit).subscribe(
                res => {
                    this.actionStr = 'list';
                    this.displayDialog = false;
                    this._toastr.success('保存成功');
                    this.initData();
                }
            );
        }
    }

    update() {
        if (this.validate()) {
            this.infoPublishService.update(this.infoaudit.id, this.infoaudit).subscribe(
                res => {
                    this._toastr.success('修改成功');
                    this.initData();
                }
            );
            this.actionStr = 'list';
            this.displayDialog = false;
        }
    }

    onCancel() {
        this.displayDialog = false;
    }

    onQuit() {
        this.actionStr = 'list';
    }

    onDelete(infoaudit) {
        this.infoPublishService.delete(infoaudit.id).subscribe(
            res => {
                this.initData()
                this._toastr.info(`成功移除信息`);
            }
        );
    }

    validate() {
        let result = true
        if (this._regularService.isBlank(this.infoaudit.type)) {
            this._toastr.error('类型不能为空');
            result = false;
        }

        if (this._regularService.isBlank(this.infoaudit.title)) {
            this._toastr.error('标题不能为空');
            result = false;
        }
        if (this._regularService.isBlank(this.infoaudit.vimTime)) {
            this._toastr.error('起草时间不能为空');
            result = false;
        }
        return result;
    }

    validateDate() {
        let result = true
        if (this._regularService.isBlank(this.dateBegin)) {
            this._toastr.error('开始时间不能为空');
            result = false;
        }
        if (this._regularService.isBlank(this.dateEnd)) {
            this._toastr.error('结束时间不能为空');
            result = false;
        }
    }

}
