// Definición de tipos principales
type DataType = 
    | 'number' 
    | 'string' 
    | 'boolean' 
    | 'array' 
    | 'object' 
    | 'tuple' 
    | 'enum' 
    | 'union' 
    | 'intersection' 
    | 'literal'
    | 'null-undefined'
    | 'any-unknown'
    | 'void-never'
    | 'function';

interface TypeExample {
    name: string;
    type: DataType;
    description: string;
    shortDescription: string;
    examples: string[];
    syntaxExamples: string[];
    commonUseCases: string[];
    bestPractices: string[];
    value: any;
    syntax: string;
    icon: string;
    color: string;
}

// Clase principal de la aplicación
class DataTypeVisualizer {
    private types: TypeExample[] = [];
    private activeType: DataType = 'number';
    private currentSlideIndex: number = 0;
    private isLightMode: boolean = false;
    private isModalOpen: boolean = false;

    constructor() {
        this.initializeTypes();
        this.initializeEventListeners();
        this.renderTypeCards();
        this.showDataTypeInfo();
    }

    // Inicializar tipos de datos
    private initializeTypes(): void {
        this.types = [
            {
                name: 'Number',
                type: 'number',
                description: 'Representa valores numéricos, tanto enteros como de punto flotante. TypeScript sigue el estándar IEEE 754 para números.',
                shortDescription: 'Valores numéricos enteros o decimales',
                examples: [
                    'let age: number = 25;',
                    'let price: number = 99.99;',
                    'let binary: number = 0b1010;',
                    'let hex: number = 0xFF;',
                    'let bigNumber: number = 1_000_000;'
                ],
                syntaxExamples: [
                    'let variable: number = valor;',
                    'let variable: number = 0b1010; // binario',
                    'let variable: number = 0o777; // octal',
                    'let variable: number = 0xFF; // hexadecimal'
                ],
                commonUseCases: [
                    'Edades, precios, cantidades',
                    'Cálculos matemáticos',
                    'Índices de arrays',
                    'Coordenadas y medidas',
                    'IDs numéricos'
                ],
                bestPractices: [
                    'Usar literales numéricos claros',
                    'Evitar números mágicos',
                    'Usar constantes para valores fijos',
                    'Considerar BigInt para números grandes',
                    'Validar entradas numéricas'
                ],
                value: 42,
                syntax: 'number',
                icon: 'fa-hashtag',
                color: '#3b82f6'
            },
            {
                name: 'String',
                type: 'string',
                description: 'Representa secuencias de caracteres Unicode. Pueden ser comillas simples, dobles o backticks (template literals).',
                shortDescription: 'Texto entre comillas',
                examples: [
                    'let name: string = "TypeScript";',
                    'let message: string = `Hello ${name}`;',
                    'let multiLine: string = `Línea 1\nLínea 2`;',
                    'let empty: string = "";',
                    'let char: string = "A";'
                ],
                syntaxExamples: [
                    'let variable: string = "texto";',
                    'let variable: string = \'texto\';',
                    'let variable: string = `texto ${expresión}`;',
                    'let variable: "literal" = "literal";'
                ],
                commonUseCases: [
                    'Nombres y descripciones',
                    'Mensajes de usuario',
                    'URLs y rutas',
                    'Claves y tokens',
                    'Formato de datos'
                ],
                bestPractices: [
                    'Usar template literals para interpolación',
                    'Evitar concatenación con +',
                    'Usar const para strings constantes',
                    'Validar strings vacíos',
                    'Escape apropiado de caracteres'
                ],
                value: "Hello TypeScript!",
                syntax: 'string',
                icon: 'fa-quote-right',
                color: '#10b981'
            },
            {
                name: 'Boolean',
                type: 'boolean',
                description: 'Representa valores lógicos verdadero/falso. Esencial para control de flujo y condiciones.',
                shortDescription: 'Valores true o false',
                examples: [
                    'let isActive: boolean = true;',
                    'let hasPermission: boolean = false;',
                    'let isValid: boolean = value > 0;',
                    'let isEqual: boolean = a === b;',
                    'let flags: boolean[] = [true, false, true];'
                ],
                syntaxExamples: [
                    'let variable: boolean = true;',
                    'let variable: boolean = false;',
                    'let variable: boolean = expresión;',
                    'const CONSTANT: boolean = true;'
                ],
                commonUseCases: [
                    'Banderas y switches',
                    'Validaciones',
                    'Condiciones de control',
                    'Estados de UI',
                    'Configuraciones'
                ],
                bestPractices: [
                    'Usar nombres descriptivos (is/has/can)',
                    'Evitar valores truthy/falsy ambiguos',
                    'Usar const para booleanos constantes',
                    'Validar entradas booleanas',
                    'Documentar booleanos complejos'
                ],
                value: true,
                syntax: 'boolean',
                icon: 'fa-check-circle',
                color: '#f59e0b'
            },
            {
                name: 'Array',
                type: 'array',
                description: 'Colección ordenada de elementos del mismo tipo. Los arrays en TypeScript pueden ser de tipo fijo o dinámico.',
                shortDescription: 'Lista de elementos del mismo tipo',
                examples: [
                    'let numbers: number[] = [1, 2, 3];',
                    'let names: Array<string> = ["Ana", "Juan"];',
                    'let matrix: number[][] = [[1,2], [3,4]];',
                    'let readonly: ReadonlyArray<number> = [1,2,3];',
                    'let mixed: (number|string)[] = [1, "dos"];'
                ],
                syntaxExamples: [
                    'let variable: Tipo[] = [];',
                    'let variable: Array<Tipo> = [];',
                    'let variable: [Tipo, Tipo] = [v1, v2]; // Tuple',
                    'let variable: ReadonlyArray<Tipo> = [];'
                ],
                commonUseCases: [
                    'Listas de datos',
                    'Resultados de APIs',
                    'Colecciones de objetos',
                    'Buffers de datos',
                    'Pilas y colas'
                ],
                bestPractices: [
                    'Especificar el tipo de elementos',
                    'Usar const para arrays constantes',
                    'Considerar ReadonlyArray para inmutabilidad',
                    'Usar métodos funcionales (map, filter)',
                    'Validar arrays vacíos'
                ],
                value: [1, 2, 3, 4, 5],
                syntax: 'Tipo[] o Array<Tipo>',
                icon: 'fa-list',
                color: '#8b5cf6'
            },
            {
                name: 'Object',
                type: 'object',
                description: 'Estructura de datos con propiedades clave-valor tipadas. Puede tener propiedades opcionales, readonly y tipos indexados.',
                shortDescription: 'Estructura clave-valor tipada',
                examples: [
                    'let user: {name: string, age: number} = {name: "Ana", age: 30};',
                    'let config: Record<string, any> = {theme: "dark", lang: "es"};',
                    'let partial: Partial<User> = {name: "Juan"};',
                    'let readonly: Readonly<User> = {name: "Ana", age: 30};',
                    'let indexed: {[key: string]: number} = {"x": 1, "y": 2};'
                ],
                syntaxExamples: [
                    'let variable: {clave: Tipo} = {clave: valor};',
                    'interface Nombre {clave: Tipo;}',
                    'type Nombre = {clave: Tipo};',
                    'let variable: Record<string, Tipo> = {};'
                ],
                commonUseCases: [
                    'Modelos de datos',
                    'Configuraciones',
                    'Respuestas de API',
                    'Estado de aplicación',
                    'Opciones de función'
                ],
                bestPractices: [
                    'Usar interfaces para objetos complejos',
                    'Especificar tipos de propiedades',
                    'Usar tipos utilitarios (Partial, Pick)',
                    'Validar objetos contra interfaces',
                    'Documentar propiedades opcionales'
                ],
                value: { name: "Alice", age: 30, active: true },
                syntax: '{clave: Tipo, ...}',
                icon: 'fa-cube',
                color: '#ec4899'
            },
            {
                name: 'Tuple',
                type: 'tuple',
                description: 'Array de longitud fija con tipos específicos en cada posición. Útil para representar datos estructurados como coordenadas.',
                shortDescription: 'Array de longitud fija con tipos específicos',
                examples: [
                    'let point: [number, number] = [10, 20];',
                    'let user: [string, number, boolean] = ["Ana", 30, true];',
                    'let rgb: [number, number, number] = [255, 0, 0];',
                    'let optional: [string, number?] = ["solo"];',
                    'let rest: [string, ...number[]] = ["nums", 1, 2, 3];'
                ],
                syntaxExamples: [
                    'let variable: [Tipo1, Tipo2] = [v1, v2];',
                    'let variable: [Tipo1, Tipo2, ...Tipo3[]];',
                    'let variable: [string, number?]; // opcional',
                    'type Tuple = [string, number];'
                ],
                commonUseCases: [
                    'Coordenadas (x, y, z)',
                    'Pares clave-valor',
                    'Resultados de funciones múltiples',
                    'Argumentos agrupados',
                    'Estados específicos'
                ],
                bestPractices: [
                    'Usar para datos fijos pequeños',
                    'Documentar significado de posiciones',
                    'Considerar objetos para más de 3 elementos',
                    'Usar destructuring',
                    'Validar longitud de tuplas'
                ],
                value: ["Alice", 30, true],
                syntax: '[Tipo1, Tipo2, ...]',
                icon: 'fa-layer-group',
                color: '#06b6d4'
            },
            {
                name: 'Enum',
                type: 'enum',
                description: 'Conjunto de constantes con nombre. Pueden ser numéricos, strings o heterogéneos. Útiles para opciones predefinidas.',
                shortDescription: 'Conjunto de constantes con nombre',
                examples: [
                    'enum Color {Red, Green, Blue}',
                    'enum Direction {Up = "UP", Down = "DOWN"}',
                    'enum Status {Active = 1, Inactive = 0}',
                    'enum FileSize {KB = 1024, MB = 1024 * 1024}',
                    'const enum ConstEnum {A, B} // const enum'
                ],
                syntaxExamples: [
                    'enum Nombre {Valor1, Valor2}',
                    'enum Nombre {Valor1 = 1, Valor2 = 2}',
                    'enum Nombre {Valor1 = "TEXTO", Valor2 = "OTRO"}',
                    'const enum Nombre {Valor1, Valor2}'
                ],
                commonUseCases: [
                    'Estados de aplicación',
                    'Opciones de configuración',
                    'Códigos de error',
                    'Días de la semana',
                    'Roles de usuario'
                ],
                bestPractices: [
                    'Usar const enum para rendimiento',
                    'Prefijar nombres de enum',
                    'Usar string enums para serialización',
                    'Documentar valores de enum',
                    'Evitar enums muy grandes'
                ],
                value: { Red: 0, Green: 1, Blue: 2 },
                syntax: 'enum Nombre {Valor1, Valor2}',
                icon: 'fa-list-ol',
                color: '#14b8a6'
            }
        ];
    }

