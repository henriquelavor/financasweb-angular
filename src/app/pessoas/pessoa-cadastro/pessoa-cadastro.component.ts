import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  pessoa = new Pessoa();

  status = [
    {label: 'Ativo', value: true},
    {label: 'Inativo', value: false},
  ];

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    // Checa se existe o codigo Pessoa
    if (codigoPessoa) {
      this.carregarPessoas(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoas(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(pessoaRecebido => {
      this.pessoa = pessoaRecebido;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/pessoas']);
        //form.reset();
        //this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {

    this.pessoaService.atualizar(this.pessoa)
      .then(pessaoRecebida => {
        this.pessoa =  pessaoRecebida;

        this.toasty.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nomePessoa}`);
  }

}
