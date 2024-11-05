import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Comentario } from '../../../models/Comentario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComentarioService } from '../../../services/comentario.service';

@Component({
  selector: 'app-creaeditacomentario',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditacomentario.component.html',
  styleUrl: './creaeditacomentario.component.css'
})
export class CreaeditacomentarioComponent {
  form: FormGroup= new FormGroup({})
  comentario: Comentario= new Comentario()
  id:number=0
  edicion:boolean=false

  constructor(
    private coS:ComentarioService,
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
      hcomentario:['', Validators.required]
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.comentario.idComentario=this.form.value.hcodigo
      this.comentario.detalle=this.form.value.hcomentario
      this.coS.insert(this.comentario).subscribe(d=>{
        this.coS.list().subscribe(d=>{
          this.coS.setlist(d)
        })
      })

    }
    this.router.navigate(['comentarios'])
  }

  init(){
    if(this.edicion){
      this.coS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup ({
          hcodigo:new FormControl(data.idComentario),
          hcomentario:new FormControl(data.detalle)
        })
      })
    }
  }

}
