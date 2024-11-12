import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { ParticipacionBanda } from '../../../models/ParticipacionBanda';
import { Banda } from '../../../models/Banda';
import { ParticipacionbandaService } from '../../../services/participacionbanda.service';
import { BandaService } from '../../../services/banda.service';

@Component({
  selector: 'app-creaeditaparticipacionbanda',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,],
  templateUrl: './creaeditaparticipacionbanda.component.html',
  styleUrl: './creaeditaparticipacionbanda.component.css'
})
export class CreaeditaparticipacionbandaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  part: ParticipacionBanda = new ParticipacionBanda();
  id: number = 0;
  edicion: boolean = false;

  listarol: { value: string; viewValue: string }[] = [
    { value: 'Cantante', viewValue: 'Cantante' },
    { value: 'Pianista', viewValue: 'Pianista' },
    { value: 'Guitarrista', viewValue: 'Guitarrista' },
    
  ];
  listaUsuarios: Usuario[] = [];
  listaBandas: Banda[] = [];

  constructor(
    private pS: ParticipacionbandaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private bS: BandaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      ucodigo: [''],
      ufechaIngreso: ['', Validators.required],
      ufechaSalida: ['', Validators.required],
      urol: ['', Validators.required],
      uusuario: ['', Validators.required],
      ubanda: ['', Validators.required],
    });
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    });
    this.bS.list().subscribe(data=>{
      this.listaBandas=data
    })

  }
   
  validarSoloLetras(control: AbstractControl): ValidationErrors | null {
    const soloLetras = /^[A-Za-z\s]+$/; // Expresión regular para letras y espacios
    return soloLetras.test(control.value) ? null : { soloLetras: true };
  }

  aceptar(): void {
    
    if (this.form.valid) {
      this.part.idUsuarioBanda = this.form.value.ucodigo;
      this.part.fechaIngreso = this.form.value.ufechaIngreso;
      this.part.fechaSalida = this.form.value.ufechaSalida;
      this.part.rol = this.form.value.urol;
      this.part.usuario.idUsuario = this.form.value.uusuario;
      this.part.banda.idBanda = this.form.value.ubanda;
      if (this.edicion) {
        this.pS.update(this.part).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setlist(data);
          });
        });
      } else {
        this.pS.insert(this.part).subscribe((d) => {
          this.pS.list().subscribe((d) => {
            this.pS.setlist(d);
          });
        });
      }
    }
    this.router.navigate(['participacionbandas']);
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          ucodigo: new FormControl(data.idUsuarioBanda),
          ufechaIngreso: new FormControl(data.fechaIngreso),
          ufechaSalida: new FormControl(data.fechaSalida),
          urol: new FormControl(data.rol),
          uusuario: new FormControl(data.usuario.nombres),
          ubanda: new FormControl(data.banda.nombre),
        });
      });
    }
  }

}
