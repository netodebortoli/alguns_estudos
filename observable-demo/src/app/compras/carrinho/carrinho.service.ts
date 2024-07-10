import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompraModel } from '../compra.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  // Declaro um observable do tipo BehaviorSubject para emitir eventos e passa um valor inicial
  private itemAdicionado$ = new BehaviorSubject(0)

  carrinho: CompraModel[] = []

  adicionarItem(nome: string) {
    const novoItem: CompraModel = { id: this.carrinho.length + 1, nome }
    this.carrinho.push(novoItem)
    console.log(this.carrinho)

    // Emito um evento para todos aqueles que estão o observando
    this.itemAdicionado$.next(this.carrinho.length)
  }

  getItemAdicionado(): Observable<number> {
    return this.itemAdicionado$.asObservable()
  }
}
