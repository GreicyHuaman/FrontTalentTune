import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioBanda } from '../../../models/UsuarioBanda';
import { UsuariobandaService } from '../../../services/usuariobanda.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarusuariobanda',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButton,
    RouterModule,],
  templateUrl: './listarusuariobanda.component.html',
  styleUrl: './listarusuariobanda.component.css'
})
export class ListarusuariobandaComponent {

  dataSource: MatTableDataSource<UsuarioBanda> = new MatTableDataSource();
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

  constructor(private ubS: UsuariobandaService) {}

  ngOnit(): void {
    this.ubS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.ubS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.ubS.delete(id).subscribe((data) => {
      this.ubS.list().subscribe((data) => {
        this.ubS.setlist(data);
      });
    });
  }

}
