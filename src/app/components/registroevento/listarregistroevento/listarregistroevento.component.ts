import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RegistroEvento } from '../../../models/RegistroEvento';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RegistroeventoService } from '../../../services/registroevento.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarregistroevento',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButton,
    RouterModule,],
  templateUrl: './listarregistroevento.component.html',
  styleUrl: './listarregistroevento.component.css',
})
export class ListarregistroeventoComponent {
  dataSource: MatTableDataSource<RegistroEvento> = new MatTableDataSource();
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

  constructor(private reS: RegistroeventoService) {}

  ngOnit(): void {
    this.reS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.reS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.reS.delete(id).subscribe((data) => {
      this.reS.list().subscribe((data) => {
        this.reS.setlist(data);
      });
    });
  }

}
