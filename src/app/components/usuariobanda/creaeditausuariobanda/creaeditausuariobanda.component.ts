import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioBanda } from '../../../models/UsuarioBanda';
import { Banda } from '../../../models/Banda';
import { Usuario } from '../../../models/Usuario';
import { UsuariobandaService } from '../../../services/usuariobanda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { BandaService } from '../../../services/banda.service';

@Component({
  selector: 'app-creaeditausuariobanda',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './creaeditausuariobanda.component.html',
  styleUrl: './creaeditausuariobanda.component.css',
})
export class CreaeditausuariobandaComponent {
  form: FormGroup = new FormGroup({});
  ub: UsuarioBanda = new UsuarioBanda();
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
    private ubS: UsuariobandaService,
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
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.bS.list().subscribe((data) => {
      this.listaBandas = data;
    });
  }

  validarSoloLetras(control: AbstractControl): ValidationErrors | null {
    const soloLetras = /^[A-Za-z\s]+$/; // Expresión regular para letras y espacios
    return soloLetras.test(control.value) ? null : { soloLetras: true };
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ub.idUsuarioBanda = this.form.value.ucodigo;
      this.ub.fechaIngreso = this.form.value.ufechaIngreso;
      this.ub.fechaSalida = this.form.value.ufechaSalida;
      this.ub.rol = this.form.value.urol;
      this.ub.usuario.idUsuario = this.form.value.uusuario;
      this.ub.banda.idBanda = this.form.value.ubanda;
      if (this.edicion) {
        this.ubS.update(this.ub).subscribe((data) => {
          this.ubS.list().subscribe((data) => {
            this.ubS.setlist(data);
          });
        });
      } else {
        this.ubS.insert(this.ub).subscribe((d) => {
          this.ubS.list().subscribe((d) => {
            this.ubS.setlist(d);
          });
        });
      }
    }
    this.router.navigate(['usuariobanda']);
  }

  init() {
    if (this.edicion) {
      this.ubS.listId(this.id).subscribe((data) => {
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
