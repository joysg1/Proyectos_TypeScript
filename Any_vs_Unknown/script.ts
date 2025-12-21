// TypeSafeLab - Aplicación TypeScript sobre Any y Unknown Data Types
// Este archivo TypeScript se compila a script.js

// ============================================
// TIPOS PARA CHART.JS
// ============================================

// Interface para Chart de Chart.js
interface IChart {
    data: any;
    update(): void;
    destroy(): void;
}

// Declaración global para Chart.js
interface Window {
    Chart: {
        new(context: CanvasRenderingContext2D, config: any): IChart;
        readonly prototype: IChart;
    };
}

// ============================================
// INTERFACES Y TIPOS
// ============================================

interface VersionData {
    icon: string;
    title: string;
    description: string;
    color: string;
    status: string;
    year: string;
}

interface TypingApproachData {
    name: string;
    typeSafety: number;
    flexibility: number;
    maintainability: number;
    runtimeSafety: number;
    color: string;
    description: string;
    applications: string[];
    jobMarket: number;
    community: number;
}

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    pulseSpeed: number;
    pulseOffset: number;
    rotation: number;
    rotationSpeed: number;
    type: 'type' | 'any' | 'unknown' | 'special';
}

interface VersionDetails {
    features: string;
    impact: string;
    adoption: string;
    size: string;
    npmDownloads: string;
}

// ============================================
// VARIABLES GLOBALES
// ============================================

let lineChart: IChart | null = null;
let radarChart: IChart | null = null;
let detailedLineChart: IChart | null = null;
let detailedBarChart: IChart | null = null;
let detailedRadarChart: IChart | null = null;

