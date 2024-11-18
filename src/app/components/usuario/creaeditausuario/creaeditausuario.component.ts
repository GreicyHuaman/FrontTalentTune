import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RolService } from '../../../services/rol.service';
import { CreaeditarolComponent } from '../../rol/creaeditarol/creaeditarol.component';
import { Rol } from '../../../models/Rol';

@Component({
  selector: 'app-creaeditausuario',
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
  templateUrl: './creaeditausuario.component.html',
  styleUrl: './creaeditausuario.component.css',
})
export class CreaeditausuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;

  listaGeneros: { value: string; viewValue: string }[] = [
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'Masculino', viewValue: 'Masculino' },
  ];

  listaPaises: { value: string; viewValue: string }[] = [
    { value: 'Perú', viewValue: 'Perú' },
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Bolivia', viewValue: 'Bolivia' },
    { value: 'Brasil', viewValue: 'Brasil' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'Colombia', viewValue: 'Colombia' },
    { value: 'Ecuador', viewValue: 'Ecuador' },
    { value: 'Guyana', viewValue: 'Guyana' },
    { value: 'Paraguay', viewValue: 'Paraguay' },
    { value: 'Surinam', viewValue: 'Surinam' },
    { value: 'Uruguay', viewValue: 'Uruguay' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
  ];
  listaRoles: { }[] =[] 

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rS: RolService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      ucodigo: [''],
      uusername: ['', Validators.required],
      ucontraseña: ['', Validators.required],
      uenable: [true],
      unombres: ['', [Validators.required, this.validarSoloLetras]],
      uapellidos: ['', [Validators.required, this.validarSoloLetras]],
      ufechaNacimiento: ['', [Validators.required, this.validarMayorDeEdad]],
      udescripcion: [''],
      upais: ['', [Validators.required, this.validarSoloLetras]],
      uagencia: [''],
      usexo: ['', Validators.required],
      uestudios: ['', [Validators.required, this.validarSoloLetras]],
      urol: ['', Validators.required],
    });
    this.rS.list().subscribe((data) => {
      this.listaRoles  = data;
    });
  }

  validarMayorDeEdad(control: FormControl) {
    const fechaNacimiento = new Date(control.value);
    const fechaLimite = new Date('2007-01-01');

    return fechaNacimiento <= fechaLimite ? null : { menorDeEdad: true };
  }
  validarSoloLetras(control: AbstractControl): ValidationErrors | null {
    const soloLetras = /^[A-Za-z\s]+$/; // Expresión regular para letras y espacios
    return soloLetras.test(control.value) ? null : { soloLetras: true };
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Muestra todos los errores
      return; // Detiene la ejecución si el formulario es inválido
    }
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.ucodigo;
      this.usuario.nombres = this.form.value.unombres;
      this.usuario.username = this.form.value.uusername;
      this.usuario.password = this.form.value.ucontraseña;
      this.usuario.enabled = this.form.value.uenable;
      this.usuario.apellidos = this.form.value.uapellidos;
      this.usuario.sexo = this.form.value.usexo;
      this.usuario.descripcion = this.form.value.udescripcion;
      this.usuario.fechaNacimiento = this.form.value.ufechaNacimiento;
      this.usuario.pais = this.form.value.upais;
      this.usuario.estudios = this.form.value.uestudios;
      this.usuario.agencia = this.form.value.uagencia;

      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setlist(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((d) => {
            this.uS.setlist(d);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          ucodigo: new FormControl(data.idUsuario),
          unombres: new FormControl(data.nombres),
          uapellidos: new FormControl(data.apellidos),
          uusername: new FormControl(data.username),
          ucontraseña: new FormControl(data.password),
          uenabled: new FormControl(data.enabled),
          usexo: new FormControl(data.sexo),
          udescripcion: new FormControl(data.descripcion),
          ufechaNacimiento: new FormControl(data.fechaNacimiento),
          upais: new FormControl(data.pais),
          uestudios: new FormControl(data.estudios),
          uagencia: new FormControl(data.agencia),
          
        });
      });
    }
  }
}
