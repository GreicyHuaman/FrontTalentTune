import { Component } from '@angular/core';
import { Banda } from '../../../models/Banda';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BandaService } from '../../../services/banda.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarbanda',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButton,
    RouterModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './listarbanda.component.html',
  styleUrl: './listarbanda.component.css',
})
export class ListarbandaComponent {
  dataSource: MatTableDataSource<Banda> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'accion01', 'accion02'];

  constructor(private bS: BandaService) {}
  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.bS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.bS.delete(id).subscribe((data) => {
      this.bS.list().subscribe((data) => {
        this.bS.setlist(data);
      });
    });
  }
}
