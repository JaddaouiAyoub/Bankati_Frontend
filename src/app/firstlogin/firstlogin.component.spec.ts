import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginComponent } from './firstlogin.component';

describe('FirstloginComponent', () => {
  let component: FirstLoginComponent;
  let fixture: ComponentFixture<FirstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
