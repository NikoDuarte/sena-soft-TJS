import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ganadores',
  templateUrl: './ganadores.component.html',
  styleUrls: ['./ganadores.component.css']
})
export class GanadoresComponent implements OnInit {

  public code: string = ''
  public user: string = ''
  constructor(
    private api_service : ApiService,
    private activeRouter : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(
      ({user, code}) => {
        this.code = code
        this.user = user
      }
    )
  }

  finSala(){
    this.api_service.exitSala(this.code).subscribe(
      ({msg}: any) => {
        Swal.fire('Exito!', msg, 'success')
        this.router.navigateByUrl('/home')
      }
    )
  }

}
