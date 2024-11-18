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
  form: FormGroup;
  contrato: Contrato = new Contrato();
  usuarios: any[] = [];
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private usuarioService: UsuarioService,
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
      talentoBanda: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Traer usuarios para los select
    this.usuarioService.list().subscribe((data) => {
      this.usuarios = data;
    });
  }

  guardar() {
    if (this.form.valid) {
      const { fechaInicio, fechaFin, salario, estado, condiciones, manager, talentoBanda } =
        this.form.value;

      // Validación personalizada
      if (new Date(fechaInicio) > new Date(fechaFin)) {
        this.mensaje = 'La fecha de inicio no puede ser mayor que la fecha de fin.';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 3000 });
        return;
      }

      if (manager === talentoBanda) {
        this.mensaje = 'El manager y el talento/banda no pueden ser iguales.';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 3000 });
        return;
      }

      this.contrato.fechaInicio = fechaInicio;
      this.contrato.fechaFin = fechaFin;
      this.contrato.salario = salario;
      this.contrato.estado = estado;
      this.contrato.condiciones = condiciones;
      this.contrato.usuario.nombres = manager; // Asignamos el manager
      this.contrato.banda.nombre = talentoBanda; // Asignamos el talento o banda

      this.contratoService.insert(this.contrato).subscribe(() => {
        this.router.navigate(['/contratos']);
        this.snackBar.open('Contrato guardado exitosamente.', 'Cerrar', {
          duration: 3000,
        });
      });
    } else {
      this.mensaje = 'Por favor, complete todos los campos obligatorios.';
      this.snackBar.open(this.mensaje, 'Cerrar', { duration: 3000 });
    }
  }

}
