import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertaComponent } from '../shared/alerta/alerta.component';
import { VisualizarFilmesComponent } from './visualizar-Filmes/visualizar-Filmes.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [
    AlertaComponent,
  ],
  declarations: [
    CadastroFilmesComponent, 
    ListagemFilmesComponent,
    AlertaComponent,
     VisualizarFilmesComponent]
})
export class FilmesModule { }
