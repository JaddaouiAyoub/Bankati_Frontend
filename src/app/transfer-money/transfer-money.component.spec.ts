import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMoneyComponent } from './transfer-money.component';

describe('TransferMoneyComponent', () => {
  let component: TransferMoneyComponent;
  let fixture: ComponentFixture<TransferMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferMoneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
