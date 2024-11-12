import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Contrato } from '../../../models/Contrato';
import { ContratoService } from '../../../services/contrato.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditacontrato',
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
  templateUrl: './creaeditacontrato.component.html',
  styleUrl: './creaeditacontrato.component.css'
})
export class CreaeditacontratoComponent implements OnInit{
  form: FormGroup= new FormGroup({})
  contrato: Contrato= new Contrato()
  id:number=0
  edicion:boolean=false

  listaroles:{value:string, viewvalue:string}[]=[
    {value:'Activo', viewvalue:'Activo'},
    {value:'Terminado', viewvalue:'Terminado'},
    {value:'Cancelado', viewvalue:'Cancelado'}
  ]

  listarenovacion:{value:string, viewvalue:string}[]=[
    {value:'Renovable', viewvalue:'Renovable'},
    {value:'No Renovable', viewvalue:'No Renovable'}
  ]

  constructor(
    private conS:ContratoService,
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
      hfechaInicio:['', Validators.required],
      hfechaFin:['', Validators.required],
      hduracion:['', Validators.required],
      hsalario:['', Validators.required],
      hestado:['', Validators.required],
      hcondiciones:['', Validators.required],
      hrenovable:['', Validators.required]
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.contrato.idContrato=this.form.value.hcodigo
      this.contrato.fechaInicio=this.form.value.hfechaInicio
      this.contrato.fechaFin=this.form.value.hfechaFin
      this.contrato.duracion=this.form.value.hduracion
      this.contrato.salario=this.form.value.hsalario
      this.contrato.estado=this.form.value.hestado
      this.contrato.condiciones=this.form.value.hcondiciones
      this.contrato.renovable=this.form.value.hrenovable
      this.conS.insert(this.contrato).subscribe(d=>{
        this.conS.list().subscribe(d=>{
          this.conS.setlist(d)
        })
      })

    }
    this.router.navigate(['contratos'])
  }

  init(){
    if(this.edicion){
      this.conS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup ({
          hcodigo:new FormControl(data.idContrato),
          hfechaInicio:new FormControl(data.fechaInicio),
          hfechaFin:new FormControl(data.fechaFin),
          hduracion:new FormControl(data.duracion),
          hsalario:new FormControl(data.salario),
          hestado:new FormControl(data.estado),
          hcondiciones:new FormControl(data.condiciones),
          hrenovable:new FormControl(data.renovable)
        })
      })
    }
  }

}
