import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../service/form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig: any;
  @Input() product: string | undefined;
  @Output() formSubmit = new EventEmitter<any>();

  formulaire: FormGroup;
  rechargeOptions: number[] = [10, 20, 50, 100]; // Example recharge options
  formData: FormData | null = null;
  description: string | undefined;
  showForm: boolean = true; // Variable to control form visibility

  constructor(private fb: FormBuilder, private formService: FormService, private cdr: ChangeDetectorRef) {
    this.formulaire = this.fb.group({});
  }

  ngOnInit(): void {
    console.log('Form Config:', this.formConfig);
    console.log('Selected Product:', this.product);
    if (this.formConfig) {
      this.updateFormGroup(this.formConfig);
      this.description = `${this.formConfig.type} - ${this.product}`;
    }
  }

  updateFormGroup(form: any) {
    const group: any = {};
    form.fields.forEach((field: any) => {
      group[field.name] = ['', field.required ? Validators.required : null];
    });
    this.formulaire = this.fb.group(group);
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const formData = new FormData();
      let selectedAmount = null;

      // Set billerId based on form type
      let billerId;
      switch (this.formConfig.type.toUpperCase()) {
        case 'RECHARGE':
          billerId = 1;
          selectedAmount = this.formulaire.value.amount;
          break;
        case 'FACTURE':
          billerId = 2;
          selectedAmount = this.formulaire.value.amount;
          break;
        case 'DONATION':
          billerId = 3;
          selectedAmount = this.formulaire.value.amount;
          break;
        default:
          console.error('Unknown form type');
          return;
      }

      // Retrieve clientId from localStorage
      const clientId = localStorage.getItem('clientId');
      if (!clientId) {
        console.error('Client ID not found in localStorage');
        return;
      }

      // Append billerId, clientId, amount, and description to formData
      formData.append('billerId', billerId.toString());
      formData.append('clientId', clientId);
      formData.append('amount', selectedAmount);
      formData.append('description', this.description || '');

      // Append other form fields to formData
      Object.keys(this.formulaire.value).forEach(key => {
        if (key !== 'amount') {
          formData.append(key, this.formulaire.value[key]);
        }
      });

      this.formData = formData;  // Store formData for confirmation step
      console.log(formData.get('amount') + "hh ");
      this.formService.createInvoice(formData).subscribe(response => {
        console.log('Form submitted successfully', response);
        this.formSubmit.emit(this.formulaire.value); // Emit form data on successful submission
        this.showForm = false; // Hide the form after successful submission
      }, error => {
        console.error('Error submitting form', error);
      });

    } else {
      console.error('Form is invalid');
    }
  }
}

