import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FornecedoresService } from '../../services/fornecedores.service';
import { Fornecedores } from '../../interfaces/fornecedores';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.css'
})
export class FornecedoresComponent {
  fornecedores: Fornecedores[] = [];
  fornecedoresForm: FormGroup = new FormGroup({})

  constructor(private fornecedorService: FornecedoresService, private formbuilder: FormBuilder) {
    this.fornecedoresForm = this.formbuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required]
    })

  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inserir() {
    if (this.fornecedoresForm.valid) {
      let fornecedor: Fornecedores = {
        nome: this.fornecedoresForm.value.nome,
        telefone: this.fornecedoresForm.value.telefone,
        endereco: this.fornecedoresForm.value.endereco,
        id: this.generateRandomString(6)
      }
      this.fornecedoresForm.reset()
      this.fornecedores.push(fornecedor)
      this.fornecedorService.adicionar(fornecedor).subscribe()
      alert('Fornecedor cadastrado com sucesso!')
    } else {
      alert('Preencha todos os campos!');
    }
  }

  listar(): void {
    this.fornecedorService.listar().subscribe((listFornecedor) => (this.fornecedores = listFornecedor))
  } ngOnInit(): void {
    this.listar();
  }
  remover(id: string): void {
    this.fornecedores = this.fornecedores.filter((c) => c.id !== id)
    this.fornecedorService.remover(id).subscribe()
    alert('Fornecedor removido com sucesso!')
  }

}
