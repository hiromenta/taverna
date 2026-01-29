import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { LanguageCode } from '../models/language.model';
import { Observable } from 'rxjs';

@Pipe({
  name: 'translateAsync'
})
export class TranslateAsyncPipe implements PipeTransform {

  constructor(private _translateService: TranslateService) {}

  transform(key: string, langCode?: LanguageCode): Observable<string> {
    if (!langCode) {
      return this._translateService.translate(key, this._translateService.getCurrentLanguageCode()) as Observable<string>;
    }

    return this._translateService.translate(key, langCode) as Observable<string>;
  }

}
