import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AgentService} from "../service/agent.service";
import {ClientService} from "../service/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-payment-account',
  templateUrl: './create-payment-account.component.html',
  styleUrls: ['./create-payment-account.component.css']
})
export class CreatePaymentAccountComponent implements OnInit {
  currentPage: number = 1;
  clientInfoForm: FormGroup;
  cinRectoFile: File | null = null;
  cinVersoFile: File | null = null;

  constructor(private fb: FormBuilder , private clientService:ClientService,private router:Router) {
    this.clientInfoForm = this.fb.group({
      product: ['COMPTE_200', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cinRecto: [null, Validators.required],
      cinVerso: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  nextPage(): void {
      this.currentPage = 2;
  }

  onSubmit(): void {
    if (this.clientInfoForm.valid && this.cinRectoFile && this.cinVersoFile) {
      const formData = new FormData();
      formData.append('account_type', this.clientInfoForm.get('product')?.value);
      formData.append('lastname', this.clientInfoForm.get('nom')?.value);
      formData.append('firstname', this.clientInfoForm.get('prenom')?.value);
      formData.append('phonenumber', this.clientInfoForm.get('telephone')?.value);
      formData.append('email', this.clientInfoForm.get('email')?.value);
      formData.append('cinRecto', this.cinRectoFile);
      formData.append('cinVerso', this.cinVersoFile);

      // Log the formData to see if files are correctly appended
      //for (let key of formData.keys()) {
        console.log(formData.get("cinRecto"));
      //}

   //   Call your service method to handle the form submission
      this.clientService.subscribeClient(formData).subscribe(
        response => {
          // Handle successful response
          console.log(response)
          this.router.navigate(['/agent-page']);        },
        error => {
          // Handle error response
          console.error(error)
        }
      );
    } else {
      console.log('Form is invalid or files are missing');
    }
  }

  onFileChange(event: Event, side: 'cinRecto' | 'cinVerso'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (side === 'cinRecto') {
        this.cinRectoFile = file;
        this.clientInfoForm.patchValue({ cinRecto: file });
        console.log('cinRectoFile set:', this.cinRectoFile);
      } else if (side === 'cinVerso') {
        this.cinVersoFile = file;
        this.clientInfoForm.patchValue({ cinVerso: file });
        console.log('cinVersoFile set:', this.cinVersoFile);
      }
    }
  }
}
