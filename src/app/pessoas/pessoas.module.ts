import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';

import { SharedModule } from './../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    BrowserAnimationsModule,
    InputMaskModule,
    InputSwitchModule
  ],
  exports: [  //Obs: nao esta mai sendo usando devido nao ser necessario o uso do selector em app.component.ts
   // PessoasPesquisaComponent,
   // PessoaCadastroComponent
  ]
  ,
  providers :[
  ]
})
export class PessoasModule { }
