import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Contrato } from '../../../models/Contrato';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-listarcontrato',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, RouterModule],
  templateUrl: './listarcontrato.component.html',
  styleUrl: './listarcontrato.component.css'
})
export class ListarcontratoComponent {
  dataSource: MatTableDataSource<Contrato> = new MatTableDataSource();
  displayedColumns: string[] = ['idContrato', 'fechaInicio', 'fechaFin', 'salario', 'estado', 'condiciones', 'manager', 'usuario', 'banda', 'accion01', 'accion02'];

  constructor(private contratoService: ContratoService) {}

  ngOnInit(): void {
    this.contratoService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.contratoService.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.contratoService.delete(id).subscribe(() => {
      this.contratoService.list().subscribe((data) => {
        this.contratoService.setlist(data);
      });
    });
  }

}
