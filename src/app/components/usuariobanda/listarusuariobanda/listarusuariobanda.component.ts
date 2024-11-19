import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioBanda } from '../../../models/UsuarioBanda';
import { UsuariobandaService } from '../../../services/usuariobanda.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarusuariobanda',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './listarusuariobanda.component.html',
  styleUrl: './listarusuariobanda.component.css',
})
export class ListarusuariobandaComponent implements OnInit {
  dataSource: MatTableDataSource<UsuarioBanda> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ubS: UsuariobandaService) {}

  ngOnInit(): void {
    this.ubS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.ubS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.ubS.delete(id).subscribe((data) => {
      this.ubS.list().subscribe((data) => {
        this.ubS.setlist(data);
      });
    });
  }
}
