import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Mensaje } from '../../../models/Mensaje';
import { MensajeService } from '../../../services/mensaje.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditamensaje',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  templateUrl: './creaeditamensaje.component.html',
  styleUrl: './creaeditamensaje.component.css'
})
export class CreaeditamensajeComponent {
  form: FormGroup= new FormGroup({})
  mensaje: Mensaje= new Mensaje()
  id:number=0
  edicion:boolean=false

  constructor(
    private mS:MensajeService,
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
      hcontenido:['', Validators.required],
      hfecha:['', Validators.required]
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.mensaje.idMensaje=this.form.value.hcodigo
      this.mensaje.contenido=this.form.value.hcontenido
      this.mensaje.fechaEnvio=this.form.value.hfecha
      this.mS.insert(this.mensaje).subscribe(d=>{
        this.mS.list().subscribe(d=>{
          this.mS.setlist(d)
        })
      })

    }
    this.router.navigate(['mensajes'])
  }

  init(){
    if(this.edicion){
      this.mS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup ({
          hcodigo:new FormControl(data.idMensaje),
          hcontenido:new FormControl(data.contenido),
          hfecha:new FormControl(data.fechaEnvio)
        })
      })
    }
  }

}
