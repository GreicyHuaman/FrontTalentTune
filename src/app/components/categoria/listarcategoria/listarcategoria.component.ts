import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/Categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-listarcategoria',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarcategoria.component.html',
  styleUrl: './listarcategoria.component.css',
})
export class ListarcategoriaComponent {
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];

  constructor(private cS: CategoriaService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
