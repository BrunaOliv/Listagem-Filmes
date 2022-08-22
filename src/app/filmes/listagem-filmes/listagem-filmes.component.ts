import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { debounceTime} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = '../../assets/images/imagemDefault.png';
  filmes: Filme[] = [];
  texto: string = '';
  genero: string = '';
  filtrosListagem: FormGroup;
  generoList: string[] = ['Ação', 'Aventura', 'Ficção Científica', "Romance", 'Terror', 'Comédia', 'Drama', 'Aventura'];
  
  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(500))
    .subscribe((value: string) => {
      this.texto = value;
      this.obterListarDeFilmes();
    })

    this.filtrosListagem.get('genero').valueChanges.subscribe((value: string) => {
      this.genero = value;
      this.obterListarDeFilmes();
    })

    this.obterListarDeFilmes()
  }

  obterListarDeFilmes(): void{
    this.filmesService.listarFilmes(this.texto, this.genero).subscribe((resposta: Filme[]) =>{
      this.filmes = resposta
    })
  }

  abrir(id: number): void{
    this.router.navigateByUrl('/filmes/' + id)
  }
}
