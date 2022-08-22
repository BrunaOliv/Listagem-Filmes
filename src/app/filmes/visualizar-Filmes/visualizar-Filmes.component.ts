import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-Filmes',
  templateUrl: './visualizar-Filmes.component.html',
  styleUrls: ['./visualizar-Filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto = '../../assets/images/imagemDefault.png';
  filme: Filme;
  id: number;

  constructor(private activetedRoute: ActivatedRoute,
              private filmeService: FilmesService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() { 
    this.id = this.activetedRoute.snapshot.params['id'];
    this.visualizar()
  }

  excluir(): void{
    const config ={
      data: {
        titulo: "Você tem certeza que deseja excluir esse item?",
        descricao: "Caso você tenha certeza que deseja excluir, clique no botão OK",
        possuiBtnFechar: true,
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);

    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao){
        this.filmeService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/filmes'))
      }
    });
  }

  editar(): void{
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  private visualizar() : void{
    this.filmeService.visualizar(this.id).subscribe((filme : Filme) => {
      this.filme = filme
    })
  }
}
