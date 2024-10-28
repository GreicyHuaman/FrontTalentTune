import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Banda } from '../../../models/Banda';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BandaService } from '../../../services/banda.service';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditabanda',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, CommonModule],
  templateUrl: './creaeditabanda.component.html',
  styleUrl: './creaeditabanda.component.css'
})
export class CreaeditabandaComponent implements OnInit{
  form: FormGroup= new FormGroup({})
  banda: Banda= new Banda()
  id:number=0
  edicion:boolean=false

  constructor(
    private bS:BandaService,
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
      hbandas:['', Validators.required],
      hfecha:['', Validators.required]
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.banda.idBanda=this.form.value.hcodigo
      this.banda.nombre=this.form.value.hbandas
      this.banda.fechaCreacion= this.form.value.hfecha
      this.bS.insert(this.banda).subscribe(d=>{
        this.bS.list().subscribe(d=>{
          this.bS.setlist(d)
        })
      })

    }
    this.router.navigate(['bandas'])
  }

  init(){
    if(this.edicion){
      this.bS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup ({
          hcodigo:new FormControl(data.idBanda),
          hbandas:new FormControl(data.nombre),
          hfecha:new FormControl(data.fechaCreacion)
        })
      })
    }
  }

}
