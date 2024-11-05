import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Mensaje } from '../../../models/Mensaje';
import { MensajeService } from '../../../services/mensaje.service';

@Component({
  selector: 'app-listarmensaje',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, RouterModule],
  templateUrl: './listarmensaje.component.html',
  styleUrl: './listarmensaje.component.css'
})
export class ListarmensajeComponent {
  dataSource:MatTableDataSource<Mensaje> = new MatTableDataSource()
  displayedColumns:string[]=['c1', 'c2', 'c3', 'accion01', 'accion02']

  constructor(private mS:MensajeService){}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource= new MatTableDataSource(data)
    })

    this.mS.getlist().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data)
    })

  }

  eliminar(id:number){
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setlist(data)
      })
    })
  }

}
