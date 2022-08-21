import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const url = 'http://localhost:3000/filmes/'

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

constructor(private http: HttpClient) { }

  salvar(filme : Filme): Observable<Filme>{
    return this.http.post<Filme>(url, filme);
  }

  listarFilmes(texto : string, genero: string): Observable<Filme[]>{
    let httParams = new HttpParams();
    httParams = httParams.set('_sort', 'id');
    httParams = httParams.set('_order', 'desc');
    if(texto)
      httParams = httParams.set('q', texto);
    if(genero)
      httParams = httParams.set('genero', genero);

    return this.http.get<Filme[]>(url, {params: httParams});
  }
}
