import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargersComponent } from './chargers.component';

describe('ChargersComponent', () => {
  let component: ChargersComponent;
  let fixture: ComponentFixture<ChargersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
