import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent implements OnInit {
  
  public players: any[] = []

  public code: string = String(localStorage.getItem('code-game'))

  constructor( private apiservice: ApiService ) { }


  ngOnInit(): void {
    this.loadPlayers()
    setInterval(()=>{
        this.loadPlayers()
    }, 20000)
  }

  loadPlayers(){
    this.apiservice.loadPlayersGame(this.code).subscribe(
      ({data}: any) => {
        this.players = data
        console.log(this.players);
        
      }
    )
  }

}
