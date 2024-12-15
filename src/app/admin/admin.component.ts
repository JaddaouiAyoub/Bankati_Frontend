import { Component, OnInit } from '@angular/core';
import { AgentService } from '../service/agent.service';
import { Router } from "@angular/router";
import {AdminService} from "../service/admin.service";
// @ts-ignore
import {Agent} from "../model/Agent.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = []; // Agents filtrés par recherche
  selectedAgent: Agent | null = null;
  searchCIN: string = ''; // Valeur de recherche par numéro de CIN

  constructor(private agentService: AgentService, private adminService : AdminService,  private router: Router) { }

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents(): void {
    this.adminService.getAgents().subscribe(
      (data: Agent[]) => {
        this.agents = data;
        this.filteredAgents = [...this.agents]; // Initialiser les agents filtrés
      },
      error => {
        console.error('Error fetching agents', error);
      }
    );
  }

  // Filtrer les agents en fonction du numéro de CIN saisi en temps réel
  filterAgents(): void {
    this.filteredAgents = this.agents.filter(agent =>
      agent.numCin.toLowerCase().includes(this.searchCIN.toLowerCase())
    );
  }

  addAgent(): void {
    this.router.navigate(['/formulaire']);
  }

  deleteAgent(id: number | undefined): void {
    this.agents = this.agents.filter(agent => agent.id !== id);
    this.adminService.deleteAgent(id).subscribe(
      () => {
        // Agent deleted successfully
      },
      error => {
        console.error('Error deleting agent', error);
      }
    );
  }

  viewDetails(agentId: number | undefined): void {
    this.selectedAgent = this.agents.find(agent => agent.id === agentId) || null;
  }

  closeDetails(): void {
    this.selectedAgent = null;
  }
}
