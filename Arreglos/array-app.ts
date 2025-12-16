// Definición de tipos
type ArrayElement = string | number | boolean;
type OperationType = 'push' | 'pop' | 'unshift' | 'shift' | 'splice' | 'remove' | 'reverse' | 'sort' | 'fill';

// Clase principal de la aplicación
class ArrayVisualizer {
    private array: ArrayElement[] = ['Manzana', 42, true, 'TypeScript', 7.5, false, 'Arreglo'];
    private logEntries: string[] = [];

    constructor() {
        this.initializeEventListeners();
        this.renderArray();
        this.updateArrayInfo();
        this.addLogEntry('Aplicación iniciada. Arreglo inicial creado.');
    }

    // Inicializa los event listeners para los controles
    private initializeEventListeners(): void {
        const executeBtn = document.getElementById('executeOperation') as HTMLButtonElement;
        const resetBtn = document.getElementById('resetArray') as HTMLButtonElement;
        
        if (executeBtn) executeBtn.addEventListener('click', () => this.executeOperation());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetArray());
        
        // Permitir ejecutar con Enter en el campo de valor
        const elementValueInput = document.getElementById('elementValue') as HTMLInputElement;
        if (elementValueInput) {
            elementValueInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.executeOperation();
                }
            });
        }
    }

    // Ejecuta la operación seleccionada
    private executeOperation(): void {
        const operationSelect = document.getElementById('operation') as HTMLSelectElement;
        const elementValueInput = document.getElementById('elementValue') as HTMLInputElement;
        const positionInput = document.getElementById('position') as HTMLInputElement;
        
        if (!operationSelect || !elementValueInput || !positionInput) return;
        
        const operation = operationSelect.value as OperationType;
        const value = elementValueInput.value;
        const position = parseInt(positionInput.value) || 0;
        
        let operationDescription = '';
        
        try {
            switch (operation) {
                case 'push':
                    this.array.push(this.parseValue(value));
                    operationDescription = `push(${this.formatValue(value)}) - Agregado al final`;
                    break;
                    
                case 'pop':
                    const popped = this.array.pop();
                    operationDescription = `pop() - Eliminado: ${this.formatValue(popped ? popped.toString() : 'undefined')}`;
                    break;
                    
                case 'unshift':
                    this.array.unshift(this.parseValue(value));
                    operationDescription = `unshift(${this.formatValue(value)}) - Agregado al inicio`;
                    break;
                    
                case 'shift':
                    const shifted = this.array.shift();
                    operationDescription = `shift() - Eliminado: ${this.formatValue(shifted ? shifted.toString() : 'undefined')}`;
                    break;
                    
                case 'splice':
                    if (position >= 0 && position <= this.array.length) {
                        this.array.splice(position, 0, this.parseValue(value));
                        operationDescription = `splice(${position}, 0, ${this.formatValue(value)}) - Insertado en posición ${position}`;
                    } else {
                        throw new Error('Posición inválida para splice');
                    }
                    break;
                    
                case 'remove':
                    if (position >= 0 && position < this.array.length) {
                        const removed = this.array.splice(position, 1);
                        operationDescription = `splice(${position}, 1) - Eliminado: ${this.formatValue(removed[0] ? removed[0].toString() : '')} de posición ${position}`;
                    } else {
                        throw new Error('Posición inválida para eliminar');
                    }
                    break;
                    
                case 'reverse':
                    this.array.reverse();
                    operationDescription = 'reverse() - Arreglo invertido';
                    break;
                    
                case 'sort':
                    // Ordenar considerando diferentes tipos de datos
                    this.array.sort((a, b) => {
                        if (typeof a === 'number' && typeof b === 'number') return a - b;
                        if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
                        if (typeof a === 'boolean' && typeof b === 'boolean') return a === b ? 0 : a ? 1 : -1;
                        return String(a).localeCompare(String(b));
                    });
                    operationDescription = 'sort() - Arreglo ordenado';
                    break;
                    
                case 'fill':
                    // Implementación manual de fill (compatible con ES5)
                    this.manualFill(this.parseValue(value));
                    operationDescription = `fill(${this.formatValue(value)}) - Todos los elementos reemplazados`;
                    break;
            }
            
            this.renderArray();
            this.updateArrayInfo();
            this.addLogEntry(operationDescription);
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Operación fallida';
            this.addLogEntry(`Error: ${errorMessage}`);
        }
    }

    // Implementación manual de fill (compatible con ES5)
    private manualFill(value: ArrayElement): void {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = value;
        }
    }

    // Reinicia el arreglo a su estado inicial
    private resetArray(): void {
        this.array = ['Manzana', 42, true, 'TypeScript', 7.5, false, 'Arreglo'];
        this.renderArray();
        this.updateArrayInfo();
        this.addLogEntry('Arreglo reiniciado a valores iniciales.');
    }

    // Parsea el valor de entrada según su tipo
    private parseValue(value: string): ArrayElement {
        // Limpiar espacios en blanco
        const trimmedValue = value.trim();
        
        // Verificar si es booleano
        if (trimmedValue.toLowerCase() === 'true') return true;
        if (trimmedValue.toLowerCase() === 'false') return false;
        
        // Verificar si es número (incluyendo decimales)
        const num = Number(trimmedValue);
        if (!isNaN(num) && trimmedValue !== '') {
            return num;
        }
        
        // Por defecto, devuelve como string
        return trimmedValue || 'Nuevo elemento';
    }

    // Formatea un valor para mostrarlo
    private formatValue(value: string): string {
        const parsed = this.parseValue(value);
        
        if (typeof parsed === 'string') {
            return `"${parsed}"`;
        } else if (typeof parsed === 'boolean') {
            return parsed ? 'true' : 'false';
        } else {
            return parsed.toString();
        }
    }

    // Renderiza el arreglo en la interfaz
    private renderArray(): void {
        const arrayDisplay = document.getElementById('arrayDisplay');
        if (!arrayDisplay) return;
        
        arrayDisplay.innerHTML = '';
        
        for (let i = 0; i < this.array.length; i++) {
            const element = this.array[i];
            const elementDiv = document.createElement('div');
            elementDiv.className = 'array-element';
            
            // Determinar el tipo de elemento para mostrar un icono
            let icon = 'fas fa-question';
            if (typeof element === 'string') icon = 'fas fa-font';
            if (typeof element === 'number') icon = 'fas fa-hashtag';
            if (typeof element === 'boolean') icon = 'fas fa-check-circle';
            
            elementDiv.innerHTML = `
                <i class="${icon}"></i>
                <span class="element-value">${element}</span>
                <span class="array-index">[${i}]</span>
            `;
            
            arrayDisplay.appendChild(elementDiv);
        }
        
        // Si el arreglo está vacío, mostrar un mensaje
        if (this.array.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.textContent = 'Arreglo vacío';
            emptyMessage.style.color = '#a0a0c0';
            emptyMessage.style.fontStyle = 'italic';
            arrayDisplay.appendChild(emptyMessage);
        }
    }

    // Actualiza la información del arreglo
    private updateArrayInfo(): void {
        const arrayLength = document.getElementById('arrayLength');
        const arrayType = document.getElementById('arrayType');
        const arrayElements = document.getElementById('arrayElements');
        
        if (!arrayLength || !arrayType || !arrayElements) return;
        
        arrayLength.textContent = this.array.length.toString();
        
        // Determinar el tipo de arreglo (versión compatible con ES5)
        const types: string[] = [];
        const seenTypes: {[key: string]: boolean} = {};
        
        for (let i = 0; i < this.array.length; i++) {
            const type = typeof this.array[i];
            types.push(type);
            seenTypes[type] = true;
        }
        
        const uniqueTypes: string[] = [];
        for (const typeKey in seenTypes) {
            if (seenTypes.hasOwnProperty(typeKey)) {
                uniqueTypes.push(typeKey);
            }
        }
        
        if (uniqueTypes.length === 1) {
            arrayType.textContent = `${uniqueTypes[0]}[]`;
        } else if (uniqueTypes.length > 1) {
            arrayType.textContent = `(string | number | boolean)[]`;
        } else {
            arrayType.textContent = 'any[]';
        }
        
        // Mostrar elementos formateados
        const formattedElements: string[] = [];
        for (let i = 0; i < this.array.length; i++) {
            formattedElements.push(this.formatValue(this.array[i].toString()));
        }
        arrayElements.textContent = `[${formattedElements.join(', ')}]`;
    }

    // Formatea un número a dos dígitos (versión compatible con ES5)
    private padNumber(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

    // Obtiene la hora actual formateada
    private getFormattedTime(): string {
        const now = new Date();
        const hours = this.padNumber(now.getHours());
        const minutes = this.padNumber(now.getMinutes());
        const seconds = this.padNumber(now.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    }

    // Agrega una entrada al historial
    private addLogEntry(message: string): void {
        const timeString = this.getFormattedTime();
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<span class="log-time">${timeString}</span> ${message}`;
        
        const logEntriesContainer = document.getElementById('logEntries');
        if (!logEntriesContainer) return;
        
        // Insertar al inicio (compatible con ES5)
        if (logEntriesContainer.firstChild) {
            logEntriesContainer.insertBefore(logEntry, logEntriesContainer.firstChild);
        } else {
            logEntriesContainer.appendChild(logEntry);
        }
        
        // Mantener solo las últimas 10 entradas
        while (logEntriesContainer.children.length > 10) {
            if (logEntriesContainer.lastChild) {
                logEntriesContainer.removeChild(logEntriesContainer.lastChild);
            }
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ArrayVisualizer();
});
