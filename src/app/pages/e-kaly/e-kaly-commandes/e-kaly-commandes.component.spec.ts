import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyCommandesComponent } from './e-kaly-commandes.component';

describe('EKalyCommandesComponent', () => {
  let component: EKalyCommandesComponent;
  let fixture: ComponentFixture<EKalyCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKalyCommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
