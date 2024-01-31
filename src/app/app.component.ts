import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alura-fokus';

  currBg = {
    currImage: '../assets/Imagens/Imagem foco.png',
    currText: 'Otimize sua produtividade,',
    currStrong: 'mergulhe no que importa',
    currColor: "url('../assets/Imagens/Background-linhas.png'), var(--linear-foco)"
  }
  constructor() { }
}
