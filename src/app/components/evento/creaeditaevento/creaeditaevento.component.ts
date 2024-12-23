import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Evento } from '../../../models/Evento';
import { EventoService } from '../../../services/evento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creaeditaevento',
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
  templateUrl: './creaeditaevento.component.html',
  styleUrl: './creaeditaevento.component.css',
})
export class CreaeditaeventoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  evento: Evento = new Evento();
  id: number = 0;
  edicion: boolean = false;

  listatipos: { value: string; viewValue: string }[] = [
    { value: 'Concierto', viewValue: 'Concierto' },
    { value: 'Festival de música', viewValue: 'Festival de música' },
    { value: 'Concurso', viewValue: 'Concurso' },
    { value: 'Karaoke', viewValue: 'Karaoke' },
    { value: 'Batallas', viewValue: 'Batallas' },
    { value: 'Sesion de producción', viewValue: 'Sesion de producción' },
    { value: 'Tributo', viewValue: 'Tributo' },
  ];

  listaDuracion: { value: string; viewValue: string }[] = [
    { value: '60', viewValue: '1 hora' },
    { value: '90', viewValue: '1 hora y 30 minutos' },
    { value: '120', viewValue: '2 horas' },
    { value: '150', viewValue: '2 horas y 30 minutos' },
    { value: '180', viewValue: '3 horas' },
    { value: '210', viewValue: '3 horas y 30 minutos' },
    { value: '240', viewValue: '4 horas' },

  ];
  
  listaUsuarios: Usuario[] = [];

  constructor(
    private eS: EventoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      ucodigo: [''],
      unombres: ['', Validators.required],
      ufecha: ['', Validators.required],
      utipo: ['', Validators.required],
      uduracion: ['', Validators.required],
      udescripcion: [''],
      uusuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.evento.idEvento = this.form.value.ucodigo;
      this.evento.nombre = this.form.value.unombres;
      this.evento.fecha = this.form.value.ufecha;
      this.evento.tipo = this.form.value.utipo;
      this.evento.duracion = +this.form.value.uduracion;
      this.evento.descripcion = this.form.value.udescripcion;
      this.evento.usuario = new Usuario();
      this.evento.usuario.idUsuario = this.form.value.uusuario;
  
      if (this.edicion) {
        this.eS.update(this.evento).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setlist(data);
          });
        });
      } else {
        this.eS.insert(this.evento).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setlist(data);
          });
        });
      }
      this.router.navigate(['eventos']);
    }
  }
  

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          ucodigo: new FormControl(data.idEvento),
          unombres: new FormControl(data.nombre),
          ufecha: new FormControl(data.fecha),
          utipo: new FormControl(data.tipo),
          uduracion: new FormControl(data.duracion),
          udescripcion: new FormControl(data.descripcion),
          uusuario: new FormControl(data.usuario.nombres),
        });
      });
    }
  }
}
