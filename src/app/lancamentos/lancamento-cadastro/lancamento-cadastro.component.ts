import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';




@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  br: any;

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento();


  ngOnInit() {


   // console.log(this.route.snapshot.params['codigo']);
    const codigoLancamento = this.route.snapshot.params['codigo'];

    // Checa se existe o codigo Lancamento
    if (codigoLancamento) {
      this.carregarLancamentos(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoasAtivas();

      this.br = {
          firstDayOfWeek: 0,
          dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
          dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
          monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
          monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
          today: 'Hoje',
          clear: 'Limpar',
          dateFormat: 'dd/mm/yy',
          weekHeader: 'Wk'
      };
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamentos(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamentoRecebido => {
      this.lancamento = lancamentoRecebido;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nomeCategoria, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  carregarPessoasAtivas() {
    return this.pessoaService.listarTodas()
      .then(response => {
        this.pessoas = response.filter(pessoa => pessoa.ativo).map(p => ({ label: p.nomePessoa, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarLancamento(form);
  } else {
    this.adicionarLancamento(form);
  }
}

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.toasty.success('Lançamento adicionado com sucesso!');

       // form.reset();
       // this.lancamento = new Lancamento();

       // this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]); Salva e vai para modo edicao
        this.router.navigate(['/lancamentos']); // Salva e vai para lista de lacamentos
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {

    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamentoRecebido => {
        this.lancamento =  lancamentoRecebido;

        this.toasty.success('Lançamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }



}