    // Inicializar event listeners
    private initializeEventListeners(): void {
        // Botones de tipos de datos
        const typeButtons = document.querySelectorAll('.type-btn');
        for (let i = 0; i < typeButtons.length; i++) {
            typeButtons[i].addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const type = target.dataset.type as DataType;
                this.setActiveType(type);
                this.openModal();
            });
        }

        // Botones del modal
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeModal());
        document.getElementById('prevSlide')?.addEventListener('click', () => this.prevSlide());
        document.getElementById('nextSlide')?.addEventListener('click', () => this.nextSlide());
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
        document.getElementById('copyExample')?.addEventListener('click', () => this.copyExample());
        
        // Cerrar modal al hacer clic fuera
        document.getElementById('typeModal')?.addEventListener('click', (e) => {
            if (e.target === document.getElementById('typeModal')) {
                this.closeModal();
            }
        });

        // Teclado shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
    }

    // Establecer tipo activo
    private setActiveType(type: DataType): void {
        this.activeType = type;
        this.currentSlideIndex = 0;
        this.highlightActiveButton();
        this.showDataTypeInfo();
    }

    // Encontrar tipo por nombre
    private findTypeByType(type: DataType): TypeExample | undefined {
        for (let i = 0; i < this.types.length; i++) {
            if (this.types[i].type === type) {
                return this.types[i];
            }
        }
        return undefined;
    }

    // Resaltar botón activo
    private highlightActiveButton(): void {
        const buttons = document.querySelectorAll('.type-btn');
        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i] as HTMLElement;
            btn.classList.remove('active');
            if (btn.dataset.type === this.activeType) {
                btn.classList.add('active');
            }
        }
    }

    // Renderizar tarjetas de tipos
    private renderTypeCards(): void {
        const container = document.getElementById('typeCards');
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < this.types.length; i++) {
            const type = this.types[i];
            const card = document.createElement('div');
            card.className = 'type-card';
            card.style.borderColor = type.color;
            card.dataset.type = type.type;

            card.innerHTML = `
                <div class="type-card-icon" style="background: ${type.color}20; color: ${type.color}">
                    <i class="fas ${type.icon}"></i>
                </div>
                <div class="type-card-content">
                    <h3>${type.name}</h3>
                    <p>${type.shortDescription}</p>
                    <div class="type-syntax">${type.syntax}</div>
                </div>
                <div class="type-card-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;

            card.addEventListener('click', () => {
                this.setActiveType(type.type);
                this.openModal();
            });

            container.appendChild(card);
        }
    }

    // Mostrar información del tipo de dato
    private showDataTypeInfo(): void {
        const type = this.findTypeByType(this.activeType);
        if (!type) return;

        // Actualizar carrusel
        this.updateCarousel();
        
        // Actualizar información general
        const modalTitle = document.getElementById('modalTypeName');
        const modalIcon = document.getElementById('modalTypeIcon');
        
        if (modalTitle) {
            modalTitle.textContent = type.name;
            modalTitle.style.color = type.color;
        }
        
        if (modalIcon) {
            modalIcon.className = `fas ${type.icon}`;
            modalIcon.style.color = type.color;
        }

        // Actualizar descripción
        const descElement = document.getElementById('typeDescription');
        if (descElement) {
            descElement.textContent = type.description;
            descElement.style.borderLeftColor = type.color;
        }

        // Actualizar sintaxis
        const syntaxElement = document.getElementById('typeSyntax');
        if (syntaxElement) {
            syntaxElement.textContent = type.syntax;
            syntaxElement.style.backgroundColor = type.color + '20';
            syntaxElement.style.borderColor = type.color;
        }

        // Actualizar valor de ejemplo
        const valueElement = document.getElementById('typeValue');
        if (valueElement) {
            valueElement.textContent = this.formatValue(type.value);
            valueElement.style.borderColor = type.color;
        }
    }

    // Actualizar carrusel
    private updateCarousel(): void {
        const type = this.findTypeByType(this.activeType);
        if (!type) return;

        const carouselInner = document.getElementById('carouselInner');
        const indicators = document.getElementById('carouselIndicators');
        
        if (!carouselInner || !indicators) return;

        carouselInner.innerHTML = '';
        indicators.innerHTML = '';

        const slides = [
            {
                title: 'Ejemplos de Código',
                content: this.createExamplesSlide(type),
                icon: 'fa-code'
            },
            {
                title: 'Casos de Uso',
                content: this.createUseCasesSlide(type),
                icon: 'fa-briefcase'
            },
            {
                title: 'Mejores Prácticas',
                content: this.createBestPracticesSlide(type),
                icon: 'fa-star'
            },
            {
                title: 'Sintaxis y Variantes',
                content: this.createSyntaxSlide(type),
                icon: 'fa-terminal'
            }
        ];

        // Crear slides
        for (let i = 0; i < slides.length; i++) {
            // Slide item
            const slide = document.createElement('div');
            slide.className = `carousel-item ${i === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <div class="carousel-slide-header">
                    <i class="fas ${slides[i].icon}"></i>
                    <h3>${slides[i].title}</h3>
                </div>
                <div class="carousel-slide-content">
                    ${slides[i].content}
                </div>
            `;
            carouselInner.appendChild(slide);

            // Indicator
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.dataset.slide = i.toString();
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicators.appendChild(indicator);
        }
    }

    // Crear slide de ejemplos
    private createExamplesSlide(type: TypeExample): string {
        let html = '<div class="examples-container">';
        for (let i = 0; i < type.examples.length; i++) {
            html += `
                <div class="code-example">
                    <pre><code>${type.examples[i]}</code></pre>
                    <button class="copy-btn" data-code="${this.escapeHtml(type.examples[i])}">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    // Crear slide de casos de uso
    private createUseCasesSlide(type: TypeExample): string {
        let html = '<div class="use-cases-container">';
        for (let i = 0; i < type.commonUseCases.length; i++) {
            html += `
                <div class="use-case-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${type.commonUseCases[i]}</span>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    // Crear slide de mejores prácticas
    private createBestPracticesSlide(type: TypeExample): string {
        let html = '<div class="best-practices-container">';
        for (let i = 0; i < type.bestPractices.length; i++) {
            html += `
                <div class="practice-item">
                    <div class="practice-number">${i + 1}</div>
                    <div class="practice-text">${type.bestPractices[i]}</div>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    // Crear slide de sintaxis
    private createSyntaxSlide(type: TypeExample): string {
        let html = '<div class="syntax-container">';
        for (let i = 0; i < type.syntaxExamples.length; i++) {
            html += `
                <div class="syntax-example">
                    <div class="syntax-header">Variante ${i + 1}</div>
                    <pre><code>${type.syntaxExamples[i]}</code></pre>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    // Formatear valor para visualización
    private formatValue(value: any): string {
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                const formatted = [];
                for (let i = 0; i < value.length; i++) {
                    formatted.push(this.formatSimpleValue(value[i]));
                }
                return `[${formatted.join(', ')}]`;
            }
            
            const keys = Object.keys(value);
            const formatted = [];
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                formatted.push(`${key}: ${this.formatSimpleValue(value[key])}`);
            }
            return `{${formatted.join(', ')}}`;
        }
        return this.formatSimpleValue(value);
    }

    private formatSimpleValue(value: any): string {
        if (typeof value === 'string') return `"${value}"`;
        if (typeof value === 'boolean') return value ? 'true' : 'false';
        return String(value);
    }

    // Escape HTML para código
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Abrir modal
    private openModal(): void {
        this.isModalOpen = true;
        const modal = document.getElementById('typeModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Configurar botones de copia
            setTimeout(() => {
                const copyButtons = document.querySelectorAll('.copy-btn');
                for (let i = 0; i < copyButtons.length; i++) {
                    copyButtons[i].addEventListener('click', (e) => {
                        const code = (e.currentTarget as HTMLElement).dataset.code;
                        if (code) {
                            this.copyToClipboard(code);
                        }
                    });
                }
            }, 100);
        }
    }

    // Cerrar modal
    private closeModal(): void {
        this.isModalOpen = false;
        const modal = document.getElementById('typeModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Navegar al slide anterior
    private prevSlide(): void {
        const slides = document.querySelectorAll('.carousel-item');
        if (slides.length === 0) return;

        this.currentSlideIndex--;
        if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = slides.length - 1;
        }
        this.updateCarouselActive();
    }

    // Navegar al siguiente slide
    private nextSlide(): void {
        const slides = document.querySelectorAll('.carousel-item');
        if (slides.length === 0) return;

        this.currentSlideIndex++;
        if (this.currentSlideIndex >= slides.length) {
            this.currentSlideIndex = 0;
        }
        this.updateCarouselActive();
    }

    // Ir a slide específico
    private goToSlide(index: number): void {
        this.currentSlideIndex = index;
        this.updateCarouselActive();
    }

    // Actualizar slide activo del carrusel
    private updateCarouselActive(): void {
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.carousel-indicator');

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            indicators[i].classList.remove('active');
        }

        if (slides[this.currentSlideIndex]) {
            slides[this.currentSlideIndex].classList.add('active');
            indicators[this.currentSlideIndex].classList.add('active');
        }
    }

    // Copiar ejemplo al portapapeles
    private copyExample(): void {
        const type = this.findTypeByType(this.activeType);
        if (!type) return;

        const example = type.examples[0];
        this.copyToClipboard(example);
    }

    // Copiar texto al portapapeles
    private copyToClipboard(text: string): void {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Código copiado al portapapeles');
        } catch (err) {
            this.showNotification('Error al copiar código', true);
        }
        
        document.body.removeChild(textarea);
    }

    // Alternar tema claro/oscuro
    private toggleTheme(): void {
        this.isLightMode = !this.isLightMode;
        document.body.classList.toggle('light-mode', this.isLightMode);
        
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.isLightMode ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        this.showNotification(`Tema ${this.isLightMode ? 'claro' : 'oscuro'} activado`);
    }

    // Mostrar notificación
    private showNotification(message: string, isError: boolean = false): void {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            background: ${isError ? '#ef4444' : '#10b981'};
            color: white;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new DataTypeVisualizer();
});