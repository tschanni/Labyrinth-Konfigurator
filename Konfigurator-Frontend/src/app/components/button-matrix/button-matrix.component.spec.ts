import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMatrixComponent } from './button-matrix.component';

describe('ButtonMatrixComponent', () => {
  let component: ButtonMatrixComponent;
  let fixture: ComponentFixture<ButtonMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
