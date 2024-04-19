import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTranslationsComponent } from './column-translations.component';

describe('ColumnTranslationsComponent', () => {
  let component: ColumnTranslationsComponent;
  let fixture: ComponentFixture<ColumnTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnTranslationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
