import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtInputComponent } from './edt-input.component';

describe('EdtInputComponent', () => {
  let component: EdtInputComponent;
  let fixture: ComponentFixture<EdtInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
