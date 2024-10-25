import { Component } from '@angular/core';
import { Banda } from '../../../models/Banda';
import { MatTableDataSource, MatTableModule } from'@angular/material/table';
import { BandaService } from '../../../services/banda.service';

@Component({
  selector: 'app-listarbanda',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarbanda.component.html',
  styleUrl: './listarbanda.component.css'
})
export class ListarbandaComponent {
  dataSource:MatTableDataSource<Banda> = new MatTableDataSource()
  displayedColumns:string[]=['c1', 'c2', 'c3']

  constructor(private bS:BandaService){}
  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource= new MatTableDataSource(data)
    })

  }
  
}
