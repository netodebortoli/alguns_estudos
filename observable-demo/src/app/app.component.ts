import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComprasComponent } from "./compras/compras.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComprasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'observable-demo';
}
