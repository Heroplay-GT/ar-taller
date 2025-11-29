import { Component, type OnInit } from "@angular/core"
import { MarkerConfigService } from '../../core/services/marker-config.service'

@Component({
  selector: "app-ar",
  templateUrl: "./ar.page.html",
  styleUrls: ["./ar.page.scss"],
  standalone: false,
})
export class ArPage implements OnInit {
  constructor(private markerConfigService: MarkerConfigService) {}

  async ngOnInit() {
    console.log("AR Page initialized - Dynamic marker loading active")
    await this.syncConfigurationsToLocalStorage()
  }

  async ionViewWillEnter() {
    // Sincronizar cada vez que entramos a la página
    await this.syncConfigurationsToLocalStorage()
  }

  async syncConfigurationsToLocalStorage() {
    try {
      const configurations = await this.markerConfigService.getConfigurations()
      localStorage.setItem('marker_configurations', JSON.stringify(configurations))
      console.log('✅ Configuraciones sincronizadas:', configurations.length, 'marcadores')
    } catch (error) {
      console.error('Error sincronizando configuraciones:', error)
    }
  }
}

export default ArPage
