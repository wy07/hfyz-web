import { TdDialogService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDialogService {

    constructor(private _dialogService: TdDialogService) {
    }

    openBasicConfirm(title, message, cancelBtn?, acceptBtn?) {
        return this._dialogService.openConfirm({
            message: message,
            title: title,
            cancelButton: cancelBtn ? cancelBtn : '取消',
            acceptButton: acceptBtn ? acceptBtn : '确认'
        }).afterClosed()
    }

};
