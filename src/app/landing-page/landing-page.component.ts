import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { OpenAITranslateService } from '../services/📄 openai-question.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('necessidadeInput')
  public necessidadeInput!: ElementRef<HTMLInputElement>;

  public necessidade: string = '';

  public AIResponse: string = '';

  public frases: string[] = [
    'Qual a necessidade do seu negócio?',
    'Como podemos automatizar seus processos?',
    'Nos conte sobre sua idéia...',
    'Escreva sua necessidade...',
  ];

  public fraseAtual = 0;

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.isLoadingSubject.asObservable();

  private isAIDisabledSubject = new BehaviorSubject<boolean>(false);

  public isAIDisabled$ = this.isAIDisabledSubject.asObservable();

  public formContact = this.fb.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', Validators.required],
    tel: ['', Validators.required],
    subject: ['', Validators.required],
    textarea: [''],
  });

  constructor(
    private fb: FormBuilder,
    public openAITranslateService: OpenAITranslateService
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.animatePlaceholder(this.frases[this.fraseAtual]);
  }

  private animatePlaceholder(texto: string): void {
    const input = this.necessidadeInput.nativeElement;
    const atual = input.placeholder;
    let i = atual.length;

    const erase = () => {
      if (i >= 0) {
        input.placeholder = atual.substring(0, i);
        i--;
        setTimeout(erase, 30);
      } else {
        write();
      }
    };
    let j = 0;
    const write = () => {
      if (j <= texto.length) {
        input.placeholder = texto.substring(0, j);
        j++;
        setTimeout(write, 50);
      } else {
        setTimeout(() => {
          this.fraseAtual = (this.fraseAtual + 1) % this.frases.length;
          this.animatePlaceholder(this.frases[this.fraseAtual]);
        }, 3000);
      }
    };

    erase();
  }

  public contact(): void {
    this.isLoadingSubject.next(true);
    console.log(this.formContact.value);
  }

  private animateAIResponse(response: string) {
    this.AIResponse = ''; // Reset before starting animation

    for (let i = 0; i < response.length; i++) {
      setTimeout(() => {
        this.AIResponse += response[i];
      }, i * 50); // 50ms per character for typing effect
    }
  }

  public callAI(): void {
    if (this.necessidade.length > 10) {
      this.isLoadingSubject.next(true);
      this.openAITranslateService.askOpenAI(this.necessidade, 'pt').subscribe({
        next: (res) => {
          this.animateAIResponse(res.response);
          this.isAIDisabledSubject.next(true);
          this.isLoadingSubject.next(false);
        },
        error: () => {
          this.isLoadingSubject.next(false);
          throw new Error('Error calling OpenAI');
        },
      });
    }
  }
}
