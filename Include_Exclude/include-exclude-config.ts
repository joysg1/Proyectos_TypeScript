// include-exclude-config.ts - VERSIÓN COMPLETA CON LOS 6 TIPOS

// Definición de tipos principales
type ConfigType = 
    | 'include-basic' 
    | 'glob-patterns' 
    | 'monorepo-config' 
    | 'test-configuration'
    | 'build-config'
    | 'advanced-patterns';

interface UseCase {
    title: string;
    description: string;
    icon: string;
}

interface CommonIssue {
    issue: string;
    solution: string;
}

interface ConfigOption {
    option: string;
    value: string;
    description: string;
}

interface ConfigExample {
    id: string;
    name: string;
    type: ConfigType;
    description: string;
    shortDescription: string;
    config: string;
    examples: string[];
    useCases: UseCase[];
    bestPractices: string[];
    commonIssues: CommonIssue[];
    configurationOptions: ConfigOption[];
    icon: string;
    color: string;
    badge: string;
    badgeColor: string;
}

interface DemoPattern {
    label: string;
    checked: boolean;
}

interface DemoConfig {
    title: string;
    description: string;
    patterns: DemoPattern[];
}

// Clase principal de la aplicación
class IncludeExcludeVisualizer {
    private configExamples: ConfigExample[] = [];
    private activeConfig: ConfigType = 'include-basic';
    private currentTabIndex: number = 0;
    private isLightMode: boolean = false;
    private isModalOpen: boolean = false;

    constructor() {
        this.initializeConfigExamples();
        this.initializeEventListeners();
        this.renderConfigCards();
        this.initializeQuickNav();
        this.setupScrollListener();
        
        // Cargar tema guardado
        this.loadSavedTheme();
    }

