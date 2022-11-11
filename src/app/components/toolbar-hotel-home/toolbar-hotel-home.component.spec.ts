import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarHotelHomeComponent } from './toolbar-hotel-home.component';

describe('ToolbarHotelHomeComponent', () => {
  let component: ToolbarHotelHomeComponent;
  let fixture: ComponentFixture<ToolbarHotelHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarHotelHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarHotelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
