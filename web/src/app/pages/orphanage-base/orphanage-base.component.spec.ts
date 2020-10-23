import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphanageBaseComponent } from './orphanage-base.component';

describe('OrphanageBaseComponent', () => {
  let component: OrphanageBaseComponent;
  let fixture: ComponentFixture<OrphanageBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrphanageBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphanageBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
