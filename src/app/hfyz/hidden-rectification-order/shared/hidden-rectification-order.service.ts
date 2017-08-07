import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class HiddenRectificationOrderService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset, company, sd, ed, status, listStatus) {
    return this.restangular.all('hidden-rectification-orders').customGET('list',
      {max: max, offset: offset, company: company, startDate: sd, endDate: ed, status: status, listStatus: listStatus });
  }

  delete(id) {
    return this.restangular.one('hidden-rectification-orders', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('hidden-rectification-orders', id).customGET('edit');
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

  setStatus(id, statusId) {
    return this.restangular.one('hidden-rectification-orders', id).customPOST({statusId: statusId}, 'set-condition');
  }

  saveApproval(billId, time, approveDesc, statusId) {
    return this.restangular.all('review-and-approvals').customPOST(
      {billId: billId , time: time , approveDesc: approveDesc, statusId: statusId}
       , 'save');
  }

  feedback(id, reply, replyDesc, statusId) {
    return this.restangular.one('hidden-rectification-orders', id).customPOST(
      {reply: reply , replyDesc: replyDesc, statusId: statusId}
      , 'enterprise-feedback');
  }

  onSure(id, statusId) {
    return this.restangular.one('review-and-approvals', id).customPOST({statusId: statusId}
      , 'give-result');
  }

  reviewAndApprovalList(id) {
    return this.restangular.one('hidden-rectification-orders', id).customGET('review-approval-list');
  }
}
