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
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { BandaService } from '../../../services/banda.service';

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
export class CreaeditacontratoComponent implements OnInit {
  form: FormGroup;
  contrato: Contrato = new Contrato();
  usuarios: any[] = [];
  bandas: any[] = [];
  mensaje: string = '';
  isTalentoSelected: boolean = false;
  isBandaSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private usuarioService: UsuarioService,
    private bandaService: BandaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      salario: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      estado: ['', Validators.required],
      condiciones: [''],
      manager: ['', Validators.required],
      talento: [''],
      banda: [''],
    });
  }

  ngOnInit(): void {
    this.usuarioService.list().subscribe((data) => {
      this.usuarios = data;
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

      if (new Date(fechaInicio) > new Date(fechaFin)) {
        this.mensaje = 'La fecha de inicio no puede ser mayor que la fecha de fin.';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 3000 });
        return;
      }

      if (manager === talento) {
        this.mensaje = 'El manager y el talento no pueden ser iguales.';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 3000 });
        return;
      }

      this.contrato.fechaInicio = fechaInicio;
      this.contrato.fechaFin = fechaFin;
      this.contrato.salario = salario;
      this.contrato.estado = estado;
      this.contrato.condiciones = condiciones;
      this.contrato.idUsuarioManager.idUsuario = manager;

      if (talento) {
        this.contrato.idUsuarioTalento.idUsuario = talento;
      } else if (banda) {
        this.contrato.banda.idBanda = banda;
      }

      this.contratoService.insert(this.contrato).subscribe(() => {
        this.router.navigate(['/contratos']);
        this.snackBar.open('Contrato guardado exitosamente.', 'Cerrar', { duration: 3000 });
      });
    } else {
      this.mensaje = 'Por favor, complete todos los campos obligatorios.';
      this.snackBar.open(this.mensaje, 'Cerrar', { duration: 3000 });
    }
  }
}

