import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationRowComponent } from './translation-row.component';

describe('TranslationRowComponent', () => {
  let component: TranslationRowComponent;
  let fixture: ComponentFixture<TranslationRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
