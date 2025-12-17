// include-exclude-config.ts - VERSIÓN COMPLETA CON LOS 6 TIPOS
// Clase principal de la aplicación
var IncludeExcludeVisualizer = /** @class */ (function () {
    function IncludeExcludeVisualizer() {
        this.configExamples = [];
        this.activeConfig = 'include-basic';
        this.currentTabIndex = 0;
        this.isLightMode = false;
        this.isModalOpen = false;
        this.initializeConfigExamples();
        this.initializeEventListeners();
        this.renderConfigCards();
        this.initializeQuickNav();
        this.setupScrollListener();
        // Cargar tema guardado
        this.loadSavedTheme();
    }
    // Inicializar ejemplos de configuración - TODOS LOS 6 TIPOS
    IncludeExcludeVisualizer.prototype.initializeConfigExamples = function () {
        this.configExamples = [
            {
                id: 'include-basic',
                name: 'Basic Include Configuration',
                type: 'include-basic',
                description: 'Basic include configuration for standard TypeScript projects. Includes all .ts and .tsx files in specific directories while excluding node_modules and build files.',
                shortDescription: 'Basic configuration for TypeScript projects',
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"strict\": true,\n    \"esModuleInterop\": true\n  },\n  \"include\": [\n    \"src/**/*\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/*.spec.ts\",\n    \"**/*.test.ts\"\n  ]\n}",
                examples: [
                    "// Include only TypeScript files in src\n{\n  \"include\": [\"src/**/*.ts\", \"src/**/*.tsx\"]\n}\n\n// Include multiple directories\n{\n  \"include\": [\n    \"src/**/*\",\n    \"shared/**/*\",\n    \"types/**/*.d.ts\"\n  ]\n}\n\n// Specific file patterns\n{\n  \"include\": [\n    \"src/components/**/*.tsx\",\n    \"src/utils/**/*.ts\",\n    \"src/hooks/**/*.ts\"\n  ]\n}",
                    "// Exclude specific directories\n{\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"coverage\",\n    \".next\",\n    \"build\",\n    \"**/__tests__/**\",\n    \"**/*.test.*\",\n    \"**/*.spec.*\"\n  ]\n}\n\n// Exclude by extension\n{\n  \"exclude\": [\n    \"**/*.js\",\n    \"**/*.jsx\",\n    \"**/*.map\",\n    \"**/*.css\",\n    \"**/*.scss\"\n  ]\n}",
                    "// Include/exclude combination\n{\n  \"include\": [\"src/**/*\"],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/__mocks__/**\",\n    \"**/__fixtures__/**\",\n    \"**/*.stories.tsx\",\n    \"**/*.test.ts\",\n    \"**/*.spec.ts\"\n  ]\n}\n\n// For mixed structure projects\n{\n  \"include\": [\n    \"src/**/*.ts\",\n    \"src/**/*.tsx\",\n    \"scripts/**/*.ts\",\n    \"config/**/*.ts\"\n  ],\n  \"exclude\": [\n    \"**/node_modules/**\",\n    \"**/dist/**\",\n    \"**/*.d.ts\"\n  ]\n}"
                ],
                useCases: [
                    {
                        title: 'Standard Projects',
                        description: 'TypeScript projects with standard src/ structure',
                        icon: 'fa-folder'
                    },
                    {
                        title: 'Web Applications',
                        description: 'React/Vue/Angular applications with TypeScript',
                        icon: 'fa-globe'
                    },
                    {
                        title: 'Libraries',
                        description: 'TypeScript library development',
                        icon: 'fa-book'
                    }
                ],
                bestPractices: [
                    'Always exclude node_modules and build directories',
                    'Use glob patterns (**/*) for recursive inclusion',
                    'Specify extensions explicitly (.ts, .tsx)',
                    'Separate source code from test files',
                    'Use exclude for auto-generated files'
                ],
                commonIssues: [
                    {
                        issue: 'TypeScript cannot find files',
                        solution: 'Verify include patterns cover correct directories'
                    },
                    {
                        issue: 'Slow compilation',
                        solution: 'Exclude large directories like node_modules and dist'
                    },
                    {
                        issue: '.js files included by mistake',
                        solution: 'Explicitly specify .ts and .tsx in include'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'include',
                        value: '["src/**/*"]',
                        description: 'File patterns to include in compilation'
                    },
                    {
                        option: 'exclude',
                        value: '["node_modules", "dist"]',
                        description: 'File patterns to exclude from compilation'
                    },
                    {
                        option: 'files',
                        value: '[]',
                        description: 'Explicit file list (overrides include)'
                    }
                ],
                icon: 'fa-cube',
                color: '#3b82f6',
                badge: 'Basic',
                badgeColor: '#3b82f6'
            },
            {
                id: 'glob-patterns',
                name: 'Advanced Glob Patterns',
                type: 'glob-patterns',
                description: 'Advanced usage of glob patterns for precise control over file inclusion/exclusion. Support for complex patterns, negation, and multiple extension matching.',
                shortDescription: 'Complex glob patterns for inclusion/exclusion',
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"esnext\",\n    \"outDir\": \"./dist\"\n  },\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"shared/**/*.ts\",\n    \"!src/**/*.test.{ts,tsx}\",\n    \"!src/**/*.spec.{ts,tsx}\",\n    \"types/**/*.d.ts\"\n  ],\n  \"exclude\": [\n    \"**/node_modules/**\",\n    \"**/dist/**\",\n    \"**/coverage/**\",\n    \"**/.next/**\",\n    \"**/build/**\",\n    \"**/*.stories.{ts,tsx}\",\n    \"**/__mocks__/**\",\n    \"**/__fixtures__/**\"\n  ]\n}",
                examples: [
                    "// Glob patterns with multiple extensions\n{\n  \"include\": [\n    \"src/**/*.{ts,tsx,js,jsx}\",\n    \"config/**/*.{ts,js}\",\n    \"scripts/**/*.ts\"\n  ]\n}\n\n// Exclusion with negated patterns\n{\n  \"include\": [\n    \"src/**/*\",\n    \"!src/**/*.test.ts\",\n    \"!src/**/*.spec.ts\",\n    \"!src/**/__tests__/**\"\n  ]\n}\n\n// Complex nested patterns\n{\n  \"include\": [\n    \"packages/*/src/**/*.{ts,tsx}\",\n    \"shared/*/lib/**/*.ts\",\n    \"!packages/*/src/**/internal/**\"\n  ]\n}",
                    "// Pattern combinations\n{\n  \"include\": [\n    \"src/components/**/*.tsx\",\n    \"src/hooks/**/*.ts\",\n    \"src/utils/**/*.ts\",\n    \"src/types/**/*.d.ts\"\n  ],\n  \"exclude\": [\n    \"**/*.test.{ts,tsx}\",\n    \"**/*.spec.{ts,tsx}\",\n    \"**/*.stories.{ts,tsx}\",\n    \"**/__{tests,mocks,fixtures}__/**\"\n  ]\n}\n\n// Patterns for monorepos\n{\n  \"include\": [\n    \"packages/*/src/**/*\",\n    \"shared-libs/**/*.ts\",\n    \"!packages/docs/**\",\n    \"!**/node_modules/**\"\n  ]\n}",
                    "// Advanced exclusion patterns\n{\n  \"exclude\": [\n    // Exclude all build directories\n    \"**/{dist,build,.next,out,coverage}/**\",\n    \n    // Exclude test files\n    \"**/*.{test,spec}.{ts,tsx,js,jsx}\",\n    \n    // Exclude story files\n    \"**/*.stories.{ts,tsx}\",\n    \n    // Exclude specific configurations\n    \"**/webpack.config.js\",\n    \"**/jest.config.js\",\n    \"**/.eslintrc.js\",\n    \n    // Exclude generated files\n    \"**/*.d.ts\",\n    \"**/*.map\"\n  ]\n}"
                ],
                useCases: [
                    {
                        title: 'Complex Patterns',
                        description: 'Projects needing detailed inclusion/exclusion patterns',
                        icon: 'fa-project-diagram'
                    },
                    {
                        title: 'Multiple Extensions',
                        description: 'Projects mixing TypeScript and JavaScript',
                        icon: 'fa-file-code'
                    },
                    {
                        title: 'Precise Exclusions',
                        description: 'When specific file types need to be excluded',
                        icon: 'fa-filter'
                    }
                ],
                bestPractices: [
                    'Use ** for recursive directory matching',
                    'Specify extensions with {ts,tsx} for multiple types',
                    'Use ! for negation within include',
                    'Group similar patterns together',
                    'Test patterns with tools like globtester'
                ],
                commonIssues: [
                    {
                        issue: 'Patterns too broad',
                        solution: 'Be specific with directories and extensions'
                    },
                    {
                        issue: 'Incorrect pattern order',
                        solution: 'Patterns process in order - put exclusions first'
                    },
                    {
                        issue: 'Hidden directory issues',
                        solution: 'Explicitly include directories starting with . if needed'
                    }
                ],
                configurationOptions: [
                    {
                        option: '**/*',
                        value: 'Recursive',
                        description: 'Matches all files in all subdirectories'
                    },
                    {
                        option: '*.{ts,tsx}',
                        value: 'Multiple',
                        description: 'Matches multiple extensions'
                    },
                    {
                        option: '!pattern',
                        value: 'Negation',
                        description: 'Excludes files matching the pattern'
                    }
                ],
                icon: 'fa-globe',
                color: '#06b6d4',
                badge: 'Glob',
                badgeColor: '#06b6d4'
            },
            {
                id: 'monorepo-config',
                name: 'Monorepo Configuration',
                type: 'monorepo-config',
                description: 'Optimized configurations for monorepos with multiple packages. Efficient management of inclusion/exclusion in complex project structures with internal dependencies.',
                shortDescription: 'Optimized configuration for monorepos',
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"commonjs\",\n    \"composite\": true,\n    \"declaration\": true,\n    \"declarationMap\": true,\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\"\n  },\n  \"include\": [\n    \"packages/*/src/**/*.{ts,tsx}\",\n    \"shared/**/*.ts\",\n    \"types/**/*.d.ts\",\n    \"!packages/*/src/**/*.test.{ts,tsx}\"\n  ],\n  \"exclude\": [\n    \"**/node_modules/**\",\n    \"**/dist/**\",\n    \"packages/*/node_modules/**\",\n    \"**/coverage/**\",\n    \"**/*.stories.{ts,tsx}\",\n    \"**/__tests__/**\",\n    \"**/__mocks__/**\"\n  ],\n  \"references\": [\n    { \"path\": \"../core\" },\n    { \"path\": \"../utils\" },\n    { \"path\": \"../ui\" }\n  ]\n}",
                examples: [
                    "// Base monorepo configuration\n{\n  \"include\": [\n    \"packages/*/src/**/*\",\n    \"libs/**/*.ts\",\n    \"config/**/*.ts\"\n  ],\n  \"exclude\": [\n    \"**/node_modules/**\",\n    \"**/dist/**\",\n    \"**/*.test.*\",\n    \"**/*.spec.*\",\n    \"**/coverage/**\"\n  ]\n}\n\n// Specific package in monorepo\n{\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"../shared/**/*.ts\",\n    \"../types/**/*.d.ts\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/__tests__/**\"\n  ]\n}",
                    "// Monorepo with workspaces\n{\n  \"include\": [\n    \"src/**/*\",\n    \"../packages/shared/**/*.ts\",\n    \"../packages/types/**/*.d.ts\",\n    \"!src/**/*.test.ts\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"../packages/**/node_modules\",\n    \"../packages/**/dist\"\n  ]\n}\n\n// Selective package exclusion\n{\n  \"include\": [\n    \"packages/app/**/*\",\n    \"packages/admin/**/*\",\n    \"!packages/docs/**\",\n    \"!packages/legacy/**\"\n  ]\n}",
                    "// Performance optimization\n{\n  \"include\": [\n    \"packages/*/src/**/*.{ts,tsx}\",\n    \"!packages/*/src/**/__tests__/**\",\n    \"!packages/*/src/**/*.test.{ts,tsx}\"\n  ],\n  \"exclude\": [\n    \"**/node_modules/**\",\n    \"**/dist/**\",\n    \"**/.cache/**\",\n    \"**/coverage/**\",\n    \"**/*.map\",\n    \"**/*.d.ts\"\n  ]\n}"
                ],
                useCases: [
                    {
                        title: 'Lerna Monorepos',
                        description: 'Projects organized with Lerna or similar',
                        icon: 'fa-sitemap'
                    },
                    {
                        title: 'npm/yarn Workspaces',
                        description: 'Workspaces with multiple interdependent packages',
                        icon: 'fa-boxes'
                    },
                    {
                        title: 'Enterprise Projects',
                        description: 'Large projects with multiple teams',
                        icon: 'fa-building'
                    }
                ],
                bestPractices: [
                    'Use wildcard patterns for packages (packages/*/)',
                    'Exclude node_modules in each package',
                    'Use references for internal dependencies',
                    'Separate source code from build files',
                    'Optimize exclusions for better performance'
                ],
                commonIssues: [
                    {
                        issue: 'Circular dependencies',
                        solution: 'Review references structure and exclusions'
                    },
                    {
                        issue: 'Slow builds',
                        solution: 'Exclude node_modules from each package individually'
                    },
                    {
                        issue: 'Type conflicts',
                        solution: 'Use include/exclude to avoid duplication'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'packages/*/',
                        value: 'Wildcard',
                        description: 'Pattern for all packages in monorepo'
                    },
                    {
                        option: 'composite',
                        value: 'true',
                        description: 'Enable for composite projects'
                    },
                    {
                        option: 'references',
                        value: 'Array',
                        description: 'References to other TypeScript projects'
                    }
                ],
                icon: 'fa-layer-group',
                color: '#8b5cf6',
                badge: 'Monorepo',
                badgeColor: '#8b5cf6'
            },
            {
                id: 'test-configuration',
                name: 'Testing Configuration',
                type: 'test-configuration',
                description: 'Specialized configurations for projects with testing. Clear separation between source code and tests, with support for different testing frameworks and directory structures.',
                shortDescription: 'Optimized configuration for testing',
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"types\": [\"jest\", \"node\", \"react\", \"react-dom\"]\n  },\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"tests/**/*.{ts,tsx}\",\n    \"**/*.d.ts\",\n    \"!src/**/*.test.{ts,tsx}\",\n    \"!src/**/*.spec.{ts,tsx}\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"coverage\",\n    \".jest\",\n    \"**/__mocks__/**\",\n    \"**/__snapshots__/**\",\n    \"**/*.test.{js,jsx}\",\n    \"**/*.spec.{js,jsx}\",\n    \"**/setupTests.ts\",\n    \"**/jest.config.*\"\n  ]\n}",
                examples: [
                    "// Clear src/tests separation\n{\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"tests/**/*.{ts,tsx}\",\n    \"types/**/*.d.ts\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/__tests__/**\",\n    \"**/*.test.*\",\n    \"**/*.spec.*\"\n  ]\n}\n\n// Tests alongside source code\n{\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"!src/**/*.test.{ts,tsx}\",\n    \"!src/**/*.spec.{ts,tsx}\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"coverage\"\n  ]\n}",
                    "// Jest configuration\n{\n  \"include\": [\n    \"src/**/*\",\n    \"**/*.d.ts\",\n    \"__tests__/**/*.{ts,tsx}\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"coverage\",\n    \"**/__mocks__/**\",\n    \"**/__snapshots__/**\",\n    \"**/*.test.{js,jsx}\",\n    \"**/*.spec.{js,jsx}\"\n  ]\n}\n\n// Multiple test types\n{\n  \"include\": [\n    \"src/**/*\",\n    \"tests/unit/**/*\",\n    \"tests/integration/**/*\",\n    \"tests/e2e/**/*\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/__fixtures__/**\",\n    \"**/__benchmarks__/**\"\n  ]\n}",
                    "// CI/CD optimization\n{\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"!src/**/__tests__/**\",\n    \"!src/**/*.{test,spec}.{ts,tsx}\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"coverage\",\n    \".github\",\n    \".circleci\",\n    \"**/test-results/**\",\n    \"**/reports/**\"\n  ]\n}"
                ],
                useCases: [
                    {
                        title: 'Jest Testing',
                        description: 'Projects using Jest for testing',
                        icon: 'fa-vial'
                    },
                    {
                        title: 'Separate Testing',
                        description: 'Tests organized in separate directories',
                        icon: 'fa-folder-tree'
                    },
                    {
                        title: 'CI/CD Pipelines',
                        description: 'Optimized configurations for continuous integration',
                        icon: 'fa-tachometer-alt'
                    }
                ],
                bestPractices: [
                    'Separate tests from source code',
                    'Exclude coverage and report files',
                    'Use specific types for testing (@types/jest)',
                    'Exclude testing configurations',
                    'Keep tests out of build directory'
                ],
                commonIssues: [
                    {
                        issue: 'Tests included in build',
                        solution: 'Explicitly exclude test files'
                    },
                    {
                        issue: 'Testing types not found',
                        solution: 'Include @types in compilerOptions.types'
                    },
                    {
                        issue: 'Slow builds due to tests',
                        solution: 'Completely exclude test directories'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'types',
                        value: '["jest", "node"]',
                        description: 'TypeScript types to include for testing'
                    },
                    {
                        option: 'exclude tests',
                        value: '**/*.{test,spec}.*',
                        description: 'Exclude test files'
                    },
                    {
                        option: 'test directory',
                        value: 'tests/**/*',
                        description: 'Include separate test directory'
                    }
                ],
                icon: 'fa-vial',
                color: '#f59e0b',
                badge: 'Testing',
                badgeColor: '#f59e0b'
            },
            {
                id: 'build-config',
                name: 'Build Configuration',
                type: 'build-config',
                description: 'Optimized configurations for build processes. Exclusion of unnecessary files, performance optimization, and preparation for deployment in different environments.',
                shortDescription: 'Optimized configuration for builds',
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"esnext\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"declaration\": true,\n    \"declarationMap\": true,\n    \"sourceMap\": true,\n    \"incremental\": true\n  },\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"types/**/*.d.ts\",\n    \"!src/**/*.test.{ts,tsx}\",\n    \"!src/**/*.spec.{ts,tsx}\",\n    \"!src/**/__tests__/**\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"build\",\n    \".next\",\n    \"out\",\n    \"coverage\",\n    \".cache\",\n    \".turbo\",\n    \"**/*.stories.{ts,tsx}\",\n    \"**/__{tests,mocks,fixtures}__/**\",\n    \"**/*.{test,spec}.{ts,tsx,js,jsx}\",\n    \"**/webpack.config.*\",\n    \"**/jest.config.*\",\n    \"**/*.config.*\"\n  ]\n}",
                examples: [
                    "// Production build\n{\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"!src/**/*.{test,spec}.{ts,tsx}\",\n    \"!src/**/__tests__/**\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/*.stories.{ts,tsx}\",\n    \"**/__{mocks,fixtures}__/**\",\n    \"**/*.config.*\",\n    \"**/setupTests.*\"\n  ]\n}\n\n// Development file exclusion\n{\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \".vscode\",\n    \".idea\",\n    \".git\",\n    \"**/*.md\",\n    \"**/*.txt\",\n    \"**/*.log\",\n    \"**/temp/**\",\n    \"**/tmp/**\"\n  ]\n}",
                    "// Performance optimization\n{\n  \"include\": [\n    \"src/**/*.ts\",\n    \"src/**/*.tsx\",\n    \"!src/**/*.test.*\",\n    \"!src/**/*.spec.*\"\n  ],\n  \"exclude\": [\n    \"**/node_modules/**\",\n    \"**/dist/**\",\n    \"**/.git/**\",\n    \"**/*.map\",\n    \"**/*.css\",\n    \"**/*.scss\",\n    \"**/*.json\"\n  ]\n}\n\n// Incremental build\n{\n  \"include\": [\"src/**/*\"],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \".tsbuildinfo\",\n    \"**/*.test.*\",\n    \"**/*.spec.*\"\n  ]\n}",
                    "// Deployment preparation\n{\n  \"include\": [\n    \"src/**/*\",\n    \"public/**/*.d.ts\",\n    \"!src/**/__tests__/**\",\n    \"!src/**/*.{test,spec}.*\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"build\",\n    \".next\",\n    \".cache\",\n    \".turbo\",\n    \"coverage\",\n    \"**/__mocks__/**\",\n    \"**/__fixtures__/**\",\n    \"**/*.stories.*\",\n    \"**/*.config.*\",\n    \"**/.*\" // Hidden files\n  ]\n}"
                ],
                useCases: [
                    {
                        title: 'Production Builds',
                        description: 'Preparation for production deployment',
                        icon: 'fa-rocket'
                    },
                    {
                        title: 'Optimization',
                        description: 'Build performance optimization',
                        icon: 'fa-tachometer-alt'
                    },
                    {
                        title: 'CI/CD',
                        description: 'Continuous integration and deployment',
                        icon: 'fa-sync-alt'
                    }
                ],
                bestPractices: [
                    'Exclude all development files',
                    'Include only necessary source code',
                    'Exclude configuration files',
                    'Maintain consistent exclusions',
                    'Use broad patterns for exclusion'
                ],
                commonIssues: [
                    {
                        issue: 'Very large builds',
                        solution: 'Exclude non-essential files like docs and tests'
                    },
                    {
                        issue: 'Development files included',
                        solution: 'Exclude directories like .vscode and .idea'
                    },
                    {
                        issue: 'Slow builds',
                        solution: 'Completely exclude node_modules'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'outDir',
                        value: './dist',
                        description: 'Output directory for compiled files'
                    },
                    {
                        option: 'rootDir',
                        value: './src',
                        description: 'Root directory of source code'
                    },
                    {
                        option: 'exclude dev',
                        value: '**/.*',
                        description: 'Exclude hidden files and directories'
                    }
                ],
                icon: 'fa-hammer',
                color: '#ec4899',
                badge: 'Build',
                badgeColor: '#ec4899'
            },
            {
                id: 'advanced-patterns',
                name: 'Advanced Patterns',
                type: 'advanced-patterns',
                description: 'Advanced inclusion/exclusion patterns for complex use cases. Support for multiple conditions, nested patterns, and dynamic configuration based on environment.',
                shortDescription: 'Advanced and dynamic patterns',
                config: "{\n  \"compilerOptions\": {\n    \"target\": \"es2020\",\n    \"module\": \"esnext\",\n    \"outDir\": \"./dist\"\n  },\n  \"include\": [\n    // Include main TypeScript files\n    \"src/**/*.{ts,tsx}\",\n    \n    // Include type definitions\n    \"types/**/*.d.ts\",\n    \"**/*.d.ts\",\n    \n    // Exclude inline tests\n    \"!src/**/*.{test,spec}.{ts,tsx}\",\n    \n    // Exclude stories\n    \"!src/**/*.stories.{ts,tsx}\",\n    \n    // Include specific configurations\n    \"config/**/*.ts\"\n  ],\n  \"exclude\": [\n    // System directories\n    \"node_modules\",\n    \"dist\",\n    \".git\",\n    \n    // Development environments\n    \".vscode\",\n    \".idea\",\n    \".cache\",\n    \n    // Generated files\n    \"**/*.js\",\n    \"**/*.jsx\",\n    \"**/*.map\",\n    \n    // Tests and coverage\n    \"**/__tests__/**\",\n    \"**/__mocks__/**\",\n    \"coverage\",\n    \n    // Configurations\n    \"**/*.config.{js,ts}\",\n    \"**/webpack.*\",\n    \"**/jest.*\"\n  ]\n}",
                examples: [
                    "// Conditional patterns (conceptual example)\n{\n  \"include\": [\n    \"src/**/*\",\n    \"!src/**/*.test.ts\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/*.test.*\"\n  ]\n}\n\n// Complex nested patterns\n{\n  \"include\": [\n    \"src/app/**/*\",\n    \"src/lib/**/*\",\n    \"!src/app/features/*/private/**\",\n    \"!src/lib/**/internal/**\"\n  ]\n}",
                    "// Modular configuration\n{\n  \"include\": [\n    \"src/**/*.{ts,tsx}\",\n    \"!src/**/*.{test,spec}.{ts,tsx}\",\n    \"!src/**/*.stories.{ts,tsx}\"\n  ]\n}\n\n// Exclusion by file type\n{\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/*.test.*\",\n    \"**/*.spec.*\",\n    \"**/__tests__/**\",\n    \".vscode\",\n    \".idea\"\n  ]\n}",
                    "// Patterns for hexagonal architecture\n{\n  \"include\": [\n    \"src/domain/**/*\",\n    \"src/application/**/*\",\n    \"src/infrastructure/**/*\",\n    \"src/ui/**/*\",\n    \"!src/**/*.test.*\",\n    \"!src/**/__tests__/**\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\",\n    \"**/migrations/**\",\n    \"**/seeds/**\",\n    \"**/fixtures/**\"\n  ]\n}"
                ],
                useCases: [
                    {
                        title: 'Modular Configuration',
                        description: 'Configuration that changes based on project structure',
                        icon: 'fa-sliders-h'
                    },
                    {
                        title: 'Complex Architectures',
                        description: 'Projects with advanced architectures like hexagonal',
                        icon: 'fa-chess-board'
                    },
                    {
                        title: 'Multi-environment',
                        description: 'Projects running in multiple contexts',
                        icon: 'fa-server'
                    }
                ],
                bestPractices: [
                    'Organize patterns by purpose',
                    'Document complex patterns',
                    'Maintain consistency in similar patterns',
                    'Use comments to explain complex patterns',
                    'Test patterns in different scenarios'
                ],
                commonIssues: [
                    {
                        issue: 'Patterns too complex',
                        solution: 'Simplify and break into smaller patterns'
                    },
                    {
                        issue: 'Difficult maintenance',
                        solution: 'Document each pattern and its purpose'
                    },
                    {
                        issue: 'Performance affected',
                        solution: 'Optimize recursive patterns'
                    }
                ],
                configurationOptions: [
                    {
                        option: 'patterns',
                        value: 'Complex',
                        description: 'Nested and conditional patterns'
                    },
                    {
                        option: 'comments',
                        value: 'Explanatory',
                        description: 'Comments for documentation'
                    },
                    {
                        option: '!pattern',
                        value: 'Advanced negation',
                        description: 'Negation within complex patterns'
                    }
                ],
                icon: 'fa-magic',
                color: '#06b6d4',
                badge: 'Advanced',
                badgeColor: '#06b6d4'
            }
        ];
    };
    // Inicializar event listeners
    IncludeExcludeVisualizer.prototype.initializeEventListeners = function () {
        var _this = this;
        var themeToggle = document.getElementById('themeToggle');
        var closeModal = document.getElementById('closeModal');
        var copyConfig = document.getElementById('copyConfig');
        var searchInput = document.getElementById('searchInput');
        var modalOverlay = document.getElementById('modalOverlay');
        themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.addEventListener('click', function () { return _this.toggleTheme(); });
        closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener('click', function () { return _this.closeModal(); });
        copyConfig === null || copyConfig === void 0 ? void 0 : copyConfig.addEventListener('click', function () { return _this.copyConfig(); });
        modalOverlay === null || modalOverlay === void 0 ? void 0 : modalOverlay.addEventListener('click', function () { return _this.closeModal(); });
        // Búsqueda
        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                var searchTerm = e.target.value.toLowerCase();
                _this.filterCards(searchTerm);
            });
            // Clear search on Escape
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    _this.filterCards('');
                    searchInput.blur();
                }
            });
        }
        // Teclado shortcuts
        document.addEventListener('keydown', function (e) {
            if (_this.isModalOpen) {
                if (e.key === 'Escape')
                    _this.closeModal();
                if (e.key === 'ArrowLeft')
                    _this.prevTab();
                if (e.key === 'ArrowRight')
                    _this.nextTab();
                if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    searchInput === null || searchInput === void 0 ? void 0 : searchInput.focus();
                }
            }
        });
        // Mostrar/ocultar navegación rápida al hacer scroll
        window.addEventListener('scroll', function () {
            var quickNav = document.querySelector('.quick-nav');
            if (quickNav) {
                if (window.scrollY > 300) {
                    quickNav.classList.add('show');
                }
                else {
                    quickNav.classList.remove('show');
                }
            }
        });
    };
    // Cargar tema guardado
    IncludeExcludeVisualizer.prototype.loadSavedTheme = function () {
        var savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            this.isLightMode = true;
            document.body.classList.add('light-mode');
            var themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        }
    };
    // Configurar listener de scroll
    IncludeExcludeVisualizer.prototype.setupScrollListener = function () {
        var lastScrollTop = 0;
        window.addEventListener('scroll', function () {
            var quickNav = document.querySelector('.quick-nav');
            if (!quickNav)
                return;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 300) {
                quickNav.classList.add('show');
                // Ocultar al hacer scroll hacia abajo
                if (scrollTop > lastScrollTop && scrollTop > 500) {
                    quickNav.classList.remove('show');
                }
            }
            else {
                quickNav.classList.remove('show');
            }
            lastScrollTop = scrollTop;
        });
    };
    // Inicializar navegación rápida
    IncludeExcludeVisualizer.prototype.initializeQuickNav = function () {
        var _this = this;
        var quickNav = document.querySelector('.quick-nav');
        if (!quickNav)
            return;
        var buttons = quickNav.querySelectorAll('.quick-nav-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function (e) {
                var target = e.currentTarget;
                var type = target.dataset.type;
                _this.setActiveConfig(type);
                _this.openModal();
                // Scroll suave a la tarjeta
                var card = document.querySelector("[data-type=\"".concat(type, "\"]"));
                if (card) {
                    card.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    card.classList.add('pulse');
                    setTimeout(function () {
                        card.classList.remove('pulse');
                    }, 2000);
                }
            });
        }
    };
    // Filtrar tarjetas
    IncludeExcludeVisualizer.prototype.filterCards = function (searchTerm) {
        var _a, _b, _c, _d, _e, _f;
        var cards = document.querySelectorAll('.config-card');
        var hasResults = false;
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var title = ((_b = (_a = card.querySelector('.config-card-title h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
            var description = ((_d = (_c = card.querySelector('.config-card-description')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || '';
            var tags = ((_f = (_e = card.querySelector('.config-tags')) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.toLowerCase()) || '';
            // Usar indexOf en lugar de includes para compatibilidad
            if (title.indexOf(searchTerm) !== -1 ||
                description.indexOf(searchTerm) !== -1 ||
                tags.indexOf(searchTerm) !== -1) {
                card.classList.remove('hidden');
                card.classList.add('fade-in');
                hasResults = true;
            }
            else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        }
        // Mostrar/ocultar estado vacío
        var emptyState = document.getElementById('noResults');
        var mainContent = document.querySelector('.main-content');
        if (!hasResults && searchTerm) {
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            if (mainContent) {
                mainContent.style.minHeight = '40vh';
            }
        }
        else {
            if (emptyState) {
                emptyState.classList.add('hidden');
            }
            if (mainContent) {
                mainContent.style.minHeight = '60vh';
            }
        }
    };
    // Renderizar tarjetas de configuración
    IncludeExcludeVisualizer.prototype.renderConfigCards = function () {
        var container = document.getElementById('configCards');
        if (!container)
            return;
        container.innerHTML = '';
        for (var i = 0; i < this.configExamples.length; i++) {
            var config = this.configExamples[i];
            var card = this.createConfigCard(config, i);
            container.appendChild(card);
        }
        // Resaltar sintaxis
        this.highlightSyntax();
    };
    // Crear tarjeta de configuración
    IncludeExcludeVisualizer.prototype.createConfigCard = function (config, index) {
        var _this = this;
        var card = document.createElement('div');
        card.className = 'config-card fade-in';
        card.style.animationDelay = "".concat(index * 0.1, "s");
        card.dataset.type = config.type;
        // Generar tags
        var tags = this.generateTags(config);
        card.innerHTML = "\n            <div class=\"config-card-badge\" style=\"color: ".concat(config.badgeColor, "\">\n                ").concat(config.badge, "\n            </div>\n            <div class=\"config-card-header\">\n                <div class=\"config-card-icon\" style=\"color: ").concat(config.color, "\">\n                    <i class=\"fas ").concat(config.icon, "\"></i>\n                </div>\n                <div class=\"config-card-title\">\n                    <h3>").concat(config.name, "</h3>\n                    <p>").concat(config.shortDescription, "</p>\n                </div>\n            </div>\n            <div class=\"config-card-body\">\n                <p class=\"config-card-description\">").concat(config.description, "</p>\n                \n                <div class=\"config-tags\">\n                    ").concat(tags, "\n                </div>\n                \n                <ul class=\"config-features\">\n                    ").concat(config.useCases.slice(0, 2).map(function (useCase) { return "\n                        <li>\n                            <i class=\"fas ".concat(useCase.icon, "\"></i>\n                            <span>").concat(useCase.title, "</span>\n                        </li>\n                    "); }).join(''), "\n                </ul>\n                \n                <div class=\"code-preview\">\n                    <pre><code class=\"language-json\">").concat(this.escapeHtml(config.config), "</code></pre>\n                </div>\n            </div>\n        ");
        card.addEventListener('click', function () {
            _this.setActiveConfig(config.type);
            _this.openModal();
        });
        return card;
    };
    // Generar tags para una configuración
    IncludeExcludeVisualizer.prototype.generateTags = function (config) {
        var tags = [];
        // Usar indexOf en lugar de includes
        if (config.config.indexOf('**/*') !== -1)
            tags.push('Recursive');
        if (config.config.indexOf('*.{') !== -1)
            tags.push('Multiple');
        if (config.config.indexOf('!') !== -1)
            tags.push('Negation');
        // Para el tipo, convertirlo a string primero
        var typeString = config.type;
        if (typeString.indexOf('monorepo') !== -1)
            tags.push('Monorepo');
        if (typeString.indexOf('test') !== -1)
            tags.push('Testing');
        if (typeString.indexOf('build') !== -1)
            tags.push('Build');
        if (typeString.indexOf('advanced') !== -1)
            tags.push('Advanced');
        return tags.map(function (tag) { return "<span class=\"config-tag\">".concat(tag, "</span>"); }).join('');
    };
    // Establecer configuración activa
    IncludeExcludeVisualizer.prototype.setActiveConfig = function (type) {
        this.activeConfig = type;
        this.currentTabIndex = 0;
        this.updateModalContent();
    };
    // Encontrar configuración por tipo
    IncludeExcludeVisualizer.prototype.findConfigByType = function (type) {
        for (var i = 0; i < this.configExamples.length; i++) {
            if (this.configExamples[i].type === type) {
                return this.configExamples[i];
            }
        }
        return undefined;
    };
    // Actualizar contenido del modal
    IncludeExcludeVisualizer.prototype.updateModalContent = function () {
        var config = this.findConfigByType(this.activeConfig);
        if (!config)
            return;
        // Actualizar título
        this.updateModalTitle(config);
        // Actualizar tabs
        this.updateModalTabs(config);
        // Actualizar contenido de tabs
        this.updateTabContent(config);
        // Actualizar botón de copia
        this.updateCopyButton(config);
    };
    // Actualizar título del modal
    IncludeExcludeVisualizer.prototype.updateModalTitle = function (config) {
        var modalTitle = document.getElementById('modalTitle');
        var modalSubtitle = document.getElementById('modalSubtitle');
        var modalTitleIcon = document.getElementById('modalTitleIcon');
        if (modalTitle)
            modalTitle.textContent = config.name;
        if (modalSubtitle)
            modalSubtitle.textContent = config.shortDescription;
        if (modalTitleIcon) {
            modalTitleIcon.innerHTML = "<i class=\"fas ".concat(config.icon, "\"></i>");
            modalTitleIcon.style.color = config.color;
        }
    };
    // Actualizar tabs del modal
    IncludeExcludeVisualizer.prototype.updateModalTabs = function (config) {
        var _this = this;
        var tabsContainer = document.getElementById('modalTabs');
        if (!tabsContainer)
            return;
        var tabs = [
            { id: 'examples', label: 'Examples', icon: 'fa-code' },
            { id: 'useCases', label: 'Use Cases', icon: 'fa-briefcase' },
            { id: 'bestPractices', label: 'Best Practices', icon: 'fa-star' },
            { id: 'commonIssues', label: 'Common Issues', icon: 'fa-exclamation-triangle' },
            { id: 'configuration', label: 'Configuration', icon: 'fa-cog' },
            { id: 'interactive', label: 'Interactive Demo', icon: 'fa-play' }
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
    IncludeExcludeVisualizer.prototype.updateActiveTab = function (tabId) {
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
        var config = this.findConfigByType(this.activeConfig);
        if (config) {
            this.updateTabContent(config);
        }
    };
    // Actualizar contenido del tab
    IncludeExcludeVisualizer.prototype.updateTabContent = function (config) {
        var modalBody = document.getElementById('modalBody');
        if (!modalBody)
            return;
        var content = '';
        switch (this.currentTabIndex) {
            case 0: // Ejemplos
                content = this.createExamplesTab(config);
                break;
            case 1: // Casos de Uso
                content = this.createUseCasesTab(config);
                break;
            case 2: // Mejores Prácticas
                content = this.createBestPracticesTab(config);
                break;
            case 3: // Problemas Comunes
                content = this.createCommonIssuesTab(config);
                break;
            case 4: // Configuración
                content = this.createConfigurationTab(config);
                break;
            case 5: // Demo interactiva
                content = this.createInteractiveDemo(config);
                break;
        }
        modalBody.innerHTML = "<div class=\"tab-pane active\">".concat(content, "</div>");
        // Configurar botones de copia en ejemplos
        this.setupExampleCopyButtons();
        // Resaltar sintaxis
        this.highlightSyntax();
    };
    // Crear tab de ejemplos
    IncludeExcludeVisualizer.prototype.createExamplesTab = function (config) {
        var examplesHTML = '';
        for (var i = 0; i < config.examples.length; i++) {
            examplesHTML += "\n                <div class=\"example-card\">\n                    <div class=\"example-header\">\n                        <h4>Example ".concat(i + 1, "</h4>\n                        <button class=\"copy-btn\" data-code=\"").concat(this.escapeHtml(config.examples[i]), "\">\n                            <i class=\"fas fa-copy\"></i>\n                            Copy\n                        </button>\n                    </div>\n                    <div class=\"example-code\">\n                        <pre><code class=\"language-json\">").concat(config.examples[i], "</code></pre>\n                    </div>\n                </div>\n            ");
        }
        return "\n            <div class=\"examples-grid\">\n                ".concat(examplesHTML, "\n            </div>\n        ");
    };
    // Crear tab de casos de uso
    IncludeExcludeVisualizer.prototype.createUseCasesTab = function (config) {
        var useCasesHTML = '';
        for (var i = 0; i < config.useCases.length; i++) {
            var useCase = config.useCases[i];
            useCasesHTML += "\n                <li class=\"use-case-item\">\n                    <div class=\"use-case-header\">\n                        <i class=\"fas ".concat(useCase.icon, "\"></i>\n                        <h4 class=\"use-case-title\">").concat(useCase.title, "</h4>\n                    </div>\n                    <p class=\"use-case-description\">").concat(useCase.description, "</p>\n                </li>\n            ");
        }
        return "\n            <ul class=\"use-cases-list\">\n                ".concat(useCasesHTML, "\n            </ul>\n        ");
    };
    // Crear tab de mejores prácticas
    IncludeExcludeVisualizer.prototype.createBestPracticesTab = function (config) {
        var practicesHTML = '';
        for (var i = 0; i < config.bestPractices.length; i++) {
            practicesHTML += "\n                <div class=\"practice-item\">\n                    <div class=\"practice-number\">".concat(i + 1, "</div>\n                    <div class=\"practice-text\">").concat(config.bestPractices[i], "</div>\n                </div>\n            ");
        }
        return "\n            <div class=\"best-practices-container\">\n                ".concat(practicesHTML, "\n            </div>\n        ");
    };
    // Crear tab de problemas comunes
    IncludeExcludeVisualizer.prototype.createCommonIssuesTab = function (config) {
        var issuesHTML = '';
        for (var i = 0; i < config.commonIssues.length; i++) {
            var issue = config.commonIssues[i];
            issuesHTML += "\n                <div class=\"issue-item\">\n                    <div class=\"issue-header\">\n                        <i class=\"fas fa-exclamation-circle\"></i>\n                        <h4>".concat(issue.issue, "</h4>\n                    </div>\n                    <div class=\"issue-solution\">\n                        <i class=\"fas fa-check-circle\"></i>\n                        <p><strong>Solution:</strong> ").concat(issue.solution, "</p>\n                    </div>\n                </div>\n            ");
        }
        return "\n            <div class=\"common-issues-container\">\n                ".concat(issuesHTML, "\n            </div>\n        ");
    };
    // Crear tab de configuración
    IncludeExcludeVisualizer.prototype.createConfigurationTab = function (config) {
        var optionsHTML = '';
        for (var i = 0; i < config.configurationOptions.length; i++) {
            var option = config.configurationOptions[i];
            optionsHTML += "\n                <tr>\n                    <td><code class=\"config-value\">".concat(option.option, "</code></td>\n                    <td><code class=\"config-value\">").concat(option.value, "</code></td>\n                    <td>").concat(option.description, "</td>\n                </tr>\n            ");
        }
        return "\n            <div class=\"configuration-container\">\n                <div class=\"code-preview\" style=\"margin-bottom: 1.5rem;\">\n                    <pre><code class=\"language-json\">".concat(config.config, "</code></pre>\n                </div>\n                \n                <h3 style=\"margin-bottom: 1rem;\">Configuration Options</h3>\n                \n                <table class=\"config-table\">\n                    <thead>\n                        <tr>\n                            <th>Option</th>\n                            <th>Value</th>\n                            <th>Description</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ").concat(optionsHTML, "\n                    </tbody>\n                </table>\n            </div>\n        ");
    };
    // Crear demo interactiva
    IncludeExcludeVisualizer.prototype.createInteractiveDemo = function (config) {
        var demoConfigs = {
            'include-basic': {
                title: 'Interactive Demo: Basic Configuration',
                description: 'Select different patterns to see how they affect file inclusion',
                patterns: [
                    { label: 'src/**/*', checked: true },
                    { label: 'src/**/*.ts', checked: false },
                    { label: 'src/**/*.{ts,tsx}', checked: false },
                    { label: '!src/**/*.test.ts', checked: true }
                ]
            },
            'glob-patterns': {
                title: 'Interactive Demo: Glob Patterns',
                description: 'Experiment with different glob patterns and see the results',
                patterns: [
                    { label: '**/*.ts', checked: true },
                    { label: 'src/**/*.{ts,tsx}', checked: true },
                    { label: '!**/*.test.*', checked: true },
                    { label: '!**/__tests__/**', checked: true },
                    { label: 'packages/*/src/**/*', checked: false }
                ]
            },
            'test-configuration': {
                title: 'Interactive Demo: Testing Configuration',
                description: 'Configure test file inclusion/exclusion',
                patterns: [
                    { label: 'src/**/*', checked: true },
                    { label: '!src/**/*.test.ts', checked: true },
                    { label: 'tests/**/*.ts', checked: true },
                    { label: '!**/__mocks__/**', checked: true },
                    { label: '!coverage/**', checked: true }
                ]
            },
            'monorepo-config': {
                title: 'Interactive Demo: Monorepo Configuration',
                description: 'Configure patterns for monorepo structure',
                patterns: [
                    { label: 'packages/*/src/**/*', checked: true },
                    { label: '!packages/*/src/**/*.test.*', checked: true },
                    { label: '!**/node_modules/**', checked: true },
                    { label: 'shared/**/*.ts', checked: true },
                    { label: 'types/**/*.d.ts', checked: true }
                ]
            },
            'build-config': {
                title: 'Interactive Demo: Build Configuration',
                description: 'Configure patterns for optimized builds',
                patterns: [
                    { label: 'src/**/*.{ts,tsx}', checked: true },
                    { label: '!src/**/*.test.{ts,tsx}', checked: true },
                    { label: '!src/**/*.spec.{ts,tsx}', checked: true },
                    { label: 'types/**/*.d.ts', checked: true },
                    { label: '!**/*.stories.{ts,tsx}', checked: true }
                ]
            },
            'advanced-patterns': {
                title: 'Interactive Demo: Advanced Patterns',
                description: 'Experiment with complex pattern combinations',
                patterns: [
                    { label: 'src/**/*.{ts,tsx}', checked: true },
                    { label: '!src/**/*.{test,spec}.{ts,tsx}', checked: true },
                    { label: '!src/**/*.stories.{ts,tsx}', checked: true },
                    { label: 'config/**/*.ts', checked: true },
                    { label: '!**/__tests__/**', checked: true }
                ]
            }
        };
        var demo = demoConfigs[config.type] || demoConfigs['include-basic'];
        var patternsHTML = '';
        for (var i = 0; i < demo.patterns.length; i++) {
            var pattern = demo.patterns[i];
            patternsHTML += "\n                <button class=\"demo-btn ".concat(pattern.checked ? 'active' : '', "\" \n                        data-pattern=\"").concat(pattern.label, "\">\n                    ").concat(pattern.label, "\n                </button>\n            ");
        }
        return "\n            <div class=\"interactive-demo\">\n                <h3>".concat(demo.title, "</h3>\n                <p class=\"demo-description\">").concat(demo.description, "</p>\n                \n                <div class=\"demo-controls\">\n                    ").concat(patternsHTML, "\n                </div>\n                \n                <div class=\"demo-output\">\n                    <div class=\"demo-output-header\">\n                        <i class=\"fas fa-code\"></i>\n                        <span>Generated Configuration:</span>\n                    </div>\n                    <pre><code class=\"language-json\">{\n  \"include\": [\n    \"src/**/*\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \"dist\"\n  ]\n}</code></pre>\n                </div>\n                \n                <div class=\"demo-tip\">\n                    <i class=\"fas fa-lightbulb\"></i>\n                    <div>\n                        <strong>Tip:</strong> Patterns are processed in order. Use <code>!</code> to exclude specific files.\n                    </div>\n                </div>\n            </div>\n        ");
    };
    // Configurar botones de copia en ejemplos
    IncludeExcludeVisualizer.prototype.setupExampleCopyButtons = function () {
        var _this = this;
        var copyButtons = document.querySelectorAll('.copy-btn');
        for (var i = 0; i < copyButtons.length; i++) {
            copyButtons[i].addEventListener('click', function (e) {
                var target = e.currentTarget;
                var code = target.dataset.code;
                if (code) {
                    _this.copyToClipboard(code);
                    _this.showNotification('Example copied to clipboard');
                    // Feedback visual
                    var icon_1 = target.querySelector('i');
                    if (icon_1) {
                        icon_1.className = 'fas fa-check';
                        setTimeout(function () {
                            icon_1.className = 'fas fa-copy';
                        }, 2000);
                    }
                }
            });
        }
    };
    // Actualizar botón de copia
    IncludeExcludeVisualizer.prototype.updateCopyButton = function (config) {
        var _this = this;
        var copyButton = document.getElementById('copyConfig');
        if (copyButton) {
            copyButton.onclick = function () { return _this.copyConfig(); };
        }
    };
    // Resaltar sintaxis
    IncludeExcludeVisualizer.prototype.highlightSyntax = function () {
        setTimeout(function () {
            if (window.Prism) {
                window.Prism.highlightAll();
            }
        }, 100);
    };
    // Escape HTML para código
    IncludeExcludeVisualizer.prototype.escapeHtml = function (text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    // Abrir modal
    IncludeExcludeVisualizer.prototype.openModal = function () {
        this.isModalOpen = true;
        var modal = document.getElementById('configModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            // Configurar demo interactiva si está activa
            if (this.currentTabIndex === 5) {
                this.setupInteractiveDemo();
            }
        }
    };
    // Configurar demo interactiva
    IncludeExcludeVisualizer.prototype.setupInteractiveDemo = function () {
        setTimeout(function () {
            var demoButtons = document.querySelectorAll('.demo-btn');
            for (var i = 0; i < demoButtons.length; i++) {
                demoButtons[i].addEventListener('click', function () {
                    this.classList.toggle('active');
                    updateDemoOutput();
                });
            }
            var updateDemoOutput = function () {
                var demoButtonsActive = document.querySelectorAll('.demo-btn.active');
                var activePatterns = [];
                for (var i = 0; i < demoButtonsActive.length; i++) {
                    var pattern = demoButtonsActive[i].getAttribute('data-pattern');
                    if (pattern) {
                        activePatterns.push(pattern);
                    }
                }
                var include = [];
                var exclude = [];
                for (var i = 0; i < activePatterns.length; i++) {
                    var pattern = activePatterns[i];
                    // Usar indexOf en lugar de startsWith
                    if (pattern.indexOf('!') !== 0) {
                        include.push(pattern);
                    }
                    else {
                        exclude.push(pattern.substring(1));
                    }
                }
                var config = {
                    include: include.length ? include : ['src/**/*'],
                    exclude: ['node_modules', 'dist'].concat(exclude)
                };
                var output = document.querySelector('.demo-output code');
                if (output) {
                    output.textContent = JSON.stringify(config, null, 2);
                    if (window.Prism) {
                        window.Prism.highlightElement(output);
                    }
                }
            };
            // Inicializar demo
            updateDemoOutput();
        }, 100);
    };
    // Cerrar modal
    IncludeExcludeVisualizer.prototype.closeModal = function () {
        this.isModalOpen = false;
        var modal = document.getElementById('configModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };
    // Navegar al tab anterior
    IncludeExcludeVisualizer.prototype.prevTab = function () {
        this.currentTabIndex--;
        if (this.currentTabIndex < 0) {
            this.currentTabIndex = 5; // Total de tabs - 1
        }
        var config = this.findConfigByType(this.activeConfig);
        if (config) {
            this.updateTabContent(config);
        }
        var tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration', 'interactive'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    };
    // Navegar al siguiente tab
    IncludeExcludeVisualizer.prototype.nextTab = function () {
        this.currentTabIndex++;
        if (this.currentTabIndex > 5) {
            this.currentTabIndex = 0;
        }
        var config = this.findConfigByType(this.activeConfig);
        if (config) {
            this.updateTabContent(config);
        }
        var tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration', 'interactive'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    };
    // Copiar configuración
    IncludeExcludeVisualizer.prototype.copyConfig = function () {
        var config = this.findConfigByType(this.activeConfig);
        if (!config)
            return;
        this.copyToClipboard(config.config);
        this.showNotification('Configuration copied to clipboard');
    };
    // Copiar texto al portapapeles
    IncludeExcludeVisualizer.prototype.copyToClipboard = function (text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textarea);
    };
    // Alternar tema claro/oscuro
    IncludeExcludeVisualizer.prototype.toggleTheme = function () {
        this.isLightMode = !this.isLightMode;
        document.body.classList.toggle('light-mode', this.isLightMode);
        var themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.isLightMode ? 'fas fa-sun' : 'fas fa-moon';
        }
        this.showNotification("".concat(this.isLightMode ? 'Light' : 'Dark', " theme activated"));
        // Guardar preferencia en localStorage
        localStorage.setItem('theme', this.isLightMode ? 'light' : 'dark');
    };
    // Mostrar notificación
    IncludeExcludeVisualizer.prototype.showNotification = function (message, isError) {
        if (isError === void 0) { isError = false; }
        var container = document.getElementById('notificationContainer');
        if (!container)
            return;
        var notification = document.createElement('div');
        notification.className = "notification ".concat(isError ? 'error' : 'success');
        notification.textContent = message;
        container.appendChild(notification);
        // Auto-remover después de 3 segundos
        setTimeout(function () {
            notification.classList.add('slide-out');
            setTimeout(function () {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    };
    return IncludeExcludeVisualizer;
}());
// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    new IncludeExcludeVisualizer();
});
