import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-listarnotificacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, RouterModule],
  templateUrl: './listarnotificacion.component.html',
  styleUrl: './listarnotificacion.component.css'
})
export class ListarnotificacionComponent {
  dataSource:MatTableDataSource<Notificacion> = new MatTableDataSource()
  displayedColumns:string[]=['c1', 'c2', 'accion01', 'accion02']

  constructor(private nS:NotificacionService){}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource= new MatTableDataSource(data)
    })

    this.nS.getlist().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data)
    })

  }

  eliminar(id:number){
    this.nS.delete(id).subscribe((data) => {
      this.nS.list().subscribe((data) => {
        this.nS.setlist(data)
      })
    })
  }

}
