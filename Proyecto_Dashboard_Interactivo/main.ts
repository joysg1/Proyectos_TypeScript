// Importar módulos
import './style.css';
import { inicializarContador, incrementarContador, obtenerContador } from './counter';
import { inicializarGraficos, actualizarGraficos, agregarDatosFormulario } from './chart-utils';

// Tipo para los datos del formulario
interface FormularioData {
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  intereses: string[];
  satisfaccion: number;
  comentarios?: string;
}

// Variables globales
let formulariosEnviados: FormularioData[] = [];

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes
  inicializarContador();
  inicializarEventos();
  inicializarGraficos();
  
  // Cargar datos existentes si los hay
  cargarDatosGuardados();
  
  // Mostrar datos iniciales
  actualizarResumen();
});

// Inicializar todos los eventos
function inicializarEventos(): void {
  const form = document.getElementById('main-form') as HTMLFormElement;
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
  const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
  const edadSlider = document.getElementById('edad-slider') as HTMLInputElement;
  const edadValue = document.getElementById('edad-value') as HTMLSpanElement;
  const edadHidden = document.getElementById('edad') as HTMLInputElement;
  const satisfaccionBtns = document.querySelectorAll('.satisfaccion-btn');
  const actualizarGraficosBtn = document.getElementById('actualizar-graficos') as HTMLButtonElement;

  // Evento para el slider de edad
  edadSlider.addEventListener('input', () => {
    const value = edadSlider.value;
    edadValue.textContent = value;
    edadHidden.value = value;
  });

  // Eventos para los botones de satisfacción
  satisfaccionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-value') || '5';
      
      // Remover clase active de todos los botones
      satisfaccionBtns.forEach(b => b.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
      btn.classList.add('active');
      
      // Actualizar el valor oculto
      const satisfaccionInput = document.getElementById('satisfaccion') as HTMLInputElement;
      satisfaccionInput.value = value;
    });
  });

  // Evento para enviar el formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarFormulario();
  });

  // Evento para limpiar el formulario
  resetBtn.addEventListener('click', () => {
    limpiarFormulario();
  });

  // Evento para cambiar el tema
  themeToggle.addEventListener('click', () => {
    toggleTema();
  });

  // Evento para actualizar gráficos
  actualizarGraficosBtn.addEventListener('click', () => {
    actualizarGraficos(formulariosEnviados);
    actualizarResumen();
  });
}

