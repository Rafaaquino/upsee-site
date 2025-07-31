import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAITranslateService {
  private apiUrl = 'https://www.opportunity-web.com.br/OpenAI';
  //private apiUrl = 'http://localhost:8080/Opportunity/OpenAI';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public askOpenAI(
    text: string,
    targetLang: string
  ): Observable<{ response: string }> {
    const body = new HttpParams()
      .set('text', text)
      .set('targetLang', targetLang);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    //return of({ response: 'dhsaudhsaudhasudhusadhusadhuasdhuadhuahduasdhuadhahduahduadhuahduaduadhasuhduadhuashduahduadhsaduhaudhsaudhaudshau' });

    return this.http.post<{ response: string }>(this.apiUrl, body.toString(), {
      headers,
    });
  }
}
