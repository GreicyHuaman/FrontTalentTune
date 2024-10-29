import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/Categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarcategoria',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, RouterModule],
  templateUrl: './listarcategoria.component.html',
  styleUrl: './listarcategoria.component.css',
})
export class ListarcategoriaComponent {
  dataSource:MatTableDataSource<Categoria> = new MatTableDataSource()
  displayedColumns:string[]=['c1', 'c2', 'accion01', 'accion02']

  constructor(private cS:CategoriaService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource= new MatTableDataSource(data)
    })

    this.cS.getlist().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data)
    })

  }

  eliminar(id:number){
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setlist(data)
      })
    })
  }
}
