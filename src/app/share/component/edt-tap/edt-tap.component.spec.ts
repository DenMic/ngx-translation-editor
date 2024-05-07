import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtTapComponent } from './edt-tap.component';

describe('EdtTapComponent', () => {
  let component: EdtTapComponent;
  let fixture: ComponentFixture<EdtTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtTapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdtTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
