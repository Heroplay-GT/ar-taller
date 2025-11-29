import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MarkerConfigService, MarkerConfig, MarkerContent } from '../../core/services/marker-config.service';

@Component({
  selector: 'app-marker-config',
  templateUrl: './marker-config.page.html',
  styleUrls: ['./marker-config.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class MarkerConfigPage implements OnInit {
  markers: MarkerConfig[] = [];

  constructor(
    private markerConfigService: MarkerConfigService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.loadMarkers();
  }

  async ionViewWillEnter() {
    await this.loadMarkers();
  }

  async loadMarkers() {
    this.markers = await this.markerConfigService.getConfigurations();
  }

  async toggleMarker(markerId: string) {
    await this.markerConfigService.toggleMarker(markerId);
  }

  async editMarker(marker: MarkerConfig) {
    const alert = await this.alertController.create({
      header: `Editar ${marker.markerName}`,
      subHeader: 'Personaliza el contenido',
      inputs: [
        {
          name: 'type',
          type: 'text',
          value: 'Tipo: ' + marker.content.type,
          disabled: true
        },
        {
          type: 'radio',
          label: 'Mostrar Imagen',
          value: 'image',
          checked: marker.content.type === 'image'
        },
        {
          type: 'radio',
          label: 'Mostrar Forma 3D',
          value: 'shape',
          checked: marker.content.type === 'shape'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Siguiente',
          handler: async (contentType) => {
            if (contentType === 'image') {
              await this.configureImage(marker);
            } else {
              await this.configureShape(marker);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async configureImage(marker: MarkerConfig) {
    const alert = await this.alertController.create({
      header: 'Configurar Imagen',
      inputs: [
        {
          name: 'imageUrl',
          type: 'url',
          placeholder: 'URL de la imagen',
          value: marker.content.imageUrl || ''
        },
        {
          name: 'text',
          type: 'text',
          placeholder: 'Texto a mostrar',
          value: marker.content.text || ''
        },
        {
          name: 'scale',
          type: 'number',
          placeholder: 'Escala (0.5 - 3)',
          value: marker.content.scale || 1,
          min: 0.5,
          max: 3
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            const content: MarkerContent = {
              type: 'image',
              imageUrl: data.imageUrl,
              text: data.text,
              scale: parseFloat(data.scale) || 1
            };
            await this.markerConfigService.updateMarkerConfig(marker.markerId, content);
            await this.loadMarkers();
          }
        }
      ]
    });

    await alert.present();
  }

  async configureShape(marker: MarkerConfig) {
    const alert = await this.alertController.create({
      header: 'Configurar Forma 3D',
      inputs: [
        {
          type: 'radio',
          label: '📦 Cubo',
          value: 'box',
          checked: marker.content.shape === 'box'
        },
        {
          type: 'radio',
          label: '⚪ Esfera',
          value: 'sphere',
          checked: marker.content.shape === 'sphere'
        },
        {
          type: 'radio',
          label: '🥫 Cilindro',
          value: 'cylinder',
          checked: marker.content.shape === 'cylinder'
        },
        {
          type: 'radio',
          label: '🔺 Cono',
          value: 'cone',
          checked: marker.content.shape === 'cone'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Siguiente',
          handler: async (shape) => {
            await this.configureShapeDetails(marker, shape);
          }
        }
      ]
    });

    await alert.present();
  }

  async configureShapeDetails(marker: MarkerConfig, shape: string) {
    const alert = await this.alertController.create({
      header: 'Detalles de la Forma',
      inputs: [
        {
          name: 'color',
          type: 'text',
          placeholder: 'Color (ej: #FF0000)',
          value: marker.content.color || '#FF0000'
        },
        {
          name: 'text',
          type: 'text',
          placeholder: 'Texto a mostrar',
          value: marker.content.text || ''
        },
        {
          name: 'scale',
          type: 'number',
          placeholder: 'Escala (0.5 - 3)',
          value: marker.content.scale || 1,
          min: 0.5,
          max: 3
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            const content: MarkerContent = {
              type: 'shape',
              shape: shape as any,
              color: data.color,
              text: data.text,
              scale: parseFloat(data.scale) || 1
            };
            await this.markerConfigService.updateMarkerConfig(marker.markerId, content);
            await this.loadMarkers();
          }
        }
      ]
    });

    await alert.present();
  }

  async addCustomMarker() {
    const alert = await this.alertController.create({
      header: 'Nuevo Marcador',
      message: 'Agrega un marcador personalizado',
      inputs: [
        {
          name: 'markerName',
          type: 'text',
          placeholder: 'Nombre del marcador'
        },
        {
          name: 'patternUrl',
          type: 'url',
          placeholder: 'URL del archivo .patt'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: async (data) => {
            if (data.markerName && data.patternUrl) {
              const newMarker: MarkerConfig = {
                markerId: 'custom_' + Date.now(),
                markerName: data.markerName,
                patternUrl: data.patternUrl,
                content: {
                  type: 'shape',
                  shape: 'box',
                  color: '#4F46E5',
                  text: data.markerName,
                  scale: 1
                },
                enabled: true
              };
              await this.markerConfigService.addCustomMarker(newMarker);
              await this.loadMarkers();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async resetConfigurations() {
    const alert = await this.alertController.create({
      header: 'Resetear Configuración',
      message: '¿Estás seguro de restaurar la configuración por defecto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Resetear',
          handler: async () => {
            await this.markerConfigService.resetToDefaults();
            await this.loadMarkers();
          }
        }
      ]
    });

    await alert.present();
  }
}
