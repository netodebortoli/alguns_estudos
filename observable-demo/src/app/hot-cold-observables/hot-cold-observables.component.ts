import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

export interface Produto {
  title: string
}

@Component({
  selector: 'app-hot-cold-observables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hot-cold-observables.component.html',
  styleUrl: './hot-cold-observables.component.scss'
})
export class HotColdObservablesComponent {

  http = inject(HttpClient)

  produto$ = this.http
    .get<Produto>('https://dummyjson.com/products/1')

  produto$_hotObservable = this.http
    .get<Produto>('https://dummyjson.com/products/2')
    .pipe(shareReplay())

  cold$ = new Observable<number>((subscriber) => {
    const random = Math.round(Math.random() * 1000)
    subscriber.next(random)
  })

  hot$ = new BehaviorSubject<number>(0)

  constructor() {
    // Cada inscrição terá um valor diferente
    this.cold$.subscribe(valor => { console.log('Cold - Sub 1', valor) })
    this.cold$.subscribe(valor => { console.log('Cold - Sub 2', valor) })

    // O mesmo valor do BehaviorSubject é emitido para todos os inscritos
    this.hot$.subscribe(valor => { console.log('Hot - Sub 1', valor) })
    this.hot$.subscribe(valor => { console.log('Hot - Sub 2', valor) })

    // O hotObservable vai ser atualizado e todos os seus inscritos vão receber o novo valor
    setTimeout(() => {
      this.hot$.next(Math.round(Math.random() * 10))
    }, 2000)

  }


}
