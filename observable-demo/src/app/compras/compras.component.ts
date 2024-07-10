import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CarrinhoService } from './carrinho/carrinho.service';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, FormsModule, CarrinhoComponent],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent {
  carrinhoService = inject(CarrinhoService)
  itemAdicionado!: string
  mostrarBotao: boolean = true

  adicionarItem() {
    this.carrinhoService.adicionarItem(this.itemAdicionado)
    this.itemAdicionado = ''
  }
}
