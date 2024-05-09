import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedores } from '../interfaces/fornecedores';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  private FornecedoresUrl = "http://localhost:3000/fornecedores"
  constructor(private http: HttpClient) {
  }

  clientes: Fornecedores[] = [];

  listar(): Observable<Fornecedores[]> {
    return this.http.get<Fornecedores[]>(this.FornecedoresUrl) as Observable<Fornecedores[]>
  }

  getById(id: string): Observable<Fornecedores> {
    return this.http.get(`${this.FornecedoresUrl}/${id}`) as Observable<Fornecedores>
  }

  remover(id: string) {
    return this.http.delete(`${this.FornecedoresUrl}/${id}`)
  }

  httpHeader = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  atualizar(Fornecedores: Fornecedores) {
    return this.http.put(`${this.FornecedoresUrl}/${Fornecedores.id}`, Fornecedores, this.httpHeader)
  }

  adicionar(Fornecedores: Fornecedores) {
    return this.http.post(this.FornecedoresUrl, Fornecedores, this.httpHeader)
  }

}
