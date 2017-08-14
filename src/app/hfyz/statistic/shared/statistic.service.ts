import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class StatisticService {
    constructor(public restangular: Restangular) {
    }

    checkList(max, offset, company, startDate, endDate) {
        return this.restangular.all('check-statistics').customGET('list',
            { max: max, offset: offset, company: company, startDate: startDate, endDate: endDate });
    }

    carNumStatistic() {
        return this.restangular.all('cars').customGET('car-num-statistic');
    }

    carHistoryStatistic(year) {
        return this.restangular.all('cars').customGET('history-statistic', {year: year});
    }

    alarmInfoStatistic(params) {
        return this.restangular.all('alarm-info-statistics').customGET('list', params);
    }

    // /owner-identitys/appraise-statistic
    getAppraiseStatistic(ownerName) {
        return this.restangular.all('owner-identitys').customGET('appraise-statistic', {ownerName: ownerName});
    }

    getPlatformStatistic(){
        return this.restangular.all('platform-statistics').customGET('list');
    }
}
