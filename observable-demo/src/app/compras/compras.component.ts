import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  mostrarBotao: boolean = true

  /* ViewChild é um decorator que permite injetar uma referência a um elemento do DOM
  *  Assim, o valor do input no Template HTML pode ser acessado diretamente no componente
  *  itemAdd é o nome da váriavel que faz referência ao campo input no Template HTML deste componente
  *  Essa é uma abordagem alternativa ao invés de usar binding
  */
  @ViewChild('itemAdd') itemAdd!: ElementRef

  adicionarItem() {
    const item = this.itemAdd.nativeElement.value
    this.carrinhoService.adicionarItem(item)
    this.itemAdd.nativeElement.value = ''
  }
}
