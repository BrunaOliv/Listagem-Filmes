import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generoList: string[] = ['Ação', 'Aventura', 'Ficção Científica', "Romance", 'Terror'];

  constructor(
    private fb: FormBuilder,
    public validacao: ValidarCamposService) { }

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

  salvar(): void{
      this.cadastro.markAllAsTouched();
      if(this.cadastro.invalid){
        return
      }

      alert("Sucesso!!\n\n"+ JSON.stringify(this.cadastro.value, null, 4));
      this.reiniciarForm();
  }

  reiniciarForm(): void{
    this.cadastro.reset();
  }

}
