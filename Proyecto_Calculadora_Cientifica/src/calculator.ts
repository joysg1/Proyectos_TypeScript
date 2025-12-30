// Tipos y interfaces
type AngleMode = 'deg' | 'rad' | 'grad';
type Operator = 'add' | 'subtract' | 'multiply' | 'divide' | 'modulo' | 'power';

interface HistoryItem {
    expression: string;
    result: string;
    timestamp: Date;
}

interface CalculatorElements {
    display: HTMLElement;
    expressionDisplay: HTMLElement;
    memoryIndicator: HTMLElement;
    memoryValueElement: HTMLElement;
    historyElement: HTMLElement;
    angleModeElement: HTMLElement;
    currentAngleElement: HTMLElement;
}

// Clase principal de la calculadora
export class ScientificCalculator {
    // Propiedades del estado
    private memoryValue: number = 0;
    private currentInput: string = '0';
    private previousInput: string = '';
    private operator: Operator | '' = '';
    private resetOnNextInput: boolean = true;
    private angleMode: AngleMode = 'deg';
    private history: HistoryItem[] = [];
    
    // Elementos del DOM
    private elements: CalculatorElements;

    constructor() {
        // Inicializar referencias a elementos del DOM
        this.elements = {
            display: document.getElementById('display') as HTMLElement,
            expressionDisplay: document.getElementById('expression') as HTMLElement,
            memoryIndicator: document.getElementById('memory-indicator') as HTMLElement,
            memoryValueElement: document.getElementById('memory-value') as HTMLElement,
            historyElement: document.getElementById('history') as HTMLElement,
            angleModeElement: document.getElementById('angle-mode') as HTMLElement,
            currentAngleElement: document.getElementById('current-angle') as HTMLElement
        };

        // Verificar que todos los elementos existan
        this.validateElements();
        
        // Inicializar calculadora
        this.initializeEventListeners();
        this.updateDisplay();
        this.updateAngleModeDisplay();
        this.loadFromLocalStorage();
        
        console.log('🧮 Calculadora científica lista');
    }

    // Validar elementos del DOM
    private validateElements(): void {
        const missingElements: string[] = [];
        
        Object.entries(this.elements).forEach(([key, element]) => {
            if (!element) {
                missingElements.push(key);
            }
        });
        
        if (missingElements.length > 0) {
            throw new Error(`Elementos del DOM no encontrados: ${missingElements.join(', ')}`);
        }
    }

