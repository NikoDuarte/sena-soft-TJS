import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unirse-sala',
  templateUrl: './unirse-sala.component.html',
  styleUrls: ['./unirse-sala.component.css']
})
export class UnirseSalaComponent implements OnInit {

  public form_join !: FormGroup

  constructor(
    private fb : FormBuilder,
    private api_service : ApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.load_form_join()
  }

  load_form_join(){
    this.form_join = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      name_player: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  join(){
    const body = this.form_join.value    
    this.api_service.joinSala(body).subscribe(
      ({data:{code_sala, token, player_info}, msg}: any) => {
        localStorage.setItem('gub-token', token)
        localStorage.setItem('code-game', code_sala)
        localStorage.setItem('cards-player', JSON.stringify(player_info.cards))
        localStorage.setItem('list-cards-player', JSON.stringify(player_info.list))
        this.router.navigateByUrl('/sala')
      }
    )
  }

}
