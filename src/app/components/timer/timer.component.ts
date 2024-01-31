import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  @Input() currBg =  {
    currImage: '../assets/Imagens/Imagem foco.png',
    currText: 'Otimize sua produtividade,',
    currStrong: 'mergulhe no que importa',
    currColor: "url('../assets/Imagens/Background-linhas.png'), var(--linear-foco)"
  };

  @Output() currBgChange = new EventEmitter<{ currImage: string, currText: string, currStrong: string, currColor: string }>()

  active = {
    focus: 'active',
    short: '',
    long: ''
  };

  bgChange(input: string) {

    switch (input) {
      case 'focus':
        this.currBg.currImage = '../assets/Imagens/Imagem foco.png';
        this.currBg.currText = 'Otimize sua produtividade,';
        this.currBg.currStrong = 'mergulhe no que importa';
        this.currBg.currColor = "url('../assets/Imagens/Background-linhas.png'), var(--linear-foco)";
        this.active.focus = 'active';
        this.active.short = '';
        this.active.long = '';
        break;

      case 'short':
        this.currBg.currImage = '../assets/Imagens/Imagem descanso curto.png';
        this.currBg.currText = 'Que tal dar uma respirada?';
        this.currBg.currStrong = 'Faça uma pausa curta!';
        this.currBg.currColor = "url('../assets/Imagens/Background-linhas.png'), var(--linear-curto)";
        this.active.short = 'active';
        this.active.focus = '';
        this.active.long = '';
        break;

      case 'long':
        this.currBg.currImage = '../assets/Imagens/Imagem descanso longo.png';
        this.currBg.currText = 'Hora de voltar à superfície.';
        this.currBg.currStrong = 'Faça uma pausa longa.';
        this.currBg.currColor = "url('../assets/Imagens/Background-linhas.png'), var(--linear-longo)";
        this.active.long = 'active';
        this.active.short = '';
        this.active.focus = '';
        break;

      default:
        break;
    }

    this.currBgChange.emit(this.currBg);
  }
}
