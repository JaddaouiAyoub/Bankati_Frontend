import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../service/admin.service';
import { ClientDTO } from '../model/ClientDTO.model';
import { AgentService } from "../service/agent.service";
// @ts-ignore
import {Agent} from "../model/Agent.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  agents: Agent[] = [];
  clients: ClientDTO[] = [];

  agentsCount: number = 0;
  clientsCount: number = 0;

  showAgentsList: boolean = false; // Ajout de la variable
  showClientsList: boolean = false; // Ajout de la variable

  constructor(private adminService: AdminService, private agentService: AgentService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadData();
  }

  toggleClientsList(): void {
    this.showClientsList = !this.showClientsList;
  }

  toggleAgentsList(): void {
    this.showAgentsList = !this.showAgentsList;
  }

  loadData(): void {
    this.adminService.getAgents().subscribe(agents => {
      this.agents = agents;
      this.agentsCount = agents.length;
      this.loadAgentsChart(); // Charger le graphique après récupération des données
    });

    this.agentService.getClients().subscribe(clients => {
      this.clients = clients;
      this.clientsCount = clients.length;
      this.loadClientsChart(); // Charger le graphique après récupération des données
    });
  }

  loadAgentsChart(): void {
    const ctx = document.getElementById('agentsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Agents'],
        datasets: [{
          label: 'Nombre d\'agents',
          data: [this.agentsCount],
          backgroundColor: ['rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  loadClientsChart(): void {
    const ctx = document.getElementById('clientsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Clients'],
        datasets: [{
          label: 'Nombre de clients',
          data: [this.clientsCount],
          backgroundColor: ['rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(153, 102, 255, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
