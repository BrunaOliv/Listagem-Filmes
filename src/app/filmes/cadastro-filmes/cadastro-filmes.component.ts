import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generoList: string[] = ['Ação', 'Aventura', 'Ficção Científica', "Romance", 'Terror', 'Comédia', 'Drama', 'Aventura'];

  constructor(
            private fb: FormBuilder,
            public validacao: ValidarCamposService,
            private filmesService: FilmesService,
            public dialog: MatDialog) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.carregarFormulario();
  }

  carregarFormulario(){
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
  }

  submit(): void{
      this.cadastro.markAllAsTouched();
      if(this.cadastro.invalid){
        return
      }

      const filme = this.cadastro.getRawValue() as Filme;
      this.salvar(filme);

      this.reiniciarForm();
  }

  reiniciarForm(): void{
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void{
    this.filmesService.salvar(filme).subscribe(() =>{
      this.openDialog();
    },
    () => {
      alert("Erro ao salvar")
    })
  }

  openDialog(): void {
      this.dialog.open(AlertaComponent, {
      width: '250px'
    });
}

}
