import { Injectable } from "@angular/core";

@Injectable()
export class LoaderService {

    private _loaderQueue: string[] = [];

    constructor() {}

    getQueue() {
        return [...this._loaderQueue];
    }

    show(subject?: string) {
        this._loaderQueue.push(subject || 'unknown');

        setTimeout(() => {
            this.hide(subject);
        }, 3000);
    }

    hide(subject?: string) {
        const index = this._loaderQueue.indexOf(subject || 'unknown');
        this._loaderQueue.splice(index, 1);
    }

}