import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title) {
    document.body.id ="page-top";
    document.body.className ="bg-light";
   }

  ngOnInit(): void {
    this.titleService.setTitle( "Home - Monitor de Recursos" );
  }

  faAws = faAws;
  faAngleRight = faAngleRight;
}
