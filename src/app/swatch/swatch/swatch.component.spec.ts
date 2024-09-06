import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwatchComponent } from './swatch.component';

describe('SwatchComponent', () => {
  let component: SwatchComponent;
  let fixture: ComponentFixture<SwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
