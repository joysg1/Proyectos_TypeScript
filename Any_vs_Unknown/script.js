// TypeSafeLab - Aplicación TypeScript sobre Any y Unknown Data Types
// Este archivo TypeScript se compila a script.js
// ============================================
// VARIABLES GLOBALES
// ============================================
var lineChart = null;
var radarChart = null;
var detailedLineChart = null;
var detailedBarChart = null;
var detailedRadarChart = null;
// Datos de versiones de TypeScript
var typescriptVersionsData = [
    {
        icon: 'cube-outline',
        title: 'TS 1.0',
        description: 'Primera versión estable. Tipo any desde el inicio.',
        color: '#3178c6',
        status: 'Fundacional',
        year: '2012'
    },
    {
        icon: 'layers-outline',
        title: 'TS 2.0',
        description: 'NonNullable types, control flow analysis mejorado.',
        color: '#ff6b6b',
        status: 'Importante',
        year: '2016'
    },
    {
        icon: 'shield-outline',
        title: 'TS 3.0',
        description: 'Introducción del tipo unknown, tuples en rest parameters.',
        color: '#ffd93d',
        status: 'Revolucionaria',
        year: '2018'
    },
    {
        icon: 'git-branch-outline',
        title: 'TS 3.5',
        description: 'Mejoras en type narrowing para unknown, speed optimizations.',
        color: '#8b5cf6',
        status: 'Optimización',
        year: '2019'
    },
    {
        icon: 'flash-outline',
        title: 'TS 4.0',
        description: 'Variadic tuple types, labeled tuple elements.',
        color: '#00a8ff',
        status: 'Avanzado',
        year: '2020'
    },
    {
        icon: 'sparkles-outline',
        title: 'TS 4.9',
        description: 'Operador satisfies, mejoras en unknown inference.',
        color: '#ff4757',
        status: 'Actual',
        year: '2022'
    }
];
// Datos de enfoques de tipado para simulación
var typingApproachesData = {
    'any': {
        name: 'Any',
        typeSafety: 10,
        flexibility: 100,
        maintainability: 20,
        runtimeSafety: 30,
        color: '#ff6b6b',
        description: 'Opt-out completo del sistema de tipos.',
        applications: ['Migración JS', 'Prototipado', 'APIs dinámicas'],
        jobMarket: 85,
        community: 95
    },
    'unknown': {
        name: 'Unknown',
        typeSafety: 90,
        flexibility: 70,
        maintainability: 85,
        runtimeSafety: 95,
        color: '#3178c6',
        description: 'Tipo seguro para valores desconocidos.',
        applications: ['Input externo', 'APIs genéricas', 'Valores dinámicos'],
        jobMarket: 65,
        community: 90
    },
    'typeguard': {
        name: 'Type Guard',
        typeSafety: 95,
        flexibility: 60,
        maintainability: 90,
        runtimeSafety: 98,
        color: '#ffd93d',
        description: 'Unknown con verificaciones explícitas.',
        applications: ['Validación', 'Parsing', 'Transformación'],
        jobMarket: 50,
        community: 80
    },
    'generic': {
        name: 'Genérico',
        typeSafety: 85,
        flexibility: 80,
        maintainability: 75,
        runtimeSafety: 90,
        color: '#8b5cf6',
        description: 'Tipos genéricos con restricciones.',
        applications: ['Utilidades', 'Librerías', 'Funciones reutilizables'],
        jobMarket: 40,
        community: 70
    }
};
// ============================================
// FUNCIONES DE INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('TypeSafeLab: Inicializando aplicación...');
    initTypeScriptParticles();
    initTypeScriptVersions();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTypingSimulation();
    initCharts();
    console.log('Aplicación TypeSafeLab inicializada correctamente');
});
// ============================================
// FUNCIÓN: INICIALIZAR PARTÍCULAS
// ============================================
function initTypeScriptParticles() {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) {
        console.error('Canvas no encontrado');
        return;
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('No se pudo obtener el contexto 2D');
        return;
    }
    var particles = [];
    var particleCount = 60;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    function createParticles() {
        particles = [];
        for (var i = 0; i < particleCount; i++) {
            var type = Math.random();
            var color = void 0;
            var size = void 0;
            var speed = void 0;
            var particleType = void 0;
            if (type < 0.5) {
                // Partículas de Type (azul TypeScript)
                color = "rgba(49, 120, 198, ".concat(Math.random() * 0.4 + 0.1, ")");
                size = Math.random() * 6 + 3;
                speed = (Math.random() - 0.5) * 0.4;
                particleType = 'type';
            }
            else if (type < 0.8) {
                // Partículas de Any (rojo advertencia)
                color = "rgba(255, 107, 107, ".concat(Math.random() * 0.3 + 0.1, ")");
                size = Math.random() * 5 + 2;
                speed = (Math.random() - 0.5) * 0.5;
                particleType = 'any';
            }
            else {
                // Partículas de Unknown (amarillo seguro)
                color = "rgba(255, 217, 61, ".concat(Math.random() * 0.3 + 0.1, ")");
                size = Math.random() * 7 + 4;
                speed = (Math.random() - 0.5) * 0.3;
                particleType = 'unknown';
            }
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: size,
                speedX: speed,
                speedY: speed * 0.5,
                color: color,
                pulseSpeed: Math.random() * 0.05 + 0.02,
                pulseOffset: Math.random() * Math.PI * 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.03,
                type: particleType
            });
        }
    }
    function drawTypeSymbol(context, x, y, size, rotation, type) {
        context.save();
        context.translate(x, y);
        context.rotate(rotation);
        if (type === 'type') {
            // Símbolo de Type (T)
            context.beginPath();
            context.moveTo(-size, -size * 0.8);
            context.lineTo(size, -size * 0.8);
            context.moveTo(0, -size * 0.8);
            context.lineTo(0, size * 0.8);
            context.stroke();
        }
        else if (type === 'any') {
            // Símbolo de advertencia (triángulo)
            context.beginPath();
            context.moveTo(0, -size);
            context.lineTo(-size * 0.866, size * 0.5);
            context.lineTo(size * 0.866, size * 0.5);
            context.closePath();
            context.stroke();
        }
        else {
            // Símbolo de seguridad (escudo)
            context.beginPath();
            context.moveTo(0, -size);
            context.bezierCurveTo(size * 0.5, -size * 0.5, size * 0.5, size * 0.3, 0, size);
            context.bezierCurveTo(-size * 0.5, size * 0.3, -size * 0.5, -size * 0.5, 0, -size);
            context.closePath();
            context.stroke();
        }
        context.restore();
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Fondo sutil
        var gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2);
        gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
        gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Dibujar conexiones entre partículas cercanas
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150 && particles[i].type === particles[j].type) {
                    var alpha = 0.1;
                    var strokeColor = void 0;
                    if (particles[i].type === 'type') {
                        strokeColor = "rgba(49, 120, 198, ".concat(alpha, ")");
                    }
                    else if (particles[i].type === 'any') {
                        strokeColor = "rgba(255, 107, 107, ".concat(alpha, ")");
                    }
                    else {
                        strokeColor = "rgba(255, 217, 61, ".concat(alpha, ")");
                    }
                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        // Actualizar y dibujar partículas
        particles.forEach(function (particle) {
            var _a;
            // Movimiento
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;
            // Rebote en bordes
            if (particle.x < 0 || particle.x > canvas.width)
                particle.speedX = -particle.speedX;
            if (particle.y < 0 || particle.y > canvas.height)
                particle.speedY = -particle.speedY;
            // Efecto de pulso
            var pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
            var colorParts = particle.color.split(',');
            var alphaString = ((_a = colorParts[3]) === null || _a === void 0 ? void 0 : _a.split(')')[0]) || '0.5';
            var currentAlpha = parseFloat(alphaString) * pulse;
            // Dibujar partícula
            ctx.save();
            if (particle.type === 'any') {
                // Gradiente para partículas any
                var gradient_1 = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 1.5);
                gradient_1.addColorStop(0, particle.color.replace(/[\d.]+\)$/, "".concat(currentAlpha, ")")));
                gradient_1.addColorStop(1, particle.color.replace(/[\d.]+\)$/, '0)'));
                ctx.fillStyle = gradient_1;
            }
            else {
                ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, "".concat(currentAlpha, ")"));
            }
            // Dibujar símbolo basado en tipo
            drawTypeSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.type);
            // Rellenar solo para type
            if (particle.type === 'type') {
                drawTypeSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.type);
                ctx.fill();
            }
            else {
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, "".concat(currentAlpha * 0.7, ")"));
                drawTypeSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.type);
                ctx.stroke();
            }
            ctx.restore();
        });
        requestAnimationFrame(animateParticles);
    }
    window.addEventListener('resize', function () {
        resizeCanvas();
        createParticles();
    });
    resizeCanvas();
    createParticles();
    animateParticles();
    console.log('Partículas de TypeScript inicializadas');
}
// ============================================
// FUNCIÓN: INICIALIZAR VERSIONES
// ============================================
function initTypeScriptVersions() {
    var container = document.getElementById('productionInfo');
    if (!container) {
        console.error('Contenedor de versiones no encontrado');
        return;
    }
    container.innerHTML = "\n        <h3 class=\"text-xl font-bold mb-4 text-ts-accent-light\">Evoluci\u00F3n de Versiones de TypeScript</h3>\n        <div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\" id=\"versionsGrid\">\n            ".concat(typescriptVersionsData.map(function (version) { return "\n                <div class=\"method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-ts-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer\" data-method=\"".concat(version.title, "\">\n                    <div class=\"flex items-center mb-3\">\n                        <div class=\"w-12 h-12 rounded-lg flex items-center justify-center mr-3\" style=\"background: ").concat(version.color, "20; color: ").concat(version.color, ";\">\n                            <ion-icon name=\"").concat(version.icon, "\" class=\"text-xl\"></ion-icon>\n                        </div>\n                        <div>\n                            <h4 class=\"font-bold\">").concat(version.title, "</h4>\n                            <div class=\"flex items-center gap-2 mt-1\">\n                                <span class=\"px-2 py-1 text-xs rounded\" style=\"background: ").concat(version.color, "20; color: ").concat(version.color, ";\">").concat(version.status, "</span>\n                                <span class=\"text-xs text-text-muted\">").concat(version.year, "</span>\n                            </div>\n                        </div>\n                    </div>\n                    <p class=\"text-sm text-text-secondary\">").concat(version.description, "</p>\n                </div>\n            "); }).join(''), "\n        </div>\n    ");
    // Añadir event listeners a las tarjetas de versiones
    document.querySelectorAll('.method-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var versionName = this.getAttribute('data-method');
            if (versionName) {
                showVersionDetail(versionName);
            }
        });
    });
    console.log('Versiones de TypeScript inicializadas: ' + typescriptVersionsData.length);
}
// ============================================
// FUNCIÓN: MOSTRAR DETALLE DE VERSIÓN
// ============================================
function showVersionDetail(versionName) {
    var _a, _b;
    // Versión alternativa a .find() para compatibilidad
    var version;
    for (var _i = 0, typescriptVersionsData_1 = typescriptVersionsData; _i < typescriptVersionsData_1.length; _i++) {
        var v = typescriptVersionsData_1[_i];
        if (v.title === versionName) {
            version = v;
            break;
        }
    }
    if (!version)
        return;
    var details = {
        'TS 1.0': {
            features: 'Sistema de tipos básico, any, interfaces, clases',
            impact: 'Establece las bases del type system moderno',
            adoption: 'Adopción inicial lenta, principalmente en Microsoft',
            size: '~100kb',
            npmDownloads: '~5k/mes'
        },
        'TS 2.0': {
            features: 'NonNullable types, control flow analysis, tipo never',
            impact: 'Mejora significativa en inferencia de tipos',
            adoption: 'Crecimiento acelerado en comunidad JavaScript',
            size: '~150kb',
            npmDownloads: '~500k/mes'
        },
        'TS 3.0': {
            features: 'Tipo unknown, tuples en rest parameters, project references',
            impact: 'Introduce alternativa segura a any, mejora arquitectura',
            adoption: 'Adopción masiva, estándar en desarrollo frontend',
            size: '~200kb',
            npmDownloads: '~5M/mes'
        },
        'TS 3.5': {
            features: 'Mejoras en type narrowing para unknown, speed optimizations',
            impact: 'Hace unknown más práctico y eficiente',
            adoption: 'Consolidación como herramienta esencial',
            size: '~220kb',
            npmDownloads: '~10M/mes'
        },
        'TS 4.0': {
            features: 'Variadic tuple types, labeled tuple elements, clase static blocks',
            impact: 'Avances en type system para patrones complejos',
            adoption: 'Adopción casi universal en proyectos TypeScript',
            size: '~250kb',
            npmDownloads: '~15M/mes'
        },
        'TS 4.9': {
            features: 'Operador satisfies, mejoras en unknown inference, speed',
            impact: 'Mejora ergonomía y seguridad con tipos complejos',
            adoption: 'Estado del arte en type safety',
            size: '~270kb',
            npmDownloads: '~20M/mes'
        }
    };
    var versionDetails = details[version.title] || {
        features: '',
        impact: '',
        adoption: '',
        size: '',
        npmDownloads: ''
    };
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
    modal.innerHTML = "\n        <div class=\"bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95\">\n            <button class=\"modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl\">\n                &times;\n            </button>\n            <div class=\"flex items-center mb-6\">\n                <div class=\"w-16 h-16 rounded-xl flex items-center justify-center mr-4\" style=\"background: ".concat(version.color, "20; color: ").concat(version.color, ";\">\n                    <ion-icon name=\"").concat(version.icon, "\" class=\"text-3xl\"></ion-icon>\n                </div>\n                <div>\n                    <h2 class=\"text-2xl font-bold\" style=\"color: ").concat(version.color, ";\">").concat(version.title, "</h2>\n                    <p class=\"text-text-secondary mt-1\">").concat(version.description, "</p>\n                </div>\n            </div>\n            \n            <div class=\"space-y-4\">\n                ").concat(versionDetails.features ? "\n                    <div>\n                        <h4 class=\"font-bold mb-2 text-ts-accent-light\">Caracter\u00EDsticas Principales:</h4>\n                        <p class=\"text-text-secondary\">".concat(versionDetails.features, "</p>\n                    </div>\n                ") : '', "\n                \n                <div class=\"grid grid-cols-2 gap-4\">\n                    ").concat(versionDetails.impact ? "\n                        <div class=\"bg-gray-900/50 rounded-lg p-3\">\n                            <h4 class=\"font-bold text-sm mb-1 text-ts-accent-light\">Impacto</h4>\n                            <p class=\"text-text-secondary text-sm\">".concat(versionDetails.impact, "</p>\n                        </div>\n                    ") : '', "\n                    \n                    ").concat(versionDetails.adoption ? "\n                        <div class=\"bg-gray-900/50 rounded-lg p-3\">\n                            <h4 class=\"font-bold text-sm mb-1 text-ts-accent-light\">Adopci\u00F3n</h4>\n                            <p class=\"text-text-secondary text-sm\">".concat(versionDetails.adoption, "</p>\n                        </div>\n                    ") : '', "\n                    \n                    ").concat(versionDetails.size ? "\n                        <div class=\"bg-gray-900/50 rounded-lg p-3\">\n                            <h4 class=\"font-bold text-sm mb-1 text-ts-accent-light\">Tama\u00F1o</h4>\n                            <p class=\"text-text-secondary text-sm\">".concat(versionDetails.size, "</p>\n                        </div>\n                    ") : '', "\n                    \n                    ").concat(versionDetails.npmDownloads ? "\n                        <div class=\"bg-gray-900/50 rounded-lg p-3\">\n                            <h4 class=\"font-bold text-sm mb-1 text-ts-accent-light\">Descargas NPM</h4>\n                            <p class=\"text-text-secondary text-sm\">".concat(versionDetails.npmDownloads, "</p>\n                        </div>\n                    ") : '', "\n                </div>\n                \n                <div class=\"bg-gray-900/50 rounded-lg p-4 mt-4\">\n                    <div class=\"font-mono text-sm\">\n                        <span class=\"text-ts-accent-light\"># Legado de ").concat(version.title, ":</span><br>\n                        <span class=\"text-text-secondary\">\u2022 ").concat(getVersionLegacy(version.title), "</span><br>\n                        <span class=\"text-text-secondary\">\u2022 ").concat(getVersionImpact(version.title), "</span>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"mt-6 flex justify-center\">\n                <button class=\"close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105\" style=\"background: ").concat(version.color, ";\">\n                    <ion-icon name=\"close-outline\" class=\"mr-2\"></ion-icon> Cerrar\n                </button>\n            </div>\n        </div>\n    ");
    document.body.appendChild(modal);
    // Animar entrada
    setTimeout(function () {
        var modalContent = modal.querySelector('.bg-card-bg-solid');
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
    // Función auxiliar para obtener legado de versión
    function getVersionLegacy(title) {
        switch (title) {
            case 'TS 1.0': return 'Introdujo el sistema de tipos sobre JavaScript';
            case 'TS 2.0': return 'Mejoró significativamente la inferencia de tipos';
            case 'TS 3.0': return 'Introdujo unknown como alternativa segura a any';
            case 'TS 3.5': return 'Optimizó el manejo de tipos complejos';
            case 'TS 4.0': return 'Avanzó en tipos para patrones funcionales';
            case 'TS 4.9': return 'Mejoró la ergonomía del type system';
            default: return 'Contribuyó al desarrollo de TypeScript';
        }
    }
    // Función auxiliar para obtener impacto de versión
    function getVersionImpact(title) {
        switch (title) {
            case 'TS 1.0': return 'Sentó las bases para el desarrollo TypeScript moderno';
            case 'TS 2.0': return 'Hizo TypeScript más atractivo para proyectos grandes';
            case 'TS 3.0': return 'Promovió la seguridad de tipos sobre la conveniencia';
            case 'TS 3.5': return 'Hizo el código TypeScript más rápido y seguro';
            case 'TS 4.0': return 'Permitió expresar patrones complejos de forma segura';
            case 'TS 4.9': return 'Facilitó el trabajo con tipos complejos manteniendo seguridad';
            default: return 'Impactó positivamente en la comunidad TypeScript';
        }
    }
    // Event listeners para cerrar el modal
    var closeModal = function () {
        var modalContent = modal.querySelector('.bg-card-bg-solid');
        if (modalContent) {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
        }
        setTimeout(function () {
            modal.remove();
        }, 300);
    };
    (_a = modal.querySelector('.modal-close-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeModal);
    (_b = modal.querySelector('.close-detail-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeModal);
    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}
// ============================================
// FUNCIÓN: INICIALIZAR TIMELINE
// ============================================
function initTimeline() {
    var timelineItems = document.querySelectorAll('.timeline-item');
    console.log('Elementos timeline encontrados: ' + timelineItems.length);
    // Mostrar todos los elementos inmediatamente
    timelineItems.forEach(function (item, index) {
        setTimeout(function () {
            item.classList.add('opacity-100');
        }, index * 200);
    });
    // También agregar observador para animación al hacer scroll
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
            }
        });
    }, { threshold: 0.1 });
    timelineItems.forEach(function (item) {
        item.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
        observer.observe(item);
    });
    console.log('Timeline inicializada');
}
// ============================================
// FUNCIÓN: INICIALIZAR GRÁFICOS
// ============================================
function initCharts() {
    console.log('Inicializando gráficos...');
    // Verificar si Chart.js está disponible
    if (typeof window.Chart === 'undefined') {
        console.warn('Chart.js no está cargado. Intentando cargar...');
        loadChartJS();
        return;
    }
    // Gráfico de líneas principal
    var lineChartCanvas = document.getElementById('lineChartCanvas');
    if (lineChartCanvas) {
        var parent_1 = lineChartCanvas.parentElement;
        if (parent_1) {
            lineChartCanvas.width = parent_1.clientWidth;
            lineChartCanvas.height = parent_1.clientHeight;
        }
        var ctx = lineChartCanvas.getContext('2d');
        if (ctx) {
            lineChart = createLineChart(ctx, getTypingApproachComparisonData());
        }
    }
    // Gráfico de radar principal
    var radarChartCanvas = document.getElementById('radarChartCanvas');
    if (radarChartCanvas) {
        var parent_2 = radarChartCanvas.parentElement;
        if (parent_2) {
            radarChartCanvas.width = parent_2.clientWidth;
            radarChartCanvas.height = parent_2.clientHeight;
        }
        var ctx = radarChartCanvas.getContext('2d');
        if (ctx) {
            radarChart = createRadarChart(ctx, getRadarChartData('any'));
        }
    }
    console.log('Gráficos inicializados');
}
// ============================================
// FUNCIÓN: CARGAR CHART.JS
// ============================================
function loadChartJS() {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function () {
        console.log('Chart.js cargado correctamente');
        initCharts();
        initTypingSimulation();
    };
    script.onerror = function () {
        console.error('Error al cargar Chart.js');
        showNotification('Error al cargar librería de gráficos. Recarga la página.', 'error');
    };
    document.head.appendChild(script);
}
// ============================================
// FUNCIÓN: CREAR GRÁFICO DE LÍNEAS
// ============================================
function createLineChart(ctx, data) {
    return new window.Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 50, 0.9)',
                    titleColor: '#4d93f0',
                    bodyColor: '#cbd5e1',
                    borderColor: '#3178c6',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 11
                        }
                    },
                    beginAtZero: true,
                    max: 100
                }
            },
            elements: {
                line: {
                    tension: 0.4
                },
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
}
// ============================================
// FUNCIÓN: CREAR GRÁFICO DE RADAR
// ============================================
function createRadarChart(ctx, data) {
    return new window.Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        circular: true
                    },
                    pointLabels: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 11
                        }
                    },
                    ticks: {
                        color: '#94a3b8',
                        backdropColor: 'transparent',
                        showLabelBackdrop: false
                    },
                    beginAtZero: true,
                    max: 100,
                    min: 0
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 50, 0.9)',
                    titleColor: '#4d93f0',
                    bodyColor: '#cbd5e1',
                    borderColor: '#3178c6',
                    borderWidth: 1
                }
            }
        }
    });
}
// ============================================
// FUNCIÓN: CREAR GRÁFICO DE BARRAS
// ============================================
function createBarChart(ctx, data) {
    return new window.Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#cbd5e1',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 50, 0.9)',
                    titleColor: '#4d93f0',
                    bodyColor: '#cbd5e1',
                    borderColor: '#3178c6',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 11
                        }
                    },
                    beginAtZero: true,
                    max: 100
                }
            },
            elements: {
                bar: {
                    borderRadius: 4,
                    borderWidth: 1
                }
            }
        }
    });
}
// ============================================
// FUNCIÓN: OBTENER DATOS PARA COMPARACIÓN
// ============================================
function getTypingApproachComparisonData() {
    var approaches = ['Any', 'Unknown', 'Type Guard', 'Genérico'];
    var typeSafety = [10, 90, 95, 85];
    var runtimeSafety = [30, 95, 98, 90];
    return {
        labels: approaches,
        datasets: [
            {
                label: 'Seguridad de Tipos',
                data: typeSafety,
                borderColor: '#3178c6',
                backgroundColor: 'rgba(49, 120, 198, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2
            },
            {
                label: 'Seguridad Runtime',
                data: runtimeSafety,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2
            }
        ]
    };
}
// ============================================
// FUNCIÓN: OBTENER DATOS PARA GRÁFICO RADAR
// ============================================
function getRadarChartData(approach) {
    var approachData = typingApproachesData[approach];
    return {
        labels: ['Seguridad Tipos', 'Flexibilidad', 'Mantenibilidad', 'Seguridad Runtime', 'Adopción'],
        datasets: [{
                label: approachData.name,
                data: [
                    approachData.typeSafety,
                    approachData.flexibility,
                    approachData.maintainability,
                    approachData.runtimeSafety,
                    approachData.jobMarket
                ],
                backgroundColor: "".concat(approachData.color, "20"),
                borderColor: approachData.color,
                pointBackgroundColor: approachData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: approachData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
    };
}
// ============================================
// FUNCIÓN: INICIALIZAR SIMULACIÓN DE TIPADO
// ============================================
function initTypingSimulation() {
    console.log('Inicializando simulación de enfoques de tipado...');
    // Elementos del DOM
    var materialButtons = document.querySelectorAll('.material-btn');
    var thicknessSlider = document.getElementById('thicknessSlider');
    var thicknessValue = document.getElementById('thicknessValue');
    var areaSlider = document.getElementById('areaSlider');
    var areaValue = document.getElementById('areaValue');
    var puritySlider = document.getElementById('puritySlider');
    var purityValue = document.getElementById('purityValue');
    var runSimulationBtn = document.getElementById('runSimulationBtn');
    var resetSimulationBtn = document.getElementById('resetSimulationBtn');
    var showDetailsBtn = document.getElementById('showDetailsBtn');
    // Verificar que todos los elementos existan
    if (!thicknessSlider || !materialButtons.length || !runSimulationBtn) {
        console.error('Elementos de simulación no encontrados');
        return;
    }
    // Actualizar valores de los sliders
    function updateSliderValue(slider, valueElement) {
        slider.addEventListener('input', function () {
            if (!valueElement)
                return;
            var value = parseInt(this.value);
            if (slider.id === 'thicknessSlider') {
                if (value < 33) {
                    valueElement.textContent = 'Script Simple';
                }
                else if (value < 66) {
                    valueElement.textContent = 'App Media';
                }
                else {
                    valueElement.textContent = 'Enterprise';
                }
            }
            else if (slider.id === 'areaSlider') {
                if (value < 33) {
                    valueElement.textContent = 'Junior';
                }
                else if (value < 66) {
                    valueElement.textContent = 'Intermedio';
                }
                else {
                    valueElement.textContent = 'Experto';
                }
            }
            else if (slider.id === 'puritySlider') {
                if (value < 33) {
                    valueElement.textContent = 'Baja';
                }
                else if (value < 66) {
                    valueElement.textContent = 'Media';
                }
                else {
                    valueElement.textContent = 'Alta';
                }
            }
            updateSimulation();
        });
    }
    if (thicknessValue)
        updateSliderValue(thicknessSlider, thicknessValue);
    if (areaValue)
        updateSliderValue(areaSlider, areaValue);
    if (purityValue)
        updateSliderValue(puritySlider, purityValue);
    // Botones de enfoque
    materialButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            materialButtons.forEach(function (b) { return b.classList.remove('active'); });
            this.classList.add('active');
            updateSimulation();
        });
    });
    // Ejecutar simulación
    if (runSimulationBtn) {
        runSimulationBtn.addEventListener('click', runSimulation);
    }
    // Reiniciar simulación
    if (resetSimulationBtn) {
        resetSimulationBtn.addEventListener('click', function () {
            thicknessSlider.value = '20';
            if (thicknessValue)
                thicknessValue.textContent = 'Pequeño';
            areaSlider.value = '50';
            if (areaValue)
                areaValue.textContent = 'Media';
            puritySlider.value = '50';
            if (purityValue)
                purityValue.textContent = 'Medio';
            materialButtons.forEach(function (b) { return b.classList.remove('active'); });
            var anyButton = document.querySelector('[data-material="any"]');
            if (anyButton)
                anyButton.classList.add('active');
            updateSimulation();
            showNotification('Simulación reiniciada a valores predeterminados', 'info');
        });
    }
    // Mostrar detalles
    if (showDetailsBtn) {
        showDetailsBtn.addEventListener('click', showDetailedCharts);
    }
    // Ejecutar simulación inicial
    setTimeout(function () {
        updateSimulation();
    }, 500);
    console.log('Simulación de enfoques de tipado inicializada');
}
// ============================================
// FUNCIÓN: ACTUALIZAR SIMULACIÓN
// ============================================
function updateSimulation() {
    var activeMaterial = document.querySelector('.material-btn.active');
    if (!activeMaterial)
        return;
    var approachType = activeMaterial.dataset.material;
    if (!approachType)
        return;
    var thicknessSlider = document.getElementById('thicknessSlider');
    var areaSlider = document.getElementById('areaSlider');
    var puritySlider = document.getElementById('puritySlider');
    if (!thicknessSlider || !areaSlider || !puritySlider)
        return;
    var complexity = parseInt(thicknessSlider.value);
    var experience = parseInt(areaSlider.value);
    var importance = parseInt(puritySlider.value);
    var approachData = typingApproachesData[approachType];
    if (!approachData)
        return;
    // Calcular valores basados en el enfoque y parámetros
    var typeSafety = approachData.typeSafety;
    var flexibility = approachData.flexibility;
    var maintainability = approachData.maintainability;
    // Ajustar por complejidad del proyecto
    if (complexity > 66) { // Proyecto enterprise
        if (approachType === 'unknown' || approachType === 'typeguard') {
            typeSafety *= 1.1; // Mejor para proyectos grandes
        }
        else if (approachType === 'any') {
            typeSafety *= 0.7; // Peor para proyectos grandes
        }
    }
    // Ajustar por experiencia del equipo
    if (experience > 66) { // Equipo experto
        if (approachType === 'typeguard' || approachType === 'generic') {
            maintainability *= 1.2; // Más fácil para expertos
        }
    }
    else if (experience < 33) { // Equipo junior
        if (approachType === 'any') {
            maintainability *= 1.1; // Más fácil para juniors (pero peligroso)
        }
        else if (approachType === 'typeguard') {
            maintainability *= 0.9; // Más difícil para juniors
        }
    }
    // Ajustar por importancia de mantenimiento
    if (importance > 66) { // Alta importancia
        if (approachType === 'unknown' || approachType === 'typeguard') {
            maintainability *= 1.15;
        }
        else if (approachType === 'any') {
            maintainability *= 0.8;
        }
    }
    // Limitar valores
    typeSafety = Math.min(Math.max(typeSafety, 0), 100);
    flexibility = Math.min(Math.max(flexibility, 0), 100);
    maintainability = Math.min(Math.max(maintainability, 0), 100);
    // Actualizar barras y valores
    var strengthValue = document.getElementById('strengthValue');
    var strengthBar = document.getElementById('strengthBar');
    if (strengthValue && strengthBar) {
        strengthValue.textContent =
            typeSafety >= 85 ? 'Excelente' :
                typeSafety >= 70 ? 'Bueno' :
                    typeSafety >= 50 ? 'Aceptable' : 'Pobre';
        strengthBar.style.width = typeSafety + '%';
    }
    var conductivityValue = document.getElementById('conductivityValue');
    var conductivityBar = document.getElementById('conductivityBar');
    if (conductivityValue && conductivityBar) {
        conductivityValue.textContent =
            flexibility >= 80 ? 'Alta' :
                flexibility >= 60 ? 'Media' :
                    flexibility >= 40 ? 'Limitada' : 'Baja';
        conductivityBar.style.width = flexibility + '%';
    }
    var transparencyValue = document.getElementById('transparencyValue');
    var transparencyBar = document.getElementById('transparencyBar');
    if (transparencyValue && transparencyBar) {
        transparencyValue.textContent =
            maintainability >= 90 ? 'Excelente' :
                maintainability >= 75 ? 'Alta' :
                    maintainability >= 50 ? 'Media' : 'Baja';
        transparencyBar.style.width = maintainability + '%';
    }
    // Actualizar gráfico de radar si está disponible
    if (radarChart && typeof window.Chart !== 'undefined') {
        radarChart.data = getRadarChartData(approachType);
        radarChart.update();
    }
    // Actualizar conclusión
    var conclusion = document.getElementById('simulationConclusion');
    if (conclusion) {
        var conclusionText = '';
        if (approachType === 'any') {
            conclusionText = 'Any ofrece máxima flexibilidad pero sacrifica seguridad - ideal sólo para migración o prototipado';
        }
        else if (approachType === 'unknown') {
            conclusionText = 'Unknown ofrece el mejor balance entre seguridad y flexibilidad para proyectos TypeScript modernos';
        }
        else if (approachType === 'typeguard') {
            conclusionText = 'Type Guards con unknown maximizan seguridad - ideal para validación de datos externos';
        }
        else if (approachType === 'generic') {
            conclusionText = 'Genéricos proporcionan reutilización con seguridad - perfecto para librerías y utilidades';
        }
        conclusion.innerHTML = "\n            <ion-icon name=\"bulb-outline\" class=\"text-ts-accent-tertiary mr-2\"></ion-icon>\n            ".concat(conclusionText, "\n        ");
    }
}
// ============================================
// FUNCIÓN: EJECUTAR SIMULACIÓN COMPLETA
// ============================================
function runSimulation() {
    var btn = document.getElementById('runSimulationBtn');
    if (!btn)
        return;
    var originalHTML = btn.innerHTML;
    // Cambiar estado del botón
    btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando...';
    btn.setAttribute('disabled', 'true');
    // Mostrar animación de progreso
    var activeMaterial = document.querySelector('.material-btn.active');
    var approachType = activeMaterial ? activeMaterial.dataset.material : 'any';
    var approachData = typingApproachesData[approachType];
    // Simular proceso de optimización con progreso
    var progress = 0;
    var progressInterval = setInterval(function () {
        progress += 10;
        if (progress >= 100) {
            clearInterval(progressInterval);
            // Mejorar ligeramente los resultados para simular optimización
            var strengthBar = document.getElementById('strengthBar');
            if (strengthBar) {
                var currentSafety = parseFloat(strengthBar.style.width);
                var newSafety = approachType === 'any' ?
                    Math.min(100, currentSafety * 1.02) : // Pequeña mejora para any
                    Math.min(100, currentSafety * 1.05); // Mayor mejora para otros
                strengthBar.style.width = newSafety + '%';
            }
            // Restaurar botón después de la simulación
            btn.innerHTML = originalHTML;
            btn.removeAttribute('disabled');
            // Mostrar notificación de éxito
            showNotification("Simulaci\u00F3n completada: ".concat(approachData.name, " analizado exitosamente"), 'success');
        }
    }, 100);
}
// ============================================
// FUNCIÓN: MOSTRAR GRÁFICOS DETALLADOS
// ============================================
function showDetailedCharts() {
    var _a, _b;
    // Verificar si Chart.js está disponible
    if (typeof window.Chart === 'undefined') {
        showNotification('Cargando librería de gráficos...', 'info');
        loadChartJS();
        return;
    }
    var activeMaterial = document.querySelector('.material-btn.active');
    var approachType = activeMaterial ? activeMaterial.dataset.material : 'any';
    // Crear modal de gráficos detallados
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
    modal.innerHTML = "\n        <div class=\"bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95\">\n            <button class=\"close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl\">\n                &times;\n            </button>\n            <h2 class=\"text-2xl md:text-3xl font-bold mb-6 text-ts-accent-light\">\n                <ion-icon name=\"bar-chart-outline\" class=\"mr-2\"></ion-icon> An\u00E1lisis Comparativo Detallado\n            </h2>\n            \n            <div class=\"space-y-6\">\n                <div class=\"grid grid-cols-1 md:grid-cols-2 gap-6\">\n                    <div class=\"bg-gray-900/50 rounded-xl p-4\">\n                        <h4 class=\"font-bold text-lg mb-4 text-center text-ts-accent-light\">Adopci\u00F3n por A\u00F1o</h4>\n                        <div class=\"w-full h-64\">\n                            <canvas id=\"detailedLineChart\"></canvas>\n                        </div>\n                    </div>\n                    <div class=\"bg-gray-900/50 rounded-xl p-4\">\n                        <h4 class=\"font-bold text-lg mb-4 text-center text-ts-accent-secondary-light\">Comparaci\u00F3n de M\u00E9tricas</h4>\n                        <div class=\"w-full h-64\">\n                            <canvas id=\"detailedBarChart\"></canvas>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"bg-gray-900/50 rounded-xl p-4\">\n                    <h4 class=\"font-bold text-lg mb-4 text-center text-purple-300\">An\u00E1lisis Multidimensional (Radar)</h4>\n                    <div class=\"w-full h-80\">\n                        <canvas id=\"detailedRadarChart\"></canvas>\n                    </div>\n                </div>\n                \n                <div class=\"bg-gray-900/40 rounded-lg p-4\">\n                    <h4 class=\"font-bold mb-3 text-ts-accent-light\">Interpretaci\u00F3n de Resultados:</h4>\n                    <p class=\"text-text-secondary text-sm\">\n                        Los gr\u00E1ficos muestran un an\u00E1lisis comparativo entre diferentes enfoques de tipado en TypeScript. \n                        Unknown con Type Guards ofrece la mayor seguridad, mientras que Any proporciona m\u00E1xima flexibilidad. \n                        Cada enfoque tiene ventajas espec\u00EDficas seg\u00FAn el contexto del proyecto y experiencia del equipo.\n                    </p>\n                </div>\n            </div>\n            \n            <div class=\"flex flex-wrap gap-4 justify-center mt-6\">\n                <button id=\"exportChartBtn\" class=\"px-6 py-3 bg-gradient-to-r from-ts-accent to-ts-accent-dark text-white font-bold rounded-xl shadow-lg shadow-ts-accent/30 hover:shadow-xl hover:shadow-ts-accent/40 transition-all duration-300\">\n                    <ion-icon name=\"download-outline\" class=\"mr-2\"></ion-icon> Exportar Datos\n                </button>\n                <button class=\"close-chart-btn px-6 py-3 bg-gray-800 border border-border text-text-primary font-bold rounded-xl hover:bg-gray-700 transition-all duration-300\">\n                    <ion-icon name=\"close-outline\" class=\"mr-2\"></ion-icon> Cerrar\n                </button>\n            </div>\n        </div>\n    ";
    document.body.appendChild(modal);
    // Animar entrada
    setTimeout(function () {
        var modalContent = modal.querySelector('.bg-card-bg-solid');
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
    // Crear gráficos detallados
    setTimeout(function () {
        // Gráfico de líneas detallado
        var detailedLineCanvas = document.getElementById('detailedLineChart');
        if (detailedLineCanvas && typeof window.Chart !== 'undefined') {
            if (detailedLineChart) {
                detailedLineChart.destroy();
            }
            var ctx = detailedLineCanvas.getContext('2d');
            if (ctx) {
                detailedLineChart = createLineChart(ctx, getDetailedLineChartData());
            }
        }
        // Gráfico de barras detallado
        var detailedBarCanvas = document.getElementById('detailedBarChart');
        if (detailedBarCanvas && typeof window.Chart !== 'undefined') {
            if (detailedBarChart) {
                detailedBarChart.destroy();
            }
            var ctx = detailedBarCanvas.getContext('2d');
            if (ctx) {
                detailedBarChart = createBarChart(ctx, getDetailedBarChartData());
            }
        }
        // Gráfico de radar detallado
        var detailedRadarCanvas = document.getElementById('detailedRadarChart');
        if (detailedRadarCanvas && typeof window.Chart !== 'undefined') {
            if (detailedRadarChart) {
                detailedRadarChart.destroy();
            }
            var ctx = detailedRadarCanvas.getContext('2d');
            if (ctx) {
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(approachType));
            }
        }
    }, 50);
    // Configurar botones
    var closeModal = function () {
        var modalContent = modal.querySelector('.bg-card-bg-solid');
        if (modalContent) {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
        }
        setTimeout(function () {
            modal.remove();
        }, 300);
    };
    (_a = modal.querySelector('.close-chart-modal-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeModal);
    (_b = modal.querySelector('.close-chart-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    var exportChartBtn = document.getElementById('exportChartBtn');
    if (exportChartBtn) {
        exportChartBtn.addEventListener('click', function () {
            showNotification('Datos de gráficos exportados exitosamente', 'success');
        });
    }
}
// ============================================
// FUNCIONES AUXILIARES PARA DATOS DE GRÁFICOS
// ============================================
function getDetailedLineChartData() {
    var years = [2016, 2018, 2020, 2022, 2024];
    var anyUsage = [90, 75, 60, 45, 30];
    var unknownUsage = [0, 15, 30, 50, 65];
    return {
        labels: years.map(function (y) { return "".concat(y); }),
        datasets: [
            {
                label: 'Uso de Any (% proyectos)',
                data: anyUsage,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2
            },
            {
                label: 'Uso de Unknown (% proyectos)',
                data: unknownUsage,
                borderColor: '#3178c6',
                backgroundColor: 'rgba(49, 120, 198, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2
            }
        ]
    };
}
function getDetailedBarChartData() {
    var approaches = ['Any', 'Unknown', 'Type Guard', 'Genérico'];
    var typeSafety = [10, 90, 95, 85];
    var runtimeSafety = [30, 95, 98, 90];
    var maintainability = [20, 85, 90, 75];
    return {
        labels: approaches,
        datasets: [
            {
                label: 'Seguridad de Tipos',
                data: typeSafety,
                backgroundColor: 'rgba(49, 120, 198, 0.7)',
                borderColor: '#3178c6',
                borderWidth: 1
            },
            {
                label: 'Seguridad Runtime',
                data: runtimeSafety,
                backgroundColor: 'rgba(255, 107, 107, 0.7)',
                borderColor: '#ff6b6b',
                borderWidth: 1
            },
            {
                label: 'Mantenibilidad',
                data: maintainability,
                backgroundColor: 'rgba(255, 217, 61, 0.7)',
                borderColor: '#ffd93d',
                borderWidth: 1
            }
        ]
    };
}
function getDetailedRadarChartData(approach) {
    var approachData = typingApproachesData[approach];
    // Datos para todos los enfoques
    var labels = ['Seguridad', 'Flexibilidad', 'Mantenibilidad', 'Runtime', 'Adopción'];
    return {
        labels: labels,
        datasets: [
            {
                label: 'Any',
                data: [10, 100, 20, 30, 85],
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderColor: '#ff6b6b',
                pointBackgroundColor: '#ff6b6b',
                borderWidth: 1
            },
            {
                label: 'Unknown',
                data: [90, 70, 85, 95, 65],
                backgroundColor: 'rgba(49, 120, 198, 0.1)',
                borderColor: '#3178c6',
                pointBackgroundColor: '#3178c6',
                borderWidth: 1
            },
            {
                label: 'Type Guard',
                data: [95, 60, 90, 98, 50],
                backgroundColor: 'rgba(255, 217, 61, 0.1)',
                borderColor: '#ffd93d',
                pointBackgroundColor: '#ffd93d',
                borderWidth: 1
            },
            {
                label: approachData.name,
                data: [
                    approachData.typeSafety,
                    approachData.flexibility,
                    approachData.maintainability,
                    approachData.runtimeSafety,
                    approachData.jobMarket
                ],
                backgroundColor: "".concat(approachData.color, "40"),
                borderColor: approachData.color,
                pointBackgroundColor: approachData.color,
                borderWidth: 3,
                pointRadius: 5
            }
        ]
    };
}
// ============================================
// FUNCIÓN: INICIALIZAR EVENT LISTENERS
// ============================================
function initEventListeners() {
    console.log('Inicializando event listeners...');
    // Botón de simulación de migración
    var simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
    if (simulateEvolutionBtn) {
        simulateEvolutionBtn.addEventListener('click', simulateMigrationProcess);
    }
    // Botón de especificaciones
    var viewSpecsBtn = document.getElementById('viewSpecsBtn');
    if (viewSpecsBtn) {
        viewSpecsBtn.addEventListener('click', function () {
            var specsModal = document.getElementById('specsModal');
            if (!specsModal)
                return;
            specsModal.classList.remove('hidden');
            setTimeout(function () {
                specsModal.classList.add('opacity-100');
                var modalContent = specsModal.querySelector('div');
                if (modalContent) {
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }
            }, 10);
        });
    }
    // Botón de comparación
    var compareMaterialsBtn = document.getElementById('compareMaterialsBtn');
    if (compareMaterialsBtn) {
        compareMaterialsBtn.addEventListener('click', function () {
            var compareModal = document.getElementById('compareModal');
            if (!compareModal)
                return;
            compareModal.classList.remove('hidden');
            setTimeout(function () {
                compareModal.classList.add('opacity-100');
                var modalContent = compareModal.querySelector('div');
                if (modalContent) {
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }
            }, 10);
        });
    }
    // Cerrar modales
    var closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            var specsModal = document.getElementById('specsModal');
            if (!specsModal)
                return;
            var modalContent = specsModal.querySelector('div');
            if (modalContent) {
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
            }
            specsModal.classList.remove('opacity-100');
            setTimeout(function () {
                specsModal.classList.add('hidden');
            }, 500);
        });
    }
    var closeCompareModalBtn = document.getElementById('closeCompareModal');
    if (closeCompareModalBtn) {
        closeCompareModalBtn.addEventListener('click', function () {
            var compareModal = document.getElementById('compareModal');
            if (!compareModal)
                return;
            var modalContent = compareModal.querySelector('div');
            if (modalContent) {
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
            }
            compareModal.classList.remove('opacity-100');
            setTimeout(function () {
                compareModal.classList.add('hidden');
            }, 500);
        });
    }
    // Cerrar modales al hacer clic fuera
    var specsModal = document.getElementById('specsModal');
    if (specsModal) {
        specsModal.addEventListener('click', function (e) {
            if (e.target === specsModal) {
                closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.click();
            }
        });
    }
    var compareModal = document.getElementById('compareModal');
    if (compareModal) {
        compareModal.addEventListener('click', function (e) {
            if (e.target === compareModal) {
                closeCompareModalBtn === null || closeCompareModalBtn === void 0 ? void 0 : closeCompareModalBtn.click();
            }
        });
    }
    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
        var _a;
        if (e.key === 'Escape') {
            var specsModal_1 = document.getElementById('specsModal');
            var compareModal_1 = document.getElementById('compareModal');
            var chartModal = document.querySelector('.fixed.inset-0.bg-black\\/90');
            if (specsModal_1 && !specsModal_1.classList.contains('hidden')) {
                closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.click();
            }
            if (compareModal_1 && !compareModal_1.classList.contains('hidden')) {
                closeCompareModalBtn === null || closeCompareModalBtn === void 0 ? void 0 : closeCompareModalBtn.click();
            }
            if (chartModal) {
                (_a = chartModal.querySelector('.close-chart-modal-btn')) === null || _a === void 0 ? void 0 : _a.click();
            }
        }
    });
    console.log('Event listeners inicializados');
}
// ============================================
// FUNCIÓN: INICIALIZAR ANIMACIONES
// ============================================
function initAnimations() {
    // Animación de aparición para elementos
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }, observerOptions);
    // Aplicar animación a elementos principales
    document.querySelectorAll('.card, .timeline-item, .stat-card').forEach(function (el) {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(el);
    });
    console.log('Animaciones inicializadas');
}
// ============================================
// FUNCIÓN: SIMULAR PROCESO DE MIGRACIÓN
// ============================================
function simulateMigrationProcess() {
    var btn = document.getElementById('simulateEvolutionBtn');
    if (!btn)
        return;
    var originalHTML = btn.innerHTML;
    // Cambiar estado del botón
    btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando migración...';
    btn.setAttribute('disabled', 'true');
    // Mostrar progreso
    var steps = [
        "Paso 1: Análisis de código JavaScript existente...",
        "Paso 2: Conversión inicial a TypeScript con any...",
        "Paso 3: Configuración de tsconfig.json estricto...",
        "Paso 4: Identificación de usos de any críticos...",
        "Paso 5: Reemplazo de any por unknown...",
        "Paso 6: Implementación de Type Guards...",
        "Paso 7: Refinamiento con tipos específicos...",
        "Paso 8: Verificación de type coverage...",
        "Paso 9: Optimización de tipos genéricos...",
        "Paso 10: Validación final del código..."
    ];
    var step = 0;
    var progressInterval = setInterval(function () {
        if (step < steps.length) {
            btn.innerHTML = "<ion-icon name=\"refresh-outline\" class=\"animate-spin mr-2\"></ion-icon> ".concat(steps[step]);
            step++;
        }
    }, 500);
    // Simular proceso completo
    setTimeout(function () {
        clearInterval(progressInterval);
        // Mostrar resultados
        showMigrationResults();
        // Restaurar botón
        btn.innerHTML = originalHTML;
        btn.removeAttribute('disabled');
    }, 6000);
}
// ============================================
// FUNCIÓN: MOSTRAR RESULTADOS DE MIGRACIÓN
// ============================================
function showMigrationResults() {
    var _a, _b;
    var results = [
        { type: 'Cobertura de tipos', value: '30% → 95%', color: '#3178c6', icon: 'shield-checkmark-outline' },
        { type: 'Errores runtime', value: '-65%', color: '#ff6b6b', icon: 'bug-outline' },
        { type: 'Tiempo desarrollo', value: '+15%', color: '#ffd93d', icon: 'time-outline' },
        { type: 'Mantenibilidad', value: '+40%', color: '#8b5cf6', icon: 'trending-up-outline' }
    ];
    // Crear modal de resultados
    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
    modal.innerHTML = "\n        <div class=\"bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95\">\n            <button class=\"close-migration-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl\">\n                &times;\n            </button>\n            <h2 class=\"text-2xl md:text-3xl font-bold mb-6 text-ts-accent-light\">\n                <ion-icon name=\"rocket-outline\" class=\"mr-2\"></ion-icon> Resultados de Migraci\u00F3n Any \u2192 Unknown\n            </h2>\n            <div class=\"mb-6\">\n                <p class=\"text-text-secondary mb-4\">Simulaci\u00F3n del proceso de migraci\u00F3n de c\u00F3digo TypeScript con any a c\u00F3digo type-safe con unknown:</p>\n            </div>\n            <div class=\"grid grid-cols-2 md:grid-cols-4 gap-4 mb-8\">\n                ".concat(results.map(function (result) { return "\n                    <div class=\"bg-gray-900/50 rounded-xl p-4 text-center\">\n                        <div class=\"text-2xl md:text-3xl mb-2\" style=\"color: ".concat(result.color, ";\">\n                            <ion-icon name=\"").concat(result.icon, "\"></ion-icon>\n                        </div>\n                        <div class=\"text-2xl md:text-3xl font-black mb-1\" style=\"background: linear-gradient(90deg, ").concat(result.color, ", ").concat(result.color, "99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;\">").concat(result.value, "</div>\n                        <div class=\"text-sm text-text-secondary\">").concat(result.type, "</div>\n                    </div>\n                "); }).join(''), "\n            </div>\n            \n            <div class=\"bg-gray-900/50 rounded-lg p-4 mb-6\">\n                <div class=\"font-mono text-sm space-y-1\">\n                    <span class=\"text-ts-accent-light\"># Recomendaciones para migraci\u00F3n exitosa:</span><br>\n                    <span class=\"text-text-secondary\">1. Configurar tsconfig.json con strict y noImplicitAny</span><br>\n                    <span class=\"text-text-secondary\">2. Usar ESLint con @typescript-eslint/no-explicit-any</span><br>\n                    <span class=\"text-text-secondary\">3. Migrar gradualmente, archivo por archivo</span><br>\n                    <span class=\"text-text-secondary\">4. Implementar Type Guards para unknown</span><br>\n                    <span class=\"text-text-secondary\">5. Medir type coverage regularmente</span>\n                </div>\n            </div>\n            \n            <div class=\"flex justify-center\">\n                <button class=\"close-migration-btn px-6 py-3 bg-gradient-to-r from-ts-accent to-ts-accent-dark text-white font-bold rounded-xl shadow-lg shadow-ts-accent/30\">\n                    <ion-icon name=\"checkmark-outline\" class=\"mr-2\"></ion-icon> Cerrar\n                </button>\n            </div>\n        </div>\n    ");
    document.body.appendChild(modal);
    // Animar entrada
    setTimeout(function () {
        var modalContent = modal.querySelector('.bg-card-bg-solid');
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
    // Configurar botones de cierre
    var closeModal = function () {
        var modalContent = modal.querySelector('.bg-card-bg-solid');
        if (modalContent) {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
        }
        setTimeout(function () {
            modal.remove();
        }, 300);
    };
    (_a = modal.querySelector('.close-migration-modal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeModal);
    (_b = modal.querySelector('.close-migration-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}
function showNotification(message, type) {
    if (type === void 0) { type = 'info'; }
    var colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    };
    var notification = document.createElement('div');
    notification.className = "fixed top-4 right-4 ".concat(colors[type], " text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full");
    notification.textContent = message;
    document.body.appendChild(notification);
    // Animar entrada
    setTimeout(function () {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 10);
    // Eliminar después de 3 segundos
    setTimeout(function () {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        setTimeout(function () {
            notification.remove();
        }, 300);
    }, 3000);
}
