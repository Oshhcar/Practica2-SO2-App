import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTachometerAlt, faTasks, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setActive();
  }

  faTachometerAlt = faTachometerAlt;
  faTasks = faTasks;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;

  home: boolean;
  ram: boolean;
  cpu: boolean;
  procesos: boolean;
  toggled2: boolean;

  setActive(): void {
    if(this.router.url.toString() == '/home'){
      this.home = true;
      //this.calendario = false;
    } else if(this.router.url.toString() == '/ram'){
      //this.inicio = false;
      this.ram = true;
    } else if(this.router.url.toString() == '/cpu'){
      this.cpu = true;
    }else {
      this.procesos = true;
    }
  }

  sidebarCollapse2(): void{
    if(this.toggled2){
      let element = document.getElementById('wrapper');
      element.className = '';
      let clase = document.body.className.replace(" sidebar2","");
      document.body.className = clase.toString();
      this.toggled2 = false;
    } else {
      let element = document.getElementById('wrapper');
      element.className = 'toggled2';
      let clase = document.body.className.concat(" sidebar2");
      document.body.className = clase.toString();
      this.toggled2 = true;
    }
    
  }
}
