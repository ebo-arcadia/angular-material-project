import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-select-appliances',
  templateUrl: './select-appliances.component.html',
  styleUrls: ['./select-appliances.component.css']
})
export class SelectAppliancesComponent implements OnInit {
  title: string = '';
  formGroup: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<SelectAppliancesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { 
    this.title = data.title;
    this.formGroup = new FormGroup({
      appliances: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {}

  save() { this._dialogRef.close(this.formGroup.value)};
  close() { this._dialogRef.close()}
}
