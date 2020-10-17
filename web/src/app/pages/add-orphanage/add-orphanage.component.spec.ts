import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrphanageComponent } from './add-orphanage.component';

describe('AddOrphanageComponent', () => {
  let component: AddOrphanageComponent;
  let fixture: ComponentFixture<AddOrphanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrphanageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrphanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
