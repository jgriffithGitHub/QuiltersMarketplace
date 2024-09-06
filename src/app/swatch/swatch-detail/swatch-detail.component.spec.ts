import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwatchDetailComponent } from './swatch-detail.component';

describe('SwatchDetailComponent', () => {
  let component: SwatchDetailComponent;
  let fixture: ComponentFixture<SwatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwatchDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
