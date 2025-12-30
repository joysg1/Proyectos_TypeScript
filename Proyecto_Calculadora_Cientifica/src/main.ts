import { ScientificCalculator } from './calculator';
import { ThemeManager } from './theme';

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Calculadora Científica Pro...');
    
    try {
        // Inicializar gestor de temas
        const themeManager = new ThemeManager();
        
        // Inicializar calculadora
        const calculator = new ScientificCalculator();
        
        // Configurar botón de tema
        const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
        const themeStatus = document.getElementById('theme-status') as HTMLSpanElement;
        
        themeToggle.addEventListener('click', () => {
            themeManager.toggleTheme();
            
            // Actualizar interfaz
            if (themeManager.isDarkMode()) {
                themeToggle.innerHTML = '<i class="fas fa-sun mr-2"></i>Modo Claro';
                themeStatus.textContent = 'Oscuro';
                themeToggle.classList.remove('from-blue-600', 'to-purple-600');
                themeToggle.classList.add('from-blue-600', 'to-purple-600');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon mr-2"></i>Modo Oscuro';
                themeStatus.textContent = 'Claro';
                themeToggle.classList.remove('from-blue-600', 'to-purple-600');
                themeToggle.classList.add('from-yellow-500', 'to-orange-500');
            }
        });
        
        // Actualizar estado inicial del tema
        if (!themeManager.isDarkMode()) {
            themeToggle.innerHTML = '<i class="fas fa-moon mr-2"></i>Modo Oscuro';
            themeStatus.textContent = 'Claro';
            themeToggle.classList.remove('from-blue-600', 'to-purple-600');
            themeToggle.classList.add('from-yellow-500', 'to-orange-500');
        }
        
        console.log('✅ Calculadora inicializada correctamente');
        console.log('🎨 Tema actual:', themeManager.isDarkMode() ? 'Oscuro' : 'Claro');
        
        // Mostrar mensaje de bienvenida
        setTimeout(() => {
            const welcomeMessages = [
                "¡Calculadora lista!",
                "Ingresa una expresión",
                "Usa el teclado para cálculos rápidos",
                "Las funciones científicas están disponibles"
            ];
            const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
            console.log('💡 ' + randomMessage);
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error al inicializar la calculadora:', error);
        alert('Error al cargar la calculadora. Por favor, recarga la página.');
    }
});