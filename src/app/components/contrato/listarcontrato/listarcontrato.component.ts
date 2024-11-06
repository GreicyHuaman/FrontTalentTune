import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Contrato } from '../../../models/Contrato';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-listarcontrato',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, RouterModule],
  templateUrl: './listarcontrato.component.html',
  styleUrl: './listarcontrato.component.css'
})
export class ListarcontratoComponent {
  dataSource:MatTableDataSource<Contrato> = new MatTableDataSource()
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'accion01', 'accion02']

  constructor(private conS:ContratoService){}
  ngOnInit(): void {
    this.conS.list().subscribe((data) => {
      this.dataSource= new MatTableDataSource(data)
    })

    this.conS.getlist().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data)
    })

  }

  eliminar(id:number){
    this.conS.delete(id).subscribe((data) => {
      this.conS.list().subscribe((data) => {
        this.conS.setlist(data)
      })
    })
  }

}
