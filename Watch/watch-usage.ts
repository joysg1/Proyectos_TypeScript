// Definición de tipos principales
type WatchMode = 
    | 'basic' 
    | 'incremental' 
    | 'watch-directory' 
    | 'watch-file' 
    | 'project-reference' 
    | 'compiler-options'
    | 'build-watch';

interface WatchModeExample {
    id: string;
    name: string;
    type: WatchMode;
    description: string;
    shortDescription: string;
    command: string;
    config: string;
    examples: string[];
    useCases: Array<{
        title: string;
        description: string;
        icon: string;
    }>;
    bestPractices: string[];
    commonIssues: Array<{
        issue: string;
        solution: string;
    }>;
    configurationOptions: Array<{
        option: string;
        value: string;
        description: string;
    }>;
    icon: string;
    color: string;
    badge: string;
    badgeColor: string;
}

// Clase principal de la aplicación
class WatchUsageVisualizer {
    private watchModes: WatchModeExample[] = [];
    private activeMode: WatchMode = 'basic';
    private currentTabIndex: number = 0;
    private isLightMode: boolean = false;
    private isModalOpen: boolean = false;

    constructor() {
        this.initializeWatchModes();
        this.initializeEventListeners();
        this.renderWatchCards();
    }

    // Inicializar modos watch
    private initializeWatchModes(): void {
        this.watchModes = [
            {
                id: 'basic-watch',
                name: 'Modo Watch Básico',
                type: 'basic',
                description: 'El modo watch básico de TypeScript monitorea cambios en archivos .ts y .tsx, recompilando automáticamente cuando detecta modificaciones. Perfecto para desarrollo local.',
                shortDescription: 'Monitoreo básico de cambios en archivos TypeScript',
                command: 'tsc --watch',
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
                examples: [
                    '// Ejecutar watch en el proyecto actual\ntsc --watch\n\n// Con archivo tsconfig específico\ntsc --watch -p tsconfig.dev.json\n\n// Con salida detallada\ntsc --watch --verbose',
                    '// package.json script\n{\n  "scripts": {\n    "dev": "tsc --watch",\n    "build": "tsc"\n  }\n}\n\n// Ejecutar con npm run dev',
                    '// Combinar con otros flags\ntsc --watch --noEmitOnError --sourceMap\n\n// Watch solo para type checking\ntsc --watch --noEmit'
                ],
                useCases: [
                    {
                        title: 'Desarrollo Local',
                        description: 'Ideal para desarrollo en máquina local con recarga automática',
                        icon: 'fa-laptop-code'
                    },
                    {
                        title: 'Prototipado Rápido',
                        description: 'Perfecto para prototipar y experimentar con cambios frecuentes',
                        icon: 'fa-bolt'
                    },
                    {
                        title: 'Aprendizaje TypeScript',
                        description: 'Excelente para aprender TypeScript viendo cambios en tiempo real',
                        icon: 'fa-graduation-cap'
                    }
                ],
                bestPractices: [
                    'Usar --noEmitOnError para prevenir compilación con errores',
                    'Combinar con --sourceMap para mejor debugging',
                    'Configurar exclude apropiadamente para mejor performance',
                    'Usar scripts de npm para consistencia entre desarrolladores'
                ],
                commonIssues: [
                    {
                        issue: 'Watch no detecta cambios en archivos nuevos',
                        solution: 'Asegurar que los archivos estén en directorios incluidos en tsconfig'
                    },
                    {
                        issue: 'Alto consumo de CPU',
                        solution: 'Excluir node_modules y dist, reducir scope de archivos incluidos'
                    },
                    {
                        issue: 'No recompila después de errores',
                        solution: 'Usar --noEmitOnError false o corregir los errores primero'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'watchFile',
                        value: 'useFsEvents',
                        description: 'Usar eventos del sistema de archivos para mejor performance'
                    },
                    {
                        option: 'watchDirectory',
                        value: 'useFsEvents',
                        description: 'Monitorear directorios con eventos del sistema'
                    },
                    {
                        option: 'fallbackPolling',
                        value: 'dynamicPriority',
                        description: 'Polling dinámico como fallback'
                    }
                ],
                icon: 'fa-eye',
                color: '#3b82f6',
                badge: 'Básico',
                badgeColor: '#3b82f6'
            },
            {
                id: 'incremental-watch',
                name: 'Watch Incremental',
                type: 'incremental',
                description: 'Modo watch con compilación incremental que solo recompila archivos cambiados, reduciendo significativamente el tiempo de compilación en proyectos grandes.',
                shortDescription: 'Compilación incremental para proyectos grandes',
                command: 'tsc --watch --incremental',
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "incremental": true,
    "tsBuildInfoFile": "./build/.tsbuildinfo"
  },
  "include": ["src/**/*"]
}`,
                examples: [
                    '// Habilitar incremental con watch\ntsc --watch --incremental\n\n// Con archivo tsbuildinfo personalizado\ntsc --watch --incremental --tsBuildInfoFile ./build/cache.tsbuildinfo',
                    '// tsconfig.json con incremental\n{\n  "compilerOptions": {\n    "incremental": true,\n    "tsBuildInfoFile": "./.cache/tsbuildinfo"\n  }\n}\n\n// Luego ejecutar: tsc --watch',
                    '// Combinar con otras optimizaciones\ntsc --watch --incremental --skipLibCheck\n\n// Para monorepos\ntsc --watch --incremental -p packages/core'
                ],
                useCases: [
                    {
                        title: 'Proyectos Grandes',
                        description: 'Proyectos con cientos de archivos TypeScript',
                        icon: 'fa-project-diagram'
                    },
                    {
                        title: 'Builds Lentos',
                        description: 'Cuando las compilaciones completas toman mucho tiempo',
                        icon: 'fa-clock'
                    },
                    {
                        title: 'CI/CD Optimization',
                        description: 'Optimizar pipelines de integración continua',
                        icon: 'fa-sync-alt'
                    }
                ],
                bestPractices: [
                    'Especificar tsBuildInfoFile para controlar ubicación del cache',
                    'Excluir archivos de cache del sistema de control de versiones',
                    'Limpiar cache cuando cambien versiones de TypeScript',
                    'Usar con --skipLibCheck para mayor velocidad'
                ],
                commonIssues: [
                    {
                        issue: 'Cache corrupto',
                        solution: 'Eliminar archivo .tsbuildinfo y recompilar'
                    },
                    {
                        issue: 'No detecta cambios en dependencias',
                        solution: 'Forzar recompilación completa periódicamente'
                    },
                    {
                        issue: 'Espacio en disco',
                        solution: 'Configurar tsBuildInfoFile en directorio temporal'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'incremental',
                        value: 'true',
                        description: 'Habilitar compilación incremental'
                    },
                    {
                        option: 'tsBuildInfoFile',
                        value: './.tsbuildinfo',
                        description: 'Ubicación del archivo de información de build'
                    },
                    {
                        option: 'composite',
                        value: 'true',
                        description: 'Habilitar para proyectos de referencia'
                    }
                ],
                icon: 'fa-layer-group',
                color: '#10b981',
                badge: 'Incremental',
                badgeColor: '#10b981'
            },
            {
                id: 'watch-directory',
                name: 'Watch Directory',
                type: 'watch-directory',
                description: 'Monitoreo específico de directorios completos con opciones avanzadas de configuración para proyectos complejos con estructuras de carpetas múltiples.',
                shortDescription: 'Monitoreo avanzado de directorios',
                command: 'tsc --watch --project src/',
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "outDir": "./dist",
    "rootDir": "./src",
    "watchDirectory": "useFsEvents",
    "watchFile": "useFsEvents"
  },
  "include": ["src/**/*", "shared/**/*"],
  "exclude": ["**/node_modules", "**/dist", "**/test"]
}`,
                examples: [
                    '// Watch específico de directorio\ntsc --watch -p src/\n\n// Múltiples directorios\ntsc --watch src/ shared/ --outDir dist',
                    '// Con opciones de watch avanzadas\n{\n  "watchOptions": {\n    "watchFile": "useFsEvents",\n    "watchDirectory": "useFsEvents",\n    "fallbackPolling": "dynamicPriority"\n  }\n}',
                    '// Excluir directorios específicos\ntsc --watch --exclude "**/test/**" --exclude "**/temp/**"\n\n// Incluir patrones glob\n--include "src/**/*.ts" "shared/**/*.tsx"'
                ],
                useCases: [
                    {
                        title: 'Monorepos',
                        description: 'Proyectos con múltiples paquetes y directorios',
                        icon: 'fa-folder-tree'
                    },
                    {
                        title: 'Microservicios',
                        description: 'Arquitecturas distribuidas con servicios separados',
                        icon: 'fa-server'
                    },
                    {
                        title: 'Shared Libraries',
                        description: 'Bibliotecas compartidas entre proyectos',
                        icon: 'fa-book'
                    }
                ],
                bestPractices: [
                    'Usar watchDirectory: useFsEvents para mejor performance',
                    'Configurar exclude apropiadamente',
                    'Separar código fuente de builds',
                    'Usar rootDir para estructura clara'
                ],
                commonIssues: [
                    {
                        issue: 'Demasiados archivos monitoreados',
                        solution: 'Ajustar exclude y include patterns'
                    },
                    {
                        issue: 'Eventos de sistema no disponibles',
                        solution: 'Usar polling como fallback'
                    },
                    {
                        issue: 'Recursión infinita',
                        solution: 'Excluir directorios de output'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'watchDirectory',
                        value: 'useFsEvents',
                        description: 'Método para monitorear directorios'
                    },
                    {
                        option: 'exclude',
                        value: '["node_modules", "dist"]',
                        description: 'Directorios excluidos del watch'
                    },
                    {
                        option: 'include',
                        value: '["src/**/*"]',
                        description: 'Patrones de archivos incluidos'
                    }
                ],
                icon: 'fa-folder-open',
                color: '#8b5cf6',
                badge: 'Directorio',
                badgeColor: '#8b5cf6'
            },
            {
                id: 'watch-file',
                name: 'Watch File',
                type: 'watch-file',
                description: 'Configuración granular de monitoreo de archivos individuales con estrategias específicas para diferentes tipos de archivos y sistemas operativos.',
                shortDescription: 'Monitoreo granular de archivos',
                command: 'tsc --watch --watchFile useFsEvents',
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist"
  },
  "watchOptions": {
    "watchFile": "useFsEvents",
    "fallbackPolling": "dynamicPriority",
    "synchronousWatchDirectory": true,
    "excludeDirectories": ["**/node_modules", "dist"],
    "excludeFiles": ["**/*.spec.ts"]
  }
}`,
                examples: [
                    '// Estrategias de watch file\ntsc --watch --watchFile useFsEvents\n\n// Polling como fallback\ntsc --watch --watchFile priorityPolling --fallbackPolling dynamicPriority',
                    '// Configuración en tsconfig\n{\n  "watchOptions": {\n    "watchFile": "useFsEvents",\n    "watchDirectory": "useFsEvents",\n    "fallbackPolling": "dynamicPriority",\n    "synchronousWatchDirectory": true\n  }\n}',
                    '// Diferentes estrategias por OS\n// Linux/Mac: useFsEvents\n// Windows: priorityPolling\n// Containers: fixedPolling'
                ],
                useCases: [
                    {
                        title: 'Sistemas de Archivos',
                        description: 'Optimizar para diferentes sistemas de archivos',
                        icon: 'fa-hdd'
                    },
                    {
                        title: 'Contenedores Docker',
                        description: 'Configuraciones específicas para entornos containerizados',
                        icon: 'fa-docker'
                    },
                    {
                        title: 'Network Drives',
                        description: 'Trabajar con archivos en unidades de red',
                        icon: 'fa-network-wired'
                    }
                ],
                bestPractices: [
                    'Usar useFsEvents cuando esté disponible',
                    'Configurar fallbackPolling apropiado',
                    'Ajustar pollingInterval según necesidades',
                    'Probar diferentes estrategias en cada entorno'
                ],
                commonIssues: [
                    {
                        issue: 'Eventos no funcionan en NFS',
                        solution: 'Usar polling strategies'
                    },
                    {
                        issue: 'Alta latencia',
                        solution: 'Ajustar pollingInterval'
                    },
                    {
                        issue: 'Inotify limits en Linux',
                        solution: 'Aumentar fs.inotify.max_user_watches'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'watchFile',
                        value: 'useFsEvents',
                        description: 'Estrategia de monitoreo de archivos'
                    },
                    {
                        option: 'fallbackPolling',
                        value: 'dynamicPriority',
                        description: 'Estrategia de polling como fallback'
                    },
                    {
                        option: 'pollingInterval',
                        value: '250',
                        description: 'Intervalo de polling en milisegundos'
                    }
                ],
                icon: 'fa-file-code',
                color: '#f59e0b',
                badge: 'Archivo',
                badgeColor: '#f59e0b'
            },
            {
                id: 'project-reference',
                name: 'Project References Watch',
                type: 'project-reference',
                description: 'Soporte avanzado para monitoreo en proyectos con referencias a otros proyectos TypeScript, ideal para monorepos y arquitecturas complejas.',
                shortDescription: 'Watch para proyectos con referencias',
                command: 'tsc --build --watch',
                config: `{
  "references": [
    { "path": "../core" },
    { "path": "../utils" },
    { "path": "../ui" }
  ],
  "compilerOptions": {
    "target": "es2020",
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  }
}`,
                examples: [
                    '// Build watch con referencias\ntsc --build --watch\n\n// Para proyecto específico\ntsc --build --watch packages/app',
                    '// tsconfig con referencias\n{\n  "references": [\n    { "path": "./core" },\n    { "path": "./shared" }\n  ],\n  "compilerOptions": {\n    "composite": true\n  }\n}',
                    '// Combinar con incremental\ntsc --build --watch --incremental\n\n// Limpiar builds previos\ntsc --build --watch --clean'
                ],
                useCases: [
                    {
                        title: 'Monorepos TypeScript',
                        description: 'Proyectos grandes organizados en múltiples paquetes',
                        icon: 'fa-sitemap'
                    },
                    {
                        title: 'Shared Dependencies',
                        description: 'Cuando proyectos dependen unos de otros',
                        icon: 'fa-link'
                    },
                    {
                        title: 'Library Development',
                        description: 'Desarrollo de bibliotecas con dependencias internas',
                        icon: 'fa-box-open'
                    }
                ],
                bestPractices: [
                    'Habilitar composite en todos los proyectos',
                    'Usar declaration y declarationMap',
                    'Configurar prependProjectReferenceCorrectly',
                    'Mantener referencias actualizadas'
                ],
                commonIssues: [
                    {
                        issue: 'Referencias circulares',
                        solution: 'Reestructurar dependencias'
                    },
                    {
                        issue: 'Cache de referencias',
                        solution: 'Usar --clean periódicamente'
                    },
                    {
                        issue: 'Build order incorrecto',
                        solution: 'Verificar configuración de referencias'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'composite',
                        value: 'true',
                        description: 'Habilitar proyecto compuesto'
                    },
                    {
                        option: 'declaration',
                        value: 'true',
                        description: 'Generar archivos .d.ts'
                    },
                    {
                        option: 'declarationMap',
                        value: 'true',
                        description: 'Generar source maps para declarations'
                    }
                ],
                icon: 'fa-project-diagram',
                color: '#ec4899',
                badge: 'Referencia',
                badgeColor: '#ec4899'
            },
            {
                id: 'compiler-options',
                name: 'Compiler Options Watch',
                type: 'compiler-options',
                description: 'Configuración detallada de opciones del compilador específicas para modo watch, optimizando performance y comportamiento según necesidades específicas.',
                shortDescription: 'Opciones avanzadas del compilador',
                command: 'tsc --watch --preserveWatchOutput',
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "noEmitOnError": false,
    "preserveWatchOutput": true,
    "diagnostics": true,
    "extendedDiagnostics": false,
    "listFiles": false,
    "listEmittedFiles": true
  }
}`,
                examples: [
                    '// Preservar output entre builds\ntsc --watch --preserveWatchOutput\n\n// Con diagnósticos\ntsc --watch --diagnostics\n\n// Listar archivos compilados\ntsc --watch --listEmittedFiles',
                    '// Opciones de performance\ntsc --watch --skipLibCheck --skipDefaultLibCheck\n\n// Para debugging\ntsc --watch --extendedDiagnostics --generateTrace ./trace',
                    '// Control de output\n{\n  "compilerOptions": {\n    "preserveWatchOutput": true,\n    "noEmitOnError": false\n  }\n}'
                ],
                useCases: [
                    {
                        title: 'Performance Tuning',
                        description: 'Afinar performance del watch para proyectos específicos',
                        icon: 'fa-tachometer-alt'
                    },
                    {
                        title: 'Debugging Builds',
                        description: 'Diagnóstico de problemas de compilación',
                        icon: 'fa-bug'
                    },
                    {
                        title: 'CI/CD Configuration',
                        description: 'Configuración para pipelines automatizados',
                        icon: 'fa-cogs'
                    }
                ],
                bestPractices: [
                    'Usar preserveWatchOutput para output limpio',
                    'Habilitar diagnostics solo cuando sea necesario',
                    'Configurar skipLibCheck para mejor performance',
                    'Usar noEmitOnError según fase de desarrollo'
                ],
                commonIssues: [
                    {
                        issue: 'Output desordenado',
                        solution: 'Usar preserveWatchOutput'
                    },
                    {
                        issue: 'Performance lenta',
                        solution: 'Habilitar skipLibCheck'
                    },
                    {
                        issue: 'Demasiada información',
                        solution: 'Deshabilitar extendedDiagnostics'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'preserveWatchOutput',
                        value: 'true',
                        description: 'Preservar output entre compilaciones'
                    },
                    {
                        option: 'noEmitOnError',
                        value: 'false',
                        description: 'Emitir incluso con errores'
                    },
                    {
                        option: 'skipLibCheck',
                        value: 'true',
                        description: 'Saltar checking de archivos .d.ts'
                    }
                ],
                icon: 'fa-sliders-h',
                color: '#06b6d4',
                badge: 'Compilador',
                badgeColor: '#06b6d4'
            },
            {
                id: 'build-watch',
                name: 'Build Mode Watch',
                type: 'build-watch',
                description: 'Modo watch optimizado para operaciones de build, con soporte para limpieza, caché inteligente y manejo eficiente de recursos del sistema.',
                shortDescription: 'Watch optimizado para builds',
                command: 'tsc --build --watch --verbose',
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "outDir": "./dist",
    "rootDir": "./src",
    "incremental": true,
    "composite": true,
    "tsBuildInfoFile": "./.tsbuildinfo"
  },
  "references": [],
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",
    "fallbackPolling": "dynamicPriority",
    "synchronousWatchDirectory": true
  }
}`,
                examples: [
                    '// Build watch con verbose\ntsc --build --watch --verbose\n\n// Con limpieza\ntsc --build --watch --clean\n\n// Force rebuild\ntsc --build --watch --force',
                    '// Scripts complejos\n{\n  "scripts": {\n    "watch": "tsc --build --watch --preserveWatchOutput",\n    "watch:clean": "tsc --build --watch --clean",\n    "watch:verbose": "tsc --build --watch --verbose"\n  }\n}',
                    '// Monitoreo específico\ntsc --build --watch packages/* --exclude packages/docs\n\n// Con timeout\ntsc --build --watch --diagnostics --extendedDiagnostics'
                ],
                useCases: [
                    {
                        title: 'Enterprise Projects',
                        description: 'Proyectos empresariales grandes y complejos',
                        icon: 'fa-building'
                    },
                    {
                        title: 'Continuous Development',
                        description: 'Desarrollo continuo con múltiples desarrolladores',
                        icon: 'fa-users'
                    },
                    {
                        title: 'Production-like Builds',
                        description: 'Builds que simulan entorno de producción',
                        icon: 'fa-industry'
                    }
                ],
                bestPractices: [
                    'Combinar incremental con build mode',
                    'Usar --clean periódicamente',
                    'Configurar cache apropiadamente',
                    'Monitorear uso de recursos'
                ],
                commonIssues: [
                    {
                        issue: 'Memory leaks',
                        solution: 'Reiniciar watch periódicamente'
                    },
                    {
                        issue: 'Builds inconsistentes',
                        solution: 'Usar --clean antes de builds importantes'
                    },
                    {
                        issue: 'Performance degradation',
                        solution: 'Limpiar cache y archivos temporales'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'force',
                        value: 'false',
                        description: 'Forzar rebuild completa'
                    },
                    {
                        option: 'verbose',
                        value: 'false',
                        description: 'Output detallado'
                    },
                    {
                        option: 'dry',
                        value: 'false',
                        description: 'Mostrar qué haría sin ejecutar'
                    }
                ],
                icon: 'fa-hammer',
                color: '#14b8a6',
                badge: 'Build',
                badgeColor: '#14b8a6'
            }
        ];
    }

    // Inicializar event listeners
    private initializeEventListeners(): void {
        const themeToggle = document.getElementById('themeToggle');
        const closeModal = document.getElementById('closeModal');
        const copyCommand = document.getElementById('copyCommand');
        const copyConfig = document.getElementById('copyConfig');

        themeToggle?.addEventListener('click', () => this.toggleTheme());
        closeModal?.addEventListener('click', () => this.closeModal());
        copyCommand?.addEventListener('click', () => this.copyCommand());
        copyConfig?.addEventListener('click', () => this.copyConfig());

        // Cerrar modal al hacer clic fuera
        document.getElementById('watchModal')?.addEventListener('click', (e) => {
            if (e.target === document.getElementById('watchModal')) {
                this.closeModal();
            }
        });

        // Teclado shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.prevTab();
                if (e.key === 'ArrowRight') this.nextTab();
            }
        });
    }

    // Renderizar tarjetas de watch
    private renderWatchCards(): void {
        const container = document.getElementById('watchCards');
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < this.watchModes.length; i++) {
            const mode = this.watchModes[i];
            const card = document.createElement('div');
            card.className = 'watch-card';
            card.style.borderColor = mode.color;
            card.dataset.type = mode.type;

            card.innerHTML = `
                <div class="watch-card-badge" style="background: ${mode.badgeColor}20; color: ${mode.badgeColor}; border: 1px solid ${mode.badgeColor}">
                    ${mode.badge}
                </div>
                <div class="watch-card-header" style="border-color: ${mode.color}">
                    <div class="watch-card-icon" style="background: ${mode.color}20; color: ${mode.color}">
                        <i class="fas ${mode.icon}"></i>
                    </div>
                    <div class="watch-card-title">
                        <h3>${mode.name}</h3>
                        <p>${mode.shortDescription}</p>
                    </div>
                </div>
                <div class="watch-card-body">
                    <p style="margin-bottom: 15px; color: var(--dark-text-secondary)">${mode.description}</p>
                    <ul class="watch-feature-list">
                        ${mode.useCases.slice(0, 3).map(useCase => `
                            <li>
                                <i class="fas ${useCase.icon}"></i>
                                <span>${useCase.title}</span>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="code-preview">
                        <pre><code class="language-bash">${mode.command}</code></pre>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                this.setActiveMode(mode.type);
                this.openModal();
            });

            container.appendChild(card);
        }
    }

    // Establecer modo activo
    private setActiveMode(mode: WatchMode): void {
        this.activeMode = mode;
        this.currentTabIndex = 0;
        this.updateModalContent();
    }

    // Encontrar modo por tipo
    private findModeByType(type: WatchMode): WatchModeExample | undefined {
        // Usar bucle for en lugar de find para compatibilidad con ES5
        for (let i = 0; i < this.watchModes.length; i++) {
            if (this.watchModes[i].type === type) {
                return this.watchModes[i];
            }
        }
        return undefined;
    }

    // Actualizar contenido del modal
    private updateModalContent(): void {
        const mode = this.findModeByType(this.activeMode);
        if (!mode) return;

        // Actualizar título
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalTitleIcon = document.getElementById('modalTitleIcon');

        if (modalTitle) modalTitle.textContent = mode.name;
        if (modalSubtitle) modalSubtitle.textContent = mode.shortDescription;
        if (modalTitleIcon) {
            modalTitleIcon.innerHTML = `<i class="fas ${mode.icon}"></i>`;
            modalTitleIcon.style.background = `${mode.color}20`;
            modalTitleIcon.style.color = mode.color;
        }

        // Actualizar tabs
        this.updateModalTabs(mode);
        // Actualizar contenido de tabs
        this.updateTabContent(mode);
    }

    // Actualizar tabs del modal
    private updateModalTabs(mode: WatchModeExample): void {
        const tabsContainer = document.getElementById('modalTabs');
        if (!tabsContainer) return;

        const tabs = [
            { id: 'examples', label: 'Ejemplos', icon: 'fa-code' },
            { id: 'useCases', label: 'Casos de Uso', icon: 'fa-briefcase' },
            { id: 'bestPractices', label: 'Mejores Prácticas', icon: 'fa-star' },
            { id: 'commonIssues', label: 'Problemas Comunes', icon: 'fa-exclamation-triangle' },
            { id: 'configuration', label: 'Configuración', icon: 'fa-cog' }
        ];

        let tabsHTML = '';
        for (let i = 0; i < tabs.length; i++) {
            tabsHTML += `
                <button class="tab-btn ${i === 0 ? 'active' : ''}" 
                        data-tab="${tabs[i].id}" 
                        data-index="${i}">
                    <i class="fas ${tabs[i].icon}"></i>
                    ${tabs[i].label}
                </button>
            `;
        }
        tabsContainer.innerHTML = tabsHTML;

        // Añadir event listeners a los tabs
        const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const tabId = target.dataset.tab;
                const index = parseInt(target.dataset.index || '0');
                
                this.currentTabIndex = index;
                this.updateActiveTab(tabId || 'examples');
            });
        }
    }

    // Actualizar tab activo
    private updateActiveTab(tabId: string): void {
        // Actualizar botones de tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Actualizar contenido
        const mode = this.findModeByType(this.activeMode);
        if (mode) {
            this.updateTabContent(mode);
        }
    }

    // Actualizar contenido del tab
    private updateTabContent(mode: WatchModeExample): void {
        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        let content = '';
        
        switch (this.currentTabIndex) {
            case 0: // Ejemplos
                content = this.createExamplesTab(mode);
                break;
            case 1: // Casos de Uso
                content = this.createUseCasesTab(mode);
                break;
            case 2: // Mejores Prácticas
                content = this.createBestPracticesTab(mode);
                break;
            case 3: // Problemas Comunes
                content = this.createCommonIssuesTab(mode);
                break;
            case 4: // Configuración
                content = this.createConfigurationTab(mode);
                break;
        }

        modalBody.innerHTML = `<div class="tab-content active">${content}</div>`;
        
        // Resaltar sintaxis
        setTimeout(() => {
            if ((window as any).Prism) {
                (window as any).Prism.highlightAll();
            }
        }, 100);
    }

    // Crear tab de ejemplos
    private createExamplesTab(mode: WatchModeExample): string {
        let examplesHTML = '';
        for (let i = 0; i < mode.examples.length; i++) {
            examplesHTML += `
                <div class="example-card">
                    <div class="example-header">
                        <h4>Ejemplo ${i + 1}</h4>
                        <button class="copy-btn" data-code="${this.escapeHtml(mode.examples[i])}">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <div class="example-code">
                        <pre><code class="language-typescript">${mode.examples[i]}</code></pre>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="examples-grid">
                ${examplesHTML}
            </div>
        `;
    }

    // Crear tab de casos de uso
    private createUseCasesTab(mode: WatchModeExample): string {
        let useCasesHTML = '';
        for (let i = 0; i < mode.useCases.length; i++) {
            const useCase = mode.useCases[i];
            useCasesHTML += `
                <li>
                    <div class="use-case-icon">
                        <i class="fas ${useCase.icon}"></i>
                    </div>
                    <div class="use-case-content">
                        <h4>${useCase.title}</h4>
                        <p>${useCase.description}</p>
                    </div>
                </li>
            `;
        }
        
        return `
            <ul class="use-cases-list">
                ${useCasesHTML}
            </ul>
        `;
    }

    // Crear tab de mejores prácticas
    private createBestPracticesTab(mode: WatchModeExample): string {
        let practicesHTML = '';
        for (let i = 0; i < mode.bestPractices.length; i++) {
            practicesHTML += `
                <div class="practice-item">
                    <div class="practice-number" style="background: ${mode.color}">${i + 1}</div>
                    <div class="practice-text">${mode.bestPractices[i]}</div>
                </div>
            `;
        }
        
        return `
            <div class="best-practices-container">
                ${practicesHTML}
            </div>
        `;
    }

    // Crear tab de problemas comunes
    private createCommonIssuesTab(mode: WatchModeExample): string {
        let issuesHTML = '';
        for (let i = 0; i < mode.commonIssues.length; i++) {
            const issue = mode.commonIssues[i];
            issuesHTML += `
                <div class="issue-item">
                    <div class="issue-header">
                        <i class="fas fa-exclamation-circle" style="color: var(--danger)"></i>
                        <h4>${issue.issue}</h4>
                    </div>
                    <div class="issue-solution">
                        <i class="fas fa-check-circle" style="color: var(--success)"></i>
                        <p><strong>Solución:</strong> ${issue.solution}</p>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="common-issues-container">
                ${issuesHTML}
            </div>
        `;
    }

    // Crear tab de configuración
    private createConfigurationTab(mode: WatchModeExample): string {
        let optionsHTML = '';
        for (let i = 0; i < mode.configurationOptions.length; i++) {
            const option = mode.configurationOptions[i];
            optionsHTML += `
                <tr>
                    <td><code class="config-value">${option.option}</code></td>
                    <td><code class="config-value">${option.value}</code></td>
                    <td>${option.description}</td>
                </tr>
            `;
        }
        
        return `
            <div class="configuration-container">
                <div class="code-preview" style="margin-bottom: 30px;">
                    <pre><code class="language-json">${mode.config}</code></pre>
                </div>
                
                <h3 style="margin-bottom: 20px; color: var(--primary)">Opciones de Configuración</h3>
                
                <table class="config-table">
                    <thead>
                        <tr>
                            <th>Opción</th>
                            <th>Valor</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${optionsHTML}
                    </tbody>
                </table>
            </div>
        `;
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
        const modal = document.getElementById('watchModal');
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
        const modal = document.getElementById('watchModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Navegar al tab anterior
    private prevTab(): void {
        this.currentTabIndex--;
        if (this.currentTabIndex < 0) {
            this.currentTabIndex = 4; // Total de tabs - 1
        }
        const mode = this.findModeByType(this.activeMode);
        if (mode) {
            this.updateTabContent(mode);
        }
        const tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    }

    // Navegar al siguiente tab
    private nextTab(): void {
        this.currentTabIndex++;
        if (this.currentTabIndex > 4) {
            this.currentTabIndex = 0;
        }
        const mode = this.findModeByType(this.activeMode);
        if (mode) {
            this.updateTabContent(mode);
        }
        const tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    }

    // Copiar comando
    private copyCommand(): void {
        const mode = this.findModeByType(this.activeMode);
        if (!mode) return;

        this.copyToClipboard(mode.command);
    }

    // Copiar configuración
    private copyConfig(): void {
        const mode = this.findModeByType(this.activeMode);
        if (!mode) return;

        this.copyToClipboard(mode.config);
    }

    // Copiar texto al portapapeles
    private copyToClipboard(text: string): void {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Código copiado al portapapeles', false);
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
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        const icon = document.createElement('i');
        icon.className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
        notification.prepend(icon);
        
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
    new WatchUsageVisualizer();
});