// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando calendario...');
    
    // Crear una instancia del calendario
    const calendario = new (window as any).Calendario();
    
    // Inicializar el calendario
    calendario.inicializar();
    
    console.log('Calendario inicializado correctamente');
});