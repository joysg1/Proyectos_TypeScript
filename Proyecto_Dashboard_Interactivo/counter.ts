// Módulo para manejar el contador de formularios

let contadorFormularios = 0;

// Inicializar el contador
export function inicializarContador(): void {
  const contadorGuardado = localStorage.getItem('contadorFormularios');
  
  if (contadorGuardado) {
    contadorFormularios = parseInt(contadorGuardado);
  } else {
    contadorFormularios = 0;
    localStorage.setItem('contadorFormularios', '0');
  }
  
  actualizarContadorVisual();
}

// Incrementar el contador
export function incrementarContador(): number {
  contadorFormularios++;
  localStorage.setItem('contadorFormularios', contadorFormularios.toString());
  actualizarContadorVisual();
  return contadorFormularios;
}

// Obtener el valor actual del contador
export function obtenerContador(): number {
  return contadorFormularios;
}

// Actualizar el contador visual en la página
function actualizarContadorVisual(): void {
  const formCount = document.getElementById('form-count');
  if (formCount) {
    formCount.textContent = contadorFormularios.toString();
  }
}