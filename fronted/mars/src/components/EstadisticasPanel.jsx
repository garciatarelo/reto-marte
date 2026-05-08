import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function EstadisticasPanel({ selectedRouteId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarEstadisticas();
    // Auto-actualizar cada 30 segundos
    const interval = setInterval(cargarEstadisticas, 30000);
    return () => clearInterval(interval);
  }, [selectedRouteId]);

  async function cargarEstadisticas() {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getEstadisticasBiopolimeros(selectedRouteId);
      setStats(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      console.error('Error cargando estadísticas:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="state-msg">Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className="state-msg error">Error de estadísticas: {error}</div>;
  }

  if (!stats) {
    return <div className="state-msg">Sin datos todavía.</div>;
  }

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h4>Total de Siembras</h4>
        <p>{stats.total_siembras}</p>
      </div>

      <div className="stat-card">
        <h4>Crecimiento Promedio</h4>
        <p>{stats.crecimiento_promedio}%</p>
      </div>

      <div className="stat-card">
        <h4>Siembras Maduras</h4>
        <p>{stats.siembras_maduras}</p>
      </div>

      <div className="stat-card">
        <h4>Toxicidad Promedio</h4>
        <p>{Math.round(stats.toxicidad_promedio)}%</p>
      </div>
    </div>
  );
}
