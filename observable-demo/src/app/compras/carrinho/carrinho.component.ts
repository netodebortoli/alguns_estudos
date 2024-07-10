import { Component, inject, OnDestroy } from '@angular/core';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent implements OnDestroy {

  carrinhoService = inject(CarrinhoService)
  itemAdicionado$ = this.carrinhoService.getItemAdicionado()
  quantidadeItens = 0

  constructor() {
    // Se inscreve no observable para receber notificações
    // No entanto, se o componente morrer, o observable ainda estará na memória
    this.itemAdicionado$.subscribe(value => {
      this.quantidadeItens = value
    })
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

}
