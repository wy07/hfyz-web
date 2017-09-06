import {EventEmitter, Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class HiddenRectificationOrderService {
  change: EventEmitter<any>;

  constructor(public restangular: Restangular) {
      this.change = new EventEmitter();
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

  save(hiddenRectificationOrder) {
    return this.restangular.all('hidden-rectification-orders').customPOST(hiddenRectificationOrder, 'save');
  }

  update(id, hiddenRectificationOrder) {
    return this.restangular.one('hidden-rectification-orders', id).customPOST(hiddenRectificationOrder, 'update');
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
