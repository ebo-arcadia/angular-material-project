import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Appliance } from 'src/app/model/appliance';

@Component({
  selector: 'app-select-appliances',
  templateUrl: './select-appliances.component.html',
  styleUrls: ['./select-appliances.component.css']
})
export class SelectAppliancesComponent implements OnInit {
  title: string = '';
  applianceGroup: FormGroup;
  allAppliances: Appliance[] = [
    {applianceName: "WIFI"},
    {applianceName: "parking"},
    {applianceName: "kitchen"},
    {applianceName: "table"},
  ]

  constructor(
    
    private _dialogRef: MatDialogRef<SelectAppliancesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.applianceGroup = new FormGroup({
      appliances: new FormControl(null)
    })
  }

  ngOnInit(): void {}

}
