import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-creaeditarol',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditarol.component.html',
  styleUrl: './creaeditarol.component.css'
})
export class CreaeditarolComponent implements OnInit {
  form: FormGroup= new FormGroup({})
  rol: Rol= new Rol()
  id:number=0;
  edicion:boolean=false
  listarusuarios: Usuario[]=[]
  usuarios: Usuario[] = [];

  listaroles:{value:string, viewvalue:string}[]=[
    {value:'TALENTO', viewvalue:'TALENTO'},
    {value:'MANAGER', viewvalue:'MANAGER'},
    {value:'SEGUIDOR', viewvalue:'SEGUIDOR'}
  ]

  constructor(
    private rS:RolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.cargarUsuarios();

      this.init();

    


    this.form = this.formBuilder.group({
      hcodigo: [''],
      hrol: ['', Validators.required],

      husuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data)=>{
      this.listarusuarios = data;
    })

      husuario: ['', Validators.required]
    });
  }

  cargarUsuarios() {
    this.usuarioService.list().subscribe(
      (data) => (this.usuarios = data),
      (error) => console.error('Error al cargar usuarios:', error)
    );

    this.form=this.formBuilder.group({
      hcodigo:[''],
      htipoRol:['', Validators.required]
    })



  aceptar():void{
    if(this.form.valid){
      this.rol.idRol=this.form.value.hcodigo

      this.rol.tipoRol=this.form.value.hrol

      this.rol.usuario.idUsuario=this.form.value.husuario

      this.rol.usuarios=this.form.value.husuario


      this.rol.tipoRol=this.form.value.htipoRol

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
         hrol: data.tipoRol,

         husuario: data.usuario.idUsuario

         husuario: data.usuarios

        });
      });

  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup ({
          hcodigo:new FormControl(data.idRol),
          htipoRol:new FormControl(data.tipoRol)
        })
      })

    }
  }

}
