import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  filme: Filme;
  id: number;
  cadastro: FormGroup;
  generoList: string[] = ['Ação', 'Aventura', 'Ficção Científica', "Romance", 'Terror', 'Comédia', 'Drama', 'Aventura'];

  constructor(
            private fb: FormBuilder,
            public validacao: ValidarCamposService,
            private filmesService: FilmesService,
            public dialog: MatDialog,
            private router: Router,
            private activetedRoute: ActivatedRoute) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activetedRoute.snapshot.params['id'];

    if(this.id){
      this.filmesService.visualizar(this.id).subscribe((filme: Filme) =>{
        this.carregarFormulario(filme)
        return
      })
    }

    this.carregarFormulario(this.criarFilmeEmBranco());
  }

  carregarFormulario(filme: Filme){
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme{
    return{
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      urlIMDb: null,
      genero: null
    } as Filme
  }
  submit(): void{
      this.cadastro.markAllAsTouched();
      if(this.cadastro.invalid){
        return
      }

      const filme = this.cadastro.getRawValue() as Filme;
      if(this.id){
        filme.id = this.id;
        this.editar(filme)
        return
      }

      this.salvar(filme);
  }

  reiniciarForm(): void{
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void{
    this.filmesService.salvar(filme).subscribe(() =>{
      const config ={
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar novo filme',
          possuiBtnFechar: true,
          corBtnCancelar: "primary"
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);

      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao){
          this.router.navigateByUrl('filme');
        }else{
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config ={
        data: {
          btnSucesso: 'Fechar',
          titulo:"Erro ao salvar o registro.",
          descricao: "Não conseguimos salvar seu registro, favor tentar novamente mais tarde.",
          corBtnSucesso: "warn"
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    })
  }

  private editar(filme: Filme): void{
    this.filmesService.editar(filme).subscribe(() =>{
      const config ={
        data: {
          titulo: 'Registro atualizado com sucesso',
          descricao: 'Seu registro foi atualizado com sucesso',
          btnSucesso: 'Ir para a listagem',
          possuiBtnFechar: true,
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('filme');
      });
    },
    () => {
      const config ={
        data: {
          btnSucesso: 'Fechar',
          titulo:"Erro ao editar o registro.",
          descricao: "Não conseguimos editar seu registro, favor tentar novamente mais tarde.",
          corBtnSucesso: "warn"
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    })
  }
}
