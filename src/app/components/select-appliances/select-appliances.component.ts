import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Appliance } from 'src/app/model/Appliance';
import { startWith, map } from 'rxjs';
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes'

@Component({
  selector: 'app-select-appliances',
  templateUrl: './select-appliances.component.html',
  styleUrls: ['./select-appliances.component.css']
})
export class SelectAppliancesComponent implements OnInit {
  applianceGroup: FormGroup;
  allAppliances: Appliance[] = [
    {applianceName: "WIFI"},
    {applianceName: "Whatsapp"},
    {applianceName: "parking"},
    {applianceName: "papers"},
    {applianceName: "kitchen"},
    {applianceName: "kettle"},
    {applianceName: "table"},
    {applianceName: "tennis court"},
    {applianceName: "microwave"},
    {applianceName: "massage shop"},
    {applianceName: "washing machine"},
    {applianceName: "coffee maker"},
    {applianceName: "cough drops"},
    {applianceName: "external chargers"},
    {applianceName: "electrical toothbrush"},
  ];
  filteredAppliances: Observable<Appliance[]>;

  keysCodesConvertInputToMatChip: number[] = [ENTER, COMMA, TAB]

  @ViewChild("applianceInput") applianceInput!: ElementRef<HTMLInputElement>;

  constructor(
    
    private _dialogRef: MatDialogRef<SelectAppliancesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.applianceGroup = new FormGroup({
      appliances: new FormControl(null)
    });
    this.filteredAppliances = this.getFormControl("appliances").valueChanges.pipe(
      startWith(""),
      map((appliance: string | null) => { 
        return appliance 
        ? 
        (() => { return this.allAppliances.filter(applianceObj => 
          applianceObj.applianceName.toLowerCase().indexOf(appliance.toLowerCase()) === 0);
        })()
        : 
        this.allAppliances.slice();
      })
    );
  }

  ngOnInit(): void {}

  getFormControl(controlName: string): FormControl {
    return this.applianceGroup.get(controlName) as FormControl;
  }
  
  addAppliance(event: any): void {
    if ((event.value || "").trim()) {
      this.allAppliances.push( { applianceName: event.value.trim() });
      this.applianceGroup.patchValue({ allAppliances: null});
      this.applianceInput.nativeElement.value = "";
      };
  }

  removeAppliance(appliance: Appliance) {
    const applianceIndex = this.allAppliances.indexOf(appliance)
    if (applianceIndex >= 0) { this.allAppliances.splice(applianceIndex, 1)}
    console.info("appliance chip item removed!")
  }

  selected(event: any) {
    this.allAppliances.push({ applianceName: event.option.viewValue});
    this.applianceGroup.patchValue({ allAppliances: null});
    this.applianceInput.nativeElement.value = "";
  }

  save() { this._dialogRef.close(this.applianceGroup.value)};
  close() {this._dialogRef.close()};

}
