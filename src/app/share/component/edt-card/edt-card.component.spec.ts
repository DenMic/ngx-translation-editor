import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtCardComponent } from './edt-card.component';

describe('CardComponent', () => {
  let component: EdtCardComponent;
  let fixture: ComponentFixture<EdtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
