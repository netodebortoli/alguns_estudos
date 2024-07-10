import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [ AsyncPipe ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent {
  carrinhoService = inject(CarrinhoService)
  itemAdicionado$ = this.carrinhoService.getItemAdicionado()

  // quantidadeItens = 0
  // subItemAdicionado!: Subscription

  /*
   * Não é necessário se inscrever no observable para receber notificações, se utilizad o AsyncPipe no template
   * (para a logica implementada que é apenas de exibição)
   */
  constructor() {
    // Se inscreve no observable para receber notificações
    // Guarda o valor em um subscription (retorno de um observable.subscribe())
    // Quando o componente for destruido, esse código não será mais ouvido pois terá sido desinscrito
    // this.subItemAdicionado = this.itemAdicionado$.subscribe(value => {
    //   console.log('Novo valor recebido')
    //   this.quantidadeItens = value
    // })
  }

  // ngOnDestroy(): void {
  // Unsuscribe do observable para evitar memory leaks
  // this.subItemAdicionado.unsubscribe()
  // }

}
