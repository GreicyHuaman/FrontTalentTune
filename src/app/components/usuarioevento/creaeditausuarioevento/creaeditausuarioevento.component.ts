import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UsuarioEvento } from '../../../models/UsuarioEvento';
import { Usuario } from '../../../models/Usuario';
import { Evento } from '../../../models/Evento';
import { UsuarioeventoService } from '../../../services/usuarioevento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { EventoService } from '../../../services/evento.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-creaeditausuarioevento',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  templateUrl: './creaeditausuarioevento.component.html',
  styleUrl: './creaeditausuarioevento.component.css'
})
export class CreaeditausuarioeventoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ue: UsuarioEvento = new UsuarioEvento();
  id: number = 0;
  edicion: boolean = false;

  listacalificacion: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
  ];
  listaUsuarios: Usuario[] = [];
  listaEventos: Evento[] = [];

  constructor(
    private ueS: UsuarioeventoService,
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

  aceptar(): void {
    
    if (this.form.valid) {
      this.ue.idUsuarioEvento = this.form.value.ucodigo;
      this.ue.asistio = this.form.value.uasistio;
      this.ue.calificacion = this.form.value.ucalificacion;
      this.ue.usuario.idUsuario = this.form.value.uusuario;
      this.ue.evento.idEvento = this.form.value.uevento;
      if (this.edicion) {
        this.ueS.update(this.ue).subscribe((data) => {
          this.ueS.list().subscribe((data) => {
            this.ueS.setlist(data);
          });
        });
      } else {
        this.ueS.insert(this.ue).subscribe((d) => {
          this.ueS.list().subscribe((d) => {
            this.ueS.setlist(d);
          });
        });
      }
    }
    this.router.navigate(['usuarioevento']);
  }

  init() {
    if (this.edicion) {
      this.ueS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          ucodigo: new FormControl(data.idUsuarioEvento),
          uasistio: new FormControl(data.asistio),
          ucalificacion: new FormControl(data.calificacion),
          uusuario: new FormControl(data.usuario.nombres),
          uevento: new FormControl(data.evento.nombre),
        });
      });
    }
  }
}
