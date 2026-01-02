// Módulo para manejar gráficos con Chart.js
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

// Referencias a los gráficos
let edadChart: Chart<'doughnut'> | null = null;
let interesesChart: Chart<'bar'> | null = null;

// Inicializar gráficos
export function inicializarGraficos(): void {
  // Configuración común para todos los gráficos
  Chart.defaults.color = '#9CA3AF';
  Chart.defaults.font.family = "'Inter', 'system-ui', 'sans-serif'";
  Chart.defaults.font.size = 12;
  
  // Crear gráfico de distribución por edad
  const edadCanvas = document.getElementById('edad-chart') as HTMLCanvasElement;
  if (edadCanvas) {
    const ctx = edadCanvas.getContext('2d');
    if (ctx) {
      const config: ChartConfiguration<'doughnut'> = {
        type: 'doughnut',
        data: {
          labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
          datasets: [{
            label: 'Usuarios',
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(139, 92, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)'
            ],
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom' as const,
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: '#F3F4F6',
              bodyColor: '#F3F4F6',
              borderColor: '#4B5563',
              borderWidth: 1
            }
          },
          cutout: '65%'
        }
      };
      
      edadChart = new Chart(ctx, config);
    }
  }
  
  // Crear gráfico de intereses
  const interesesCanvas = document.getElementById('intereses-chart') as HTMLCanvasElement;
  if (interesesCanvas) {
    const ctx = interesesCanvas.getContext('2d');
    if (ctx) {
      const config: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: ['Tecnología', 'Diseño', 'Negocios', 'Ciencia'],
          datasets: [{
            label: 'Intereses',
            data: [0, 0, 0, 0],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(245, 158, 11, 0.7)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(139, 92, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)'
            ],
            borderWidth: 2,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(75, 85, 99, 0.3)'
              },
              ticks: {
                stepSize: 1
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: '#F3F4F6',
              bodyColor: '#F3F4F6',
              borderColor: '#4B5563',
              borderWidth: 1
            }
          }
        }
      };
      
      interesesChart = new Chart(ctx, config);
    }
  }
}

// Actualizar gráficos con datos
export function actualizarGraficos(datos: any[]): void {
  if (datos.length === 0) {
    // Si no hay datos, mostrar valores en cero
    if (edadChart && edadChart.data.datasets) {
      edadChart.data.datasets[0].data = [0, 0, 0, 0, 0];
      edadChart.update();
    }
    
    if (interesesChart && interesesChart.data.datasets) {
      interesesChart.data.datasets[0].data = [0, 0, 0, 0];
      interesesChart.update();
    }
    
    return;
  }
  
  // Calcular distribución por edades
  const distribucionEdades = [0, 0, 0, 0, 0]; // [18-25, 26-35, 36-45, 46-55, 56+]
  
  datos.forEach(form => {
    const edad = form.edad;
    if (edad >= 18 && edad <= 25) distribucionEdades[0]++;
    else if (edad >= 26 && edad <= 35) distribucionEdades[1]++;
    else if (edad >= 36 && edad <= 45) distribucionEdades[2]++;
    else if (edad >= 46 && edad <= 55) distribucionEdades[3]++;
    else distribucionEdades[4]++;
  });
  
  // Calcular distribución de intereses
  const intereses: Record<string, number> = {
    'tecnologia': 0,
    'diseno': 0,
    'negocios': 0,
    'ciencia': 0
  };
  
  datos.forEach(form => {
    form.intereses.forEach((interes: string) => {
      if (intereses.hasOwnProperty(interes)) {
        intereses[interes]++;
      }
    });
  });
  
  // Actualizar gráfico de edades
  if (edadChart && edadChart.data.datasets) {
    edadChart.data.datasets[0].data = distribucionEdades;
    edadChart.update();
  }
  
  // Actualizar gráfico de intereses
  if (interesesChart && interesesChart.data.datasets) {
    interesesChart.data.datasets[0].data = [
      intereses['tecnologia'],
      intereses['diseno'],
      intereses['negocios'],
      intereses['ciencia']
    ];
    interesesChart.update();
  }
}

// Agregar datos de un formulario a los gráficos
export function agregarDatosFormulario(formData: any): void {
  // Esta función procesa un solo formulario y actualiza los gráficos incrementalmente
  // Para simplificar, recalculamos todos los datos
  // En una aplicación real, podríamos optimizar esto
  const datosGuardados = localStorage.getItem('formulariosEnviados');
  let datos: any[] = [];
  
  if (datosGuardados) {
    datos = JSON.parse(datosGuardados);
  }
  
  datos.push(formData);
  actualizarGraficos(datos);
}