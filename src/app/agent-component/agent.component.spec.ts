import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentComponent } from './agent.component';
import { CreatePaymentAccountComponent } from '../create-payment-account/create-payment-account.component';


describe('AgentComponentComponent', () => {
  let component: AgentComponent;
  let fixture: ComponentFixture<AgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
