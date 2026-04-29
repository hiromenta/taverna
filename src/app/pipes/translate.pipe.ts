import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {

  private _sub!: Subscription;

  constructor(private _translateService: TranslateService, private _cdr: ChangeDetectorRef) {
    this._sub = this._translateService.langChanged$.subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  transform(key: string): string {
    return this._translateService.translate(key) as string;
  }

  ngOnDestroy() {
    this._sub?.unsubscribe();
  }

}
