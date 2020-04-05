import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Title } from '@angular/platform-browser';
import { RamInterface } from 'src/app/models/ram.interface';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { faChartArea, faChartPie } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit {

  private intervalUpdate: any = null;
  private chart: any = null;
  private chart2: any = null;
  public chartTime: any;

  constructor(private dataService: DataService,
    private titlteService: Title) {
    document.body.id = "page-top";
    document.body.className = "bg-light";
  }

  ngOnInit(): void {
    this.titlteService.setTitle("Ram - Monitor de Recursos");
    //this.getRam();
    this.chartInit();

    this.intervalUpdate = setInterval(function () {
      this.getRam();
    }.bind(this), 1000);

  }

  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }

  faChartArea = faChartArea;
  faChartPie = faChartPie;

  error = '';

  ram: RamInterface = {
    total: 0,
    consumida: 0
  }

  dataPoints = [];
  cont = 0;
  dataPoints2 = [];

  chartInit(): void {
    this.chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Consumo de memoria"
      },
      axisX: {
        title: "actualizada cada segundo"
      },
      axisY: {
        suffix: " Mb"
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
        yValueFormatString: "#####",
        xValueFormatString: "hh:mm:ss TT",
        showInLegend: true,
        name: "usado",
        dataPoints: this.dataPoints,
      }]
    });

    this.chart2 = new CanvasJS.Chart("chartContainer2", {
      theme: "light",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Porcenaje de uso"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: this.dataPoints2
      }]
    });
  }

  getRam(): void {
    this.dataService.getRam()
      .subscribe(
        (ram: RamInterface) => {
          this.ram = ram;

          this.chartTime = new Date();
          /*
          this.chartTime = this.chartTime.getHours() + ':' + ((this.chartTime.getMinutes() < 10) ? '0' +
            this.chartTime.getMinutes() : this.chartTime.getMinutes()) + ':' + ((this.chartTime.getSeconds() < 10) ? '0' +
              this.chartTime.getSeconds() : this.chartTime.getSeconds());
              */

          if (this.dataPoints.length > 15) {
            this.dataPoints.shift();
          }

          this.dataPoints.push({ x: (new Date).getTime() + 1000, y: ram.consumida });
          this.chart.options.data[0].legendText = " Usado " + ram.consumida + " Mb";
          this.chart.render();

          this.dataPoints2[0] = { y: ram.total, name: "total" };
          this.dataPoints2[1] = { y: ram.consumida, name: "usada" };

          this.chart2.render();
        },
        (error) => {
          this.error = error;
          console.log(error);
        }
      );
  }
}
