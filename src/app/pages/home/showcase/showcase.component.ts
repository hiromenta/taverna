import { Component, OnInit } from "@angular/core";
import { ShowcaseElement } from "../../../models/showcase.model";
import { ProductsService } from "../../../services/products.service";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotificationsService } from "../../../services/notification.service";
import { LoaderService } from "../../../services/loader.service";

@UntilDestroy()
@Component({
    selector: 'my-showcase',
    templateUrl: 'showcase.component.html',
    styleUrls: ['showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

    elements: ShowcaseElement[] = [];
    active?: ShowcaseElement;
    next?: ShowcaseElement;

    sliderInterval = setInterval(() => {}, 0);
    hidingTimeout = setTimeout(() => {}, 0);
    showingTimeout = setTimeout(() => {}, 0);

    hasListener = false;

    constructor(private _productsService: ProductsService, private _loaderService: LoaderService, private _notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this.elements = [];

        this._loaderService.show();

        this._productsService.getShowcaseElements()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (data) => {
                    this._loaderService.hide();

                    this.elements.push(...(data as ShowcaseElement[]));

                    this.active = (data as ShowcaseElement[])[0];
                    this.next = (data as ShowcaseElement[])[1];

                    this._clearAllIntervalAndTimeouts();

                    this.sliderInterval = setInterval(() => {
                        this._changeActive();
                    }, 5000);
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', err.code);
                }
            });
    }

    getInactiveElements() {
        return this.elements.filter(el => el.id !== this.active?.id);
    }

    setActive(idx: number) {
        this._clearAllIntervalAndTimeouts();

        (document.querySelector('.active') as HTMLDivElement)!.removeEventListener('load', () => {});
        this.hasListener = false;

        this._changeActive(idx);

        setTimeout(() => {
            this._clearAllIntervalAndTimeouts();

            (document.querySelector('.active') as HTMLDivElement)!.removeEventListener('load', () => {});
            this.hasListener = false;

            this.sliderInterval = setInterval(() => {
                this._changeActive();
            }, 5000);
        }, 5000);
    }

    private _changeActive(idx?: number) {
        let index = 0;

        document.querySelector('.active')?.classList.add('hide');

        this.hidingTimeout = setTimeout(() => {
            (document.querySelector('.active') as HTMLDivElement)!.style.opacity = '0';
            document.querySelector('.active')?.classList.remove('hide');

            index = this.elements.indexOf(this.active!);

            index++;

            if (index >= this.elements.length) {
                index = 0;
            }

            this.active = this.next;

            if (!this.hasListener) {
                (document.querySelector('.active') as HTMLDivElement)!.addEventListener('load', () => {
                    this.hasListener = true;
                    (document.querySelector('.active') as HTMLDivElement)!.style.opacity = '1';
                });
            }
        }, 199);

        this.showingTimeout = setTimeout(() => {
            this.active = this.elements[idx || index];
            this.next = this.elements[index === this.elements.length - 1 ? 0 : index + 1];
        }, 300);
    }

    private _clearAllIntervalAndTimeouts() {
        const interval_id = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);

        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }

        const timeout_id = window.setTimeout(() => {}, Number.MAX_SAFE_INTEGER);

        for (let i = 1; i < timeout_id; i++) {
            window.clearTimeout(i);
        }
    }

}