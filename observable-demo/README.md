# Observables

- Baseado no design pattern: "Observer"  <br>
  - ser notificado quando alguma coisa é alterado
- São usados para escutar e reagir a algum evento.
- As variáveis possuem um convenção de ser anotado com dólar ($), indicando ser um observable. <br>
  - timer$
<br><br>
- Para receber o valor de um observable, é necessário inscrever nele com o comando <b><I>subscribe</I></b>.
- A inscrição de um observable fica ativa na memória e não morre até que seja dito.
  - O nome desse comportamento de vazamento de memória é <b>memory leak</b>
  - Há algumas formas de evitar esse problema pode ser desinscrevendo do observable ou utilizar o <b>pipe async</b>
<br><br>

Tipos de observable:
- <b>Comum</b>: apenas ouve mudanças de valor
- <b>Subject</b>: emitir valor. Quem está escrito nele receber o valor emitido
- <b>BehaviorSubject</b>: consegue emite um valor inicial na sua declaração.


<h3> Hook </h3>
Processos relacionados ao ciclo de vida de um componente são chamados <br>
Ex: ngOnInit, ngOnDestroy

---
<h3>Exemplos de unsubscribe</h3>
1ª Quando o componente for destruído, o subject vai emitir um valor.<br>
O operador <b>takeUntil</b> irá parar de ouvir o observable, cancelando a sua inscrição nele

```
private values$ = interval(1000); //observable que emite um valor a cada 1 segundo
private unsub$ = new Subject();

someFunction() {
	this.values$
		.pipe(takeUntil(this.unsub$))
	         .subscribe(() => {
            console.log("Do something")
         });
}

ngOnDestroy() {
      this.unsub$.next(true);
      this.unsub$.complete();
}
```

2ª A outra abordagem é salvar o retorno de um observable em um Subscription, e quando o componente for destruido, realizar o unsubiscribe da variavel Subscription
