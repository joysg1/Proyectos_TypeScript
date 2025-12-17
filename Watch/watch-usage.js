// Clase principal de la aplicación
var WatchUsageVisualizer = /** @class */ (function () {
    function WatchUsageVisualizer() {
        this.watchModes = [];
        this.activeMode = 'basic';
        this.currentTabIndex = 0;
        this.isLightMode = false;
        this.isModalOpen = false;
        this.initializeWatchModes();
        this.initializeEventListeners();
        this.renderWatchCards();
    }
    // Inicializar modos watch
    WatchUsageVisualizer.prototype.initializeWatchModes = function () {
        this.watchModes = [
            {
                id: 'basic-watch',
                name: 'Modo Watch Básico',
                type: 'basic',
                description: 'El modo watch básico de TypeScript monitorea cambios en archivos .ts y .tsx, recompilando automáticamente cuando detecta modificaciones. Perfecto para desarrollo local.',
                shortDescription: 'Monitoreo básico de cambios en archivos TypeScript',
                command: 'tsc --watch',
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"strict\": true\n  },\n  \"include\": [\"src/**/*\"],\n  \"exclude\": [\"node_modules\", \"dist\"]\n}",
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
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"strict\": true,\n    \"incremental\": true,\n    \"tsBuildInfoFile\": \"./build/.tsbuildinfo\"\n  },\n  \"include\": [\"src/**/*\"]\n}",
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
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"esnext\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"watchDirectory\": \"useFsEvents\",\n    \"watchFile\": \"useFsEvents\"\n  },\n  \"include\": [\"src/**/*\", \"shared/**/*\"],\n  \"exclude\": [\"**/node_modules\", \"**/dist\", \"**/test\"]\n}",
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
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\"\n  },\n  \"watchOptions\": {\n    \"watchFile\": \"useFsEvents\",\n    \"fallbackPolling\": \"dynamicPriority\",\n    \"synchronousWatchDirectory\": true,\n    \"excludeDirectories\": [\"**/node_modules\", \"dist\"],\n    \"excludeFiles\": [\"**/*.spec.ts\"]\n  }\n}",
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
                config: "{\n  \"references\": [\n    { \"path\": \"../core\" },\n    { \"path\": \"../utils\" },\n    { \"path\": \"../ui\" }\n  ],\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"composite\": true,\n    \"declaration\": true,\n    \"declarationMap\": true,\n    \"outDir\": \"./dist\"\n  }\n}",
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
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"strict\": true,\n    \"noEmitOnError\": false,\n    \"preserveWatchOutput\": true,\n    \"diagnostics\": true,\n    \"extendedDiagnostics\": false,\n    \"listFiles\": false,\n    \"listEmittedFiles\": true\n  }\n}",
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
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"esnext\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"incremental\": true,\n    \"composite\": true,\n    \"tsBuildInfoFile\": \"./.tsbuildinfo\"\n  },\n  \"references\": [],\n  \"watchOptions\": {\n    \"watchFile\": \"useFsEvents\",\n    \"watchDirectory\": \"useFsEvents\",\n    \"fallbackPolling\": \"dynamicPriority\",\n    \"synchronousWatchDirectory\": true\n  }\n}",
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
    };
    // Inicializar event listeners
    WatchUsageVisualizer.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a;
        var themeToggle = document.getElementById('themeToggle');
        var closeModal = document.getElementById('closeModal');
        var copyCommand = document.getElementById('copyCommand');
        var copyConfig = document.getElementById('copyConfig');
        themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.addEventListener('click', function () { return _this.toggleTheme(); });
        closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener('click', function () { return _this.closeModal(); });
        copyCommand === null || copyCommand === void 0 ? void 0 : copyCommand.addEventListener('click', function () { return _this.copyCommand(); });
        copyConfig === null || copyConfig === void 0 ? void 0 : copyConfig.addEventListener('click', function () { return _this.copyConfig(); });
        // Cerrar modal al hacer clic fuera
        (_a = document.getElementById('watchModal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
            if (e.target === document.getElementById('watchModal')) {
                _this.closeModal();
            }
        });
        // Teclado shortcuts
        document.addEventListener('keydown', function (e) {
            if (_this.isModalOpen) {
                if (e.key === 'Escape')
                    _this.closeModal();
                if (e.key === 'ArrowLeft')
                    _this.prevTab();
                if (e.key === 'ArrowRight')
                    _this.nextTab();
            }
        });
    };
    // Renderizar tarjetas de watch
    WatchUsageVisualizer.prototype.renderWatchCards = function () {
        var _this = this;
        var container = document.getElementById('watchCards');
        if (!container)
            return;
        container.innerHTML = '';
        var _loop_1 = function (i) {
            var mode = this_1.watchModes[i];
            var card = document.createElement('div');
            card.className = 'watch-card';
            card.style.borderColor = mode.color;
            card.dataset.type = mode.type;
            card.innerHTML = "\n                <div class=\"watch-card-badge\" style=\"background: ".concat(mode.badgeColor, "20; color: ").concat(mode.badgeColor, "; border: 1px solid ").concat(mode.badgeColor, "\">\n                    ").concat(mode.badge, "\n                </div>\n                <div class=\"watch-card-header\" style=\"border-color: ").concat(mode.color, "\">\n                    <div class=\"watch-card-icon\" style=\"background: ").concat(mode.color, "20; color: ").concat(mode.color, "\">\n                        <i class=\"fas ").concat(mode.icon, "\"></i>\n                    </div>\n                    <div class=\"watch-card-title\">\n                        <h3>").concat(mode.name, "</h3>\n                        <p>").concat(mode.shortDescription, "</p>\n                    </div>\n                </div>\n                <div class=\"watch-card-body\">\n                    <p style=\"margin-bottom: 15px; color: var(--dark-text-secondary)\">").concat(mode.description, "</p>\n                    <ul class=\"watch-feature-list\">\n                        ").concat(mode.useCases.slice(0, 3).map(function (useCase) { return "\n                            <li>\n                                <i class=\"fas ".concat(useCase.icon, "\"></i>\n                                <span>").concat(useCase.title, "</span>\n                            </li>\n                        "); }).join(''), "\n                    </ul>\n                    <div class=\"code-preview\">\n                        <pre><code class=\"language-bash\">").concat(mode.command, "</code></pre>\n                    </div>\n                </div>\n            ");
            card.addEventListener('click', function () {
                _this.setActiveMode(mode.type);
                _this.openModal();
            });
            container.appendChild(card);
        };
        var this_1 = this;
        for (var i = 0; i < this.watchModes.length; i++) {
            _loop_1(i);
        }
    };
    // Establecer modo activo
    WatchUsageVisualizer.prototype.setActiveMode = function (mode) {
        this.activeMode = mode;
        this.currentTabIndex = 0;
        this.updateModalContent();
    };
    // Encontrar modo por tipo
    WatchUsageVisualizer.prototype.findModeByType = function (type) {
        // Usar bucle for en lugar de find para compatibilidad con ES5
        for (var i = 0; i < this.watchModes.length; i++) {
            if (this.watchModes[i].type === type) {
                return this.watchModes[i];
            }
        }
        return undefined;
    };
    // Actualizar contenido del modal
    WatchUsageVisualizer.prototype.updateModalContent = function () {
        var mode = this.findModeByType(this.activeMode);
        if (!mode)
            return;
        // Actualizar título
        var modalTitle = document.getElementById('modalTitle');
        var modalSubtitle = document.getElementById('modalSubtitle');
        var modalTitleIcon = document.getElementById('modalTitleIcon');
        if (modalTitle)
            modalTitle.textContent = mode.name;
        if (modalSubtitle)
            modalSubtitle.textContent = mode.shortDescription;
        if (modalTitleIcon) {
            modalTitleIcon.innerHTML = "<i class=\"fas ".concat(mode.icon, "\"></i>");
            modalTitleIcon.style.background = "".concat(mode.color, "20");
            modalTitleIcon.style.color = mode.color;
        }
        // Actualizar tabs
        this.updateModalTabs(mode);
        // Actualizar contenido de tabs
        this.updateTabContent(mode);
    };
    // Actualizar tabs del modal
    WatchUsageVisualizer.prototype.updateModalTabs = function (mode) {
        var _this = this;
        var tabsContainer = document.getElementById('modalTabs');
        if (!tabsContainer)
            return;
        var tabs = [
            { id: 'examples', label: 'Ejemplos', icon: 'fa-code' },
            { id: 'useCases', label: 'Casos de Uso', icon: 'fa-briefcase' },
            { id: 'bestPractices', label: 'Mejores Prácticas', icon: 'fa-star' },
            { id: 'commonIssues', label: 'Problemas Comunes', icon: 'fa-exclamation-triangle' },
            { id: 'configuration', label: 'Configuración', icon: 'fa-cog' }
        ];
        var tabsHTML = '';
        for (var i = 0; i < tabs.length; i++) {
            tabsHTML += "\n                <button class=\"tab-btn ".concat(i === 0 ? 'active' : '', "\" \n                        data-tab=\"").concat(tabs[i].id, "\" \n                        data-index=\"").concat(i, "\">\n                    <i class=\"fas ").concat(tabs[i].icon, "\"></i>\n                    ").concat(tabs[i].label, "\n                </button>\n            ");
        }
        tabsContainer.innerHTML = tabsHTML;
        // Añadir event listeners a los tabs
        var tabButtons = tabsContainer.querySelectorAll('.tab-btn');
        for (var i = 0; i < tabButtons.length; i++) {
            tabButtons[i].addEventListener('click', function (e) {
                var target = e.currentTarget;
                var tabId = target.dataset.tab;
                var index = parseInt(target.dataset.index || '0');
                _this.currentTabIndex = index;
                _this.updateActiveTab(tabId || 'examples');
            });
        }
    };
    // Actualizar tab activo
    WatchUsageVisualizer.prototype.updateActiveTab = function (tabId) {
        // Actualizar botones de tabs
        var tabButtons = document.querySelectorAll('.tab-btn');
        for (var i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        var activeTab = document.querySelector("[data-tab=\"".concat(tabId, "\"]"));
        if (activeTab) {
            activeTab.classList.add('active');
        }
        // Actualizar contenido
        var mode = this.findModeByType(this.activeMode);
        if (mode) {
            this.updateTabContent(mode);
        }
    };
    // Actualizar contenido del tab
    WatchUsageVisualizer.prototype.updateTabContent = function (mode) {
        var modalBody = document.getElementById('modalBody');
        if (!modalBody)
            return;
        var content = '';
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
        modalBody.innerHTML = "<div class=\"tab-content active\">".concat(content, "</div>");
        // Resaltar sintaxis
        setTimeout(function () {
            if (window.Prism) {
                window.Prism.highlightAll();
            }
        }, 100);
    };
    // Crear tab de ejemplos
    WatchUsageVisualizer.prototype.createExamplesTab = function (mode) {
        var examplesHTML = '';
        for (var i = 0; i < mode.examples.length; i++) {
            examplesHTML += "\n                <div class=\"example-card\">\n                    <div class=\"example-header\">\n                        <h4>Ejemplo ".concat(i + 1, "</h4>\n                        <button class=\"copy-btn\" data-code=\"").concat(this.escapeHtml(mode.examples[i]), "\">\n                            <i class=\"fas fa-copy\"></i>\n                        </button>\n                    </div>\n                    <div class=\"example-code\">\n                        <pre><code class=\"language-typescript\">").concat(mode.examples[i], "</code></pre>\n                    </div>\n                </div>\n            ");
        }
        return "\n            <div class=\"examples-grid\">\n                ".concat(examplesHTML, "\n            </div>\n        ");
    };
    // Crear tab de casos de uso
    WatchUsageVisualizer.prototype.createUseCasesTab = function (mode) {
        var useCasesHTML = '';
        for (var i = 0; i < mode.useCases.length; i++) {
            var useCase = mode.useCases[i];
            useCasesHTML += "\n                <li>\n                    <div class=\"use-case-icon\">\n                        <i class=\"fas ".concat(useCase.icon, "\"></i>\n                    </div>\n                    <div class=\"use-case-content\">\n                        <h4>").concat(useCase.title, "</h4>\n                        <p>").concat(useCase.description, "</p>\n                    </div>\n                </li>\n            ");
        }
        return "\n            <ul class=\"use-cases-list\">\n                ".concat(useCasesHTML, "\n            </ul>\n        ");
    };
    // Crear tab de mejores prácticas
    WatchUsageVisualizer.prototype.createBestPracticesTab = function (mode) {
        var practicesHTML = '';
        for (var i = 0; i < mode.bestPractices.length; i++) {
            practicesHTML += "\n                <div class=\"practice-item\">\n                    <div class=\"practice-number\" style=\"background: ".concat(mode.color, "\">").concat(i + 1, "</div>\n                    <div class=\"practice-text\">").concat(mode.bestPractices[i], "</div>\n                </div>\n            ");
        }
        return "\n            <div class=\"best-practices-container\">\n                ".concat(practicesHTML, "\n            </div>\n        ");
    };
    // Crear tab de problemas comunes
    WatchUsageVisualizer.prototype.createCommonIssuesTab = function (mode) {
        var issuesHTML = '';
        for (var i = 0; i < mode.commonIssues.length; i++) {
            var issue = mode.commonIssues[i];
            issuesHTML += "\n                <div class=\"issue-item\">\n                    <div class=\"issue-header\">\n                        <i class=\"fas fa-exclamation-circle\" style=\"color: var(--danger)\"></i>\n                        <h4>".concat(issue.issue, "</h4>\n                    </div>\n                    <div class=\"issue-solution\">\n                        <i class=\"fas fa-check-circle\" style=\"color: var(--success)\"></i>\n                        <p><strong>Soluci\u00F3n:</strong> ").concat(issue.solution, "</p>\n                    </div>\n                </div>\n            ");
        }
        return "\n            <div class=\"common-issues-container\">\n                ".concat(issuesHTML, "\n            </div>\n        ");
    };
    // Crear tab de configuración
    WatchUsageVisualizer.prototype.createConfigurationTab = function (mode) {
        var optionsHTML = '';
        for (var i = 0; i < mode.configurationOptions.length; i++) {
            var option = mode.configurationOptions[i];
            optionsHTML += "\n                <tr>\n                    <td><code class=\"config-value\">".concat(option.option, "</code></td>\n                    <td><code class=\"config-value\">").concat(option.value, "</code></td>\n                    <td>").concat(option.description, "</td>\n                </tr>\n            ");
        }
        return "\n            <div class=\"configuration-container\">\n                <div class=\"code-preview\" style=\"margin-bottom: 30px;\">\n                    <pre><code class=\"language-json\">".concat(mode.config, "</code></pre>\n                </div>\n                \n                <h3 style=\"margin-bottom: 20px; color: var(--primary)\">Opciones de Configuraci\u00F3n</h3>\n                \n                <table class=\"config-table\">\n                    <thead>\n                        <tr>\n                            <th>Opci\u00F3n</th>\n                            <th>Valor</th>\n                            <th>Descripci\u00F3n</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ").concat(optionsHTML, "\n                    </tbody>\n                </table>\n            </div>\n        ");
    };
    // Escape HTML para código
    WatchUsageVisualizer.prototype.escapeHtml = function (text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    // Abrir modal
    WatchUsageVisualizer.prototype.openModal = function () {
        var _this = this;
        this.isModalOpen = true;
        var modal = document.getElementById('watchModal');
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
    WatchUsageVisualizer.prototype.closeModal = function () {
        this.isModalOpen = false;
        var modal = document.getElementById('watchModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };
    // Navegar al tab anterior
    WatchUsageVisualizer.prototype.prevTab = function () {
        this.currentTabIndex--;
        if (this.currentTabIndex < 0) {
            this.currentTabIndex = 4; // Total de tabs - 1
        }
        var mode = this.findModeByType(this.activeMode);
        if (mode) {
            this.updateTabContent(mode);
        }
        var tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    };
    // Navegar al siguiente tab
    WatchUsageVisualizer.prototype.nextTab = function () {
        this.currentTabIndex++;
        if (this.currentTabIndex > 4) {
            this.currentTabIndex = 0;
        }
        var mode = this.findModeByType(this.activeMode);
        if (mode) {
            this.updateTabContent(mode);
        }
        var tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    };
    // Copiar comando
    WatchUsageVisualizer.prototype.copyCommand = function () {
        var mode = this.findModeByType(this.activeMode);
        if (!mode)
            return;
        this.copyToClipboard(mode.command);
    };
    // Copiar configuración
    WatchUsageVisualizer.prototype.copyConfig = function () {
        var mode = this.findModeByType(this.activeMode);
        if (!mode)
            return;
        this.copyToClipboard(mode.config);
    };
    // Copiar texto al portapapeles
    WatchUsageVisualizer.prototype.copyToClipboard = function (text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            this.showNotification('Código copiado al portapapeles', false);
        }
        catch (err) {
            this.showNotification('Error al copiar código', true);
        }
        document.body.removeChild(textarea);
    };
    // Alternar tema claro/oscuro
    WatchUsageVisualizer.prototype.toggleTheme = function () {
        this.isLightMode = !this.isLightMode;
        document.body.classList.toggle('light-mode', this.isLightMode);
        var themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.isLightMode ? 'fas fa-sun' : 'fas fa-moon';
        }
        this.showNotification("Tema ".concat(this.isLightMode ? 'claro' : 'oscuro', " activado"));
    };
    // Mostrar notificación
    WatchUsageVisualizer.prototype.showNotification = function (message, isError) {
        if (isError === void 0) { isError = false; }
        var notification = document.createElement('div');
        notification.className = "notification ".concat(isError ? 'error' : 'success');
        notification.textContent = message;
        notification.style.cssText = "\n            position: fixed;\n            top: 20px;\n            right: 20px;\n            padding: 15px 25px;\n            border-radius: 10px;\n            background: ".concat(isError ? '#ef4444' : '#10b981', ";\n            color: white;\n            font-weight: 600;\n            z-index: 10000;\n            animation: slideIn 0.3s ease;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.3);\n            display: flex;\n            align-items: center;\n            gap: 10px;\n        ");
        var icon = document.createElement('i');
        icon.className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
        notification.prepend(icon);
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
    return WatchUsageVisualizer;
}());
// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    new WatchUsageVisualizer();
});
