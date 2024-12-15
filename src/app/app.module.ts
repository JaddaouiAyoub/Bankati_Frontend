import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms'; // Assurez-vous que ReactiveFormsModule est importé
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePaymentAccountComponent } from './create-payment-account/create-payment-account.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import {CreditorsListComponent} from "./creditors-list/creditors-list.component";
import {HistoryComponent} from "./history/history.component";
import { MatTabsModule } from '@angular/material/tabs'
import {LoginComponentComponent} from "./login-component/login-component.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AgentComponent} from "./agent-component/agent.component";
import {PhonePrefixDirective} from "./formulaire/phonePrefixDirective";
import {ClientDetailComponent} from "./client-detail/client-detail.component";
import {AdminComponent} from "./admin/admin.component";
import {AgentDetailComponent} from "./agent-detail/agent-detail.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FirstLoginComponent} from "./firstlogin/firstlogin.component";
import {DynamicFormComponent} from "./creditors-list/dynamic-form/dynamic-form.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {ConfirmationComponent} from "./creditors-list/payment-confirmation/payment-confirmation.component";
@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    CreditorsListComponent,
    LoginComponentComponent,
    AgentComponent,
    PhonePrefixDirective,
    ClientDetailComponent,
    CreatePaymentAccountComponent,
    AdminComponent,
    AgentDetailComponent,
    DashboardComponent,
    FirstLoginComponent,
    DynamicFormComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [
    CreditorsListComponent,
    FormulaireComponent,
    CreatePaymentAccountComponent,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
