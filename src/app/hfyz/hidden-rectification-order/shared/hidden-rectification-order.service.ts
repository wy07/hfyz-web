import {EventEmitter, Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class HiddenRectificationOrderService {
  change: EventEmitter<any>;
  MAXFILESIZE: number;
  MINFILESIZE: number;
  constructor(public restangular: Restangular) {
      this.change = new EventEmitter();
      this.MAXFILESIZE = 5242880;
      this.MINFILESIZE = 0;
  }

  list(max, offset, company, sd, ed, status, listStatus) {
    return this.restangular.all('hidden-rectification-orders').customGET('list',
      {max: max, offset: offset, company: company, startDate: sd, endDate: ed, status: status, listStatus: listStatus });
  }

  delete(id) {
    return this.restangular.one('hidden-rectification-orders', id).customDELETE('delete', {});
  }

  edit(id, action = '') {
    return this.restangular.one('hidden-rectification-orders', id).customGET('edit', {action: action});
  }

  save(formData) {
    return this.restangular.all('hidden-rectification-orders').customPOST(formData, 'save', {}, { 'Content-Type': undefined });
  }

  update(id, formData) {
    return this.restangular.one('hidden-rectification-orders', id).customPOST(formData, 'update', {}, { 'Content-Type': undefined });
  }

  companyList(enterpirse) {
    return this.restangular.all('hidden-rectification-orders').customGET('company-list', {enterpirse: enterpirse});
  }

  commit(id) {
    return this.restangular.one('hidden-rectification-orders', id).customGET('submit-order');
  }

  saveApproval(billId, time, approveDesc, tempStatus) {
    return this.restangular.all('review-and-approvals').customPOST(
      {billId: billId , time: time , approveDesc: approveDesc, tempStatus: tempStatus}
       , 'save');
  }

  feedback(id, reply, replyDesc) {
    return this.restangular.one('hidden-rectification-orders', id).customPOST(
      {reply: reply , replyDesc: replyDesc}
      , 'enterprise-feedback');
  }

  onSure(id, tempStatus) {
    return this.restangular.one('review-and-approvals', id).customPOST({tempStatus: tempStatus}
      , 'give-result');
  }

  reviewAndApprovalList(id) {
    return this.restangular.one('hidden-rectification-orders', id).customGET('review-approval-list');
  }
}
