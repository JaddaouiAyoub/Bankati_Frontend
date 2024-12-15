import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditorsListComponent } from './creditors-list/creditors-list.component';
import { HistoryComponent } from './history/history.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { CreatePaymentAccountComponent } from './create-payment-account/create-payment-account.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AgentComponent } from './agent-component/agent.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstLoginComponent } from './firstlogin/firstlogin.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { HomeComponent } from './home/home.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';  // Import the AuthGuard

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'creditors-list', component: CreditorsListComponent, canMatch: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canMatch: [AuthGuard] },
  { path: 'formulaire', component: FormulaireComponent, canMatch: [AuthGuard] },
  { path: 'create-payment-account', component: CreatePaymentAccountComponent, canMatch: [AuthGuard] },
  { path: 'transfer-money', component: TransferMoneyComponent, canMatch: [AuthGuard] },
  { path: 'login', component: LoginComponentComponent },
  { path: 'agent-page', component: AgentComponent, canMatch: [AuthGuard] },
  { path: 'admin-page', component: DashboardComponent, canMatch: [AuthGuard] },
  { path: 'firstlogin', component: FirstLoginComponent, canMatch: [AuthGuard] },
  { path: 'donation-form', component: DonationFormComponent, canMatch: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canMatch: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