// Función para enviar el formulario
function enviarFormulario(): void {
  const form = document.getElementById('main-form') as HTMLFormElement;
  const formData = new FormData(form);
  
  // Obtener valores de los checkboxes de intereses
  const interesesCheckboxes = document.querySelectorAll('input[name="intereses"]:checked');
  const intereses: string[] = Array.from(interesesCheckboxes).map((cb: Element) => (cb as HTMLInputElement).value);
  
  // Validar que haya al menos un interés seleccionado
  if (intereses.length === 0) {
    mostrarNotificacion('Error', 'Por favor selecciona al menos un área de interés.', 'error');
    return;
  }
  
  // Crear objeto con los datos del formulario
  const formularioData: FormularioData = {
    nombre: formData.get('nombre') as string,
    email: formData.get('email') as string,
    edad: parseInt(formData.get('edad') as string),
    pais: formData.get('pais') as string,
    intereses: intereses,
    satisfaccion: parseInt(formData.get('satisfaccion') as string),
    comentarios: formData.get('comentarios') as string || ''
  };
  
  // Agregar a la lista de formularios enviados
  formulariosEnviados.push(formularioData);
  
  // Actualizar contador
  incrementarContador();
  
  // Actualizar gráficos con los nuevos datos
  agregarDatosFormulario(formularioData);
  actualizarGraficos(formulariosEnviados);
  actualizarResumen();
  
  // Guardar datos en localStorage
  guardarDatos();
  
  // Mostrar notificación de éxito
  mostrarNotificacion(
    'Formulario Enviado', 
    `Gracias ${formularioData.nombre}, tus datos han sido registrados exitosamente.`, 
    'success'
  );
  
  // Limpiar formulario después de enviar
  form.reset();
  
  // Restablecer valores por defecto
  const edadSlider = document.getElementById('edad-slider') as HTMLInputElement;
  const edadValue = document.getElementById('edad-value') as HTMLSpanElement;
  const satisfaccionBtns = document.querySelectorAll('.satisfaccion-btn');
  
  edadSlider.value = '30';
  edadValue.textContent = '30';
  
  // Establecer botón de satisfacción 5 como activo por defecto
  satisfaccionBtns.forEach(btn => {
    if (btn.getAttribute('data-value') === '5') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Función para limpiar el formulario
function limpiarFormulario(): void {
  const form = document.getElementById('main-form') as HTMLFormElement;
  const edadSlider = document.getElementById('edad-slider') as HTMLInputElement;
  const edadValue = document.getElementById('edad-value') as HTMLSpanElement;
  const satisfaccionBtns = document.querySelectorAll('.satisfaccion-btn');
  
  form.reset();
  
  // Restablecer valores por defecto
  edadSlider.value = '30';
  edadValue.textContent = '30';
  
  // Establecer botón de satisfacción 5 como activo por defecto
  satisfaccionBtns.forEach(btn => {
    if (btn.getAttribute('data-value') === '5') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  mostrarNotificacion('Formulario Limpiado', 'Todos los campos han sido restablecidos.', 'info');
}

// Función para cambiar entre tema claro y oscuro
function toggleTema(): void {
  const html = document.documentElement;
  const themeIcon = document.getElementById('theme-icon') as HTMLElement;
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    themeIcon.classList.remove('fa-moon', 'text-yellow-300');
    themeIcon.classList.add('fa-sun', 'text-yellow-500');
  } else {
    html.classList.add('dark');
    themeIcon.classList.remove('fa-sun', 'text-yellow-500');
    themeIcon.classList.add('fa-moon', 'text-yellow-300');
  }
}

// Función para mostrar notificaciones
function mostrarNotificacion(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'info'): void {
  const notification = document.getElementById('notification') as HTMLElement;
  const notificationTitle = document.getElementById('notification-title') as HTMLElement;
  const notificationMessage = document.getElementById('notification-message') as HTMLElement;
  
  // Configurar colores según el tipo
  if (tipo === 'success') {
    notification.classList.remove('bg-red-600', 'bg-blue-600');
    notification.classList.add('bg-green-600');
  } else if (tipo === 'error') {
    notification.classList.remove('bg-green-600', 'bg-blue-600');
    notification.classList.add('bg-red-600');
  } else {
    notification.classList.remove('bg-green-600', 'bg-red-600');
    notification.classList.add('bg-blue-600');
  }
  
  // Configurar contenido
  notificationTitle.textContent = titulo;
  notificationMessage.textContent = mensaje;
  
  // Mostrar notificación
  notification.classList.remove('hidden');
  notification.classList.add('notification-show');
  
  // Ocultar después de 5 segundos
  setTimeout(() => {
    notification.classList.remove('notification-show');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 500);
  }, 5000);
}

// Función para actualizar el resumen de datos
function actualizarResumen(): void {
  const totalEnvios = document.getElementById('total-envios') as HTMLElement;
  const satisfaccionPromedio = document.getElementById('satisfaccion-promedio') as HTMLElement;
  const paisComun = document.getElementById('pais-comun') as HTMLElement;
  
  // Actualizar total de envíos
  totalEnvios.textContent = formulariosEnviados.length.toString();
  
  // Calcular satisfacción promedio
  if (formulariosEnviados.length > 0) {
    const sumaSatisfaccion = formulariosEnviados.reduce((sum, form) => sum + form.satisfaccion, 0);
    const promedio = sumaSatisfaccion / formulariosEnviados.length;
    satisfaccionPromedio.textContent = promedio.toFixed(1);
  } else {
    satisfaccionPromedio.textContent = '0.0';
  }
  
  // Encontrar país más común
  if (formulariosEnviados.length > 0) {
    const paises = formulariosEnviados.map(form => form.pais);
    const frecuenciaPaises: Record<string, number> = {};
    
    paises.forEach(pais => {
      frecuenciaPaises[pais] = (frecuenciaPaises[pais] || 0) + 1;
    });
    
    let paisMasComun = '';
    let maxFrecuencia = 0;
    
    Object.keys(frecuenciaPaises).forEach(pais => {
      if (frecuenciaPaises[pais] > maxFrecuencia) {
        maxFrecuencia = frecuenciaPaises[pais];
        paisMasComun = pais;
      }
    });
    
    // Mapear códigos de país a nombres
    const nombresPaises: Record<string, string> = {
      'mx': 'México',
      'es': 'España',
      'co': 'Colombia',
      'ar': 'Argentina',
      'cl': 'Chile',
      'pe': 'Perú',
      'us': 'EE.UU.',
      'otro': 'Otro'
    };
    
    paisComun.textContent = nombresPaises[paisMasComun] || paisMasComun;
  } else {
    paisComun.textContent = '-';
  }
}

// Guardar datos en localStorage
function guardarDatos(): void {
  localStorage.setItem('formulariosEnviados', JSON.stringify(formulariosEnviados));
  localStorage.setItem('contadorFormularios', obtenerContador().toString());
}

// Cargar datos desde localStorage
function cargarDatosGuardados(): void {
  const formulariosGuardados = localStorage.getItem('formulariosEnviados');
  const contadorGuardado = localStorage.getItem('contadorFormularios');
  
  if (formulariosGuardados) {
    formulariosEnviados = JSON.parse(formulariosGuardados);
  }
  
  if (contadorGuardado) {
    // Actualizar el contador visual
    const formCount = document.getElementById('form-count') as HTMLElement;
    formCount.textContent = contadorGuardado;
  }
}

// Exportar para uso en otros módulos
export type { FormularioData };
export { formulariosEnviados, mostrarNotificacion };