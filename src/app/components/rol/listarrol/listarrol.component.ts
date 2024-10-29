import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, RouterModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent {
  dataSource:MatTableDataSource<Rol> = new MatTableDataSource()
  displayedColumns:string[]=['c1', 'c2', 'accion01', 'accion02']

  constructor(private rS:RolService){}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource= new MatTableDataSource(data)
    })

    this.rS.getlist().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data)
    })

  }

  eliminar(id:number){
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setlist(data)
      })
    })
  }

}
