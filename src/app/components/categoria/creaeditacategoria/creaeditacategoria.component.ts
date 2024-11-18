import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../../models/Categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditacategoria',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditacategoria.component.html',
  styleUrl: './creaeditacategoria.component.css'
})
export class CreaeditacategoriaComponent {
  form: FormGroup= new FormGroup({})
  cat: Categoria= new Categoria()
  id:number=0
  edicion:boolean=false

  listacategorias:{value:string, viewvalue:string}[]=[
    {value:'Rock', viewvalue:'Rock'},
    {value:'Salsa', viewvalue:'Salsa'},
    {value:'Cumbia', viewvalue:'Cumbia'},
    {value:'Balada', viewvalue:'Balada'},
    {value:'Clásica', viewvalue:'Clásica'},
    {value:'Jazz', viewvalue:'Jazz'},
    {value:'Blues', viewvalue:'Blues'},
    {value:'Disco', viewvalue:'Disco'},
    {value:'Pop', viewvalue:'Pop'},
    {value:'Electrónica', viewvalue:'Electrónica'},
    {value:'Country', viewvalue:'Country'},
    {value:'Hip Hop', viewvalue:'Hip Hop'},
    {value:'Reggaeton', viewvalue:'Reggaeton'}
  ]

  constructor(
    private cS:CategoriaService,
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
      hcategoria: ['', Validators.required]
    });
  }

  aceptar():void{
    if(this.form.valid){
      this.cat.idCategoria=this.form.value.hcodigo
      this.cat.tipoCategoria=this.form.value.hcategoria
      if (this.edicion) {
        this.cS.update(this.cat).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setlist(data);
          });
        });
      } else {
        this.cS.insert(this.cat).subscribe((d) => {
          this.cS.list().subscribe((d) => {
            this.cS.setlist(d);
          });
        });
      }

    }
    this.router.navigate(['categorias'])
  }

  init() {
   if (this.edicion) {
     this.cS.listId(this.id).subscribe((data) => {
        this.form=new FormGroup({
         hcodigo: new FormControl(data.idCategoria),
         hcategoria: new FormControl(data.tipoCategoria)
        });
      });
    }
  }

}
