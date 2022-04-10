import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoCommandesComponent } from './resto-commandes.component';

describe('RestoCommandesComponent', () => {
  let component: RestoCommandesComponent;
  let fixture: ComponentFixture<RestoCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoCommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
