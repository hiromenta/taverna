import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewChildren } from "@angular/core";
import { Control, ControlType, Errors, MyForm } from "../../models/form.model";
import { CheckboxComponent } from "../checkbox/checkbox.component";

@Component({
    selector: 'my-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterContentInit, AfterViewInit {

    @Input('form') form?: MyForm;

    @Output() formChanged: EventEmitter<MyForm> = new EventEmitter();

    @ViewChildren('checkboxElement') checkboxElements?: CheckboxComponent[];

    unregularInputs = [ControlType.CHECKBOX, ControlType.PHONE, ControlType.ZIPCODE];

    constructor() {}

    ngAfterContentInit(): void {
        this._updateValueAfterInit();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this._updateValueAfterInit();
        }, 100);
    }

    private _updateValueAfterInit() {
        for (const control of (this.form?.controls || [])) {
            if (!this.unregularInputs.includes(control.type)) {
                this.updateValue(control, document.querySelector('#' + control.selector) as HTMLInputElement);
            } else {
                switch (control.type) {
                    case ControlType.CHECKBOX:
                        this.updateValue(control, (this.checkboxElements || []).find(c => c.id === control.selector)!);
                        break;
                    case ControlType.PHONE:
                    case ControlType.ZIPCODE:
                        this.updateValue(control, document.querySelector('#' + control.selector) as HTMLInputElement);
                        break;
                }
            }
        }
    }

    getControlType() {
        return ControlType;
    }

    updateValue(control: Control, input: HTMLInputElement | CheckboxComponent) {
        const selectedControl = this.form!.controls.find(c => c.selector === control.selector);

        selectedControl!.value = input?.value;
        selectedControl!.state = input?.validity;
        selectedControl!.valid = selectedControl!.state?.valid;

        this.updateFormValueAndValidity();
    }

    updateText(selector: string, value: string) {
        const control = this.form?.controls.find(c => c.selector === selector);
        const input = document.querySelector('#' + selector) as HTMLInputElement;
        input.value = value;
        this.updateValue(control!, input);
    }

    updateCheckbox(selector: string, value: boolean) {
        const control = this.form?.controls.find(c => c.selector === selector);
        this.checkboxElements!.find(c => c.id === control!.selector)!.selected = value;
        this.updateValue(control!, this.checkboxElements!.find(c => c.id === control!.selector)!);
    }

    updateFormValueAndValidity() {
        const value: { [key: string]: any } = {};

        for (const control of (this.form?.controls || [])) {
            value[control.selector] = control.value;
        }

        this.form!.value = value;
        this.form!.valid = true;

        for (const control of (this.form?.controls || [])) {
            control.errors = [];

            if (!control.valid) {
                if (control.touched) {
                    const errors: string[] = [];

                    if (control.state?.badInput) {
                        errors.push(Errors.badInput);
                    }
                    if (control.state?.customError) {
                        errors.push(Errors.customError);
                    }
                    if (control.state?.patternMismatch) {
                        errors.push(Errors.patternMismatch);
                    }
                    if (control.state?.rangeOverflow) {
                        errors.push(Errors.rangeOverflow);
                    }
                    if (control.state?.rangeUnderflow) {
                        errors.push(Errors.rangeUnderflow);
                    }
                    if (control.state?.stepMismatch) {
                        errors.push(Errors.stepMismatch);
                    }
                    if (control.state?.tooLong) {
                        errors.push(Errors.tooLong);
                    }
                    if (control.state?.tooShort) {
                        errors.push(Errors.tooShort);
                    }
                    if (control.state?.typeMismatch) {
                        errors.push(Errors.typeMismatch);
                    }
                    if (control.state?.valid) {
                        errors.push(Errors.valid);
                    }
                    if (control.state?.valueMissing) {
                        errors.push(Errors.valueMissing);
                    }

                    control.errors?.push(...errors);
                }

                this.form!.valid = false;
            }
        }

        this.formChanged.emit(this.form);
    }

}