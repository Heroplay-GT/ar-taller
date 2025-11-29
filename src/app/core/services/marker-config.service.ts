import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface MarkerContent {
  type: 'image' | 'shape' | 'model';
  imageUrl?: string;
  shape?: 'box' | 'sphere' | 'cylinder' | 'cone';
  color?: string;
  text?: string;
  scale?: number;
}

export interface MarkerConfig {
  markerId: string;
  markerName: string;
  patternUrl: string;
  content: MarkerContent;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MarkerConfigService {
  private storageKey = 'marker_configurations';
  private defaultConfigs: MarkerConfig[] = [
    {
      markerId: 'cocacola',
      markerName: 'Coca-Cola',
      patternUrl: '../markers/pattern-Coca-Cola-1210.patt',
      content: {
        type: 'shape',
        shape: 'cylinder',
        color: '#FF0000',
        text: 'COCA-COLA',
        scale: 1
      },
      enabled: true
    },
    {
      markerId: 'nvidia',
      markerName: 'NVIDIA RTX',
      patternUrl: '../markers/pattern-nvidia-geforce-rtx-logo_thmb.patt',
      content: {
        type: 'shape',
        shape: 'box',
        color: '#76B900',
        text: 'NVIDIA RTX',
        scale: 1
      },
      enabled: true
    },
    {
      markerId: 'hiro',
      markerName: 'Hiro (Preset)',
      patternUrl: 'preset:hiro',
      content: {
        type: 'shape',
        shape: 'box',
        color: '#4F46E5',
        text: 'HIRO',
        scale: 1
      },
      enabled: true
    },
    {
      markerId: 'kanji',
      markerName: 'Kanji (Preset)',
      patternUrl: 'preset:kanji',
      content: {
        type: 'shape',
        shape: 'sphere',
        color: '#06B6D4',
        text: 'KANJI',
        scale: 1
      },
      enabled: true
    }
  ];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    const existing = await this.getConfigurations();
    if (!existing || existing.length === 0) {
      await this.saveConfigurations(this.defaultConfigs);
    }
  }

  async getConfigurations(): Promise<MarkerConfig[]> {
    try {
      const configs = await this.storage.get(this.storageKey);
      return configs || this.defaultConfigs;
    } catch (error) {
      console.error('Error getting configurations:', error);
      return this.defaultConfigs;
    }
  }

  async saveConfigurations(configs: MarkerConfig[]): Promise<void> {
    try {
      await this.storage.set(this.storageKey, configs);
    } catch (error) {
      console.error('Error saving configurations:', error);
    }
  }

  async updateMarkerConfig(markerId: string, content: MarkerContent): Promise<void> {
    const configs = await this.getConfigurations();
    const index = configs.findIndex(c => c.markerId === markerId);
    if (index !== -1) {
      configs[index].content = content;
      await this.saveConfigurations(configs);
    }
  }

  async toggleMarker(markerId: string): Promise<void> {
    const configs = await this.getConfigurations();
    const index = configs.findIndex(c => c.markerId === markerId);
    if (index !== -1) {
      configs[index].enabled = !configs[index].enabled;
      await this.saveConfigurations(configs);
    }
  }

  async addCustomMarker(config: MarkerConfig): Promise<void> {
    const configs = await this.getConfigurations();
    configs.push(config);
    await this.saveConfigurations(configs);
  }

  async deleteMarker(markerId: string): Promise<void> {
    const configs = await this.getConfigurations();
    const filtered = configs.filter(c => c.markerId !== markerId);
    await this.saveConfigurations(filtered);
  }

  async resetToDefaults(): Promise<void> {
    await this.saveConfigurations(this.defaultConfigs);
  }
}
