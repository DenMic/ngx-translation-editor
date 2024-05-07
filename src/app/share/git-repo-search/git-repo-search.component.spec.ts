import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitRepoSearchComponent } from './git-repo-search.component';

describe('GitRepoSearchComponent', () => {
  let component: GitRepoSearchComponent;
  let fixture: ComponentFixture<GitRepoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitRepoSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GitRepoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
