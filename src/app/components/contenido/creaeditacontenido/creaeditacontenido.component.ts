import { Component, OnInit } from '@angular/core';
import { Contenido } from '../../../models/Contenido';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContenidoService } from '../../../services/contenido.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from '../../../models/Categoria';
import { Usuario } from '../../../models/Usuario';
import { Banda } from '../../../models/Banda';
import { UsuarioService } from '../../../services/usuario.service';
import { BandaService } from '../../../services/banda.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-creaeditacontenido',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditacontenido.component.html',
  styleUrl: './creaeditacontenido.component.css'
})
export class CreaeditacontenidoComponent implements OnInit {
  contenido: Contenido = new Contenido();
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];
  bandas: Banda[] = [];

  constructor(
    private contenidoService: ContenidoService,
    private usuarioService: UsuarioService,
    private bandaService: BandaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarUsuarios();
    this.cargarBandas();
  }

  cargarCategorias() {
    this.categoriaService.list().subscribe(
      (data) => (this.categorias = data),
      (error) => console.error('Error al cargar categorías:', error)
    );
  }

  cargarUsuarios() {
    this.usuarioService.list().subscribe(
      (data) => (this.usuarios = data),
      (error) => console.error('Error al cargar usuarios:', error)
    );
  }

  cargarBandas() {
    this.bandaService.list().subscribe(
      (data) => (this.bandas = data),
      (error) => console.error('Error al cargar bandas:', error)
    );
  }

  guardarContenido() {
    // Asegurarse de que uno de los dos campos (usuario o banda) esté seleccionado
    if (!this.contenido.idUsuario.idUsuario && !this.contenido.idBanda.idBanda) {
      console.error('Error: Debes seleccionar un usuario o una banda');
      return;
    }
    this.contenidoService.insert(this.contenido).subscribe(
      () => console.log('Contenido guardado correctamente'),
      (error) => console.error('Error al guardar contenido:', error)
    );
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.contenido.contenido = reader.result as string; // Base64
      };
      reader.readAsDataURL(file);
    }
  }

}
