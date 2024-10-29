import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditanotificacion',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './creaeditanotificacion.component.html',
  styleUrl: './creaeditanotificacion.component.css'
})
export class CreaeditanotificacionComponent implements OnInit {
  form: FormGroup= new FormGroup({})
  notificacion: Notificacion= new Notificacion()
  id:number=0
  edicion:boolean=false

  constructor(
    private nS:NotificacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params) => {
      this.id = data['id']
      this.edicion = data['id']!=null
     this.init()
    })

    this.form=this.formBuilder.group({
      hcodigo:[''],
      hnotificacion:['', Validators.required]
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.notificacion.idNotificacion=this.form.value.hcodigo
      this.notificacion.detalle=this.form.value.hnotificacion
      this.nS.insert(this.notificacion).subscribe(d=>{
        this.nS.list().subscribe(d=>{
          this.nS.setlist(d)
        })
      })

    }
    this.router.navigate(['notificaciones'])
  }

  init(){
    if(this.edicion){
      this.nS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup ({
          hcodigo:new FormControl(data.idNotificacion),
          hnotificacion:new FormControl(data.detalle)
        })
      })
    }
  }

}
