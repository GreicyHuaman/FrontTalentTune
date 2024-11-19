import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioEvento } from '../../../models/UsuarioEvento';
import { UsuarioeventoService } from '../../../services/usuarioevento.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarusuarioevento',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    RouterLink,
    CommonModule],
  templateUrl: './listarusuarioevento.component.html',
  styleUrl: './listarusuarioevento.component.css'
})
export class ListarusuarioeventoComponent implements OnInit {

  dataSource: MatTableDataSource<UsuarioEvento> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ueS: UsuarioeventoService) {}

  ngOnInit(): void {
    this.ueS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.ueS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.ueS.delete(id).subscribe((data) => {
      this.ueS.list().subscribe((data) => {
        this.ueS.setlist(data);
      });
    });
  }

}
