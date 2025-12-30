export class ThemeManager {
    private isDark: boolean = true;

    constructor() {
        this.initializeTheme();
    }

    private initializeTheme(): void {
        // Verificar preferencia guardada
        const savedTheme = localStorage.getItem('calculatorTheme');
        
        // Verificar preferencia del sistema
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme !== null) {
            this.isDark = savedTheme === 'dark';
        } else {
            this.isDark = systemPrefersDark;
        }
        
        this.applyTheme();
        
        // Escuchar cambios en la preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('calculatorTheme')) {
                this.isDark = e.matches;
                this.applyTheme();
            }
        });
    }

    toggleTheme(): void {
        this.isDark = !this.isDark;
        this.applyTheme();
        this.saveThemePreference();
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { isDark: this.isDark }
        }));
    }

    private applyTheme(): void {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        
        if (this.isDark) {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            bodyElement.classList.remove('light');
            bodyElement.classList.add('dark');
            
            // Actualizar meta tag theme-color
            this.updateThemeColor('#0f172a');
        } else {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            bodyElement.classList.remove('dark');
            bodyElement.classList.add('light');
            
            // Actualizar meta tag theme-color
            this.updateThemeColor('#f8fafc');
        }
        
        // Aplicar animación de transición
        bodyElement.style.transition = 'background-color 0.5s ease, color 0.3s ease';
        
        console.log('🎨 Tema cambiado a:', this.isDark ? 'Oscuro' : 'Claro');
    }

    private updateThemeColor(color: string): void {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.setAttribute('content', color);
    }

    private saveThemePreference(): void {
        try {
            localStorage.setItem('calculatorTheme', this.isDark ? 'dark' : 'light');
        } catch (error) {
            console.warn('No se pudo guardar la preferencia del tema:', error);
        }
    }

    isDarkMode(): boolean {
        return this.isDark;
    }

    getCurrentTheme(): string {
        return this.isDark ? 'dark' : 'light';
    }
}