import { ViewChild, Component,  OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('cvsCircularProgressbar', {read: ElementRef}) cvsCircularProgressbar: ElementRef;

  chart = [];

  constructor() { }

  ngOnInit() {
    this.showCircularProgressBar();

    this.chart = new Chart('cvs-earning', {
      type: 'line',
      data: {
        labels: ['11/12', '12/12', '13/12', '14/12', '15/12', '16/12'],
        datasets: [
          {
            label: 'Transaksi sukses',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          },
          {
            label: 'Transaksi pending',
            data: [7, 11, 5, 8, 3, 7],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              reverse: false
            }
          }]
        }
      }
    });
  }

  showCircularProgressBar() {
    const
        cvsWidth = this.cvsCircularProgressbar.nativeElement.width,
        cvsHeigh = this.cvsCircularProgressbar.nativeElement.height,
        spanProcent = document.getElementById('procent'),
        ctx = this.cvsCircularProgressbar.nativeElement.getContext('2d'),
        posX = cvsWidth / 2,
        posY = cvsHeigh / 2,
        fps = 1000 / 200,
        oneProcent = 360 / 100,
        result = oneProcent * 70;

    let procent = 0;

    ctx.lineCap = 'round';
    arcMove();

    function arcMove() {
      let deegres = 0;
      const acrInterval = setInterval (function() {
        deegres += 1;
        ctx.clearRect( 0, 0, cvsHeigh, cvsHeigh );
        procent = deegres / oneProcent;

        spanProcent.innerHTML = procent.toFixed();

        ctx.beginPath();
        ctx.arc( posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360) );
        ctx.strokeStyle = '#b1b1b1';
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#3949AB';
        ctx.lineWidth = 10;
        ctx.arc( posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres) );
        ctx.stroke();
        if ( deegres >= result ) { clearInterval(acrInterval); }
      }, fps);
    }
  }
}