    // Inicializar ejemplos de configuración - TODOS LOS 6 TIPOS
    private initializeConfigExamples(): void {
        this.configExamples = [
            {
                id: 'include-basic',
                name: 'Basic Include Configuration',
                type: 'include-basic',
                description: 'Basic include configuration for standard TypeScript projects. Includes all .ts and .tsx files in specific directories while excluding node_modules and build files.',
                shortDescription: 'Basic configuration for TypeScript projects',
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.spec.ts",
    "**/*.test.ts"
  ]
}`,
                examples: [
                    `// Include only TypeScript files in src
{
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}

// Include multiple directories
{
  "include": [
    "src/**/*",
    "shared/**/*",
    "types/**/*.d.ts"
  ]
}

// Specific file patterns
{
  "include": [
    "src/components/**/*.tsx",
    "src/utils/**/*.ts",
    "src/hooks/**/*.ts"
  ]
}`,
                    `// Exclude specific directories
{
  "exclude": [
    "node_modules",
    "dist",
    "coverage",
    ".next",
    "build",
    "**/__tests__/**",
    "**/*.test.*",
    "**/*.spec.*"
  ]
}

// Exclude by extension
{
  "exclude": [
    "**/*.js",
    "**/*.jsx",
    "**/*.map",
    "**/*.css",
    "**/*.scss"
  ]
}`,
                    `// Include/exclude combination
{
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "**/__mocks__/**",
    "**/__fixtures__/**",
    "**/*.stories.tsx",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}

// For mixed structure projects
{
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "scripts/**/*.ts",
    "config/**/*.ts"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/*.d.ts"
  ]
}`
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
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "outDir": "./dist"
  },
  "include": [
    "src/**/*.{ts,tsx}",
    "shared/**/*.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
    "types/**/*.d.ts"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/coverage/**",
    "**/.next/**",
    "**/build/**",
    "**/*.stories.{ts,tsx}",
    "**/__mocks__/**",
    "**/__fixtures__/**"
  ]
}`,
                examples: [
                    `// Glob patterns with multiple extensions
{
  "include": [
    "src/**/*.{ts,tsx,js,jsx}",
    "config/**/*.{ts,js}",
    "scripts/**/*.ts"
  ]
}

// Exclusion with negated patterns
{
  "include": [
    "src/**/*",
    "!src/**/*.test.ts",
    "!src/**/*.spec.ts",
    "!src/**/__tests__/**"
  ]
}

// Complex nested patterns
{
  "include": [
    "packages/*/src/**/*.{ts,tsx}",
    "shared/*/lib/**/*.ts",
    "!packages/*/src/**/internal/**"
  ]
}`,
                    `// Pattern combinations
{
  "include": [
    "src/components/**/*.tsx",
    "src/hooks/**/*.ts",
    "src/utils/**/*.ts",
    "src/types/**/*.d.ts"
  ],
  "exclude": [
    "**/*.test.{ts,tsx}",
    "**/*.spec.{ts,tsx}",
    "**/*.stories.{ts,tsx}",
    "**/__{tests,mocks,fixtures}__/**"
  ]
}

// Patterns for monorepos
{
  "include": [
    "packages/*/src/**/*",
    "shared-libs/**/*.ts",
    "!packages/docs/**",
    "!**/node_modules/**"
  ]
}`,
                    `// Advanced exclusion patterns
{
  "exclude": [
    // Exclude all build directories
    "**/{dist,build,.next,out,coverage}/**",
    
    // Exclude test files
    "**/*.{test,spec}.{ts,tsx,js,jsx}",
    
    // Exclude story files
    "**/*.stories.{ts,tsx}",
    
    // Exclude specific configurations
    "**/webpack.config.js",
    "**/jest.config.js",
    "**/.eslintrc.js",
    
    // Exclude generated files
    "**/*.d.ts",
    "**/*.map"
  ]
}`
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
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "packages/*/src/**/*.{ts,tsx}",
    "shared/**/*.ts",
    "types/**/*.d.ts",
    "!packages/*/src/**/*.test.{ts,tsx}"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "packages/*/node_modules/**",
    "**/coverage/**",
    "**/*.stories.{ts,tsx}",
    "**/__tests__/**",
    "**/__mocks__/**"
  ],
  "references": [
    { "path": "../core" },
    { "path": "../utils" },
    { "path": "../ui" }
  ]
}`,
                examples: [
                    `// Base monorepo configuration
{
  "include": [
    "packages/*/src/**/*",
    "libs/**/*.ts",
    "config/**/*.ts"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/*.test.*",
    "**/*.spec.*",
    "**/coverage/**"
  ]
}

// Specific package in monorepo
{
  "include": [
    "src/**/*.{ts,tsx}",
    "../shared/**/*.ts",
    "../types/**/*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/__tests__/**"
  ]
}`,
                    `// Monorepo with workspaces
{
  "include": [
    "src/**/*",
    "../packages/shared/**/*.ts",
    "../packages/types/**/*.d.ts",
    "!src/**/*.test.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "../packages/**/node_modules",
    "../packages/**/dist"
  ]
}

// Selective package exclusion
{
  "include": [
    "packages/app/**/*",
    "packages/admin/**/*",
    "!packages/docs/**",
    "!packages/legacy/**"
  ]
}`,
                    `// Performance optimization
{
  "include": [
    "packages/*/src/**/*.{ts,tsx}",
    "!packages/*/src/**/__tests__/**",
    "!packages/*/src/**/*.test.{ts,tsx}"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/.cache/**",
    "**/coverage/**",
    "**/*.map",
    "**/*.d.ts"
  ]
}`
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
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["jest", "node", "react", "react-dom"]
  },
  "include": [
    "src/**/*.{ts,tsx}",
    "tests/**/*.{ts,tsx}",
    "**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage",
    ".jest",
    "**/__mocks__/**",
    "**/__snapshots__/**",
    "**/*.test.{js,jsx}",
    "**/*.spec.{js,jsx}",
    "**/setupTests.ts",
    "**/jest.config.*"
  ]
}`,
                examples: [
                    `// Clear src/tests separation
{
  "include": [
    "src/**/*.{ts,tsx}",
    "tests/**/*.{ts,tsx}",
    "types/**/*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/__tests__/**",
    "**/*.test.*",
    "**/*.spec.*"
  ]
}

// Tests alongside source code
{
  "include": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage"
  ]
}`,
                    `// Jest configuration
{
  "include": [
    "src/**/*",
    "**/*.d.ts",
    "__tests__/**/*.{ts,tsx}"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage",
    "**/__mocks__/**",
    "**/__snapshots__/**",
    "**/*.test.{js,jsx}",
    "**/*.spec.{js,jsx}"
  ]
}

