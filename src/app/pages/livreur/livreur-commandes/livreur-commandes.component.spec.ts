import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurCommandesComponent } from './livreur-commandes.component';

describe('LivreurCommandesComponent', () => {
  let component: LivreurCommandesComponent;
  let fixture: ComponentFixture<LivreurCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreurCommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreurCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
