// Clase principal de la aplicación
var MatrixVisualizer = /** @class */ (function () {
    function MatrixVisualizer() {
        this.scaleFactor = 2;
        this.isLightMode = false;
        // Inicializar matrices 3x3 con valores por defecto
        this.matrixA = this.createMatrix(3, 3, 1);
        this.matrixB = this.createMatrix(3, 3, 2);
        this.resultMatrix = this.createMatrix(3, 3, 0);
        this.initializeEventListeners();
        this.renderAllMatrices();
        this.updateDimensions();
    }
    // Crear una matriz con valores específicos
    MatrixVisualizer.prototype.createMatrix = function (rows, cols, baseValue) {
        if (baseValue === void 0) { baseValue = 0; }
        var matrix = [];
        for (var i = 0; i < rows; i++) {
            matrix[i] = [];
            for (var j = 0; j < cols; j++) {
                matrix[i][j] = baseValue === 0 ? 0 : baseValue * (i + 1) + (j + 1);
            }
        }
        return matrix;
    };
    // Inicializar todos los event listeners
    MatrixVisualizer.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        // Controles de dimensión
        (_a = document.getElementById('rowsA')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (e) { return _this.updateMatrixSize('A', e); });
        (_b = document.getElementById('colsA')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', function (e) { return _this.updateMatrixSize('A', e); });
        (_c = document.getElementById('rowsB')) === null || _c === void 0 ? void 0 : _c.addEventListener('input', function (e) { return _this.updateMatrixSize('B', e); });
        (_d = document.getElementById('colsB')) === null || _d === void 0 ? void 0 : _d.addEventListener('input', function (e) { return _this.updateMatrixSize('B', e); });
        // Botones de aleatorización
        (_e = document.getElementById('randomizeA')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return _this.randomizeMatrix('A'); });
        (_f = document.getElementById('randomizeB')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () { return _this.randomizeMatrix('B'); });
        // Botones de acción
        (_g = document.getElementById('resetMatrices')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () { return _this.resetMatrices(); });
        (_h = document.getElementById('generateIdentities')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', function () { return _this.generateIdentityMatrices(); });
        // Operaciones matriciales
        (_j = document.getElementById('addMatrices')) === null || _j === void 0 ? void 0 : _j.addEventListener('click', function () { return _this.performOperation('add'); });
        (_k = document.getElementById('subtractMatrices')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', function () { return _this.performOperation('subtract'); });
        (_l = document.getElementById('multiplyMatrices')) === null || _l === void 0 ? void 0 : _l.addEventListener('click', function () { return _this.performOperation('multiply'); });
        (_m = document.getElementById('transposeA')) === null || _m === void 0 ? void 0 : _m.addEventListener('click', function () { return _this.transposeMatrix('A'); });
        (_o = document.getElementById('determinantA')) === null || _o === void 0 ? void 0 : _o.addEventListener('click', function () { return _this.calculateDeterminant(); });
        (_p = document.getElementById('scaleMatrix')) === null || _p === void 0 ? void 0 : _p.addEventListener('click', function () { return _this.scaleMatrix(); });
        // Toggle de tema
        (_q = document.getElementById('themeToggle')) === null || _q === void 0 ? void 0 : _q.addEventListener('click', function () { return _this.toggleTheme(); });
        // Hacer las celdas editables
        this.makeCellsEditable();
    };
    // Actualizar tamaño de matriz
    MatrixVisualizer.prototype.updateMatrixSize = function (matrix, event) {
        var rowsInput = document.getElementById("rows".concat(matrix));
        var colsInput = document.getElementById("cols".concat(matrix));
        var rows = parseInt(rowsInput.value) || 1;
        var cols = parseInt(colsInput.value) || 1;
        // Limitar tamaño máximo para mejor visualización
        var maxSize = 6;
        if (rows > maxSize)
            rowsInput.value = maxSize.toString();
        if (cols > maxSize)
            colsInput.value = maxSize.toString();
        var safeRows = Math.min(rows, maxSize);
        var safeCols = Math.min(cols, maxSize);
        if (matrix === 'A') {
            this.matrixA = this.createMatrix(safeRows, safeCols, 1);
        }
        else {
            this.matrixB = this.createMatrix(safeRows, safeCols, 2);
        }
        this.renderAllMatrices();
        this.updateDimensions();
    };
    // Aleatorizar matriz
    MatrixVisualizer.prototype.randomizeMatrix = function (matrix) {
        var targetMatrix = matrix === 'A' ? this.matrixA : this.matrixB;
        var rows = targetMatrix.length;
        var cols = targetMatrix[0].length;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                targetMatrix[i][j] = Math.floor(Math.random() * 20) - 10; // Valores entre -10 y 10
            }
        }
        this.renderAllMatrices();
        this.showNotification("Matriz ".concat(matrix, " aleatorizada"));
    };
    // Reiniciar matrices
    MatrixVisualizer.prototype.resetMatrices = function () {
        var rowsA = parseInt(document.getElementById('rowsA').value) || 3;
        var colsA = parseInt(document.getElementById('colsA').value) || 3;
        var rowsB = parseInt(document.getElementById('rowsB').value) || 3;
        var colsB = parseInt(document.getElementById('colsB').value) || 3;
        this.matrixA = this.createMatrix(rowsA, colsA, 1);
        this.matrixB = this.createMatrix(rowsB, colsB, 2);
        this.resultMatrix = this.createMatrix(rowsA, colsA, 0);
        this.renderAllMatrices();
        this.updateDimensions();
        this.showNotification('Matrices reiniciadas');
    };
    // Generar matrices identidad
    MatrixVisualizer.prototype.generateIdentityMatrices = function () {
        var size = 3;
        this.matrixA = this.createIdentityMatrix(size);
        this.matrixB = this.createIdentityMatrix(size);
        document.getElementById('rowsA').value = size.toString();
        document.getElementById('colsA').value = size.toString();
        document.getElementById('rowsB').value = size.toString();
        document.getElementById('colsB').value = size.toString();
        this.renderAllMatrices();
        this.updateDimensions();
        this.showNotification('Matrices identidad generadas');
    };
    // Crear matriz identidad
    MatrixVisualizer.prototype.createIdentityMatrix = function (size) {
        var matrix = [];
        for (var i = 0; i < size; i++) {
            matrix[i] = [];
            for (var j = 0; j < size; j++) {
                matrix[i][j] = i === j ? 1 : 0;
            }
        }
        return matrix;
    };
    // Realizar operación
    MatrixVisualizer.prototype.performOperation = function (operation) {
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
        }
        catch (error) {
            this.showNotification("Error: ".concat(error instanceof Error ? error.message : 'Operación fallida'), true);
        }
    };
    // Sumar matrices
    MatrixVisualizer.prototype.addMatrices = function (a, b) {
        if (a.length !== b.length || a[0].length !== b[0].length) {
            throw new Error('Las matrices deben tener las mismas dimensiones para sumar');
        }
        var result = [];
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    };
    // Restar matrices
    MatrixVisualizer.prototype.subtractMatrices = function (a, b) {
        if (a.length !== b.length || a[0].length !== b[0].length) {
            throw new Error('Las matrices deben tener las mismas dimensiones para restar');
        }
        var result = [];
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
        return result;
    };
    // Multiplicar matrices
    MatrixVisualizer.prototype.multiplyMatrices = function (a, b) {
        var rowsA = a.length;
        var colsA = a[0].length;
        var colsB = b[0].length;
        var result = [];
        for (var i = 0; i < rowsA; i++) {
            result[i] = [];
            for (var j = 0; j < colsB; j++) {
                result[i][j] = 0;
                for (var k = 0; k < colsA; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    };
    // Transponer matriz
    MatrixVisualizer.prototype.transposeMatrix = function (matrix) {
        var targetMatrix = matrix === 'A' ? this.matrixA : this.matrixB;
        var transposed = [];
        for (var i = 0; i < targetMatrix[0].length; i++) {
            transposed[i] = [];
            for (var j = 0; j < targetMatrix.length; j++) {
                transposed[i][j] = targetMatrix[j][i];
            }
        }
        if (matrix === 'A') {
            this.matrixA = transposed;
        }
        else {
            this.matrixB = transposed;
        }
        // Actualizar dimensiones en inputs
        var rowsInput = document.getElementById("rows".concat(matrix));
        var colsInput = document.getElementById("cols".concat(matrix));
        rowsInput.value = transposed.length.toString();
        colsInput.value = transposed[0].length.toString();
        this.renderAllMatrices();
        this.updateDimensions();
        this.showNotification("Matriz ".concat(matrix, " transpuesta"));
    };
    // Calcular determinante (solo para matrices 2x2 y 3x3)
    MatrixVisualizer.prototype.calculateDeterminant = function () {
        if (this.matrixA.length !== this.matrixA[0].length) {
            this.showNotification('El determinante solo está definido para matrices cuadradas', true);
            return;
        }
        if (this.matrixA.length > 3) {
            this.showNotification('El determinante solo está implementado para matrices hasta 3x3', true);
            return;
        }
        var determinant = 0;
        if (this.matrixA.length === 2) {
            determinant = this.matrixA[0][0] * this.matrixA[1][1] - this.matrixA[0][1] * this.matrixA[1][0];
        }
        else if (this.matrixA.length === 3) {
            determinant =
                this.matrixA[0][0] * (this.matrixA[1][1] * this.matrixA[2][2] - this.matrixA[1][2] * this.matrixA[2][1]) -
                    this.matrixA[0][1] * (this.matrixA[1][0] * this.matrixA[2][2] - this.matrixA[1][2] * this.matrixA[2][0]) +
                    this.matrixA[0][2] * (this.matrixA[1][0] * this.matrixA[2][1] - this.matrixA[1][1] * this.matrixA[2][0]);
        }
        this.showNotification("Determinante de A = ".concat(determinant.toFixed(2)));
    };
    // Escalar matriz
    MatrixVisualizer.prototype.scaleMatrix = function () {
        var _this = this;
        this.scaleFactor = this.scaleFactor === 2 ? 0.5 : 2;
        var scaledA = this.matrixA.map(function (row) {
            return row.map(function (value) { return value * _this.scaleFactor; });
        });
        this.resultMatrix = scaledA;
        this.renderResultMatrix();
        this.highlightResult();
        this.showNotification("Matriz A escalada por ".concat(this.scaleFactor));
    };
    // Renderizar todas las matrices
    MatrixVisualizer.prototype.renderAllMatrices = function () {
        this.renderMatrix('matrixA', this.matrixA, 'a-cell');
        this.renderMatrix('matrixB', this.matrixB, 'b-cell');
        this.renderMatrix('matrixResult', this.resultMatrix, 'result-cell');
        this.updateDimensions();
    };
    // Renderizar una matriz específica
    MatrixVisualizer.prototype.renderMatrix = function (containerId, matrix, cellClass) {
        var container = document.getElementById(containerId);
        if (!container)
            return;
        container.innerHTML = '';
        for (var i = 0; i < matrix.length; i++) {
            var rowDiv = document.createElement('div');
            rowDiv.className = 'matrix-row';
            for (var j = 0; j < matrix[i].length; j++) {
                var cellDiv = document.createElement('div');
                cellDiv.className = "matrix-cell ".concat(cellClass);
                cellDiv.dataset.row = i.toString();
                cellDiv.dataset.col = j.toString();
                cellDiv.dataset.matrix = containerId.replace('matrix', '');
                var valueSpan = document.createElement('span');
                valueSpan.className = 'cell-value';
                valueSpan.textContent = matrix[i][j].toString();
                valueSpan.contentEditable = 'true';
                var indexSpan = document.createElement('span');
                indexSpan.className = 'cell-index';
                indexSpan.textContent = "".concat(i, ",").concat(j);
                cellDiv.appendChild(valueSpan);
                cellDiv.appendChild(indexSpan);
                rowDiv.appendChild(cellDiv);
            }
            container.appendChild(rowDiv);
        }
        // Reconfigurar event listeners para celdas editables
        this.makeCellsEditable();
    };
    // Renderizar solo matriz resultado
    MatrixVisualizer.prototype.renderResultMatrix = function () {
        this.renderMatrix('matrixResult', this.resultMatrix, 'result-cell');
        this.updateDimensions();
    };
    // Actualizar displays de dimensiones
    MatrixVisualizer.prototype.updateDimensions = function () {
        var dimA = document.getElementById('dimensionsA');
        var dimB = document.getElementById('dimensionsB');
        var dimResult = document.getElementById('dimensionsResult');
        if (dimA)
            dimA.textContent = "".concat(this.matrixA.length, " \u00D7 ").concat(this.matrixA[0].length);
        if (dimB)
            dimB.textContent = "".concat(this.matrixB.length, " \u00D7 ").concat(this.matrixB[0].length);
        if (dimResult)
            dimResult.textContent = "".concat(this.resultMatrix.length, " \u00D7 ").concat(this.resultMatrix[0].length);
    };
    // Hacer celdas editables
    MatrixVisualizer.prototype.makeCellsEditable = function () {
        var _this = this;
        document.querySelectorAll('.cell-value[contenteditable="true"]').forEach(function (cell) {
            cell.addEventListener('blur', function (e) {
                var target = e.target;
                var cellDiv = target.closest('.matrix-cell');
                var row = parseInt(cellDiv.dataset.row || '0');
                var col = parseInt(cellDiv.dataset.col || '0');
                var matrix = cellDiv.dataset.matrix;
                var value = parseFloat(target.textContent || '0');
                if (matrix === 'A') {
                    _this.matrixA[row][col] = value;
                }
                else if (matrix === 'B') {
                    _this.matrixB[row][col] = value;
                }
            });
            // CORRECCIÓN: Especificar el tipo KeyboardEvent
            cell.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                }
            });
        });
    };
    // Resaltar resultado con animación
    MatrixVisualizer.prototype.highlightResult = function () {
        var resultCells = document.querySelectorAll('#matrixResult .matrix-cell');
        resultCells.forEach(function (cell) {
            cell.classList.add('highlight-animation');
            setTimeout(function () {
                cell.classList.remove('highlight-animation');
            }, 1500);
        });
    };
    // Alternar tema claro/oscuro
    MatrixVisualizer.prototype.toggleTheme = function () {
        this.isLightMode = !this.isLightMode;
        document.body.classList.toggle('light-mode', this.isLightMode);
        var themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.isLightMode ? 'fas fa-sun' : 'fas fa-moon';
        }
        this.showNotification("Tema ".concat(this.isLightMode ? 'claro' : 'oscuro', " activado"));
    };
    // Mostrar notificación
    MatrixVisualizer.prototype.showNotification = function (message, isError) {
        if (isError === void 0) { isError = false; }
        // Crear elemento de notificación
        var notification = document.createElement('div');
        notification.className = "notification ".concat(isError ? 'error' : 'success');
        notification.textContent = message;
        notification.style.cssText = "\n            position: fixed;\n            top: 20px;\n            right: 20px;\n            padding: 15px 25px;\n            border-radius: 10px;\n            background: ".concat(isError ? '#ef4444' : '#10b981', ";\n            color: white;\n            font-weight: bold;\n            z-index: 1000;\n            animation: slideIn 0.3s ease;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.3);\n        ");
        document.body.appendChild(notification);
        // Remover después de 3 segundos
        setTimeout(function () {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(function () {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        // Agregar estilos de animación si no existen
        if (!document.querySelector('#notification-styles')) {
            var style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = "\n                @keyframes slideIn {\n                    from { transform: translateX(100%); opacity: 0; }\n                    to { transform: translateX(0); opacity: 1; }\n                }\n                @keyframes slideOut {\n                    from { transform: translateX(0); opacity: 1; }\n                    to { transform: translateX(100%); opacity: 0; }\n                }\n            ";
            document.head.appendChild(style);
        }
    };
    return MatrixVisualizer;
}());
// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    new MatrixVisualizer();
});
