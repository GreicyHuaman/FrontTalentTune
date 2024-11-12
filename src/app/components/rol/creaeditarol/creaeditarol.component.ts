import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditarol',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditarol.component.html',
  styleUrl: './creaeditarol.component.css'
})
export class CreaeditarolComponent implements OnInit {
  form: FormGroup= new FormGroup({})
  rol: Rol= new Rol()
  id:number=0
  edicion:boolean=false

  listaroles:{value:string, viewvalue:string}[]=[
    {value:'Artista', viewvalue:'Artista'},
    {value:'Manager', viewvalue:'Manager'},
    {value:'Seguidor', viewvalue:'Seguidor'}
  ]

  constructor(
    private rS:RolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hrol: ['', Validators.required]
    });
  }

  aceptar():void{
    if(this.form.valid){
      this.rol.idRol=this.form.value.hcodigo
      this.rol.tipoRol=this.form.value.hrol
      this.rS.insert(this.rol).subscribe(d=>{
        this.rS.list().subscribe(d=>{
          this.rS.setlist(d)
        })
      })

    }
    this.router.navigate(['roles'])
  }

  init() {
   if (this.edicion) {
     this.rS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
         hcodigo: data.idRol,
         hrol: data.tipoRol
        });
      });
    }
  }


}
