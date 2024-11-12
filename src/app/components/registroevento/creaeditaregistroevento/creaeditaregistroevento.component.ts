import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RegistroEvento } from '../../../models/RegistroEvento';
import { RegistroeventoService } from '../../../services/registroevento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../models/Evento';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaregistroevento',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,],
  templateUrl: './creaeditaregistroevento.component.html',
  styleUrl: './creaeditaregistroevento.component.css'
})
export class CreaeditaregistroeventoComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  rgev: RegistroEvento = new RegistroEvento();
  id: number = 0;
  edicion: boolean = false;

  listacalificacion: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '5', viewValue: '5' },
  ];
  listaUsuarios: Usuario[] = [];
  listaEventos: Evento[] = [];

  constructor(
    private reS: RegistroeventoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private eS: EventoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      ucodigo: [''],
      uinteresado: ['', Validators.required],
      uasistio: ['', Validators.required],
      ucalificacion: ['', Validators.required],
      uusuario: ['', Validators.required],
      uevento: ['', Validators.required],
    });
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    });
    this.eS.list().subscribe(data=>{
      this.listaEventos=data
    })

  }
   
  validarSoloLetras(control: AbstractControl): ValidationErrors | null {
    const soloLetras = /^[A-Za-z\s]+$/; // Expresión regular para letras y espacios
    return soloLetras.test(control.value) ? null : { soloLetras: true };
  }

  aceptar(): void {
    
    if (this.form.valid) {
      this.rgev.idUsuarioEvento = this.form.value.ucodigo;
      this.rgev.interesado = this.form.value.uinteresado;
      this.rgev.asistio = this.form.value.uasistio;
      this.rgev.calificacion = this.form.value.ucalificacion;
      this.rgev.usuario.idUsuario = this.form.value.uusuario;
      this.rgev.evento.idEvento = this.form.value.uevento;
      if (this.edicion) {
        this.reS.update(this.rgev).subscribe((data) => {
          this.reS.list().subscribe((data) => {
            this.reS.setlist(data);
          });
        });
      } else {
        this.reS.insert(this.rgev).subscribe((d) => {
          this.reS.list().subscribe((d) => {
            this.reS.setlist(d);
          });
        });
      }
    }
    this.router.navigate(['registroeventos']);
  }

  init() {
    if (this.edicion) {
      this.reS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          ucodigo: new FormControl(data.idUsuarioEvento),
          uinteresado: new FormControl(data.interesado),
          uasistio: new FormControl(data.asistio),
          ucalificacion: new FormControl(data.calificacion),
          uusuario: new FormControl(data.usuario.nombres),
          uevento: new FormControl(data.evento.nombre),
        });
      });
    }
  }
}
