import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Contrato } from '../../../models/Contrato';
import { ContratoService } from '../../../services/contrato.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { BandaService } from '../../../services/banda.service';
import { Usuario } from '../../../models/Usuario';
import { Banda } from '../../../models/Banda';

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
    CommonModule,
  ],
  templateUrl: './creaeditacontrato.component.html',
  styleUrls: ['./creaeditacontrato.component.css'],
})

export class CreaeditacontratoComponent implements OnInit {
  form: FormGroup;
  contrato: Contrato = new Contrato();
  talentos: any[] = [];
  managers: any[] = [];
  bandas: any[] = [];
  mensaje: string = '';
  isTalentoSelected: boolean = false;
  isBandaSelected: boolean = false;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private usuarioService: UsuarioService,
    private bandaService: BandaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      hcodigo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      salario: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      estado: ['', Validators.required],
      condiciones: ['', Validators.required],
      manager: ['', Validators.required],
      talento: [''],
      banda: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.usuarioService.list().subscribe((data) => {
      this.talentos = data;
    });

    this.usuarioService.list().subscribe((data) => {
      this.managers = data;
    });

    this.bandaService.list().subscribe((data) => {
      this.bandas = data;
    });
  }

  onTalentoSelect(): void {
    this.isTalentoSelected = !!this.form.get('talento')?.value;
    if (this.isTalentoSelected) {
      this.form.get('banda')?.setValue(null); // Limpia el campo "Banda"
      this.form.get('banda')?.disable(); // Deshabilita el select de Banda
    } else {
      this.form.get('banda')?.enable(); // Habilita el select de Banda si se quita el talento
    }
  }

  onBandaSelect(): void {
    this.isBandaSelected = !!this.form.get('banda')?.value;
    if (this.isBandaSelected) {
      this.form.get('talento')?.setValue(null); // Limpia el campo "Talento"
      this.form.get('talento')?.disable(); // Deshabilita el select de Talento
    } else {
      this.form.get('talento')?.enable(); // Habilita el select de Talento si se quita la banda
    }
  }

  guardar(): void {
    if (this.form.valid) {
      const { fechaInicio, fechaFin, salario, estado, condiciones, manager, talento, banda } = this.form.value;
  
      this.contrato.fechaInicio = fechaInicio;
      this.contrato.fechaFin = fechaFin;
      this.contrato.salario = salario;
      this.contrato.estado = estado;
      this.contrato.condiciones = condiciones;
  
      const managerUsuario = new Usuario();
      managerUsuario.idUsuario = manager;
      this.contrato.manager = managerUsuario;
  
      if (talento) {
        const talentoUsuario = new Usuario();
        talentoUsuario.idUsuario = talento;
        this.contrato.talento = talentoUsuario;
        this.contrato.banda = null;
      } else if (banda) {
        const bandaSeleccionada = new Banda();
        bandaSeleccionada.idBanda = banda;
        this.contrato.banda = bandaSeleccionada;
        this.contrato.talento = null;
      } else {
        this.contrato.talento = null;
        this.contrato.banda = null;
      }
  
      console.log('Contrato antes de guardar:', this.contrato);
  
      if (this.edicion) {
        this.contratoService.update(this.contrato).subscribe(() => {
          this.contratoService.list().subscribe((data) => {
            this.contratoService.setlist(data);
          });
        });
      } else {
        this.contratoService.insert(this.contrato).subscribe(() => {
          this.contratoService.list().subscribe((data) => {
            this.contratoService.setlist(data);
          });
        });
      }
  
      this.router.navigate(['contratos']);
    }
  }
  

  init() {
    if (this.edicion) {
      this.contratoService.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idContrato,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          salario: data.salario,
          estado: data.estado,
          condiciones: data.condiciones,
          manager: data.manager.idUsuario,
          talento: data.talento?.idUsuario || '',
          banda: data.banda?.idBanda || '',
        });
      });
    }
  }
}
