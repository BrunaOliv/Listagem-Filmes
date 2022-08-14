import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dio-app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  titulo = "Sucesso!";
  descricao = "Seu registro foi cadastrado com sucesso!"
  btnSucesso = "Ok";
  btnCancelar =  "Cancelar";
  corBtn = "primary";
  possuiBtnFechar = false;

  constructor(
              public dialogRef: MatDialogRef<AlertaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) { }

  ngOnInit() {
    if(this.data){
      this.titulo = this.data.titulo || this.titulo;
      this.titulo = this.data.descricao || this.descricao;
      this.titulo = this.data.btnSucesso || this.btnSucesso;
      this.titulo = this.data.corBtn || this.corBtn;
      this.titulo = this.data.possuiBtnFechar || this.possuiBtnFechar;
    }
  }

}
