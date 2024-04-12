import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtButtonComponent } from './edt-button.component';

describe('EdtButtonComponent', () => {
  let component: EdtButtonComponent;
  let fixture: ComponentFixture<EdtButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdtButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
