import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditausuario',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditausuario.component.html',
  styleUrl: './creaeditausuario.component.css',
})
export class CreaeditausuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  listaGeneros: {
    value: string;
    viewValue: string;
  }[] = [
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'Masculino', viewValue: 'Masculino' },
  ];

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      unombres: ['', Validators.required],
      ufechaNacimiento: ['', Validators.required],
      udescripcion: ['', Validators.required],
      upais: ['', Validators.required],
      uagencia: ['', Validators.required],
      usexo: ['', Validators.required],
      uestudios: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.nombres = this.form.value.unombres;
      this.usuario.sexo = this.form.value.usexo;
      this.usuario.descripcion = this.form.value.udescripcion;
      this.usuario.fechaNacimiento = this.form.value.ufechaNacimiento;
      this.usuario.pais = this.form.value.upais;
      this.usuario.estudios = this.form.value.uestudios;
      this.usuario.agencia = this.form.value.uagencia;
      this.uS.insertar(this.usuario).subscribe((d) => {
        this.uS.listar().subscribe((d) => {
          this.uS.setList(d);
        });
      });
    }
    this.router.navigate(['usuarios']);
  }
}
