import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtPopupComponent } from './edt-popup.component';

describe('EdtPopupComponent', () => {
  let component: EdtPopupComponent;
  let fixture: ComponentFixture<EdtPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdtPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
