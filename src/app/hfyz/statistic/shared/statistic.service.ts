import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class StatisticService {
    constructor(public restangular: Restangular) {
    }

    checkList(max, offset, company, startDate, endDate) {
        return this.restangular.all('check-statistics').customGET('list',
            {max: max, offset: offset, company: company, startDate: startDate, endDate: endDate});
    }

    carNumStatistic() {
        return this.restangular.all('cars').customGET('car-num-statistic');
    }

    carHistoryStatistic(year) {
        return this.restangular.all('cars').customGET('history-statistic', {year: year});
    }
    passengerList(max, offset, company) {
        return this.restangular.all('car-statistics').customGET('passenger-list',
            {max: max, offset: offset, company: company});
    }
    travelList(max, offset, company) {
        return this.restangular.all('car-statistics').customGET('travel-list',
            {max: max, offset: offset, company: company});
    }
    dangerousList(max, offset, company) {
        return this.restangular.all('car-statistics').customGET('dangerous-list',
            {max: max, offset: offset, company: company});
    }
}
