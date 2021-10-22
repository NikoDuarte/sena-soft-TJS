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
      user_admin: ['', [Validators.required, Validators.minLength(4)]],
      name_sala: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  //* |-> Crear sala
  create_sala(){
    const body = this.form_create_sala.value 
    this.api_sala.createSala(body).subscribe(
      ({data, msg}: any) => {
        const {token} = data
        localStorage.setItem('gub-token', token)
        this.router.navigateByUrl('/sala')
      }
    )
  }
}
