import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-Filmes',
  templateUrl: './visualizar-Filmes.component.html',
  styleUrls: ['./visualizar-Filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto = '../../assets/images/imagemDefault.png';
  filme: Filme;

  constructor(private activetedRoute: ActivatedRoute,
              private filmeService: FilmesService) { }

  ngOnInit() { 
    this.visualizar(this.activetedRoute.snapshot.params['id'])
  }

  private visualizar(id: number) : void{
    this.filmeService.visualizar(id).subscribe((filme : Filme) => {
      this.filme = filme
    })
  }
}
