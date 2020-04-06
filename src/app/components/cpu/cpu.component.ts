import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Title } from '@angular/platform-browser';
import { RamInterface } from 'src/app/models/ram.interface';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { faChartArea, faChartPie } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {

  private intervalUpdate: any = null;
  private chart: any = null;
  public chartTime: any;


  constructor(private dataService: DataService,
    private titlteService: Title) {
    document.body.id = "page-top";
    document.body.className = "bg-light";
    }

  ngOnInit(): void {
    this.titlteService.setTitle("CPU - Monitor de Recursos");
    this.chartInit();

    this.intervalUpdate = setInterval(function () {
      this.getCPU();
    }.bind(this), 1000);
  }

  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }

  faChartArea = faChartArea;
  faChartPie = faChartPie;

  error = '';

  cpu: RamInterface = {
    total: 0,
    consumida: 0
  }

  dataPoints = [];
  cont = 0;

  chartInit(): void {
    this.chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Uso del CPU"
      },
      axisX: {
        title: "actualizada cada segundo"
      },
      axisY: {
        suffix: " %"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        fontSize: 22,
        fontColor: "dimGrey"
      },
      data: [{
        type: "spline",
        xValueType: "dateTime",
        yValueFormatString: "##",
        xValueFormatString: "hh:mm:ss TT",
        showInLegend: true,
        name: "usado",
        dataPoints: this.dataPoints,
      }]
    });
  }

  getCPU(): void {
    this.dataService.getCPU()
      .subscribe(
        (cpu: RamInterface) => {
          this.cpu = cpu;

          this.chartTime = new Date();
          /*
          this.chartTime = this.chartTime.getHours() + ':' + ((this.chartTime.getMinutes() < 10) ? '0' +
            this.chartTime.getMinutes() : this.chartTime.getMinutes()) + ':' + ((this.chartTime.getSeconds() < 10) ? '0' +
              this.chartTime.getSeconds() : this.chartTime.getSeconds());
              */

          if (this.dataPoints.length > 15) {
            this.dataPoints.shift();
          }

          this.cpu.porcentaje = parseFloat(((cpu.consumida/cpu.total)*100).toFixed(2));

          this.dataPoints.push({ x: (new Date).getTime() + 1000, y: this.cpu.porcentaje });
          this.chart.options.data[0].legendText = " Usado " + this.cpu.porcentaje + " %";
          this.chart.render();
        },
        (error) => {
          this.error = error;
          console.log(error);
          this.ngOnDestroy();
        }
      );
  }

}