// Datos de versiones de TypeScript
const typescriptVersionsData: VersionData[] = [
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
const typingApproachesData: Record<string, TypingApproachData> = {
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

document.addEventListener('DOMContentLoaded', (): void => {
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

function initTypeScriptParticles(): void {
    const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
    if (!canvas) {
        console.error('Canvas no encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('No se pudo obtener el contexto 2D');
        return;
    }
    
    let particles: Particle[] = [];
    const particleCount = 60;
    
    function resizeCanvas(): void {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles(): void {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const type = Math.random();
            let color: string;
            let size: number;
            let speed: number;
            let particleType: Particle['type'];
            
            if (type < 0.5) {
                // Partículas de Type (azul TypeScript)
                color = `rgba(49, 120, 198, ${Math.random() * 0.4 + 0.1})`;
                size = Math.random() * 6 + 3;
                speed = (Math.random() - 0.5) * 0.4;
                particleType = 'type';
            } else if (type < 0.8) {
                // Partículas de Any (rojo advertencia)
                color = `rgba(255, 107, 107, ${Math.random() * 0.3 + 0.1})`;
                size = Math.random() * 5 + 2;
                speed = (Math.random() - 0.5) * 0.5;
                particleType = 'any';
            } else {
                // Partículas de Unknown (amarillo seguro)
                color = `rgba(255, 217, 61, ${Math.random() * 0.3 + 0.1})`;
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
    
    function drawTypeSymbol(context: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, type: Particle['type']): void {
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
        } else if (type === 'any') {
            // Símbolo de advertencia (triángulo)
            context.beginPath();
            context.moveTo(0, -size);
            context.lineTo(-size * 0.866, size * 0.5);
            context.lineTo(size * 0.866, size * 0.5);
            context.closePath();
            context.stroke();
        } else {
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
    
    function animateParticles(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fondo sutil
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
        gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar conexiones entre partículas cercanas
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150 && particles[i].type === particles[j].type) {
                    const alpha = 0.1;
                    let strokeColor: string;
                    
                    if (particles[i].type === 'type') {
                        strokeColor = `rgba(49, 120, 198, ${alpha})`;
                    } else if (particles[i].type === 'any') {
                        strokeColor = `rgba(255, 107, 107, ${alpha})`;
                    } else {
                        strokeColor = `rgba(255, 217, 61, ${alpha})`;
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
        particles.forEach(particle => {
            // Movimiento
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;
            
            // Rebote en bordes
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
            
            // Efecto de pulso
            const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
            const colorParts = particle.color.split(',');
            const alphaString = colorParts[3]?.split(')')[0] || '0.5';
            const currentAlpha = parseFloat(alphaString) * pulse;
            
            // Dibujar partícula
            ctx.save();
            
            if (particle.type === 'any') {
                // Gradiente para partículas any
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 1.5
                );
                gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`));
                gradient.addColorStop(1, particle.color.replace(/[\d.]+\)$/, '0)'));
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
            }
            
            // Dibujar símbolo basado en tipo
            drawTypeSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.type);
            
            // Rellenar solo para type
            if (particle.type === 'type') {
                drawTypeSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.type);
                ctx.fill();
            } else {
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.7})`);
                drawTypeSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.type);
                ctx.stroke();
            }
            
            ctx.restore();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', (): void => {
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

function initTypeScriptVersions(): void {
    const container = document.getElementById('productionInfo');
    if (!container) {
        console.error('Contenedor de versiones no encontrado');
        return;
    }
    
    container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-ts-accent-light">Evolución de Versiones de TypeScript</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="versionsGrid">
            ${typescriptVersionsData.map(version => `
                <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-ts-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${version.title}">
                    <div class="flex items-center mb-3">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${version.color}20; color: ${version.color};">
                            <ion-icon name="${version.icon}" class="text-xl"></ion-icon>
                        </div>
                        <div>
                            <h4 class="font-bold">${version.title}</h4>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="px-2 py-1 text-xs rounded" style="background: ${version.color}20; color: ${version.color};">${version.status}</span>
                                <span class="text-xs text-text-muted">${version.year}</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-text-secondary">${version.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    // Añadir event listeners a las tarjetas de versiones
    document.querySelectorAll('.method-card').forEach(card => {
        card.addEventListener('click', function(this: HTMLElement) {
            const versionName = this.getAttribute('data-method');
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

function showVersionDetail(versionName: string): void {
    // Versión alternativa a .find() para compatibilidad
    let version: VersionData | undefined;
    for (const v of typescriptVersionsData) {
        if (v.title === versionName) {
            version = v;
            break;
        }
    }
    
    if (!version) return;
    
    const details: Record<string, VersionDetails> = {
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
    
    const versionDetails = details[version.title] || {
        features: '',
        impact: '',
        adoption: '',
        size: '',
        npmDownloads: ''
    };
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
    modal.innerHTML = `
        <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
            <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                &times;
            </button>
            <div class="flex items-center mb-6">
                <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${version.color}20; color: ${version.color};">
                    <ion-icon name="${version.icon}" class="text-3xl"></ion-icon>
                </div>
                <div>
                    <h2 class="text-2xl font-bold" style="color: ${version.color};">${version.title}</h2>
                    <p class="text-text-secondary mt-1">${version.description}</p>
                </div>
            </div>
            
            <div class="space-y-4">
                ${versionDetails.features ? `
                    <div>
                        <h4 class="font-bold mb-2 text-ts-accent-light">Características Principales:</h4>
                        <p class="text-text-secondary">${versionDetails.features}</p>
                    </div>
                ` : ''}
                
                <div class="grid grid-cols-2 gap-4">
                    ${versionDetails.impact ? `
                        <div class="bg-gray-900/50 rounded-lg p-3">
                            <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Impacto</h4>
                            <p class="text-text-secondary text-sm">${versionDetails.impact}</p>
                        </div>
                    ` : ''}
                    
                    ${versionDetails.adoption ? `
                        <div class="bg-gray-900/50 rounded-lg p-3">
                            <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Adopción</h4>
                            <p class="text-text-secondary text-sm">${versionDetails.adoption}</p>
                        </div>
                    ` : ''}
                    
                    ${versionDetails.size ? `
                        <div class="bg-gray-900/50 rounded-lg p-3">
                            <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Tamaño</h4>
                            <p class="text-text-secondary text-sm">${versionDetails.size}</p>
                        </div>
                    ` : ''}
                    
                    ${versionDetails.npmDownloads ? `
                        <div class="bg-gray-900/50 rounded-lg p-3">
                            <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Descargas NPM</h4>
                            <p class="text-text-secondary text-sm">${versionDetails.npmDownloads}</p>
                        </div>
                    ` : ''}
                </div>
                
                <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                    <div class="font-mono text-sm">
                        <span class="text-ts-accent-light"># Legado de ${version.title}:</span><br>
                        <span class="text-text-secondary">• ${getVersionLegacy(version.title)}</span><br>
                        <span class="text-text-secondary">• ${getVersionImpact(version.title)}</span>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 flex justify-center">
                <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${version.color};">
                    <ion-icon name="close-outline" class="mr-2"></ion-icon> Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        const modalContent = modal.querySelector('.bg-card-bg-solid') as HTMLElement;
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
    
    // Función auxiliar para obtener legado de versión
    function getVersionLegacy(title: string): string {
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
    function getVersionImpact(title: string): string {
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
    const closeModal = (): void => {
        const modalContent = modal.querySelector('.bg-card-bg-solid') as HTMLElement;
        if (modalContent) {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    modal.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
    modal.querySelector('.close-detail-btn')?.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', (e: MouseEvent) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ============================================
// FUNCIÓN: INICIALIZAR TIMELINE
// ============================================

function initTimeline(): void {
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log('Elementos timeline encontrados: ' + timelineItems.length);
    
    // Mostrar todos los elementos inmediatamente
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('opacity-100');
        }, index * 200);
    });
    
    // También agregar observador para animación al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
        observer.observe(item);
    });
    
    console.log('Timeline inicializada');
}

// ============================================
// INTERFACE PARA DATOS DE CHART
// ============================================

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
        tension?: number;
        fill?: boolean;
        borderWidth?: number;
        pointBackgroundColor?: string;
        pointBorderColor?: string;
        pointHoverBackgroundColor?: string;
        pointHoverBorderColor?: string;
        pointRadius?: number;
    }[];
}

// ============================================
// FUNCIÓN: INICIALIZAR GRÁFICOS
// ============================================

function initCharts(): void {
    console.log('Inicializando gráficos...');
    
    // Verificar si Chart.js está disponible
    if (typeof window.Chart === 'undefined') {
        console.warn('Chart.js no está cargado. Intentando cargar...');
        loadChartJS();
        return;
    }
    
    // Gráfico de líneas principal
    const lineChartCanvas = document.getElementById('lineChartCanvas') as HTMLCanvasElement;
    if (lineChartCanvas) {
        const parent = lineChartCanvas.parentElement;
        if (parent) {
            lineChartCanvas.width = parent.clientWidth;
            lineChartCanvas.height = parent.clientHeight;
        }
        
        const ctx = lineChartCanvas.getContext('2d');
        if (ctx) {
            lineChart = createLineChart(ctx, getTypingApproachComparisonData());
        }
    }
    
    // Gráfico de radar principal
    const radarChartCanvas = document.getElementById('radarChartCanvas') as HTMLCanvasElement;
    if (radarChartCanvas) {
        const parent = radarChartCanvas.parentElement;
        if (parent) {
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
        }
        
        const ctx = radarChartCanvas.getContext('2d');
        if (ctx) {
            radarChart = createRadarChart(ctx, getRadarChartData('any'));
        }
    }
    
    console.log('Gráficos inicializados');
}

// ============================================
// FUNCIÓN: CARGAR CHART.JS
// ============================================

function loadChartJS(): void {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function(): void {
        console.log('Chart.js cargado correctamente');
        initCharts();
        initTypingSimulation();
    };
    script.onerror = function(): void {
        console.error('Error al cargar Chart.js');
        showNotification('Error al cargar librería de gráficos. Recarga la página.', 'error');
    };
    document.head.appendChild(script);
}

// ============================================
// FUNCIÓN: CREAR GRÁFICO DE LÍNEAS
// ============================================

function createLineChart(ctx: CanvasRenderingContext2D, data: ChartData): IChart {
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

function createRadarChart(ctx: CanvasRenderingContext2D, data: ChartData): IChart {
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

function createBarChart(ctx: CanvasRenderingContext2D, data: ChartData): IChart {
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

function getTypingApproachComparisonData(): ChartData {
    const approaches = ['Any', 'Unknown', 'Type Guard', 'Genérico'];
    const typeSafety = [10, 90, 95, 85];
    const runtimeSafety = [30, 95, 98, 90];
    
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

function getRadarChartData(approach: string): ChartData {
    const approachData = typingApproachesData[approach];
    
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
            backgroundColor: `${approachData.color}20`,
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

function initTypingSimulation(): void {
    console.log('Inicializando simulación de enfoques de tipado...');
    
    // Elementos del DOM
    const materialButtons = document.querySelectorAll('.material-btn');
    const thicknessSlider = document.getElementById('thicknessSlider') as HTMLInputElement;
    const thicknessValue = document.getElementById('thicknessValue');
    const areaSlider = document.getElementById('areaSlider') as HTMLInputElement;
    const areaValue = document.getElementById('areaValue');
    const puritySlider = document.getElementById('puritySlider') as HTMLInputElement;
    const purityValue = document.getElementById('purityValue');
    const runSimulationBtn = document.getElementById('runSimulationBtn');
    const resetSimulationBtn = document.getElementById('resetSimulationBtn');
    const showDetailsBtn = document.getElementById('showDetailsBtn');
    
    // Verificar que todos los elementos existan
    if (!thicknessSlider || !materialButtons.length || !runSimulationBtn) {
        console.error('Elementos de simulación no encontrados');
        return;
    }
    
    // Actualizar valores de los sliders
    function updateSliderValue(slider: HTMLInputElement, valueElement: HTMLElement | null): void {
        slider.addEventListener('input', function(this: HTMLInputElement): void {
            if (!valueElement) return;
            
            const value = parseInt(this.value);
            if (slider.id === 'thicknessSlider') {
                if (value < 33) {
                    valueElement.textContent = 'Script Simple';
                } else if (value < 66) {
                    valueElement.textContent = 'App Media';
                } else {
                    valueElement.textContent = 'Enterprise';
                }
            } else if (slider.id === 'areaSlider') {
                if (value < 33) {
                    valueElement.textContent = 'Junior';
                } else if (value < 66) {
                    valueElement.textContent = 'Intermedio';
                } else {
                    valueElement.textContent = 'Experto';
                }
            } else if (slider.id === 'puritySlider') {
                if (value < 33) {
                    valueElement.textContent = 'Baja';
                } else if (value < 66) {
                    valueElement.textContent = 'Media';
                } else {
                    valueElement.textContent = 'Alta';
                }
            }
            updateSimulation();
        });
    }
    
    if (thicknessValue) updateSliderValue(thicknessSlider, thicknessValue);
    if (areaValue) updateSliderValue(areaSlider, areaValue);
    if (purityValue) updateSliderValue(puritySlider, purityValue);
    
    // Botones de enfoque
    materialButtons.forEach(btn => {
        btn.addEventListener('click', function(this: HTMLElement): void {
            materialButtons.forEach(b => b.classList.remove('active'));
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
        resetSimulationBtn.addEventListener('click', (): void => {
            thicknessSlider.value = '20';
            if (thicknessValue) thicknessValue.textContent = 'Pequeño';
            areaSlider.value = '50';
            if (areaValue) areaValue.textContent = 'Media';
            puritySlider.value = '50';
            if (purityValue) purityValue.textContent = 'Medio';
            materialButtons.forEach(b => b.classList.remove('active'));
            const anyButton = document.querySelector('[data-material="any"]');
            if (anyButton) anyButton.classList.add('active');
            
            updateSimulation();
            showNotification('Simulación reiniciada a valores predeterminados', 'info');
        });
    }
    
    // Mostrar detalles
    if (showDetailsBtn) {
        showDetailsBtn.addEventListener('click', showDetailedCharts);
    }
    
    // Ejecutar simulación inicial
    setTimeout(() => {
        updateSimulation();
    }, 500);
    
    console.log('Simulación de enfoques de tipado inicializada');
}

// ============================================
// FUNCIÓN: ACTUALIZAR SIMULACIÓN
// ============================================

function updateSimulation(): void {
    const activeMaterial = document.querySelector('.material-btn.active') as HTMLElement;
    if (!activeMaterial) return;
    
    const approachType = activeMaterial.dataset.material;
    if (!approachType) return;
    
    const thicknessSlider = document.getElementById('thicknessSlider') as HTMLInputElement;
    const areaSlider = document.getElementById('areaSlider') as HTMLInputElement;
    const puritySlider = document.getElementById('puritySlider') as HTMLInputElement;
    
    if (!thicknessSlider || !areaSlider || !puritySlider) return;
    
    const complexity = parseInt(thicknessSlider.value);
    const experience = parseInt(areaSlider.value);
    const importance = parseInt(puritySlider.value);
    
    const approachData = typingApproachesData[approachType];
    if (!approachData) return;
    
    // Calcular valores basados en el enfoque y parámetros
    let typeSafety = approachData.typeSafety;
    let flexibility = approachData.flexibility;
    let maintainability = approachData.maintainability;
    
    // Ajustar por complejidad del proyecto
    if (complexity > 66) { // Proyecto enterprise
        if (approachType === 'unknown' || approachType === 'typeguard') {
            typeSafety *= 1.1; // Mejor para proyectos grandes
        } else if (approachType === 'any') {
            typeSafety *= 0.7; // Peor para proyectos grandes
        }
    }
    
    // Ajustar por experiencia del equipo
    if (experience > 66) { // Equipo experto
        if (approachType === 'typeguard' || approachType === 'generic') {
            maintainability *= 1.2; // Más fácil para expertos
        }
    } else if (experience < 33) { // Equipo junior
        if (approachType === 'any') {
            maintainability *= 1.1; // Más fácil para juniors (pero peligroso)
        } else if (approachType === 'typeguard') {
            maintainability *= 0.9; // Más difícil para juniors
        }
    }
    
    // Ajustar por importancia de mantenimiento
    if (importance > 66) { // Alta importancia
        if (approachType === 'unknown' || approachType === 'typeguard') {
            maintainability *= 1.15;
        } else if (approachType === 'any') {
            maintainability *= 0.8;
        }
    }
    
    // Limitar valores
    typeSafety = Math.min(Math.max(typeSafety, 0), 100);
    flexibility = Math.min(Math.max(flexibility, 0), 100);
    maintainability = Math.min(Math.max(maintainability, 0), 100);
    
    // Actualizar barras y valores
    const strengthValue = document.getElementById('strengthValue');
    const strengthBar = document.getElementById('strengthBar');
    if (strengthValue && strengthBar) {
        strengthValue.textContent = 
            typeSafety >= 85 ? 'Excelente' : 
            typeSafety >= 70 ? 'Bueno' : 
            typeSafety >= 50 ? 'Aceptable' : 'Pobre';
        strengthBar.style.width = typeSafety + '%';
    }
    
    const conductivityValue = document.getElementById('conductivityValue');
    const conductivityBar = document.getElementById('conductivityBar');
    if (conductivityValue && conductivityBar) {
        conductivityValue.textContent = 
            flexibility >= 80 ? 'Alta' : 
            flexibility >= 60 ? 'Media' : 
            flexibility >= 40 ? 'Limitada' : 'Baja';
        conductivityBar.style.width = flexibility + '%';
    }
    
    const transparencyValue = document.getElementById('transparencyValue');
    const transparencyBar = document.getElementById('transparencyBar');
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
    const conclusion = document.getElementById('simulationConclusion');
    if (conclusion) {
        let conclusionText = '';
        
        if (approachType === 'any') {
            conclusionText = 'Any ofrece máxima flexibilidad pero sacrifica seguridad - ideal sólo para migración o prototipado';
        } else if (approachType === 'unknown') {
            conclusionText = 'Unknown ofrece el mejor balance entre seguridad y flexibilidad para proyectos TypeScript modernos';
        } else if (approachType === 'typeguard') {
            conclusionText = 'Type Guards con unknown maximizan seguridad - ideal para validación de datos externos';
        } else if (approachType === 'generic') {
            conclusionText = 'Genéricos proporcionan reutilización con seguridad - perfecto para librerías y utilidades';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-ts-accent-tertiary mr-2"></ion-icon>
            ${conclusionText}
        `;
    }
}

// ============================================
// FUNCIÓN: EJECUTAR SIMULACIÓN COMPLETA
// ============================================

function runSimulation(): void {
    const btn = document.getElementById('runSimulationBtn');
    if (!btn) return;
    
    const originalHTML = btn.innerHTML;
    
    // Cambiar estado del botón
    btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando...';
    btn.setAttribute('disabled', 'true');
    
    // Mostrar animación de progreso
    const activeMaterial = document.querySelector('.material-btn.active') as HTMLElement;
    const approachType = activeMaterial ? activeMaterial.dataset.material : 'any';
    const approachData = typingApproachesData[approachType];
    
    // Simular proceso de optimización con progreso
    let progress = 0;
    const progressInterval = setInterval((): void => {
        progress += 10;
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Mejorar ligeramente los resultados para simular optimización
            const strengthBar = document.getElementById('strengthBar') as HTMLElement;
            if (strengthBar) {
                const currentSafety = parseFloat(strengthBar.style.width);
                const newSafety = approachType === 'any' ? 
                    Math.min(100, currentSafety * 1.02) : // Pequeña mejora para any
                    Math.min(100, currentSafety * 1.05); // Mayor mejora para otros
                strengthBar.style.width = newSafety + '%';
            }
            
            // Restaurar botón después de la simulación
            btn.innerHTML = originalHTML;
            btn.removeAttribute('disabled');
            
            // Mostrar notificación de éxito
            showNotification(`Simulación completada: ${approachData.name} analizado exitosamente`, 'success');
        }
    }, 100);
}

// ============================================
// FUNCIÓN: MOSTRAR GRÁFICOS DETALLADOS
// ============================================

function showDetailedCharts(): void {
    // Verificar si Chart.js está disponible
    if (typeof window.Chart === 'undefined') {
        showNotification('Cargando librería de gráficos...', 'info');
        loadChartJS();
        return;
    }
    
    const activeMaterial = document.querySelector('.material-btn.active') as HTMLElement;
    const approachType = activeMaterial ? activeMaterial.dataset.material : 'any';
    
    // Crear modal de gráficos detallados
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
    modal.innerHTML = `
        <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
            <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                &times;
            </button>
            <h2 class="text-2xl md:text-3xl font-bold mb-6 text-ts-accent-light">
                <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
            </h2>
            
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-ts-accent-light">Adopción por Año</h4>
                        <div class="w-full h-64">
                            <canvas id="detailedLineChart"></canvas>
                        </div>
                    </div>
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-ts-accent-secondary-light">Comparación de Métricas</h4>
                        <div class="w-full h-64">
                            <canvas id="detailedBarChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-900/50 rounded-xl p-4">
                    <h4 class="font-bold text-lg mb-4 text-center text-purple-300">Análisis Multidimensional (Radar)</h4>
                    <div class="w-full h-80">
                        <canvas id="detailedRadarChart"></canvas>
                    </div>
                </div>
                
                <div class="bg-gray-900/40 rounded-lg p-4">
                    <h4 class="font-bold mb-3 text-ts-accent-light">Interpretación de Resultados:</h4>
                    <p class="text-text-secondary text-sm">
                        Los gráficos muestran un análisis comparativo entre diferentes enfoques de tipado en TypeScript. 
                        Unknown con Type Guards ofrece la mayor seguridad, mientras que Any proporciona máxima flexibilidad. 
                        Cada enfoque tiene ventajas específicas según el contexto del proyecto y experiencia del equipo.
                    </p>
                </div>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center mt-6">
                <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-ts-accent to-ts-accent-dark text-white font-bold rounded-xl shadow-lg shadow-ts-accent/30 hover:shadow-xl hover:shadow-ts-accent/40 transition-all duration-300">
                    <ion-icon name="download-outline" class="mr-2"></ion-icon> Exportar Datos
                </button>
                <button class="close-chart-btn px-6 py-3 bg-gray-800 border border-border text-text-primary font-bold rounded-xl hover:bg-gray-700 transition-all duration-300">
                    <ion-icon name="close-outline" class="mr-2"></ion-icon> Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        const modalContent = modal.querySelector('.bg-card-bg-solid') as HTMLElement;
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
    
    // Crear gráficos detallados
    setTimeout(() => {
        // Gráfico de líneas detallado
        const detailedLineCanvas = document.getElementById('detailedLineChart') as HTMLCanvasElement;
        if (detailedLineCanvas && typeof window.Chart !== 'undefined') {
            if (detailedLineChart) {
                detailedLineChart.destroy();
            }
            
            const ctx = detailedLineCanvas.getContext('2d');
            if (ctx) {
                detailedLineChart = createLineChart(ctx, getDetailedLineChartData());
            }
        }
        
        // Gráfico de barras detallado
        const detailedBarCanvas = document.getElementById('detailedBarChart') as HTMLCanvasElement;
        if (detailedBarCanvas && typeof window.Chart !== 'undefined') {
            if (detailedBarChart) {
                detailedBarChart.destroy();
            }
            
            const ctx = detailedBarCanvas.getContext('2d');
            if (ctx) {
                detailedBarChart = createBarChart(ctx, getDetailedBarChartData());
            }
        }
        
        // Gráfico de radar detallado
        const detailedRadarCanvas = document.getElementById('detailedRadarChart') as HTMLCanvasElement;
        if (detailedRadarCanvas && typeof window.Chart !== 'undefined') {
            if (detailedRadarChart) {
                detailedRadarChart.destroy();
            }
            
            const ctx = detailedRadarCanvas.getContext('2d');
            if (ctx) {
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(approachType));
            }
        }
    }, 50);
    
    // Configurar botones
    const closeModal = (): void => {
        const modalContent = modal.querySelector('.bg-card-bg-solid') as HTMLElement;
        if (modalContent) {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    modal.querySelector('.close-chart-modal-btn')?.addEventListener('click', closeModal);
    modal.querySelector('.close-chart-btn')?.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e: MouseEvent) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    const exportChartBtn = document.getElementById('exportChartBtn');
    if (exportChartBtn) {
        exportChartBtn.addEventListener('click', (): void => {
            showNotification('Datos de gráficos exportados exitosamente', 'success');
        });
    }
}

// ============================================
// FUNCIONES AUXILIARES PARA DATOS DE GRÁFICOS
// ============================================

function getDetailedLineChartData(): ChartData {
    const years = [2016, 2018, 2020, 2022, 2024];
    const anyUsage = [90, 75, 60, 45, 30];
    const unknownUsage = [0, 15, 30, 50, 65];
    
    return {
        labels: years.map(y => `${y}`),
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

function getDetailedBarChartData(): ChartData {
    const approaches = ['Any', 'Unknown', 'Type Guard', 'Genérico'];
    const typeSafety = [10, 90, 95, 85];
    const runtimeSafety = [30, 95, 98, 90];
    const maintainability = [20, 85, 90, 75];
    
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

function getDetailedRadarChartData(approach: string): ChartData {
    const approachData = typingApproachesData[approach];
    
    // Datos para todos los enfoques
    const labels = ['Seguridad', 'Flexibilidad', 'Mantenibilidad', 'Runtime', 'Adopción'];
    
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
                backgroundColor: `${approachData.color}40`,
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

function initEventListeners(): void {
    console.log('Inicializando event listeners...');
    
    // Botón de simulación de migración
    const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
    if (simulateEvolutionBtn) {
        simulateEvolutionBtn.addEventListener('click', simulateMigrationProcess);
    }
    
    // Botón de especificaciones
    const viewSpecsBtn = document.getElementById('viewSpecsBtn');
    if (viewSpecsBtn) {
        viewSpecsBtn.addEventListener('click', (): void => {
            const specsModal = document.getElementById('specsModal');
            if (!specsModal) return;
            
            specsModal.classList.remove('hidden');
            setTimeout(() => {
                specsModal.classList.add('opacity-100');
                const modalContent = specsModal.querySelector('div');
                if (modalContent) {
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }
            }, 10);
        });
    }
    
    // Botón de comparación
    const compareMaterialsBtn = document.getElementById('compareMaterialsBtn');
    if (compareMaterialsBtn) {
        compareMaterialsBtn.addEventListener('click', (): void => {
            const compareModal = document.getElementById('compareModal');
            if (!compareModal) return;
            
            compareModal.classList.remove('hidden');
            setTimeout(() => {
                compareModal.classList.add('opacity-100');
                const modalContent = compareModal.querySelector('div');
                if (modalContent) {
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }
            }, 10);
        });
    }
    
    // Cerrar modales
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', (): void => {
            const specsModal = document.getElementById('specsModal');
            if (!specsModal) return;
            
            const modalContent = specsModal.querySelector('div');
            if (modalContent) {
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
            }
            specsModal.classList.remove('opacity-100');
            setTimeout(() => {
                specsModal.classList.add('hidden');
            }, 500);
        });
    }
    
    const closeCompareModalBtn = document.getElementById('closeCompareModal');
    if (closeCompareModalBtn) {
        closeCompareModalBtn.addEventListener('click', (): void => {
            const compareModal = document.getElementById('compareModal');
            if (!compareModal) return;
            
            const modalContent = compareModal.querySelector('div');
            if (modalContent) {
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
            }
            compareModal.classList.remove('opacity-100');
            setTimeout(() => {
                compareModal.classList.add('hidden');
            }, 500);
        });
    }
    
    // Cerrar modales al hacer clic fuera
    const specsModal = document.getElementById('specsModal');
    if (specsModal) {
        specsModal.addEventListener('click', (e: MouseEvent) => {
            if (e.target === specsModal) {
                closeModalBtn?.click();
            }
        });
    }
    
    const compareModal = document.getElementById('compareModal');
    if (compareModal) {
        compareModal.addEventListener('click', (e: MouseEvent) => {
            if (e.target === compareModal) {
                closeCompareModalBtn?.click();
            }
        });
    }
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            const specsModal = document.getElementById('specsModal');
            const compareModal = document.getElementById('compareModal');
            const chartModal = document.querySelector('.fixed.inset-0.bg-black\\/90');
            
            if (specsModal && !specsModal.classList.contains('hidden')) {
                closeModalBtn?.click();
            }
            if (compareModal && !compareModal.classList.contains('hidden')) {
                closeCompareModalBtn?.click();
            }
            if (chartModal) {
                (chartModal.querySelector('.close-chart-modal-btn') as HTMLElement)?.click();
            }
        }
    });
    
    console.log('Event listeners inicializados');
}

// ============================================
// FUNCIÓN: INICIALIZAR ANIMACIONES
// ============================================

function initAnimations(): void {
    // Animación de aparición para elementos
    const observerOptions: IntersectionObserverInit = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }, observerOptions);
    
    // Aplicar animación a elementos principales
    document.querySelectorAll('.card, .timeline-item, .stat-card').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(el);
    });
    
    console.log('Animaciones inicializadas');
}

// ============================================
// FUNCIÓN: SIMULAR PROCESO DE MIGRACIÓN
// ============================================

function simulateMigrationProcess(): void {
    const btn = document.getElementById('simulateEvolutionBtn');
    if (!btn) return;
    
    const originalHTML = btn.innerHTML;
    
    // Cambiar estado del botón
    btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando migración...';
    btn.setAttribute('disabled', 'true');
    
    // Mostrar progreso
    const steps = [
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
    
    let step = 0;
    const progressInterval = setInterval((): void => {
        if (step < steps.length) {
            btn.innerHTML = `<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> ${steps[step]}`;
            step++;
        }
    }, 500);
    
    // Simular proceso completo
    setTimeout(() => {
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

function showMigrationResults(): void {
    interface MigrationResult {
        type: string;
        value: string;
        color: string;
        icon: string;
    }
    
    const results: MigrationResult[] = [
        { type: 'Cobertura de tipos', value: '30% → 95%', color: '#3178c6', icon: 'shield-checkmark-outline' },
        { type: 'Errores runtime', value: '-65%', color: '#ff6b6b', icon: 'bug-outline' },
        { type: 'Tiempo desarrollo', value: '+15%', color: '#ffd93d', icon: 'time-outline' },
        { type: 'Mantenibilidad', value: '+40%', color: '#8b5cf6', icon: 'trending-up-outline' }
    ];
    
    // Crear modal de resultados
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
    modal.innerHTML = `
        <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
            <button class="close-migration-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                &times;
            </button>
            <h2 class="text-2xl md:text-3xl font-bold mb-6 text-ts-accent-light">
                <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Resultados de Migración Any → Unknown
            </h2>
            <div class="mb-6">
                <p class="text-text-secondary mb-4">Simulación del proceso de migración de código TypeScript con any a código type-safe con unknown:</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                ${results.map(result => `
                    <div class="bg-gray-900/50 rounded-xl p-4 text-center">
                        <div class="text-2xl md:text-3xl mb-2" style="color: ${result.color};">
                            <ion-icon name="${result.icon}"></ion-icon>
                        </div>
                        <div class="text-2xl md:text-3xl font-black mb-1" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.value}</div>
                        <div class="text-sm text-text-secondary">${result.type}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="bg-gray-900/50 rounded-lg p-4 mb-6">
                <div class="font-mono text-sm space-y-1">
                    <span class="text-ts-accent-light"># Recomendaciones para migración exitosa:</span><br>
                    <span class="text-text-secondary">1. Configurar tsconfig.json con strict y noImplicitAny</span><br>
                    <span class="text-text-secondary">2. Usar ESLint con @typescript-eslint/no-explicit-any</span><br>
                    <span class="text-text-secondary">3. Migrar gradualmente, archivo por archivo</span><br>
                    <span class="text-text-secondary">4. Implementar Type Guards para unknown</span><br>
                    <span class="text-text-secondary">5. Medir type coverage regularmente</span>
                </div>
            </div>
            
            <div class="flex justify-center">
                <button class="close-migration-btn px-6 py-3 bg-gradient-to-r from-ts-accent to-ts-accent-dark text-white font-bold rounded-xl shadow-lg shadow-ts-accent/30">
                    <ion-icon name="checkmark-outline" class="mr-2"></ion-icon> Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        const modalContent = modal.querySelector('.bg-card-bg-solid') as HTMLElement;
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
    
    // Configurar botones de cierre
    const closeModal = (): void => {
        const modalContent = modal.querySelector('.bg-card-bg-solid') as HTMLElement;
        if (modalContent) {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    modal.querySelector('.close-migration-modal')?.addEventListener('click', closeModal);
    modal.querySelector('.close-migration-btn')?.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e: MouseEvent) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ============================================
// FUNCIÓN AUXILIAR: MOSTRAR NOTIFICACIONES
// ============================================

type NotificationType = 'success' | 'error' | 'warning' | 'info';

function showNotification(message: string, type: NotificationType = 'info'): void {
    const colors: Record<NotificationType, string> = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}