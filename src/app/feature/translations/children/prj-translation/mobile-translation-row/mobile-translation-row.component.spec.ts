import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTranslationRowComponent } from './mobile-translation-row.component';

describe('MobileTranslationRowComponent', () => {
  let component: MobileTranslationRowComponent;
  let fixture: ComponentFixture<MobileTranslationRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileTranslationRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileTranslationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
