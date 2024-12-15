import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientDTO } from '../model/ClientDTO.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent {
  @Input() client: ClientDTO | null = null;
  @Output() close = new EventEmitter<void>();

  closeDetails(): void {
    this.close.emit();
  }
}
