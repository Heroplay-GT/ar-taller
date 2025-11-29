// Función para cargar configuraciones desde localStorage
function loadMarkerConfigurations() {
  try {
    const stored = localStorage.getItem('marker_configurations');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading configurations:', error);
  }
  return getDefaultConfigurations();
}

// Configuraciones por defecto
function getDefaultConfigurations() {
  return [
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
      markerName: 'Hiro',
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
      markerName: 'Kanji',
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
}

// Generar HTML del marcador según configuración
function generateMarkerHTML(config) {
  if (!config.enabled) return '';

  const isPreset = config.patternUrl.startsWith('preset:');
  const presetName = isPreset ? config.patternUrl.split(':')[1] : null;
  
  let markerAttributes = `id="marker-${config.markerId}" smooth="true" smoothCount="5" smoothTolerance="0.01" smoothThreshold="2"`;
  
  if (isPreset) {
    markerAttributes = `preset="${presetName}" ` + markerAttributes;
  } else {
    markerAttributes = `type="pattern" url="${config.patternUrl}" emitevents="true" ` + markerAttributes;
  }

  let contentHTML = '';
  const scale = config.content.scale || 1;

  if (config.content.type === 'image' && config.content.imageUrl) {
    // Mostrar imagen
    contentHTML = `
      <a-image 
        src="${config.content.imageUrl}" 
        width="${2 * scale}" 
        height="${2 * scale}"
        position="0 1 0"
        rotation="-90 0 0"
      ></a-image>
    `;
  } else {
    // Mostrar forma 3D
    const shape = config.content.shape || 'box';
    const color = config.content.color || '#4F46E5';
    
    let shapeHTML = '';
    switch (shape) {
      case 'box':
        shapeHTML = `
          <a-box
            position="0 ${0.5 * scale} 0"
            rotation="45 45 0"
            width="${1 * scale}"
            height="${1 * scale}"
            depth="${1 * scale}"
            color="${color}"
            animation="property: rotation; to: 45 405 0; loop: true; dur: 3000; easing: linear"
          ></a-box>
        `;
        break;
      case 'sphere':
        shapeHTML = `
          <a-sphere
            position="0 ${0.7 * scale} 0"
            radius="${0.7 * scale}"
            color="${color}"
            animation="property: scale; to: ${0.8 * scale} ${0.8 * scale} ${0.8 * scale}; dir: alternate; loop: true; dur: 1000"
          ></a-sphere>
        `;
        break;
      case 'cylinder':
        shapeHTML = `
          <a-cylinder
            position="0 ${0.8 * scale} 0"
            radius="${0.4 * scale}"
            height="${1.6 * scale}"
            color="${color}"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear"
          ></a-cylinder>
        `;
        break;
      case 'cone':
        shapeHTML = `
          <a-cone
            position="0 ${0.5 * scale} 0"
            radius-bottom="${0.5 * scale}"
            radius-top="0"
            height="${1.5 * scale}"
            color="${color}"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear"
          ></a-cone>
        `;
        break;
    }
    
    contentHTML = shapeHTML;
  }

  // Agregar texto si existe
  if (config.content.text) {
    contentHTML += `
      <a-text
        value="${config.content.text}"
        position="0 ${1.5 * scale} 0"
        align="center"
        color="#FFFFFF"
        scale="${1 * scale} ${1 * scale} 1"
      ></a-text>
    `;
  }

  return `
  <a-marker ${markerAttributes}>
    ${contentHTML}
  </a-marker>
  `;
}

// Generar evento listener para marcador
function generateMarkerEventListener(config) {
  return `
  const marker_${config.markerId} = document.querySelector("#marker-${config.markerId}");
  if (marker_${config.markerId}) {
    marker_${config.markerId}.addEventListener("markerFound", () => {
      console.log("✅ Marcador ${config.markerName} detectado!");
      const statusDiv = document.getElementById('status');
      if (statusDiv) {
        statusDiv.textContent = "🎉 ¡${config.markerName.toUpperCase()} DETECTADO!";
        statusDiv.style.background = "linear-gradient(135deg, ${config.content.color || '#10B981'} 0%, ${adjustColorBrightness(config.content.color || '#10B981', -20)} 100%)";
      }
    });
    marker_${config.markerId}.addEventListener("markerLost", () => {
      console.log("❌ Marcador ${config.markerName} perdido");
      const statusDiv = document.getElementById('status');
      if (statusDiv) {
        statusDiv.textContent = "Buscando marcadores...";
        statusDiv.style.background = "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)";
      }
    });
  }
  `;
}

// Ajustar brillo del color
function adjustColorBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

// Inicializar AR con configuraciones
function initializeAR() {
  const configurations = loadMarkerConfigurations();
  const scene = document.querySelector('a-scene');
  
  if (!scene) {
    console.error('A-Scene no encontrada');
    return;
  }

  // Generar marcadores
  configurations.forEach(config => {
    if (config.enabled) {
      const markerHTML = generateMarkerHTML(config);
      scene.insertAdjacentHTML('beforeend', markerHTML);
    }
  });

  // Configurar event listeners
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      const scanFrame = document.getElementById('scanFrame');
      if (loader) loader.style.display = 'none';
      if (scanFrame) scanFrame.style.display = 'block';
    }, 2000);

    configurations.forEach(config => {
      if (config.enabled) {
        eval(generateMarkerEventListener(config));
      }
    });

    console.log('🎬 AR Inicializado con', configurations.filter(c => c.enabled).length, 'marcadores');
  });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAR);
} else {
  initializeAR();
}
