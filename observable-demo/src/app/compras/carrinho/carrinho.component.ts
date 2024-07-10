import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

  subItemAdicionado!: Subscription

  constructor() {
    // Se inscreve no observable para receber notificações
    // Guarda o valor em um subscription (retorno de um observable.subscribe())
    // Quando o componente for destruido, esse código não será mais ouvido pois terá sido desinscrito
    this.subItemAdicionado = this.itemAdicionado$.subscribe(value => {
      console.log('Novo valor recebido')
      this.quantidadeItens = value
    })
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
    // Unsuscribe do observable para evitar memory leaks
    this.subItemAdicionado.unsubscribe()
  }

}
