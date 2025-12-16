// Clase principal de la aplicación
var ArrayVisualizer = /** @class */ (function () {
    function ArrayVisualizer() {
        this.array = ['Manzana', 42, true, 'TypeScript', 7.5, false, 'Arreglo'];
        this.logEntries = [];
        this.initializeEventListeners();
        this.renderArray();
        this.updateArrayInfo();
        this.addLogEntry('Aplicación iniciada. Arreglo inicial creado.');
    }
    // Inicializa los event listeners para los controles
    ArrayVisualizer.prototype.initializeEventListeners = function () {
        var _this = this;
        var executeBtn = document.getElementById('executeOperation');
        var resetBtn = document.getElementById('resetArray');
        if (executeBtn)
            executeBtn.addEventListener('click', function () { return _this.executeOperation(); });
        if (resetBtn)
            resetBtn.addEventListener('click', function () { return _this.resetArray(); });
        // Permitir ejecutar con Enter en el campo de valor
        var elementValueInput = document.getElementById('elementValue');
        if (elementValueInput) {
            elementValueInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    _this.executeOperation();
                }
            });
        }
    };
    // Ejecuta la operación seleccionada
    ArrayVisualizer.prototype.executeOperation = function () {
        var operationSelect = document.getElementById('operation');
        var elementValueInput = document.getElementById('elementValue');
        var positionInput = document.getElementById('position');
        if (!operationSelect || !elementValueInput || !positionInput)
            return;
        var operation = operationSelect.value;
        var value = elementValueInput.value;
        var position = parseInt(positionInput.value) || 0;
        var operationDescription = '';
        try {
            switch (operation) {
                case 'push':
                    this.array.push(this.parseValue(value));
                    operationDescription = "push(".concat(this.formatValue(value), ") - Agregado al final");
                    break;
                case 'pop':
                    var popped = this.array.pop();
                    operationDescription = "pop() - Eliminado: ".concat(this.formatValue(popped ? popped.toString() : 'undefined'));
                    break;
                case 'unshift':
                    this.array.unshift(this.parseValue(value));
                    operationDescription = "unshift(".concat(this.formatValue(value), ") - Agregado al inicio");
                    break;
                case 'shift':
                    var shifted = this.array.shift();
                    operationDescription = "shift() - Eliminado: ".concat(this.formatValue(shifted ? shifted.toString() : 'undefined'));
                    break;
                case 'splice':
                    if (position >= 0 && position <= this.array.length) {
                        this.array.splice(position, 0, this.parseValue(value));
                        operationDescription = "splice(".concat(position, ", 0, ").concat(this.formatValue(value), ") - Insertado en posici\u00F3n ").concat(position);
                    }
                    else {
                        throw new Error('Posición inválida para splice');
                    }
                    break;
                case 'remove':
                    if (position >= 0 && position < this.array.length) {
                        var removed = this.array.splice(position, 1);
                        operationDescription = "splice(".concat(position, ", 1) - Eliminado: ").concat(this.formatValue(removed[0] ? removed[0].toString() : ''), " de posici\u00F3n ").concat(position);
                    }
                    else {
                        throw new Error('Posición inválida para eliminar');
                    }
                    break;
                case 'reverse':
                    this.array.reverse();
                    operationDescription = 'reverse() - Arreglo invertido';
                    break;
                case 'sort':
                    // Ordenar considerando diferentes tipos de datos
                    this.array.sort(function (a, b) {
                        if (typeof a === 'number' && typeof b === 'number')
                            return a - b;
                        if (typeof a === 'string' && typeof b === 'string')
                            return a.localeCompare(b);
                        if (typeof a === 'boolean' && typeof b === 'boolean')
                            return a === b ? 0 : a ? 1 : -1;
                        return String(a).localeCompare(String(b));
                    });
                    operationDescription = 'sort() - Arreglo ordenado';
                    break;
                case 'fill':
                    // Implementación manual de fill (compatible con ES5)
                    this.manualFill(this.parseValue(value));
                    operationDescription = "fill(".concat(this.formatValue(value), ") - Todos los elementos reemplazados");
                    break;
            }
            this.renderArray();
            this.updateArrayInfo();
            this.addLogEntry(operationDescription);
        }
        catch (error) {
            var errorMessage = error instanceof Error ? error.message : 'Operación fallida';
            this.addLogEntry("Error: ".concat(errorMessage));
        }
    };
    // Implementación manual de fill (compatible con ES5)
    ArrayVisualizer.prototype.manualFill = function (value) {
        for (var i = 0; i < this.array.length; i++) {
            this.array[i] = value;
        }
    };
    // Reinicia el arreglo a su estado inicial
    ArrayVisualizer.prototype.resetArray = function () {
        this.array = ['Manzana', 42, true, 'TypeScript', 7.5, false, 'Arreglo'];
        this.renderArray();
        this.updateArrayInfo();
        this.addLogEntry('Arreglo reiniciado a valores iniciales.');
    };
    // Parsea el valor de entrada según su tipo
    ArrayVisualizer.prototype.parseValue = function (value) {
        // Limpiar espacios en blanco
        var trimmedValue = value.trim();
        // Verificar si es booleano
        if (trimmedValue.toLowerCase() === 'true')
            return true;
        if (trimmedValue.toLowerCase() === 'false')
            return false;
        // Verificar si es número (incluyendo decimales)
        var num = Number(trimmedValue);
        if (!isNaN(num) && trimmedValue !== '') {
            return num;
        }
        // Por defecto, devuelve como string
        return trimmedValue || 'Nuevo elemento';
    };
    // Formatea un valor para mostrarlo
    ArrayVisualizer.prototype.formatValue = function (value) {
        var parsed = this.parseValue(value);
        if (typeof parsed === 'string') {
            return "\"".concat(parsed, "\"");
        }
        else if (typeof parsed === 'boolean') {
            return parsed ? 'true' : 'false';
        }
        else {
            return parsed.toString();
        }
    };
    // Renderiza el arreglo en la interfaz
    ArrayVisualizer.prototype.renderArray = function () {
        var arrayDisplay = document.getElementById('arrayDisplay');
        if (!arrayDisplay)
            return;
        arrayDisplay.innerHTML = '';
        for (var i = 0; i < this.array.length; i++) {
            var element = this.array[i];
            var elementDiv = document.createElement('div');
            elementDiv.className = 'array-element';
            // Determinar el tipo de elemento para mostrar un icono
            var icon = 'fas fa-question';
            if (typeof element === 'string')
                icon = 'fas fa-font';
            if (typeof element === 'number')
                icon = 'fas fa-hashtag';
            if (typeof element === 'boolean')
                icon = 'fas fa-check-circle';
            elementDiv.innerHTML = "\n                <i class=\"".concat(icon, "\"></i>\n                <span class=\"element-value\">").concat(element, "</span>\n                <span class=\"array-index\">[").concat(i, "]</span>\n            ");
            arrayDisplay.appendChild(elementDiv);
        }
        // Si el arreglo está vacío, mostrar un mensaje
        if (this.array.length === 0) {
            var emptyMessage = document.createElement('div');
            emptyMessage.textContent = 'Arreglo vacío';
            emptyMessage.style.color = '#a0a0c0';
            emptyMessage.style.fontStyle = 'italic';
            arrayDisplay.appendChild(emptyMessage);
        }
    };
    // Actualiza la información del arreglo
    ArrayVisualizer.prototype.updateArrayInfo = function () {
        var arrayLength = document.getElementById('arrayLength');
        var arrayType = document.getElementById('arrayType');
        var arrayElements = document.getElementById('arrayElements');
        if (!arrayLength || !arrayType || !arrayElements)
            return;
        arrayLength.textContent = this.array.length.toString();
        // Determinar el tipo de arreglo (versión compatible con ES5)
        var types = [];
        var seenTypes = {};
        for (var i = 0; i < this.array.length; i++) {
            var type = typeof this.array[i];
            types.push(type);
            seenTypes[type] = true;
        }
        var uniqueTypes = [];
        for (var typeKey in seenTypes) {
            if (seenTypes.hasOwnProperty(typeKey)) {
                uniqueTypes.push(typeKey);
            }
        }
        if (uniqueTypes.length === 1) {
            arrayType.textContent = "".concat(uniqueTypes[0], "[]");
        }
        else if (uniqueTypes.length > 1) {
            arrayType.textContent = "(string | number | boolean)[]";
        }
        else {
            arrayType.textContent = 'any[]';
        }
        // Mostrar elementos formateados
        var formattedElements = [];
        for (var i = 0; i < this.array.length; i++) {
            formattedElements.push(this.formatValue(this.array[i].toString()));
        }
        arrayElements.textContent = "[".concat(formattedElements.join(', '), "]");
    };
    // Formatea un número a dos dígitos (versión compatible con ES5)
    ArrayVisualizer.prototype.padNumber = function (num) {
        return num < 10 ? '0' + num : num.toString();
    };
    // Obtiene la hora actual formateada
    ArrayVisualizer.prototype.getFormattedTime = function () {
        var now = new Date();
        var hours = this.padNumber(now.getHours());
        var minutes = this.padNumber(now.getMinutes());
        var seconds = this.padNumber(now.getSeconds());
        return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
    };
    // Agrega una entrada al historial
    ArrayVisualizer.prototype.addLogEntry = function (message) {
        var timeString = this.getFormattedTime();
        var logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = "<span class=\"log-time\">".concat(timeString, "</span> ").concat(message);
        var logEntriesContainer = document.getElementById('logEntries');
        if (!logEntriesContainer)
            return;
        // Insertar al inicio (compatible con ES5)
        if (logEntriesContainer.firstChild) {
            logEntriesContainer.insertBefore(logEntry, logEntriesContainer.firstChild);
        }
        else {
            logEntriesContainer.appendChild(logEntry);
        }
        // Mantener solo las últimas 10 entradas
        while (logEntriesContainer.children.length > 10) {
            if (logEntriesContainer.lastChild) {
                logEntriesContainer.removeChild(logEntriesContainer.lastChild);
            }
        }
    };
    return ArrayVisualizer;
}());
// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    new ArrayVisualizer();
});
