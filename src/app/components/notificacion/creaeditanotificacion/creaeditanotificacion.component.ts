import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Evento } from '../../../models/Evento';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-creaeditanotificacion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditanotificacion.component.html',
  styleUrls: ['./creaeditanotificacion.component.css'],
})
export class CreaeditanotificacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  notificacion: Notificacion = new Notificacion();
  eventos: Evento[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private nS: NotificacionService,
    private eS: EventoService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnotificacion: ['', Validators.required],
      hevento: ['', Validators.required],
    });

    this.eS.list().subscribe((data) => {
      this.eventos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.notificacion.idNotificacion = this.form.value.hcodigo;
      this.notificacion.detalle = this.form.value.hnotificacion;
      this.notificacion.evento.idEvento = this.form.value.hevento;
      this.nS.insert(this.notificacion).subscribe(() => {
        this.nS.list().subscribe((data) => {
          this.nS.setlist(data);
        });
      });

      this.router.navigate(['notificaciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idNotificacion),
          hnotificacion: new FormControl(data.detalle),
          hevento: new FormControl(data.evento?.idEvento),
        });
      });
    }
  }
}
