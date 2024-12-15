import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentAccountComponent } from './create-payment-account.component';

describe('CreatePaymentAccountComponent', () => {
  let component: CreatePaymentAccountComponent;
  let fixture: ComponentFixture<CreatePaymentAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePaymentAccountComponent]
    });
    fixture = TestBed.createComponent(CreatePaymentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
