import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public form_create_sala!: FormGroup

  constructor(
    private fb : FormBuilder,
    private api_sala : ApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.load_form_sala()
  }

  //* |-> Cargar informacion del formulario
  load_form_sala() {
    this.form_create_sala = this.fb.group({
      user_admin: ['', [Validators.required, Validators.minLength(1)]],
      name_sala: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  //* |-> Crear sala
  create_sala(){
    const body = this.form_create_sala.value 
    this.api_sala.createSala(body).subscribe(
      ({data, msg}: any) => {
        const {token, player_info} = data
        localStorage.setItem('gub-token', token)
        localStorage.setItem('code-game', data.code_sala)
        localStorage.setItem('cards-player', JSON.stringify(player_info.cards))
        localStorage.setItem('list-cards-player', JSON.stringify(player_info.list))
        this.router.navigateByUrl('/sala')
      }
    )
  }
}
