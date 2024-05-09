import { Component } from '@angular/core';
import { Fornecedores } from '../../interfaces/fornecedores';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FornecedoresService } from '../../services/fornecedores.service';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedores-details.component.html',
  styleUrl: './fornecedores-details.component.css'
})
export class FornecedoresDetailsComponent {
  fornecedor?:Fornecedores;
  fornecedorForm2: FormGroup = new FormGroup({})
  constructor(
    private route: ActivatedRoute,
    private fornecedoresService:FornecedoresService,
    private formbuilder: FormBuilder
    ){
    this.getClientById()
    }
    id?:string;
    getClientById(){
      this.id = this.route.snapshot.paramMap.get('id') ?? ''
      this.fornecedoresService.getById(this.id).subscribe((fornecedoresResponse) => this.fornecedor = fornecedoresResponse)
  
      this.fornecedorForm2 = this.formbuilder.group({
        nome: [this.fornecedor?.nome],
        telefone: [this.fornecedor?.telefone],
        endereco: [this.fornecedor?.endereco],
        id: [this.fornecedor?.id]
      })
    }

    update():void{
      if(this.fornecedorForm2.valid){
        const fornecedorAlterado:Fornecedores = {
          nome: this.fornecedorForm2.value.nome,
          telefone: this.fornecedorForm2.value.telefone,
          endereco: this.fornecedorForm2.value.endereco,
          id: this.fornecedorForm2.value.id
        }
        this.fornecedoresService.atualizar(fornecedorAlterado).subscribe()
        alert('Alterado com sucesso!')
    }
  }


}