import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjTranslationComponent } from './prj-translation.component';

describe('PrjTranslationComponent', () => {
  let component: PrjTranslationComponent;
  let fixture: ComponentFixture<PrjTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrjTranslationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrjTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
