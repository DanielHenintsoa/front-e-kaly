import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetAreaComponent } from './offset-area.component';

describe('OffsetAreaComponent', () => {
  let component: OffsetAreaComponent;
  let fixture: ComponentFixture<OffsetAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffsetAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffsetAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
