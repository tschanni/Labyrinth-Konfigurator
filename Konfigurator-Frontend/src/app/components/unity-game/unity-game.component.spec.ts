import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityGameComponent } from './unity-game.component';

describe('UnityGameComponent', () => {
  let component: UnityGameComponent;
  let fixture: ComponentFixture<UnityGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnityGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
