import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormService } from '../../service/form.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class ConfirmationComponent implements OnChanges {
  @Input() formData: any;
  @Input() formConfigType: string | undefined;
  @Output() confirmation = new EventEmitter<boolean>();

  paymentConfirmed: boolean = false;
  showInvoice: boolean = false; // Variable to control invoice visibility

  phoneNumber: string = '';
  email: string = '';
  invoiceNumber: string = '';
  period: string = '';
  amount: string = '';
  paymentDate: string = '';
  authorizationNumber: string = '';
  paymentMethod: string = '';
  cardNumber: string = '';
  transactionNumber: string = '';
  description: string = '';

  constructor(private formService: FormService) {}

  ngOnChanges() {}

  confirmPayment() {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      console.error('Client ID not found in localStorage');
      return;
    }

    const sourceAccountId = parseInt(clientId, 10);
    const amount = parseFloat(this.formData.get('amount'));

    this.formService.confirmPayment(sourceAccountId, amount).subscribe(response => {
      console.log('Payment confirmed successfully', response);
      this.paymentConfirmed = true;
      this.setInvoiceDetails();
      this.confirmation.emit(true);
    }, error => {
      console.error('Error confirming payment', error);
      this.paymentConfirmed = false;

      alert('Votre solde et insuffisant pour faire cette operation.'); // Afficher une alerte en cas d'échec du paiement
      window.location.reload();

    });
  }


  setInvoiceDetails() {
    this.phoneNumber = this.formData.get('phoneNumber');
    this.email = this.formData.get('email');
    this.invoiceNumber = '0000171682062019';
    this.period = new Date().toLocaleString();
    this.amount = this.formData.get('amount');
    this.paymentDate = new Date().toLocaleString();
    this.authorizationNumber = 'BS7591';
    this.paymentMethod = 'JIBI Application';
    this.cardNumber = '**** **** **** 0010';
    this.transactionNumber = '100001001587';
    this.description = this.formData.get('description').toUpperCase(); // Assuming 'description' is part of formData
  }

  downloadInvoice() {
    const invoiceElement = document.getElementById('invoice');

    if (invoiceElement) {
      html2canvas(invoiceElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      });
    }
  }

  toggleInvoice(show: boolean) {
    this.showInvoice = show;
  }

}
