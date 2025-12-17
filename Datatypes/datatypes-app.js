// Clase principal de la aplicación
var DataTypeVisualizer = /** @class */ (function () {
    function DataTypeVisualizer() {
        this.types = [];
        this.activeType = 'number';
        this.currentSlideIndex = 0;
        this.isLightMode = false;
        this.isModalOpen = false;
        this.initializeTypes();
        this.initializeEventListeners();
        this.renderTypeCards();
        this.showDataTypeInfo();
    }
    // Inicializar tipos de datos
    DataTypeVisualizer.prototype.initializeTypes = function () {
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
    };
    // Inicializar event listeners
    DataTypeVisualizer.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        // Botones de tipos de datos
        var typeButtons = document.querySelectorAll('.type-btn');
        for (var i = 0; i < typeButtons.length; i++) {
            typeButtons[i].addEventListener('click', function (e) {
                var target = e.currentTarget;
                var type = target.dataset.type;
                _this.setActiveType(type);
                _this.openModal();
            });
        }
        // Botones del modal
        (_a = document.getElementById('closeModal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.closeModal(); });
        (_b = document.getElementById('prevSlide')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.prevSlide(); });
        (_c = document.getElementById('nextSlide')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.nextSlide(); });
        (_d = document.getElementById('themeToggle')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.toggleTheme(); });
        (_e = document.getElementById('copyExample')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return _this.copyExample(); });
        // Cerrar modal al hacer clic fuera
        (_f = document.getElementById('typeModal')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function (e) {
            if (e.target === document.getElementById('typeModal')) {
                _this.closeModal();
            }
        });
        // Teclado shortcuts
        document.addEventListener('keydown', function (e) {
            if (_this.isModalOpen) {
                if (e.key === 'Escape')
                    _this.closeModal();
                if (e.key === 'ArrowLeft')
                    _this.prevSlide();
                if (e.key === 'ArrowRight')
                    _this.nextSlide();
            }
        });
    };
    // Establecer tipo activo
    DataTypeVisualizer.prototype.setActiveType = function (type) {
        this.activeType = type;
        this.currentSlideIndex = 0;
        this.highlightActiveButton();
        this.showDataTypeInfo();
    };
    // Encontrar tipo por nombre
    DataTypeVisualizer.prototype.findTypeByType = function (type) {
        for (var i = 0; i < this.types.length; i++) {
            if (this.types[i].type === type) {
                return this.types[i];
            }
        }
        return undefined;
    };
    // Resaltar botón activo
    DataTypeVisualizer.prototype.highlightActiveButton = function () {
        var buttons = document.querySelectorAll('.type-btn');
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            btn.classList.remove('active');
            if (btn.dataset.type === this.activeType) {
                btn.classList.add('active');
            }
        }
    };
    // Renderizar tarjetas de tipos
    DataTypeVisualizer.prototype.renderTypeCards = function () {
        var _this = this;
        var container = document.getElementById('typeCards');
        if (!container)
            return;
        container.innerHTML = '';
        var _loop_1 = function (i) {
            var type = this_1.types[i];
            var card = document.createElement('div');
            card.className = 'type-card';
            card.style.borderColor = type.color;
            card.dataset.type = type.type;
            card.innerHTML = "\n                <div class=\"type-card-icon\" style=\"background: ".concat(type.color, "20; color: ").concat(type.color, "\">\n                    <i class=\"fas ").concat(type.icon, "\"></i>\n                </div>\n                <div class=\"type-card-content\">\n                    <h3>").concat(type.name, "</h3>\n                    <p>").concat(type.shortDescription, "</p>\n                    <div class=\"type-syntax\">").concat(type.syntax, "</div>\n                </div>\n                <div class=\"type-card-arrow\">\n                    <i class=\"fas fa-chevron-right\"></i>\n                </div>\n            ");
            card.addEventListener('click', function () {
                _this.setActiveType(type.type);
                _this.openModal();
            });
            container.appendChild(card);
        };
        var this_1 = this;
        for (var i = 0; i < this.types.length; i++) {
            _loop_1(i);
        }
    };
    // Mostrar información del tipo de dato
    DataTypeVisualizer.prototype.showDataTypeInfo = function () {
        var type = this.findTypeByType(this.activeType);
        if (!type)
            return;
        // Actualizar carrusel
        this.updateCarousel();
        // Actualizar información general
        var modalTitle = document.getElementById('modalTypeName');
        var modalIcon = document.getElementById('modalTypeIcon');
        if (modalTitle) {
            modalTitle.textContent = type.name;
            modalTitle.style.color = type.color;
        }
        if (modalIcon) {
            modalIcon.className = "fas ".concat(type.icon);
            modalIcon.style.color = type.color;
        }
        // Actualizar descripción
        var descElement = document.getElementById('typeDescription');
        if (descElement) {
            descElement.textContent = type.description;
            descElement.style.borderLeftColor = type.color;
        }
        // Actualizar sintaxis
        var syntaxElement = document.getElementById('typeSyntax');
        if (syntaxElement) {
            syntaxElement.textContent = type.syntax;
            syntaxElement.style.backgroundColor = type.color + '20';
            syntaxElement.style.borderColor = type.color;
        }
        // Actualizar valor de ejemplo
        var valueElement = document.getElementById('typeValue');
        if (valueElement) {
            valueElement.textContent = this.formatValue(type.value);
            valueElement.style.borderColor = type.color;
        }
    };
    // Actualizar carrusel
    DataTypeVisualizer.prototype.updateCarousel = function () {
        var _this = this;
        var type = this.findTypeByType(this.activeType);
        if (!type)
            return;
        var carouselInner = document.getElementById('carouselInner');
        var indicators = document.getElementById('carouselIndicators');
        if (!carouselInner || !indicators)
            return;
        carouselInner.innerHTML = '';
        indicators.innerHTML = '';
        var slides = [
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
        var _loop_2 = function (i) {
            // Slide item
            var slide = document.createElement('div');
            slide.className = "carousel-item ".concat(i === 0 ? 'active' : '');
            slide.innerHTML = "\n                <div class=\"carousel-slide-header\">\n                    <i class=\"fas ".concat(slides[i].icon, "\"></i>\n                    <h3>").concat(slides[i].title, "</h3>\n                </div>\n                <div class=\"carousel-slide-content\">\n                    ").concat(slides[i].content, "\n                </div>\n            ");
            carouselInner.appendChild(slide);
            // Indicator
            var indicator = document.createElement('button');
            indicator.className = "carousel-indicator ".concat(i === 0 ? 'active' : '');
            indicator.dataset.slide = i.toString();
            indicator.addEventListener('click', function () { return _this.goToSlide(i); });
            indicators.appendChild(indicator);
        };
        // Crear slides
        for (var i = 0; i < slides.length; i++) {
            _loop_2(i);
        }
    };
    // Crear slide de ejemplos
    DataTypeVisualizer.prototype.createExamplesSlide = function (type) {
        var html = '<div class="examples-container">';
        for (var i = 0; i < type.examples.length; i++) {
            html += "\n                <div class=\"code-example\">\n                    <pre><code>".concat(type.examples[i], "</code></pre>\n                    <button class=\"copy-btn\" data-code=\"").concat(this.escapeHtml(type.examples[i]), "\">\n                        <i class=\"fas fa-copy\"></i>\n                    </button>\n                </div>\n            ");
        }
        html += '</div>';
        return html;
    };
    // Crear slide de casos de uso
    DataTypeVisualizer.prototype.createUseCasesSlide = function (type) {
        var html = '<div class="use-cases-container">';
        for (var i = 0; i < type.commonUseCases.length; i++) {
            html += "\n                <div class=\"use-case-item\">\n                    <i class=\"fas fa-check-circle\"></i>\n                    <span>".concat(type.commonUseCases[i], "</span>\n                </div>\n            ");
        }
        html += '</div>';
        return html;
    };
    // Crear slide de mejores prácticas
    DataTypeVisualizer.prototype.createBestPracticesSlide = function (type) {
        var html = '<div class="best-practices-container">';
        for (var i = 0; i < type.bestPractices.length; i++) {
            html += "\n                <div class=\"practice-item\">\n                    <div class=\"practice-number\">".concat(i + 1, "</div>\n                    <div class=\"practice-text\">").concat(type.bestPractices[i], "</div>\n                </div>\n            ");
        }
        html += '</div>';
        return html;
    };
    // Crear slide de sintaxis
    DataTypeVisualizer.prototype.createSyntaxSlide = function (type) {
        var html = '<div class="syntax-container">';
        for (var i = 0; i < type.syntaxExamples.length; i++) {
            html += "\n                <div class=\"syntax-example\">\n                    <div class=\"syntax-header\">Variante ".concat(i + 1, "</div>\n                    <pre><code>").concat(type.syntaxExamples[i], "</code></pre>\n                </div>\n            ");
        }
        html += '</div>';
        return html;
    };
    // Formatear valor para visualización
    DataTypeVisualizer.prototype.formatValue = function (value) {
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                var formatted_1 = [];
                for (var i = 0; i < value.length; i++) {
                    formatted_1.push(this.formatSimpleValue(value[i]));
                }
                return "[".concat(formatted_1.join(', '), "]");
            }
            var keys = Object.keys(value);
            var formatted = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                formatted.push("".concat(key, ": ").concat(this.formatSimpleValue(value[key])));
            }
            return "{".concat(formatted.join(', '), "}");
        }
        return this.formatSimpleValue(value);
    };
    DataTypeVisualizer.prototype.formatSimpleValue = function (value) {
        if (typeof value === 'string')
            return "\"".concat(value, "\"");
        if (typeof value === 'boolean')
            return value ? 'true' : 'false';
        return String(value);
    };
    // Escape HTML para código
    DataTypeVisualizer.prototype.escapeHtml = function (text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    // Abrir modal
    DataTypeVisualizer.prototype.openModal = function () {
        var _this = this;
        this.isModalOpen = true;
        var modal = document.getElementById('typeModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            // Configurar botones de copia
            setTimeout(function () {
                var copyButtons = document.querySelectorAll('.copy-btn');
                for (var i = 0; i < copyButtons.length; i++) {
                    copyButtons[i].addEventListener('click', function (e) {
                        var code = e.currentTarget.dataset.code;
                        if (code) {
                            _this.copyToClipboard(code);
                        }
                    });
                }
            }, 100);
        }
    };
    // Cerrar modal
    DataTypeVisualizer.prototype.closeModal = function () {
        this.isModalOpen = false;
        var modal = document.getElementById('typeModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };
    // Navegar al slide anterior
    DataTypeVisualizer.prototype.prevSlide = function () {
        var slides = document.querySelectorAll('.carousel-item');
        if (slides.length === 0)
            return;
        this.currentSlideIndex--;
        if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = slides.length - 1;
        }
        this.updateCarouselActive();
    };
    // Navegar al siguiente slide
    DataTypeVisualizer.prototype.nextSlide = function () {
        var slides = document.querySelectorAll('.carousel-item');
        if (slides.length === 0)
            return;
        this.currentSlideIndex++;
        if (this.currentSlideIndex >= slides.length) {
            this.currentSlideIndex = 0;
        }
        this.updateCarouselActive();
    };
    // Ir a slide específico
    DataTypeVisualizer.prototype.goToSlide = function (index) {
        this.currentSlideIndex = index;
        this.updateCarouselActive();
    };
    // Actualizar slide activo del carrusel
    DataTypeVisualizer.prototype.updateCarouselActive = function () {
        var slides = document.querySelectorAll('.carousel-item');
        var indicators = document.querySelectorAll('.carousel-indicator');
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            indicators[i].classList.remove('active');
        }
        if (slides[this.currentSlideIndex]) {
            slides[this.currentSlideIndex].classList.add('active');
            indicators[this.currentSlideIndex].classList.add('active');
        }
    };
    // Copiar ejemplo al portapapeles
    DataTypeVisualizer.prototype.copyExample = function () {
        var type = this.findTypeByType(this.activeType);
        if (!type)
            return;
        var example = type.examples[0];
        this.copyToClipboard(example);
    };
    // Copiar texto al portapapeles
    DataTypeVisualizer.prototype.copyToClipboard = function (text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            this.showNotification('Código copiado al portapapeles');
        }
        catch (err) {
            this.showNotification('Error al copiar código', true);
        }
        document.body.removeChild(textarea);
    };
    // Alternar tema claro/oscuro
    DataTypeVisualizer.prototype.toggleTheme = function () {
        this.isLightMode = !this.isLightMode;
        document.body.classList.toggle('light-mode', this.isLightMode);
        var themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.isLightMode ? 'fas fa-sun' : 'fas fa-moon';
        }
        this.showNotification("Tema ".concat(this.isLightMode ? 'claro' : 'oscuro', " activado"));
    };
    // Mostrar notificación
    DataTypeVisualizer.prototype.showNotification = function (message, isError) {
        if (isError === void 0) { isError = false; }
        var notification = document.createElement('div');
        notification.className = "notification ".concat(isError ? 'error' : 'success');
        notification.textContent = message;
        notification.style.cssText = "\n            position: fixed;\n            top: 20px;\n            right: 20px;\n            padding: 15px 25px;\n            border-radius: 10px;\n            background: ".concat(isError ? '#ef4444' : '#10b981', ";\n            color: white;\n            font-weight: bold;\n            z-index: 10000;\n            animation: slideIn 0.3s ease;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.3);\n        ");
        document.body.appendChild(notification);
        setTimeout(function () {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(function () {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        if (!document.querySelector('#notification-styles')) {
            var style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = "\n                @keyframes slideIn {\n                    from { transform: translateX(100%); opacity: 0; }\n                    to { transform: translateX(0); opacity: 1; }\n                }\n                @keyframes slideOut {\n                    from { transform: translateX(0); opacity: 1; }\n                    to { transform: translateX(100%); opacity: 0; }\n                }\n            ";
            document.head.appendChild(style);
        }
    };
    return DataTypeVisualizer;
}());
// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    new DataTypeVisualizer();
});
