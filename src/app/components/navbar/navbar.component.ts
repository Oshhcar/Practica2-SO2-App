import { Component, OnInit } from '@angular/core';
import {faBars, faUserCircle, faUser, faSignOutAlt, faAngleUp, faParagraph} from '@fortawesome/free-solid-svg-icons';
import { faAws } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  faBars = faBars;
  faUserCircle = faUserCircle;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faAngleUp = faAngleUp;
  faParagraph = faAws;
  toggled: boolean;
  user = {
    usuario:"Oscar Morales"
  }

  ngOnInit(): void {
  }

  onLogout(): void {
  }

  goPageTop(): void{
    window.scroll(0,0);
  }

  sidebarCollapse(): void{
    if(this.toggled){
      let element = document.getElementById('wrapper');
      let elementClase = element.className.replace(" toggled","");
      element.className = elementClase.toString();
      let clase = document.body.className.replace(" navbar2","");
      document.body.className = clase.toString();
      this.toggled = false;
    } else {
      let element = document.getElementById('wrapper');
      let elementClase = element.className.concat(" toggled");
      element.className = elementClase.toString();
      let clase = document.body.className.concat(" navbar2");
      document.body.className = clase.toString();
      this.toggled = true;
    }
  }
   
}