    // Inicializar event listeners
    private initializeEventListeners(): void {
        // Números
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const number = target.closest('button')?.getAttribute('data-number') || '';
                if (number) this.inputNumber(number);
            });
        });

        // Operadores
        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const operator = target.closest('button')?.getAttribute('data-operator') as Operator;
                if (operator) this.setOperator(operator);
            });
        });

        // Funciones científicas
        document.querySelectorAll('[data-func]').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const func = target.closest('button')?.getAttribute('data-func') || '';
                if (func) this.handleFunction(func);
            });
        });

        // Acciones de control
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const action = target.closest('button')?.getAttribute('data-action') || '';
                if (action) this.handleAction(action);
            });
        });

        // Memoria
        document.querySelectorAll('.memory-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const action = target.closest('button')?.getAttribute('data-action') || '';
                if (action) this.handleMemoryAction(action);
            });
        });

        // Modo de ángulo
        document.querySelectorAll('.angle-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const mode = target.closest('button')?.getAttribute('data-angle') as AngleMode;
                if (mode) this.setAngleMode(mode);
            });
        });

        // Historial
        document.getElementById('clear-history')?.addEventListener('click', () => {
            this.clearHistory();
        });

        document.getElementById('history-toggle')?.addEventListener('click', () => {
            this.toggleHistoryPanel();
        });

        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
    }

    // Manejar entrada de números
    private inputNumber(num: string): void {
        console.log('🔢 Número:', num);
        
        if (this.resetOnNextInput) {
            this.currentInput = num === '.' ? '0.' : num;
            this.resetOnNextInput = false;
        } else {
            if (num === '.' && this.currentInput.includes('.')) {
                return; // Evitar múltiples puntos decimales
            }
            this.currentInput = this.currentInput === '0' && num !== '.' ? num : this.currentInput + num;
        }
        
        this.updateDisplay();
    }

    // Manejar acciones
    private handleAction(action: string): void {
        console.log('⚡ Acción:', action);
        
        switch (action) {
            case 'clear':
                this.clearAll();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'decimal':
                this.inputNumber('.');
                break;
            case 'toggle-sign':
                this.toggleSign();
                break;
            case 'equals':
                this.calculate();
                break;
        }
    }

    // Manejar funciones
    private handleFunction(func: string): void {
        console.log('🔧 Función:', func);
        
        switch (func) {
            case 'sin':
            case 'cos':
            case 'tan':
                this.calculateTrigonometric(func);
                break;
            case 'log':
                this.calculateLogarithm(10);
                break;
            case 'ln':
                this.calculateLogarithm(Math.E);
                break;
            case 'sqrt':
                this.calculateSquareRoot();
                break;
            case 'power':
                this.promptForPower();
                break;
            case 'factorial':
                this.calculateFactorial();
                break;
            case 'reciprocal':
                this.calculateReciprocal();
                break;
            case 'pow2':
                this.calculatePower(2);
                break;
            case 'pow3':
                this.calculatePower(3);
                break;
            case 'pi':
                this.inputConstant(Math.PI);
                break;
            case 'e':
                this.inputConstant(Math.E);
                break;
        }
    }

    // Manejar memoria
    private handleMemoryAction(action: string): void {
        console.log('💾 Memoria:', action);
        
        switch (action) {
            case 'mc':
                this.memoryClear();
                break;
            case 'mr':
                this.memoryRecall();
                break;
            case 'm-plus':
                this.memoryAdd();
                break;
            case 'm-minus':
                this.memorySubtract();
                break;
            case 'ms':
                this.memoryStore();
                break;
        }
    }

    // Establecer operador
    private setOperator(op: Operator): void {
        console.log('🔣 Operador:', op);
        
        if (this.operator && !this.resetOnNextInput) {
            this.calculate();
        }
        
        this.previousInput = this.currentInput;
        this.operator = op;
        this.resetOnNextInput = true;
        
        // Actualizar expresión mostrada
        const operatorSymbols: Record<Operator, string> = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷',
            'modulo': '%',
            'power': '^'
        };
        
        this.elements.expressionDisplay.textContent = 
            `${this.previousInput} ${operatorSymbols[op] || op}`;
    }

    // Calcular expresión
    private calculate(): void {
        if (!this.operator || this.resetOnNextInput) return;

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        let result: number;

        try {
            switch (this.operator) {
                case 'add':
                    result = prev + current;
                    break;
                case 'subtract':
                    result = prev - current;
                    break;
                case 'multiply':
                    result = prev * current;
                    break;
                case 'divide':
                    if (current === 0) throw new Error('División por cero');
                    result = prev / current;
                    break;
                case 'modulo':
                    result = prev % current;
                    break;
                case 'power':
                    result = Math.pow(prev, current);
                    break;
                default:
                    return;
            }

            // Agregar al historial
            const operatorSymbols: Record<Operator, string> = {
                'add': '+',
                'subtract': '−',
                'multiply': '×',
                'divide': '÷',
                'modulo': '%',
                'power': '^'
            };
            
            this.addToHistory(
                `${this.previousInput} ${operatorSymbols[this.operator]} ${this.currentInput}`,
                result.toString()
            );
            
            // Actualizar pantalla
            this.currentInput = this.formatResult(result);
            this.elements.expressionDisplay.textContent = '';
            this.operator = '';
            this.resetOnNextInput = true;
            this.updateDisplay();
            
        } catch (error) {
            this.displayError(error instanceof Error ? error.message : 'Error de cálculo');
        }
    }

    // Funciones trigonométricas
    private calculateTrigonometric(func: 'sin' | 'cos' | 'tan'): void {
        const value = parseFloat(this.currentInput);
        let result: number;
        let angleInRadians: number;

        // Convertir según modo de ángulo
        switch (this.angleMode) {
            case 'deg':
                angleInRadians = value * Math.PI / 180;
                break;
            case 'grad':
                angleInRadians = value * Math.PI / 200;
                break;
            case 'rad':
            default:
                angleInRadians = value;
                break;
        }

        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(angleInRadians);
                    break;
                case 'cos':
                    result = Math.cos(angleInRadians);
                    break;
                case 'tan':
                    if (Math.cos(angleInRadians) === 0) throw new Error('Tangente indefinida');
                    result = Math.tan(angleInRadians);
                    break;
                default:
                    return;
            }

            // Agregar al historial
            const angleSymbol = this.angleMode === 'deg' ? '°' : 
                              this.angleMode === 'rad' ? ' rad' : ' grad';
            this.addToHistory(`${func}(${value}${angleSymbol})`, result.toString());
            
            this.currentInput = this.formatResult(result);
            this.resetOnNextInput = true;
            this.updateDisplay();
            
        } catch (error) {
            this.displayError(error instanceof Error ? error.message : 'Error trigonométrico');
        }
    }

    // Logaritmos
    private calculateLogarithm(base: number): void {
        const value = parseFloat(this.currentInput);
        
        if (value <= 0) {
            this.displayError('Logaritmo indefinido para valores ≤ 0');
            return;
        }

        try {
            const result = base === Math.E ? Math.log(value) : Math.log(value) / Math.log(base);
            const funcName = base === Math.E ? 'ln' : 'log';
            
            this.addToHistory(`${funcName}(${value})`, result.toString());
            this.currentInput = this.formatResult(result);
            this.resetOnNextInput = true;
            this.updateDisplay();
            
        } catch (error) {
            this.displayError('Error en cálculo logarítmico');
        }
    }

    // Raíz cuadrada
    private calculateSquareRoot(): void {
        const value = parseFloat(this.currentInput);
        
        if (value < 0) {
            this.displayError('Raíz cuadrada indefinida para valores negativos');
            return;
        }

        try {
            const result = Math.sqrt(value);
            this.addToHistory(`√(${value})`, result.toString());
            this.currentInput = this.formatResult(result);
            this.resetOnNextInput = true;
            this.updateDisplay();
            
        } catch (error) {
            this.displayError('Error en raíz cuadrada');
        }
    }

    // Potencia
    private calculatePower(power: number): void {
        const value = parseFloat(this.currentInput);
        
        try {
            const result = Math.pow(value, power);
            this.addToHistory(`${value}^${power}`, result.toString());
            this.currentInput = this.formatResult(result);
            this.resetOnNextInput = true;
            this.updateDisplay();
            
        } catch (error) {
            this.displayError('Error en cálculo de potencia');
        }
    }

    // Pedir potencia personalizada
    private promptForPower(): void {
        const power = prompt('Ingresa el exponente:');
        if (power !== null && !isNaN(parseFloat(power))) {
            this.calculatePower(parseFloat(power));
        }
    }

    // Factorial
    private calculateFactorial(): void {
        const value = parseFloat(this.currentInput);
        
        if (value < 0 || !Number.isInteger(value)) {
            this.displayError('Factorial solo para enteros no negativos');
            return;
        }
        
        if (value > 100) {
            this.displayError('Valor demasiado grande para factorial');
            return;
        }

        try {
            let result = 1;
            for (let i = 2; i <= value; i++) {
                result *= i;
            }
            
            this.addToHistory(`${value}!`, result.toString());
            this.currentInput = this.formatResult(result);
            this.resetOnNextInput = true;
            this.updateDisplay();
            
        } catch (error) {
            this.displayError('Error en cálculo factorial');
        }
    }

    // Recíproco
    private calculateReciprocal(): void {
        const value = parseFloat(this.currentInput);
        
        if (value === 0) {
            this.displayError('División por cero');
            return;
        }

        try {
            const result = 1 / value;
            this.addToHistory(`1/(${value})`, result.toString());
            this.currentInput = this.formatResult(result);
            this.resetOnNextInput = true;
            this.updateDisplay();
            
        } catch (error) {
            this.displayError('Error en recíproco');
        }
    }

    // Cambiar signo
    private toggleSign(): void {
        if (this.currentInput !== '0') {
            this.currentInput = this.currentInput.startsWith('-') 
                ? this.currentInput.substring(1) 
                : '-' + this.currentInput;
            this.updateDisplay();
        }
    }

    // Ingresar constante
    private inputConstant(constant: number): void {
        this.currentInput = constant.toString();
        this.resetOnNextInput = true;
        this.updateDisplay();
    }

    // MEMORIA
    private memoryClear(): void {
        this.memoryValue = 0;
        this.updateMemoryDisplay();
    }

    private memoryRecall(): void {
        this.currentInput = this.formatResult(this.memoryValue);
        this.resetOnNextInput = true;
        this.updateDisplay();
    }

    private memoryAdd(): void {
        this.memoryValue += parseFloat(this.currentInput || '0');
        this.updateMemoryDisplay();
    }

    private memorySubtract(): void {
        this.memoryValue -= parseFloat(this.currentInput || '0');
        this.updateMemoryDisplay();
    }

    private memoryStore(): void {
        this.memoryValue = parseFloat(this.currentInput || '0');
        this.updateMemoryDisplay();
    }

    private updateMemoryDisplay(): void {
        const formattedValue = this.formatResult(this.memoryValue);
        this.elements.memoryIndicator.textContent = `M: ${formattedValue}`;
        this.elements.memoryIndicator.classList.remove('hidden');
        this.elements.memoryValueElement.textContent = formattedValue;
        
        if (this.memoryValue !== 0) {
            this.elements.memoryIndicator.classList.add('memory-active');
        } else {
            this.elements.memoryIndicator.classList.remove('memory-active');
        }
        
        this.saveToLocalStorage();
    }

    // MODO DE ÁNGULO
    private setAngleMode(mode: AngleMode): void {
        this.angleMode = mode;
        this.updateAngleModeDisplay();
        localStorage.setItem('calculatorAngleMode', mode);
    }

    private updateAngleModeDisplay(): void {
        this.elements.angleModeElement.textContent = this.angleMode.toUpperCase();
        
        const modeNames: Record<AngleMode, string> = {
            'deg': 'Grados (DEG)',
            'rad': 'Radianes (RAD)',
            'grad': 'Gradianes (GRAD)'
        };
        this.elements.currentAngleElement.textContent = modeNames[this.angleMode];
    }

    // LIMPIAR
    private clearAll(): void {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.resetOnNextInput = true;
        this.elements.expressionDisplay.textContent = 'Ingrese una expresión';
        this.updateDisplay();
    }

    private clearEntry(): void {
        this.currentInput = '0';
        this.updateDisplay();
    }

    // RETROCESO
    private backspace(): void {
        if (this.currentInput.length > 1 && this.currentInput !== '0') {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    // HISTORIAL
    private addToHistory(expression: string, result: string): void {
        const historyItem: HistoryItem = {
            expression,
            result,
            timestamp: new Date()
        };
        
        this.history.unshift(historyItem);
        
        // Mantener solo los últimos 10 elementos
        if (this.history.length > 10) {
            this.history.pop();
        }
        
        this.updateHistoryDisplay();
        this.saveToLocalStorage();
    }

    private updateHistoryDisplay(): void {
        if (this.history.length === 0) {
            this.elements.historyElement.innerHTML = `
                <div class="text-gray-400 text-center py-8">
                    <i class="fas fa-clock text-3xl mb-3"></i>
                    <p>No hay cálculos recientes</p>
                </div>
            `;
            return;
        }
        
        this.elements.historyElement.innerHTML = this.history.map(item => `
            <div class="history-item bg-gray-800/50 p-4 rounded-xl border-l-4 border-blue-500 hover:bg-gray-800/70 cursor-pointer mb-2" 
                 onclick="this.closest('.calculator').querySelector('#display').textContent = '${item.result}'">
                <div class="text-gray-300 text-sm mb-1">${item.expression}</div>
                <div class="text-xl font-semibold text-blue-300">= ${item.result}</div>
                <div class="text-gray-500 text-xs mt-2">
                    ${item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        `).join('');
    }

    private clearHistory(): void {
        if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
            this.history = [];
            this.updateHistoryDisplay();
            localStorage.removeItem('calculatorHistory');
        }
    }

    private toggleHistoryPanel(): void {
        const historyPanel = document.querySelector('.lg\\:w-1\\/3');
        if (historyPanel) {
            historyPanel.classList.toggle('hidden');
        }
    }

    // ERRORES
    private displayError(message: string): void {
        console.error('❌ Error:', message);
        this.currentInput = 'Error';
        this.elements.expressionDisplay.textContent = message;
        this.resetOnNextInput = true;
        this.updateDisplay();
        
        setTimeout(() => {
            if (this.currentInput === 'Error') {
                this.clearAll();
            }
        }, 3000);
    }

    // FORMATEAR RESULTADO
    private formatResult(value: number): string {
        // Si es NaN o infinito
        if (!isFinite(value)) {
            return value > 0 ? 'Infinito' : '-Infinito';
        }
        
        // Si es un número muy grande o muy pequeño
        if (Math.abs(value) > 1e10 || (Math.abs(value) < 1e-10 && value !== 0)) {
            return value.toExponential(8).replace('e', ' × 10^');
        }
        
        // Para números decimales, limitar decimales
        const strValue = value.toString();
        if (strValue.includes('.')) {
            const [integer, decimal] = strValue.split('.');
            if (decimal.length > 10) {
                return value.toFixed(10).replace(/\.?0+$/, '');
            }
        }
        
        return strValue;
    }

    // ACTUALIZAR PANTALLA
    private updateDisplay(): void {
        this.elements.display.textContent = this.currentInput;
        
        // Actualizar input actual en header
        const currentInputElement = document.getElementById('current-input');
        if (currentInputElement) {
            currentInputElement.textContent = this.currentInput.length > 20 
                ? this.currentInput.substring(0, 20) + '...' 
                : this.currentInput;
        }
    }

    // TECLADO
    private handleKeyboardInput(event: KeyboardEvent): void {
        event.preventDefault();
        
        switch (event.key) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                this.inputNumber(event.key);
                break;
            case '.':
            case ',':
                this.inputNumber('.');
                break;
            case '+':
                this.setOperator('add');
                break;
            case '-':
                this.setOperator('subtract');
                break;
            case '*':
                this.setOperator('multiply');
                break;
            case '/':
                this.setOperator('divide');
                break;
            case '%':
                this.setOperator('modulo');
                break;
            case '^':
                this.promptForPower();
                break;
            case 'Enter':
            case '=':
                this.calculate();
                break;
            case 'Escape':
            case 'Delete':
                this.clearAll();
                break;
            case 'Backspace':
                this.backspace();
                break;
            case 'm':
            case 'M':
                if (event.ctrlKey) this.memoryClear();
                break;
            case 'r':
            case 'R':
                if (event.ctrlKey) this.memoryRecall();
                break;
        }
    }

    // LOCAL STORAGE
    private saveToLocalStorage(): void {
        try {
            localStorage.setItem('calculatorMemory', this.memoryValue.toString());
            localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
        } catch (error) {
            console.warn('No se pudo guardar en localStorage:', error);
        }
    }

    private loadFromLocalStorage(): void {
        try {
            // Cargar memoria
            const savedMemory = localStorage.getItem('calculatorMemory');
            if (savedMemory) {
                this.memoryValue = parseFloat(savedMemory);
                this.updateMemoryDisplay();
            }
            
            // Cargar historial
            const savedHistory = localStorage.getItem('calculatorHistory');
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                this.history = parsedHistory.map((item: any) => ({
                    ...item,
                    timestamp: new Date(item.timestamp)
                }));
                this.updateHistoryDisplay();
            }
            
            // Cargar modo de ángulo
            const savedAngleMode = localStorage.getItem('calculatorAngleMode') as AngleMode;
            if (savedAngleMode && ['deg', 'rad', 'grad'].includes(savedAngleMode)) {
                this.angleMode = savedAngleMode;
                this.updateAngleModeDisplay();
            }
            
        } catch (error) {
            console.warn('Error al cargar desde localStorage:', error);
        }
    }
}