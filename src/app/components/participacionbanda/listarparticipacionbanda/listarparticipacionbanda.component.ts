import { Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ParticipacionBanda } from '../../../models/ParticipacionBanda';
import { ParticipacionbandaService } from '../../../services/participacionbanda.service';

@Component({
  selector: 'app-listarparticipacionbanda',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButton,
    RouterModule,],
  templateUrl: './listarparticipacionbanda.component.html',
  styleUrl: './listarparticipacionbanda.component.css'
})
export class ListarparticipacionbandaComponent {

  dataSource: MatTableDataSource<ParticipacionBanda> = new MatTableDataSource();
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

  constructor(private pS: ParticipacionbandaService) {}

  ngOnit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.pS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setlist(data);
      });
    });
  }

}
