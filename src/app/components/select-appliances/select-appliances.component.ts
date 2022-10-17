import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Observable, startWith, map} from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Appliance } from 'src/app/model/appliance';

@Component({
  selector: 'app-select-appliances',
  templateUrl: './select-appliances.component.html',
  styleUrls: ['./select-appliances.component.css']
})
export class SelectAppliancesComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA]
  title: string = '';
  formGroup: FormGroup;
  applianceCtrl = new FormControl('');
  appliances: string[] = ['microwave', 'fridge', 'internet', 'table']
  // filteredAppliances: Observable<Appliance[]>;
  allAppliances: Appliance[] = [{applianceName: 'WIFI'}]
  @ViewChild('applianceInput') applianceInput!: ElementRef<HTMLInputElement>;

  constructor(
    
    private _dialogRef: MatDialogRef<SelectAppliancesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { 
    this.title = data.title;
    this.formGroup = new FormGroup({
      appliances: new FormControl('', Validators.required)
    });
    // this.filteredAppliances = this.applianceCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((appliance: string | null) => (appliance ? this._filter(appliance) : this.allAppliances.slice()))
    // )
    appliance: new FormControl(null)
  }

  ngOnInit(): void {}

  // private _filter(value: string): Appliance[] {
  //   const filterValue = value.toLowerCase();
  //   return this.allAppliances.filter(appliance => appliance.toLowerCase().includes(filterValue));
  // }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) { this.appliances.push(value); }
    event.chipInput?.clear();
    this.applianceCtrl.setValue(null);
  }

  remove(appliance: string): void {
    const index = this.appliances.indexOf(appliance);
    if (index >= 0) { this.appliances.splice(index, 1) }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.appliances.push(event.option.viewValue);
    this.applianceInput.nativeElement.value = '';
    this.applianceCtrl.setValue(null);
  }

  save() { this._dialogRef.close(this.formGroup.value)};
  close() { this._dialogRef.close()}

}
