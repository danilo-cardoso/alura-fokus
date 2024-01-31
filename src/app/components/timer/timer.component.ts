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

  activeState = 'focus';

  timer = 1500;
  formattedTimer = '25:00';
  timerInterval: number | null = null;
  timerBtnText = 'Começar';
  timerBtnIcon = '../../../assets/Ícones/play_arrow.png';

  musica = new Audio('../../../assets/Músicas e sons/Opções música foco/');
  timerStartSound = new Audio('../../../assets/Músicas e sons/Press play.wav');
  timerStopSound = new Audio('../../../assets/Músicas e sons/Press stop button.mp3');
  timerEndSound = new Audio('../../../assets/Músicas e sons/Contagem regressiva e toque.mp3');

  bgChange(input: string) {
    switch (input) {
      case 'focus':
        this.currBg.currImage = '../assets/Imagens/Imagem foco.png';
        this.currBg.currText = 'Otimize sua produtividade,';
        this.currBg.currStrong = 'mergulhe no que importa';
        this.currBg.currColor = "url('../assets/Imagens/Background-linhas.png'), var(--linear-foco)";
        this.activeState = 'focus';
        this.timer = 1500;
        this.formattedTimer = '25:00';
        break;

      case 'short':
        this.currBg.currImage = '../assets/Imagens/Imagem descanso curto.png';
        this.currBg.currText = 'Que tal dar uma respirada?';
        this.currBg.currStrong = 'Faça uma pausa curta!';
        this.currBg.currColor = "url('../assets/Imagens/Background-linhas.png'), var(--linear-curto)";
        this.activeState = 'short'
        this.timer = 300;
        this.formattedTimer = '05:00';
        break;

      case 'long':
        this.currBg.currImage = '../assets/Imagens/Imagem descanso longo.png';
        this.currBg.currText = 'Hora de voltar à superfície.';
        this.currBg.currStrong = 'Faça uma pausa longa.';
        this.currBg.currColor = "url('../assets/Imagens/Background-linhas.png'), var(--linear-longo)";
        this.activeState = 'long';
        this.timer = 900;
        this.formattedTimer = '15:00';
        break;

      default:
        break;
    }
    this.currBgChange.emit(this.currBg);
  }

  setTimer(): () => void {
    const timerFunct = () => {
      if (this.timerInterval) {
        if (this.timer == 10) {
          this.timerEndSound.play();
        }
        if (this.timer <= 0) {
          this.pauseTimer();
          switch (this.activeState) {
            case 'focus':
              this.timer = 1500;
              break;

            case 'short':
              this.timer = 300;
              break;

            case 'long':
              this.timer = 900;
              break;

            default:
              break;
          }
          return;
        }
        this.timer--;
        const timerAux = new Date(this.timer * 1000);
        this.formattedTimer = timerAux.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
      }
    }
    return timerFunct;
  }

  startTimer() {
    const timerFunct = this.setTimer();
    if (this.timerInterval) {
      this.pauseTimer();
      return;
    }
    this.timerStartSound.play();
    this.timerInterval = window.setInterval(timerFunct, 1000);
    this.timerBtnText = 'Pausar';
    this.timerBtnIcon = '../../../assets/Ícones/pause.png'
  }

  pauseTimer() {
    if (this.timerInterval) {
      this.timerStopSound.play();
      window.clearInterval(this.timerInterval)
      this.timerInterval = null;
      this.timerBtnText = 'Começar';
      this.timerBtnIcon = '../../../assets/Ícones/play_arrow.png';
    }
  }

  alternarMusica() {
    this.musica.loop = true;
    if (this.musica.paused) {
      this.musica.play();
    }
    else {
      this.musica.pause();
    }
  }
}
