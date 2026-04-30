import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  private _sub!: Subscription;

  constructor(private _translateService: TranslateService) {}

  transform(key: string): string {
    return this._translateService.translate(key) as string;
  }

}
