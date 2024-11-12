import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportebandasmascontratosactivosComponent } from "./reportebandasmascontratosactivos/reportebandasmascontratosactivos.component";

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ReportebandasmascontratosactivosComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
