import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Pessoa } from '../core/model';


export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: PessoaFilter): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then(response => {
        const pessoas = response['content']
        const resultado = {
          pessoas,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarTodas(): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');

    headers.append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');

    return this.http.get(this.pessoasUrl, { headers })
    .toPromise()
    .then(response => response['content']);
}



  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .then(()=> null);
  }


  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    let headers = new HttpHeaders();
   // const headers = new HttpHeaders({'h1':'v1','h2':'v2'});
   // headers = headers.set('h1', 'v1').set('h2','v2');
    headers = headers.set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu').set('Content-Type','application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu').set('Content-Type','application/json');

    return this.http.post<Pessoa>(
     this.pessoasUrl, pessoa, {headers})
      .toPromise();
  }


  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu').set('Content-Type','application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => {
        const pessoaAlterada = response as Pessoa;

        return pessoaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');

    return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response as Pessoa;

        return pessoa;
      });
  }


}
