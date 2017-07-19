import { Component, OnInit } from '@angular/core';
import { ChartModule, PanelModule } from 'primeng/primeng';
import * as EventBus from 'vertx3-eventbus-client';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    data: any;
    datapie: any;

  constructor() {
    // eb.send('queue', 'hello vert1x', (res) => console.log('res: ' + res));
  }

    ngOnInit() {
      let eb = new EventBus('http://www.shifudao.com:3180/eventbus',{});
      eb.onopen=function(){
        eb.registerHandler("out.realtime.data.00005001.00005001.address", function(err, res) {
          console.log("registerHandler====callback")
          console.log(JSON.stringify(res))
        })
      }

      this.data = {
            labels: ['一月', '二月', '三月', '四月', '五月', '6月', '7月'],
            datasets: [
                {
                    label: '投诉案件',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#FF6384'
                },
                {
                    label: '执法案件',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#36A2EB'
                }
            ]
        }
        this.datapie = {
            labels: ['出租车', '旅游车', '公交车'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
        };

      // eb.registerHandler('out.realtime.data.00005001.00005001.address',{},function (err, res) {
      //   console.log("registerHandler====callback")
      // })

    }
};
