import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Title } from '@angular/platform-browser';
import { faTable, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ProcInterface } from 'src/app/models/proc.interface';
import { DataInterface } from 'src/app/models/data.interface';
@Component({
  selector: 'app-proc',
  templateUrl: './proc.component.html',
  styleUrls: ['./proc.component.css']
})
export class ProcComponent implements OnInit {

  private intervalUpdate: any = null;

  constructor(private dataService: DataService,
    private titlteService: Title) { 
      document.body.id = "page-top";
      document.body.className = "bg-light";
    }

  ngOnInit(): void {
    this.titlteService.setTitle("Procesos - Monitor de Recursos");
    
    this.intervalUpdate = setInterval(function () {
      this.getProcesos()
    }.bind(this), 3000);
  }

  faTable = faTable;
  
  public chartTime: any;
  error = '';
  success = '';
  datos: DataInterface ={};
  padre: ProcInterface = {};

  getProcesos(): void {
    this.error = '';
    this.success = '';
    this.dataService.getProcesos()
      .subscribe(
        (data: DataInterface) => {
          this.datos = data;
          this.chartTime = new Date();
          /*
          this.chartTime = this.chartTime.getHours() + ':' + ((this.chartTime.getMinutes() < 10) ? '0' +
            this.chartTime.getMinutes() : this.chartTime.getMinutes()) + ':' + ((this.chartTime.getSeconds() < 10) ? '0' +
              this.chartTime.getSeconds() : this.chartTime.getSeconds());
              */

        },
        (error) => {
          this.error = error;
          console.log(error);
          this.ngOnDestroy();
        }
      );
  }

  onDelete(pid: number){
    this.error = '';
    this.success = '';
    console.log("se eliminara " + pid);
    if (this.dataService.deleteProceso(pid))
      this.success = 'Process killed.';
    else 
      this.error = 'Error realizando la operación, inténtelo de nuevo.';

  }

  onCargarHijos(pid: number){
    let indice = this.datos.data.findIndex(proc => proc.pid == pid);
    if(indice >= 0){
      this.padre = this.datos.data[indice];
    }
  }

  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }
}
