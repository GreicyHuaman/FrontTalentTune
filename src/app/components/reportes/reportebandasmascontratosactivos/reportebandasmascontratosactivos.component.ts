import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BandaService } from '../../../services/banda.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-reportebandasmascontratosactivos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportebandasmascontratosactivos.component.html',
  styleUrl: './reportebandasmascontratosactivos.component.css',
})
export class ReportebandasmascontratosactivosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private bS: BandaService) {}

  ngOnInit(): void {
    this.bS.getBandasMasContratosActivos().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreBanda);
      this.barChartData = [
        {
          data: data.map((item) => item.contratosActivos),
          label: 'Cantidad de contratos activos',
          backgroundColor: [
            '#FFDE59',
            '#FCCE11',
          ],
          borderColor: '#FCCE11',
          borderWidth: 1,
        },
      ];
    });
  }
}
