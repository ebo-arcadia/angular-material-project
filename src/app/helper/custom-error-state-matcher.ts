import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroupDirective } from "@angular/forms";

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: FormGroupDirective): boolean {
        return control.invalid && control.dirty
    }
}