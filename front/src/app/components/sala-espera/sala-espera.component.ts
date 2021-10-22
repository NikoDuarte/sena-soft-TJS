import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent implements OnInit {

  constructor( private apiservice: ApiService ) { }

  private jugadores = [];

  ngOnInit(): void {
    // this.apiservice.getData().subscribe( ({data}: any) => {
    //   console.log(data);
      
    // } )
  }

}