// Multiple test types
{
  "include": [
    "src/**/*",
    "tests/unit/**/*",
    "tests/integration/**/*",
    "tests/e2e/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/__fixtures__/**",
    "**/__benchmarks__/**"
  ]
}`,
                    `// CI/CD optimization
{
  "include": [
    "src/**/*.{ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/*.{test,spec}.{ts,tsx}"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage",
    ".github",
    ".circleci",
    "**/test-results/**",
    "**/reports/**"
  ]
}`
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
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "incremental": true
  },
  "include": [
    "src/**/*.{ts,tsx}",
    "types/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
    "!src/**/__tests__/**"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build",
    ".next",
    "out",
    "coverage",
    ".cache",
    ".turbo",
    "**/*.stories.{ts,tsx}",
    "**/__{tests,mocks,fixtures}__/**",
    "**/*.{test,spec}.{ts,tsx,js,jsx}",
    "**/webpack.config.*",
    "**/jest.config.*",
    "**/*.config.*"
  ]
}`,
                examples: [
                    `// Production build
{
  "include": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.{test,spec}.{ts,tsx}",
    "!src/**/__tests__/**"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.stories.{ts,tsx}",
    "**/__{mocks,fixtures}__/**",
    "**/*.config.*",
    "**/setupTests.*"
  ]
}

// Development file exclusion
{
  "exclude": [
    "node_modules",
    "dist",
    ".vscode",
    ".idea",
    ".git",
    "**/*.md",
    "**/*.txt",
    "**/*.log",
    "**/temp/**",
    "**/tmp/**"
  ]
}`,
                    `// Performance optimization
{
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/**/*.test.*",
    "!src/**/*.spec.*"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/.git/**",
    "**/*.map",
    "**/*.css",
    "**/*.scss",
    "**/*.json"
  ]
}

// Incremental build
{
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    ".tsbuildinfo",
    "**/*.test.*",
    "**/*.spec.*"
  ]
}`,
                    `// Deployment preparation
{
  "include": [
    "src/**/*",
    "public/**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/**/*.{test,spec}.*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build",
    ".next",
    ".cache",
    ".turbo",
    "coverage",
    "**/__mocks__/**",
    "**/__fixtures__/**",
    "**/*.stories.*",
    "**/*.config.*",
    "**/.*" // Hidden files
  ]
}`
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
                config: `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "outDir": "./dist"
  },
  "include": [
    // Include main TypeScript files
    "src/**/*.{ts,tsx}",
    
    // Include type definitions
    "types/**/*.d.ts",
    "**/*.d.ts",
    
    // Exclude inline tests
    "!src/**/*.{test,spec}.{ts,tsx}",
    
    // Exclude stories
    "!src/**/*.stories.{ts,tsx}",
    
    // Include specific configurations
    "config/**/*.ts"
  ],
  "exclude": [
    // System directories
    "node_modules",
    "dist",
    ".git",
    
    // Development environments
    ".vscode",
    ".idea",
    ".cache",
    
    // Generated files
    "**/*.js",
    "**/*.jsx",
    "**/*.map",
    
    // Tests and coverage
    "**/__tests__/**",
    "**/__mocks__/**",
    "coverage",
    
    // Configurations
    "**/*.config.{js,ts}",
    "**/webpack.*",
    "**/jest.*"
  ]
}`,
                examples: [
                    `// Conditional patterns (conceptual example)
{
  "include": [
    "src/**/*",
    "!src/**/*.test.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.*"
  ]
}

// Complex nested patterns
{
  "include": [
    "src/app/**/*",
    "src/lib/**/*",
    "!src/app/features/*/private/**",
    "!src/lib/**/internal/**"
  ]
}`,
                    `// Modular configuration
{
  "include": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.{test,spec}.{ts,tsx}",
    "!src/**/*.stories.{ts,tsx}"
  ]
}

// Exclusion by file type
{
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.*",
    "**/*.spec.*",
    "**/__tests__/**",
    ".vscode",
    ".idea"
  ]
}`,
                    `// Patterns for hexagonal architecture
{
  "include": [
    "src/domain/**/*",
    "src/application/**/*",
    "src/infrastructure/**/*",
    "src/ui/**/*",
    "!src/**/*.test.*",
    "!src/**/__tests__/**"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/migrations/**",
    "**/seeds/**",
    "**/fixtures/**"
  ]
}`
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
    }

    // Inicializar event listeners
    private initializeEventListeners(): void {
        const themeToggle = document.getElementById('themeToggle');
        const closeModal = document.getElementById('closeModal');
        const copyConfig = document.getElementById('copyConfig');
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        const modalOverlay = document.getElementById('modalOverlay');

        themeToggle?.addEventListener('click', () => this.toggleTheme());
        closeModal?.addEventListener('click', () => this.closeModal());
        copyConfig?.addEventListener('click', () => this.copyConfig());
        modalOverlay?.addEventListener('click', () => this.closeModal());

        // Búsqueda
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
                this.filterCards(searchTerm);
            });

            // Clear search on Escape
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    this.filterCards('');
                    searchInput.blur();
                }
            });
        }

        // Teclado shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.prevTab();
                if (e.key === 'ArrowRight') this.nextTab();
                if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    searchInput?.focus();
                }
            }
        });

        // Mostrar/ocultar navegación rápida al hacer scroll
        window.addEventListener('scroll', () => {
            const quickNav = document.querySelector('.quick-nav');
            if (quickNav) {
                if (window.scrollY > 300) {
                    quickNav.classList.add('show');
                } else {
                    quickNav.classList.remove('show');
                }
            }
        });
    }

    // Cargar tema guardado
    private loadSavedTheme(): void {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            this.isLightMode = true;
            document.body.classList.add('light-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        }
    }

    // Configurar listener de scroll
    private setupScrollListener(): void {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const quickNav = document.querySelector('.quick-nav');
            if (!quickNav) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                quickNav.classList.add('show');
                
                // Ocultar al hacer scroll hacia abajo
                if (scrollTop > lastScrollTop && scrollTop > 500) {
                    quickNav.classList.remove('show');
                }
            } else {
                quickNav.classList.remove('show');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Inicializar navegación rápida
    private initializeQuickNav(): void {
        const quickNav = document.querySelector('.quick-nav');
        if (!quickNav) return;

        const buttons = quickNav.querySelectorAll('.quick-nav-btn');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const type = target.dataset.type as ConfigType;
                this.setActiveConfig(type);
                this.openModal();
                
                // Scroll suave a la tarjeta
                const card = document.querySelector(`[data-type="${type}"]`);
                if (card) {
                    card.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    (card as HTMLElement).classList.add('pulse');
                    setTimeout(() => {
                        (card as HTMLElement).classList.remove('pulse');
                    }, 2000);
                }
            });
        }
    }

    // Filtrar tarjetas
    private filterCards(searchTerm: string): void {
        const cards = document.querySelectorAll('.config-card');
        let hasResults = false;

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const title = card.querySelector('.config-card-title h3')?.textContent?.toLowerCase() || '';
            const description = card.querySelector('.config-card-description')?.textContent?.toLowerCase() || '';
            const tags = card.querySelector('.config-tags')?.textContent?.toLowerCase() || '';

            // Usar indexOf en lugar de includes para compatibilidad
            if (title.indexOf(searchTerm) !== -1 || 
                description.indexOf(searchTerm) !== -1 || 
                tags.indexOf(searchTerm) !== -1) {
                card.classList.remove('hidden');
                card.classList.add('fade-in');
                hasResults = true;
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        }

        // Mostrar/ocultar estado vacío
        const emptyState = document.getElementById('noResults');
        const mainContent = document.querySelector('.main-content');
        
        if (!hasResults && searchTerm) {
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            if (mainContent) {
                (mainContent as HTMLElement).style.minHeight = '40vh';
            }
        } else {
            if (emptyState) {
                emptyState.classList.add('hidden');
            }
            if (mainContent) {
                (mainContent as HTMLElement).style.minHeight = '60vh';
            }
        }
    }

    // Renderizar tarjetas de configuración
    private renderConfigCards(): void {
        const container = document.getElementById('configCards');
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < this.configExamples.length; i++) {
            const config = this.configExamples[i];
            const card = this.createConfigCard(config, i);
            container.appendChild(card);
        }

        // Resaltar sintaxis
        this.highlightSyntax();
    }

    // Crear tarjeta de configuración
    private createConfigCard(config: ConfigExample, index: number): HTMLElement {
        const card = document.createElement('div');
        card.className = 'config-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        card.dataset.type = config.type;

        // Generar tags
        const tags = this.generateTags(config);
        
        card.innerHTML = `
            <div class="config-card-badge" style="color: ${config.badgeColor}">
                ${config.badge}
            </div>
            <div class="config-card-header">
                <div class="config-card-icon" style="color: ${config.color}">
                    <i class="fas ${config.icon}"></i>
                </div>
                <div class="config-card-title">
                    <h3>${config.name}</h3>
                    <p>${config.shortDescription}</p>
                </div>
            </div>
            <div class="config-card-body">
                <p class="config-card-description">${config.description}</p>
                
                <div class="config-tags">
                    ${tags}
                </div>
                
                <ul class="config-features">
                    ${config.useCases.slice(0, 2).map(useCase => `
                        <li>
                            <i class="fas ${useCase.icon}"></i>
                            <span>${useCase.title}</span>
                        </li>
                    `).join('')}
                </ul>
                
                <div class="code-preview">
                    <pre><code class="language-json">${this.escapeHtml(config.config)}</code></pre>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            this.setActiveConfig(config.type);
            this.openModal();
        });

        return card;
    }

    // Generar tags para una configuración
    private generateTags(config: ConfigExample): string {
        const tags: string[] = [];
        
        // Usar indexOf en lugar de includes
        if (config.config.indexOf('**/*') !== -1) tags.push('Recursive');
        if (config.config.indexOf('*.{') !== -1) tags.push('Multiple');
        if (config.config.indexOf('!') !== -1) tags.push('Negation');
        
        // Para el tipo, convertirlo a string primero
        const typeString = config.type as string;
        if (typeString.indexOf('monorepo') !== -1) tags.push('Monorepo');
        if (typeString.indexOf('test') !== -1) tags.push('Testing');
        if (typeString.indexOf('build') !== -1) tags.push('Build');
        if (typeString.indexOf('advanced') !== -1) tags.push('Advanced');
        
        return tags.map(tag => `<span class="config-tag">${tag}</span>`).join('');
    }

    // Establecer configuración activa
    private setActiveConfig(type: ConfigType): void {
        this.activeConfig = type;
        this.currentTabIndex = 0;
        this.updateModalContent();
    }

    // Encontrar configuración por tipo
    private findConfigByType(type: ConfigType): ConfigExample | undefined {
        for (let i = 0; i < this.configExamples.length; i++) {
            if (this.configExamples[i].type === type) {
                return this.configExamples[i];
            }
        }
        return undefined;
    }

    // Actualizar contenido del modal
    private updateModalContent(): void {
        const config = this.findConfigByType(this.activeConfig);
        if (!config) return;

        // Actualizar título
        this.updateModalTitle(config);
        
        // Actualizar tabs
        this.updateModalTabs(config);
        
        // Actualizar contenido de tabs
        this.updateTabContent(config);
        
        // Actualizar botón de copia
        this.updateCopyButton(config);
    }

    // Actualizar título del modal
    private updateModalTitle(config: ConfigExample): void {
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalTitleIcon = document.getElementById('modalTitleIcon');

        if (modalTitle) modalTitle.textContent = config.name;
        if (modalSubtitle) modalSubtitle.textContent = config.shortDescription;
        if (modalTitleIcon) {
            modalTitleIcon.innerHTML = `<i class="fas ${config.icon}"></i>`;
            modalTitleIcon.style.color = config.color;
        }
    }

    // Actualizar tabs del modal
    private updateModalTabs(config: ConfigExample): void {
        const tabsContainer = document.getElementById('modalTabs');
        if (!tabsContainer) return;

        const tabs = [
            { id: 'examples', label: 'Examples', icon: 'fa-code' },
            { id: 'useCases', label: 'Use Cases', icon: 'fa-briefcase' },
            { id: 'bestPractices', label: 'Best Practices', icon: 'fa-star' },
            { id: 'commonIssues', label: 'Common Issues', icon: 'fa-exclamation-triangle' },
            { id: 'configuration', label: 'Configuration', icon: 'fa-cog' },
            { id: 'interactive', label: 'Interactive Demo', icon: 'fa-play' }
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
        const config = this.findConfigByType(this.activeConfig);
        if (config) {
            this.updateTabContent(config);
        }
    }

    // Actualizar contenido del tab
    private updateTabContent(config: ConfigExample): void {
        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        let content = '';
        
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

        modalBody.innerHTML = `<div class="tab-pane active">${content}</div>`;
        
        // Configurar botones de copia en ejemplos
        this.setupExampleCopyButtons();
        
        // Resaltar sintaxis
        this.highlightSyntax();
    }

    // Crear tab de ejemplos
    private createExamplesTab(config: ConfigExample): string {
        let examplesHTML = '';
        for (let i = 0; i < config.examples.length; i++) {
            examplesHTML += `
                <div class="example-card">
                    <div class="example-header">
                        <h4>Example ${i + 1}</h4>
                        <button class="copy-btn" data-code="${this.escapeHtml(config.examples[i])}">
                            <i class="fas fa-copy"></i>
                            Copy
                        </button>
                    </div>
                    <div class="example-code">
                        <pre><code class="language-json">${config.examples[i]}</code></pre>
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
    private createUseCasesTab(config: ConfigExample): string {
        let useCasesHTML = '';
        for (let i = 0; i < config.useCases.length; i++) {
            const useCase = config.useCases[i];
            useCasesHTML += `
                <li class="use-case-item">
                    <div class="use-case-header">
                        <i class="fas ${useCase.icon}"></i>
                        <h4 class="use-case-title">${useCase.title}</h4>
                    </div>
                    <p class="use-case-description">${useCase.description}</p>
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
    private createBestPracticesTab(config: ConfigExample): string {
        let practicesHTML = '';
        for (let i = 0; i < config.bestPractices.length; i++) {
            practicesHTML += `
                <div class="practice-item">
                    <div class="practice-number">${i + 1}</div>
                    <div class="practice-text">${config.bestPractices[i]}</div>
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
    private createCommonIssuesTab(config: ConfigExample): string {
        let issuesHTML = '';
        for (let i = 0; i < config.commonIssues.length; i++) {
            const issue = config.commonIssues[i];
            issuesHTML += `
                <div class="issue-item">
                    <div class="issue-header">
                        <i class="fas fa-exclamation-circle"></i>
                        <h4>${issue.issue}</h4>
                    </div>
                    <div class="issue-solution">
                        <i class="fas fa-check-circle"></i>
                        <p><strong>Solution:</strong> ${issue.solution}</p>
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
    private createConfigurationTab(config: ConfigExample): string {
        let optionsHTML = '';
        for (let i = 0; i < config.configurationOptions.length; i++) {
            const option = config.configurationOptions[i];
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
                <div class="code-preview" style="margin-bottom: 1.5rem;">
                    <pre><code class="language-json">${config.config}</code></pre>
                </div>
                
                <h3 style="margin-bottom: 1rem;">Configuration Options</h3>
                
                <table class="config-table">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Value</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${optionsHTML}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Crear demo interactiva
    private createInteractiveDemo(config: ConfigExample): string {
        const demoConfigs: { [key: string]: DemoConfig } = {
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

        const demo = demoConfigs[config.type] || demoConfigs['include-basic'];
        
        let patternsHTML = '';
        for (let i = 0; i < demo.patterns.length; i++) {
            const pattern = demo.patterns[i];
            patternsHTML += `
                <button class="demo-btn ${pattern.checked ? 'active' : ''}" 
                        data-pattern="${pattern.label}">
                    ${pattern.label}
                </button>
            `;
        }

        return `
            <div class="interactive-demo">
                <h3>${demo.title}</h3>
                <p class="demo-description">${demo.description}</p>
                
                <div class="demo-controls">
                    ${patternsHTML}
                </div>
                
                <div class="demo-output">
                    <div class="demo-output-header">
                        <i class="fas fa-code"></i>
                        <span>Generated Configuration:</span>
                    </div>
                    <pre><code class="language-json">{
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}</code></pre>
                </div>
                
                <div class="demo-tip">
                    <i class="fas fa-lightbulb"></i>
                    <div>
                        <strong>Tip:</strong> Patterns are processed in order. Use <code>!</code> to exclude specific files.
                    </div>
                </div>
            </div>
        `;
    }

    // Configurar botones de copia en ejemplos
    private setupExampleCopyButtons(): void {
        const copyButtons = document.querySelectorAll('.copy-btn');
        for (let i = 0; i < copyButtons.length; i++) {
            copyButtons[i].addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const code = target.dataset.code;
                if (code) {
                    this.copyToClipboard(code);
                    this.showNotification('Example copied to clipboard');
                    
                    // Feedback visual
                    const icon = target.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-check';
                        setTimeout(() => {
                            icon.className = 'fas fa-copy';
                        }, 2000);
                    }
                }
            });
        }
    }

    // Actualizar botón de copia
    private updateCopyButton(config: ConfigExample): void {
        const copyButton = document.getElementById('copyConfig');
        if (copyButton) {
            copyButton.onclick = () => this.copyConfig();
        }
    }

    // Resaltar sintaxis
    private highlightSyntax(): void {
        setTimeout(() => {
            if ((window as any).Prism) {
                (window as any).Prism.highlightAll();
            }
        }, 100);
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
        const modal = document.getElementById('configModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Configurar demo interactiva si está activa
            if (this.currentTabIndex === 5) {
                this.setupInteractiveDemo();
            }
        }
    }

    // Configurar demo interactiva
    private setupInteractiveDemo(): void {
        setTimeout(() => {
            const demoButtons = document.querySelectorAll('.demo-btn');
            for (let i = 0; i < demoButtons.length; i++) {
                demoButtons[i].addEventListener('click', function() {
                    this.classList.toggle('active');
                    updateDemoOutput();
                });
            }

            const updateDemoOutput = () => {
                const demoButtonsActive = document.querySelectorAll('.demo-btn.active');
                const activePatterns: string[] = [];
                
                for (let i = 0; i < demoButtonsActive.length; i++) {
                    const pattern = (demoButtonsActive[i] as HTMLElement).getAttribute('data-pattern');
                    if (pattern) {
                        activePatterns.push(pattern);
                    }
                }
                
                const include: string[] = [];
                const exclude: string[] = [];
                
                for (let i = 0; i < activePatterns.length; i++) {
                    const pattern = activePatterns[i];
                    // Usar indexOf en lugar de startsWith
                    if (pattern.indexOf('!') !== 0) {
                        include.push(pattern);
                    } else {
                        exclude.push(pattern.substring(1));
                    }
                }
                
                const config = {
                    include: include.length ? include : ['src/**/*'],
                    exclude: ['node_modules', 'dist'].concat(exclude)
                };
                
                const output = document.querySelector('.demo-output code');
                if (output) {
                    output.textContent = JSON.stringify(config, null, 2);
                    if ((window as any).Prism) {
                        (window as any).Prism.highlightElement(output);
                    }
                }
            };

            // Inicializar demo
            updateDemoOutput();
        }, 100);
    }

    // Cerrar modal
    private closeModal(): void {
        this.isModalOpen = false;
        const modal = document.getElementById('configModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Navegar al tab anterior
    private prevTab(): void {
        this.currentTabIndex--;
        if (this.currentTabIndex < 0) {
            this.currentTabIndex = 5; // Total de tabs - 1
        }
        const config = this.findConfigByType(this.activeConfig);
        if (config) {
            this.updateTabContent(config);
        }
        const tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration', 'interactive'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    }

    // Navegar al siguiente tab
    private nextTab(): void {
        this.currentTabIndex++;
        if (this.currentTabIndex > 5) {
            this.currentTabIndex = 0;
        }
        const config = this.findConfigByType(this.activeConfig);
        if (config) {
            this.updateTabContent(config);
        }
        const tabNames = ['examples', 'useCases', 'bestPractices', 'commonIssues', 'configuration', 'interactive'];
        this.updateActiveTab(tabNames[this.currentTabIndex]);
    }

    // Copiar configuración
    private copyConfig(): void {
        const config = this.findConfigByType(this.activeConfig);
        if (!config) return;

        this.copyToClipboard(config.config);
        this.showNotification('Configuration copied to clipboard');
    }

    // Copiar texto al portapapeles
    private copyToClipboard(text: string): void {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy text: ', err);
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
        
        this.showNotification(`${this.isLightMode ? 'Light' : 'Dark'} theme activated`);
        
        // Guardar preferencia en localStorage
        localStorage.setItem('theme', this.isLightMode ? 'light' : 'dark');
    }

    // Mostrar notificación
    private showNotification(message: string, isError: boolean = false): void {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            notification.classList.add('slide-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new IncludeExcludeVisualizer();
});