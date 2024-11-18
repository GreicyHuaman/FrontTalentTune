import { Component, OnInit } from '@angular/core';
import { ContenidoService } from '../../../services/contenido.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Contenido } from '../../../models/Contenido';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarcontenido',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    RouterLink,
    CommonModule
  ],
  templateUrl: './listarcontenido.component.html',
  styleUrl: './listarcontenido.component.css'
})
export class ListarcontenidoComponent implements OnInit {
  contenidos: Contenido[] = [];
  displayedColumns: string[] = [
    'idContenido',
    'titulo',
    'fechaPublicacion',
    'contenido',
    'likes',
    'acciones',
  ]; // Columnas de la tabla

  constructor(private contenidoService: ContenidoService) {}

  ngOnInit() {
    this.listarContenidos();
  }

  listarContenidos() {
    this.contenidoService.list().subscribe(
      (data) => (this.contenidos = data),
      (error) => console.error('Error al listar contenidos:', error)
    );
  }

  toggleLike(contenido: Contenido) {
    contenido.likes = !contenido.likes;
    this.contenidoService.update(contenido).subscribe(
      () => console.log('Like actualizado'),
      (error) => console.error('Error al actualizar like:', error)
    );
  }

  editar(id: number) {
    // Redirige a la ruta de edición
    console.log('Redirigiendo a editar contenido con ID:', id);
  }

  eliminar(id: number) {
    this.contenidoService.delete(id).subscribe(
      () => this.listarContenidos(),
      (error) => console.error('Error al eliminar contenido:', error)
    );
  }

}
