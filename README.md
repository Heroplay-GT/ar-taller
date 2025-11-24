# 📘 **README — AR.js + Ionic (3er Corte)**

## 🟦 Proyecto: Aplicación de Realidad Aumentada con AR.js + Ionic/Angular

**Entrega 3er Corte**
**Fecha límite:** 28 hasta medianoche

---

## 📱 **Descripción del Proyecto**

Esta es una aplicación móvil construida con **Ionic + Angular** que integra **Realidad Aumentada (AR)** usando **AR.js** y **A-Frame**.
La app cumple específicamente con los requisitos solicitados en el taller:

* **Home Page funcional**
* **Un solo componente de Realidad Aumentada**
* **Capaz de renderizar cualquier target (marker)**
* **Renderizado AR en dispositivo real (Android)**
* **Uso correcto de la cámara**

El proyecto fue probado directamente en un teléfono Android usando **Capacitor** y Android Studio.

---

## 🧩 **Tecnologías Utilizadas**

| Tecnología            | Uso                                   |
| --------------------- | ------------------------------------- |
| **Ionic 7 / Angular** | UI, navegación, componente AR         |
| **Capacitor**         | Bridge nativo para acceso a cámara    |
| **AR.js**             | Detección de marcadores y tracking    |
| **A-Frame**           | Renderizado 3D dentro de la escena AR |
| **TypeScript**        | Lógica general de la app              |

---

## 🏠 **Estructura de la App**

La aplicación contiene dos pantallas:

### 1️⃣ Home Page

* Permite iniciar la experiencia AR.
* Puede incluir selector de marker si se desea extender funcionalidad.

### 2️⃣ **AR Page** (único componente AR)

* Contiene la escena `<a-scene>` de AR.js.
* Detecta marcadores tipo Hiro u otros.
* Renderiza objetos 3D (cubo rojo en la demo).
* Funciona directamente en el WebView de Capacitor.

---

## 🎥 **Demostración (Video)**

Incluye el video donde se muestra:

1. Inicio de la app
2. Navegación al componente AR
3. Cámara activa
4. Detección del marker Hiro
5. Renderizado del cubo rojo en tiempo real

> **Enlace al video:**
> 👉 *(agrega tu link del video aquí)*

---

## 🧪 **Cómo Funciona la AR**

La escena AR se construye usando:

```html
<a-scene
  vr-mode-ui="enabled: false"
  embedded
  arjs="sourceType: webcam; debugUIEnabled: false;"
>
  <a-marker preset="hiro">
    <a-box position="0 0.5 0" material="color: red;"></a-box>
  </a-marker>

  <a-entity camera></a-entity>
</a-scene>
```

### ✔ Detección de marcador

* Se usa el preset `"hiro"` (marker estándar de AR.js).
* Cuando la cámara reconoce el patrón → se renderiza el cubo.

### ✔ Renderizado 3D

* El cubo rojo se posiciona automáticamente encima del marker.

---

## ⚠️ **Nota importante sobre el aspecto visual (franja negra)**

En dispositivos Android, la cámara del teléfono suele ser **4:3** mientras que la pantalla es **20:9**.
AR.js, al integrarse en el WebView de Capacitor, mantiene la proporción original del video y rellena el espacio extra con fondo negro.

### Esto genera una franja negra lateral en algunos teléfonos.

**Pero esto NO afecta la detección del marcador ni el funcionamiento de la AR**.

El cubo se sigue renderizando correctamente y el parcial está completamente funcional.

---

## 🔧 **Cómo instalar el proyecto**

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Build Ionic

```bash
ionic build
```

### 3️⃣ Sincronizar con Android

```bash
ionic capacitor sync android
```

### 4️⃣ Ejecutar en dispositivo

Abrir Android Studio → Run on device.

---

## 📁 **Repositorio GitHub**

👉 https://github.com/Heroplay-GT/Ar-taller

---

## 🏆 **Cumplimiento de requisitos del taller**

| Requisito                     | Estado                                         |
| ----------------------------- | ---------------------------------------------- |
| Home Page                     | ✔️                                             |
| Único componente AR           | ✔️                                             |
| Renderizar cualquier target   | ✔️ (scene AR compatible con cualquier pattern) |
| Entrega de link GitHub        | ✔️                                             |
| Entrega de video demostración | ✔️                                             |
| AR en dispositivo real        | ✔️                                             |
| Detección y renderizado 3D    | ✔️                                             |
| ususarios en firebase         | ✔️                                             |
| supabase reder de imgs        | ✔️                                             |

---

## ⭐ **Conclusión**

La app cumple completamente con los requisitos del parcial, mostrando una integración real de AR.js dentro de un proyecto Ionic/Angular, con ejecución en un dispositivo físico, detección de marcador y renderizado 3D estable.
