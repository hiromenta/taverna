import { AfterViewInit, Component, Input } from "@angular/core";
import { Control, ControlType, MyForm } from "../../models/form.model";

@Component({
    selector: 'my-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterViewInit {

    @Input('form') form?: MyForm;

    constructor() {}

    ngAfterViewInit(): void {
        for (const control of (this.form?.controls || [])) {
            this.updateValue(control, document.querySelector('#' + control.selector) as HTMLInputElement);
        }
    }

    getControlType() {
        return ControlType;
    }

    updateValue(control: Control, input: HTMLInputElement) {
        const selectedControl = this.form!.controls.find(c => c.selector === control.selector);

        selectedControl!.value = input.value;
        selectedControl!.state = input.validity;
        selectedControl!.valid = selectedControl!.state.valid;

        this._updateFormValueAndValidity();
    }

    private _updateFormValueAndValidity() {
        const value: { [key: string]: any } = {};

        for (const control of (this.form?.controls || [])) {
            value[control.selector] = control.value;
        }

        this.form!.value = value;

        for (const control of (this.form?.controls || [])) {
            if (!control.valid) {
                this.form!.valid = false;
                return;
            }
        }

        this.form!.valid = true;
    }

}