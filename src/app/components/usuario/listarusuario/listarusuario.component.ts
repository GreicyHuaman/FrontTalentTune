import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../services/usuario.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButton,
    RouterModule,
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
})
export class ListarusuarioComponent {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9','rol', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.uS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setlist(data);
      });
    });
  }
}
