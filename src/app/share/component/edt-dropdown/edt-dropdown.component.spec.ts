import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtDropdownComponent } from './edt-dropdown.component';

describe('EdtDropdownComponent', () => {
  let component: EdtDropdownComponent;
  let fixture: ComponentFixture<EdtDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdtDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
