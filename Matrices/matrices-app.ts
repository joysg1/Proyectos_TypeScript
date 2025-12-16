// Definición de tipos
type Matrix = number[][];
type Operation = 'add' | 'subtract' | 'multiply' | 'transpose' | 'determinant' | 'scale';

// Clase principal de la aplicación
class MatrixVisualizer {
    private matrixA: Matrix;
    private matrixB: Matrix;
    private resultMatrix: Matrix;
    private scaleFactor: number = 2;
    private isLightMode: boolean = false;

    constructor() {
        // Inicializar matrices 3x3 con valores por defecto
        this.matrixA = this.createMatrix(3, 3, 1);
        this.matrixB = this.createMatrix(3, 3, 2);
        this.resultMatrix = this.createMatrix(3, 3, 0);
        
        this.initializeEventListeners();
        this.renderAllMatrices();
        this.updateDimensions();
    }

    // Crear una matriz con valores específicos
    private createMatrix(rows: number, cols: number, baseValue: number = 0): Matrix {
        const matrix: Matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = baseValue === 0 ? 0 : baseValue * (i + 1) + (j + 1);
            }
        }
        return matrix;
    }

    // Inicializar todos los event listeners
    private initializeEventListeners(): void {
        // Controles de dimensión
        document.getElementById('rowsA')?.addEventListener('input', (e) => this.updateMatrixSize('A', e));
        document.getElementById('colsA')?.addEventListener('input', (e) => this.updateMatrixSize('A', e));
        document.getElementById('rowsB')?.addEventListener('input', (e) => this.updateMatrixSize('B', e));
        document.getElementById('colsB')?.addEventListener('input', (e) => this.updateMatrixSize('B', e));
        
        // Botones de aleatorización
        document.getElementById('randomizeA')?.addEventListener('click', () => this.randomizeMatrix('A'));
        document.getElementById('randomizeB')?.addEventListener('click', () => this.randomizeMatrix('B'));
        
        // Botones de acción
        document.getElementById('resetMatrices')?.addEventListener('click', () => this.resetMatrices());
        document.getElementById('generateIdentities')?.addEventListener('click', () => this.generateIdentityMatrices());
        
        // Operaciones matriciales
        document.getElementById('addMatrices')?.addEventListener('click', () => this.performOperation('add'));
        document.getElementById('subtractMatrices')?.addEventListener('click', () => this.performOperation('subtract'));
        document.getElementById('multiplyMatrices')?.addEventListener('click', () => this.performOperation('multiply'));
        document.getElementById('transposeA')?.addEventListener('click', () => this.transposeMatrix('A'));
        document.getElementById('determinantA')?.addEventListener('click', () => this.calculateDeterminant());
        document.getElementById('scaleMatrix')?.addEventListener('click', () => this.scaleMatrix());
        
        // Toggle de tema
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
        
        // Hacer las celdas editables
        this.makeCellsEditable();
    }

    // Actualizar tamaño de matriz
    private updateMatrixSize(matrix: 'A' | 'B', event: Event): void {
        const rowsInput = document.getElementById(`rows${matrix}`) as HTMLInputElement;
        const colsInput = document.getElementById(`cols${matrix}`) as HTMLInputElement;
        
        const rows = parseInt(rowsInput.value) || 1;
        const cols = parseInt(colsInput.value) || 1;
        
        // Limitar tamaño máximo para mejor visualización
        const maxSize = 6;
        if (rows > maxSize) rowsInput.value = maxSize.toString();
        if (cols > maxSize) colsInput.value = maxSize.toString();
        
        const safeRows = Math.min(rows, maxSize);
        const safeCols = Math.min(cols, maxSize);
        
        if (matrix === 'A') {
            this.matrixA = this.createMatrix(safeRows, safeCols, 1);
        } else {
            this.matrixB = this.createMatrix(safeRows, safeCols, 2);
        }
        
        this.renderAllMatrices();
        this.updateDimensions();
    }

    // Aleatorizar matriz
    private randomizeMatrix(matrix: 'A' | 'B'): void {
        const targetMatrix = matrix === 'A' ? this.matrixA : this.matrixB;
        const rows = targetMatrix.length;
        const cols = targetMatrix[0].length;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                targetMatrix[i][j] = Math.floor(Math.random() * 20) - 10; // Valores entre -10 y 10
            }
        }
        
        this.renderAllMatrices();
        this.showNotification(`Matriz ${matrix} aleatorizada`);
    }

    // Reiniciar matrices
    private resetMatrices(): void {
        const rowsA = parseInt((document.getElementById('rowsA') as HTMLInputElement).value) || 3;
        const colsA = parseInt((document.getElementById('colsA') as HTMLInputElement).value) || 3;
        const rowsB = parseInt((document.getElementById('rowsB') as HTMLInputElement).value) || 3;
        const colsB = parseInt((document.getElementById('colsB') as HTMLInputElement).value) || 3;
        
        this.matrixA = this.createMatrix(rowsA, colsA, 1);
        this.matrixB = this.createMatrix(rowsB, colsB, 2);
        this.resultMatrix = this.createMatrix(rowsA, colsA, 0);
        
        this.renderAllMatrices();
        this.updateDimensions();
        this.showNotification('Matrices reiniciadas');
    }

    // Generar matrices identidad
    private generateIdentityMatrices(): void {
        const size = 3;
        this.matrixA = this.createIdentityMatrix(size);
        this.matrixB = this.createIdentityMatrix(size);
        
        (document.getElementById('rowsA') as HTMLInputElement).value = size.toString();
        (document.getElementById('colsA') as HTMLInputElement).value = size.toString();
        (document.getElementById('rowsB') as HTMLInputElement).value = size.toString();
        (document.getElementById('colsB') as HTMLInputElement).value = size.toString();
        
        this.renderAllMatrices();
        this.updateDimensions();
        this.showNotification('Matrices identidad generadas');
    }

    // Crear matriz identidad
    private createIdentityMatrix(size: number): Matrix {
        const matrix: Matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                matrix[i][j] = i === j ? 1 : 0;
            }
        }
        return matrix;
    }

    // Realizar operación
    private performOperation(operation: Operation): void {
        try {
            switch (operation) {
                case 'add':
                    this.resultMatrix = this.addMatrices(this.matrixA, this.matrixB);
                    this.showNotification('Matrices sumadas correctamente');
                    break;
                    
                case 'subtract':
                    this.resultMatrix = this.subtractMatrices(this.matrixA, this.matrixB);
                    this.showNotification('Matrices restadas correctamente');
                    break;
                    
                case 'multiply':
                    if (this.matrixA[0].length !== this.matrixB.length) {
                        throw new Error('Las dimensiones no son compatibles para multiplicación');
                    }
                    this.resultMatrix = this.multiplyMatrices(this.matrixA, this.matrixB);
                    this.showNotification('Matrices multiplicadas correctamente');
                    break;
            }
            
            this.renderResultMatrix();
            this.highlightResult();
        } catch (error) {
            this.showNotification(`Error: ${error instanceof Error ? error.message : 'Operación fallida'}`, true);
        }
    }

    // Sumar matrices
    private addMatrices(a: Matrix, b: Matrix): Matrix {
        if (a.length !== b.length || a[0].length !== b[0].length) {
            throw new Error('Las matrices deben tener las mismas dimensiones para sumar');
        }
        
        const result: Matrix = [];
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }

    // Restar matrices
    private subtractMatrices(a: Matrix, b: Matrix): Matrix {
        if (a.length !== b.length || a[0].length !== b[0].length) {
            throw new Error('Las matrices deben tener las mismas dimensiones para restar');
        }
        
        const result: Matrix = [];
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
        return result;
    }

    // Multiplicar matrices
    private multiplyMatrices(a: Matrix, b: Matrix): Matrix {
        const rowsA = a.length;
        const colsA = a[0].length;
        const colsB = b[0].length;
        
        const result: Matrix = [];
        for (let i = 0; i < rowsA; i++) {
            result[i] = [];
            for (let j = 0; j < colsB; j++) {
                result[i][j] = 0;
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    // Transponer matriz
    private transposeMatrix(matrix: 'A' | 'B'): void {
        const targetMatrix = matrix === 'A' ? this.matrixA : this.matrixB;
        const transposed: Matrix = [];
        
        for (let i = 0; i < targetMatrix[0].length; i++) {
            transposed[i] = [];
            for (let j = 0; j < targetMatrix.length; j++) {
                transposed[i][j] = targetMatrix[j][i];
            }
        }
        
        if (matrix === 'A') {
            this.matrixA = transposed;
        } else {
            this.matrixB = transposed;
        }
        
        // Actualizar dimensiones en inputs
        const rowsInput = document.getElementById(`rows${matrix}`) as HTMLInputElement;
        const colsInput = document.getElementById(`cols${matrix}`) as HTMLInputElement;
        
        rowsInput.value = transposed.length.toString();
        colsInput.value = transposed[0].length.toString();
        
        this.renderAllMatrices();
        this.updateDimensions();
        this.showNotification(`Matriz ${matrix} transpuesta`);
    }

    // Calcular determinante (solo para matrices 2x2 y 3x3)
    private calculateDeterminant(): void {
        if (this.matrixA.length !== this.matrixA[0].length) {
            this.showNotification('El determinante solo está definido para matrices cuadradas', true);
            return;
        }
        
        if (this.matrixA.length > 3) {
            this.showNotification('El determinante solo está implementado para matrices hasta 3x3', true);
            return;
        }
        
        let determinant = 0;
        
        if (this.matrixA.length === 2) {
            determinant = this.matrixA[0][0] * this.matrixA[1][1] - this.matrixA[0][1] * this.matrixA[1][0];
        } else if (this.matrixA.length === 3) {
            determinant = 
                this.matrixA[0][0] * (this.matrixA[1][1] * this.matrixA[2][2] - this.matrixA[1][2] * this.matrixA[2][1]) -
                this.matrixA[0][1] * (this.matrixA[1][0] * this.matrixA[2][2] - this.matrixA[1][2] * this.matrixA[2][0]) +
                this.matrixA[0][2] * (this.matrixA[1][0] * this.matrixA[2][1] - this.matrixA[1][1] * this.matrixA[2][0]);
        }
        
        this.showNotification(`Determinante de A = ${determinant.toFixed(2)}`);
    }

    // Escalar matriz
    private scaleMatrix(): void {
        this.scaleFactor = this.scaleFactor === 2 ? 0.5 : 2;
        
        const scaledA = this.matrixA.map(row => 
            row.map(value => value * this.scaleFactor)
        );
        
        this.resultMatrix = scaledA;
        this.renderResultMatrix();
        this.highlightResult();
        
        this.showNotification(`Matriz A escalada por ${this.scaleFactor}`);
    }

    // Renderizar todas las matrices
    private renderAllMatrices(): void {
        this.renderMatrix('matrixA', this.matrixA, 'a-cell');
        this.renderMatrix('matrixB', this.matrixB, 'b-cell');
        this.renderMatrix('matrixResult', this.resultMatrix, 'result-cell');
        this.updateDimensions();
    }

    // Renderizar una matriz específica
    private renderMatrix(containerId: string, matrix: Matrix, cellClass: string): void {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < matrix.length; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'matrix-row';
            
            for (let j = 0; j < matrix[i].length; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.className = `matrix-cell ${cellClass}`;
                cellDiv.dataset.row = i.toString();
                cellDiv.dataset.col = j.toString();
                cellDiv.dataset.matrix = containerId.replace('matrix', '');
                
                const valueSpan = document.createElement('span');
                valueSpan.className = 'cell-value';
                valueSpan.textContent = matrix[i][j].toString();
                valueSpan.contentEditable = 'true';
                
                const indexSpan = document.createElement('span');
                indexSpan.className = 'cell-index';
                indexSpan.textContent = `${i},${j}`;
                
                cellDiv.appendChild(valueSpan);
                cellDiv.appendChild(indexSpan);
                rowDiv.appendChild(cellDiv);
            }
            
            container.appendChild(rowDiv);
        }
        
        // Reconfigurar event listeners para celdas editables
        this.makeCellsEditable();
    }

    // Renderizar solo matriz resultado
    private renderResultMatrix(): void {
        this.renderMatrix('matrixResult', this.resultMatrix, 'result-cell');
        this.updateDimensions();
    }

    // Actualizar displays de dimensiones
    private updateDimensions(): void {
        const dimA = document.getElementById('dimensionsA');
        const dimB = document.getElementById('dimensionsB');
        const dimResult = document.getElementById('dimensionsResult');
        
        if (dimA) dimA.textContent = `${this.matrixA.length} × ${this.matrixA[0].length}`;
        if (dimB) dimB.textContent = `${this.matrixB.length} × ${this.matrixB[0].length}`;
        if (dimResult) dimResult.textContent = `${this.resultMatrix.length} × ${this.resultMatrix[0].length}`;
    }

    // Hacer celdas editables
    private makeCellsEditable(): void {
        document.querySelectorAll('.cell-value[contenteditable="true"]').forEach(cell => {
            cell.addEventListener('blur', (e) => {
                const target = e.target as HTMLElement;
                const cellDiv = target.closest('.matrix-cell') as HTMLElement;
                const row = parseInt(cellDiv.dataset.row || '0');
                const col = parseInt(cellDiv.dataset.col || '0');
                const matrix = cellDiv.dataset.matrix;
                
                const value = parseFloat(target.textContent || '0');
                
                if (matrix === 'A') {
                    this.matrixA[row][col] = value;
                } else if (matrix === 'B') {
                    this.matrixB[row][col] = value;
                }
            });
            
            // CORRECCIÓN: Especificar el tipo KeyboardEvent
            cell.addEventListener('keypress', (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                }
            });
        });
    }

    // Resaltar resultado con animación
    private highlightResult(): void {
        const resultCells = document.querySelectorAll('#matrixResult .matrix-cell');
        resultCells.forEach(cell => {
            cell.classList.add('highlight-animation');
            setTimeout(() => {
                cell.classList.remove('highlight-animation');
            }, 1500);
        });
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
        // Crear elemento de notificación
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
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Agregar estilos de animación si no existen
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
    new MatrixVisualizer();
});
