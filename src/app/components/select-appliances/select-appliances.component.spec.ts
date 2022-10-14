import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAppliancesComponent } from './select-appliances.component';

describe('SelectAppliancesComponent', () => {
  let component: SelectAppliancesComponent;
  let fixture: ComponentFixture<SelectAppliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAppliancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAppliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
