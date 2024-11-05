import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Comentario } from '../../../models/Comentario';
import { ComentarioService } from '../../../services/comentario.service';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, RouterModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  dataSource:MatTableDataSource<Comentario> = new MatTableDataSource()
  displayedColumns:string[]=['c1', 'c2', 'accion01', 'accion02']

  constructor(private coS:ComentarioService){}
  ngOnInit(): void {
    this.coS.list().subscribe((data) => {
      this.dataSource= new MatTableDataSource(data)
    })

    this.coS.getlist().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data)
    })

  }

  eliminar(id:number){
    this.coS.delete(id).subscribe((data) => {
      this.coS.list().subscribe((data) => {
        this.coS.setlist(data)
      })
    })
  }

}
