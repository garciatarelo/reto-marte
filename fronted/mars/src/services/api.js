// API Service - Gestionar todas las llamadas a Laravel
const isProd = import.meta.env.PROD;
const DEFAULT_PROD_URL = 'https://pamelatarelo18.alwaysdata.net/marsmatrix/api/api';
const DEFAULT_DEV_URL = 'http://127.0.0.1:8000/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || (isProd ? DEFAULT_PROD_URL : DEFAULT_DEV_URL);

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    const raw = await response.text();
    const preview = raw.slice(0, 120).replace(/\s+/g, ' ');
    throw new Error(`HTTP ${response.status} en ${url} -> ${preview}`);
  }

  if (!contentType.includes('application/json')) {
    const raw = await response.text();
    const preview = raw.slice(0, 120).replace(/\s+/g, ' ');
    throw new Error(`Respuesta no JSON en ${url} -> ${preview}`);
  }

  return response.json();
}

export const apiService = {
  // ROBOTS
  async getRobots() {
    return fetchJson(`${API_BASE_URL}/robots`);
  },

  async crearRobot(datos) {
    return fetchJson(`${API_BASE_URL}/robots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  },

  async actualizarRobot(id, datos) {
    return fetchJson(`${API_BASE_URL}/robots/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  },

  async getRobotUbicacion(id) {
    return fetchJson(`${API_BASE_URL}/robots/${id}/ubicacion`);
  },

  // RUTAS
  async getRutas() {
    return fetchJson(`${API_BASE_URL}/rutas`);
  },

  async generateRuta(datos) {
    return fetchJson(`${API_BASE_URL}/rutas/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  },

  async crearRuta(datos) {
    return fetchJson(`${API_BASE_URL}/rutas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  },

  async getRutasRobot(robotId) {
    return fetchJson(`${API_BASE_URL}/rutas/robot/${robotId}`);
  },

  async iniciarRuta(rutaId) {
    return fetchJson(`${API_BASE_URL}/rutas/${rutaId}/iniciar`, {
      method: 'POST',
    });
  },

  async completarRuta(rutaId) {
    return fetchJson(`${API_BASE_URL}/rutas/${rutaId}/completar`, {
      method: 'POST',
    });
  },

  async eliminarRuta(rutaId) {
    return fetchJson(`${API_BASE_URL}/rutas/${rutaId}`, {
      method: 'DELETE',
    });
  },

  // BIOPOLIMEROS
  async getBiopolimeros() {
    return fetchJson(`${API_BASE_URL}/biopolimeros`);
  },

  async crearBiopolimero(datos) {
    return fetchJson(`${API_BASE_URL}/biopolimeros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  },

  async getBiopolimerosArea(latMin, latMax, lonMin, lonMax) {
    return fetchJson(
      `${API_BASE_URL}/biopolimeros/area?lat_min=${latMin}&lat_max=${latMax}&lon_min=${lonMin}&lon_max=${lonMax}`
    );
  },

  async getEstadisticasBiopolimeros(rutaId = null) {
    const url = rutaId 
      ? `${API_BASE_URL}/biopolimeros/estadisticas?ruta_id=${rutaId}`
      : `${API_BASE_URL}/biopolimeros/estadisticas`;
    return fetchJson(url);
  },

  async getZonasToxicas() {
    return fetchJson(`${API_BASE_URL}/zonas-toxicas`);
  },

  async remediarIA(entorno) {
    const response = await fetch(`${API_BASE_URL}/ia/remediar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ entorno }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Error al ejecutar IA de remediación');
    }

    return response.json();
  },
};
