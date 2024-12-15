import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-creditors-list',
  templateUrl: './creditors-list.component.html',
  styleUrls: ['./creditors-list.component.css']
})
export class CreditorsListComponent implements OnInit {
  activeTab: string = 'creditors';
  creditors = [
    { type: 'RECHARGE', logo: 'assets/images/maroc-telecom.png', name: 'IAM Recharges', products: ['Téléphonie et Internet SIM'] },
    { type: 'FACTURE', logo: 'assets/images/maroc-telecom.png', name: 'IAM Factures', products: ['Produit Internet SIM', 'Produit Fixe SIM', 'Produit Mobile SIM'] },
    { type: 'FACTURE', logo: 'assets/images/inwi.png', name: 'Inwi Factures', products: ['Produit Internet SIM', 'Produit Fixe SIM', 'Produit Mobile SIM'] },
    { type: 'FACTURE', logo: 'assets/images/redal.jpeg', name: 'Redal', products: ['Factures Redal'] },
    { type: 'FACTURE', logo: 'assets/images/amendis.png', name: 'Amendis Tanger', products: ['Factures Amendis Tanger'] },
    { type: 'FACTURE', logo: 'assets/images/amendis.png', name: 'Amendis Tétouan', products: ['Factures Amendis Tétouan'] },
    { type: 'FACTURE', logo: 'assets/images/lydec.jpeg', name: 'Lydec', products: ['Factures Lydec'] },
    { type: 'DONATION', logo: 'assets/images/alcs.png', name: 'ALCS DONATION', products: ['Don sidaction'] }
  ];

  paymentHistory: any[] = []; // Historique des paiements

  allCategories: string[] = ['ONCF', 'Téléphone', 'Eau', 'Électricité'];
  selectedCategory: string = 'Toutes les catégories';
  selectedCreditorForm: any = null;
  selectedProduct: string = '';
  showPopup: boolean = false;
  showConfirmationPopup: boolean = false; // Variable pour contrôler l'affichage de la confirmation
  formData: any = null;

  constructor(private formService: FormService,private location: Location) {}

  ngOnInit(): void {
    this.loadPaymentHistory();
  }

  get filteredCreditors() {
    if (this.selectedCategory === 'Toutes les catégories') {
      return this.creditors;
    } else {
      return this.creditors.filter(creditor =>
        creditor.products.includes(this.selectedCategory)
      );
    }
  }

  getCreditorPairs(creditors: any[]) {
    const pairs = [];
    for (let i = 0; i < creditors.length; i += 2) {
      pairs.push(creditors.slice(i, i + 2));
    }
    return pairs;
  }

  selectProduct(creditorType: string, product: string) {
    this.selectedProduct = product;
    console.log(`Creditor Type: ${creditorType}, Product: ${product}`);

    this.formService.getFormByType(creditorType).subscribe(
      form => {
        console.log('Form retrieved:', form);
        this.selectedCreditorForm = form;
        this.showPopup = true;
      },
      error => {
        console.error('Error fetching form:', error);
      }
    );
  }

  closePopup() {
    this.showPopup = false;
  }

  // Méthode pour charger l'historique des paiements depuis le service
  loadPaymentHistory() {
    const clientId = localStorage.getItem('clientId');
    // Remplacez 1 par l'ID du client approprié
    // @ts-ignore
    this.formService.getPaymentHistory(clientId).subscribe(
      (paymentHistory: any[]) => {
        this.paymentHistory = paymentHistory.map(payment => {
          return {
            description: payment.description, // Ajouter la description
            ...payment // Inclure les autres champs du paiement
          };
        });
        console.log(this.paymentHistory);
      },
      error => {
        console.error('Error fetching payment history:', error);
      }
    );
  }


  // Méthode pour gérer la soumission du formulaire
  handleFormSubmit(formData: any) {
    this.formData = formData;
  }

  goBack() {
    this.location.back();
  }
}
