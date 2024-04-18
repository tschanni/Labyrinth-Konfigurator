import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMapViewerComponent } from './game-map-viewer.component';

describe('GameMapViewerComponent', () => {
  let component: GameMapViewerComponent;
  let fixture: ComponentFixture<GameMapViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMapViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMapViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
