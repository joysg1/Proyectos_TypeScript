// Aplicación educativa sobre shift() y unshift() en arreglos
// ArrayMethodsLab - Exploración de métodos de manipulación de arreglos
// Clase principal de la aplicación
var ArrayMethodsLab = /** @class */ (function () {
    function ArrayMethodsLab() {
        this.array = [];
        this.history = [];
        this.operationsLog = [];
        this.metrics = {
            shiftCount: 0,
            unshiftCount: 0,
            totalOperations: 0,
            averageTime: 0,
            maxItems: 0
        };
        this.currentId = 1;
        this.isAnimating = false;
        this.arrayContainer = document.getElementById('arrayContainer');
        this.historyContainer = document.getElementById('operationsHistory');
        this.shiftCountElement = document.getElementById('shiftCount');
        this.unshiftCountElement = document.getElementById('unshiftCount');
        this.totalOpsElement = document.getElementById('totalOperations');
        this.avgTimeElement = document.getElementById('averageTime');
        this.arrayLengthElement = document.getElementById('arrayLength');
        this.initializeArray();
        this.setupEventListeners();
        this.updateDisplay();
        this.initializeAnimations();
    }
    // Inicializa el arreglo con algunos elementos
    ArrayMethodsLab.prototype.initializeArray = function () {
        var _this = this;
        var initialItems = [
            { value: 'Primero', color: '#61dafb', icon: 'ellipse' },
            { value: 'Segundo', color: '#ff6b6b', icon: 'diamond' },
            { value: 'Tercero', color: '#ffd93d', icon: 'square' },
            { value: 'Cuarto', color: '#8b5cf6', icon: 'triangle' },
            { value: 'Quinto', color: '#00a8ff', icon: 'star' }
        ];
        initialItems.forEach(function (item, index) {
            _this.array.push({
                id: _this.currentId++,
                value: item.value,
                color: item.color,
                icon: item.icon,
                addedBy: 'initial',
                position: index
            });
        });
        this.metrics.maxItems = this.array.length;
        // Inicializar operaciones disponibles
        this.operationsLog = [
            {
                id: 1,
                name: 'shift()',
                description: 'Elimina el primer elemento del arreglo y lo devuelve',
                method: 'shift',
                complexity: 'O(1)',
                effect: 'Reduce la longitud del arreglo',
                icon: 'remove-outline',
                color: '#ff6b6b'
            },
            {
                id: 2,
                name: 'unshift()',
                description: 'Agrega uno o más elementos al inicio del arreglo',
                method: 'unshift',
                complexity: 'O(n)',
                effect: 'Aumenta la longitud del arreglo',
                icon: 'add-outline',
                color: '#61dafb'
            }
        ];
    };
    // Configura los event listeners
    ArrayMethodsLab.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        // Botones de operaciones
        (_a = document.getElementById('shiftBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.performShift(); });
        (_b = document.getElementById('unshiftBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.performUnshift(); });
        (_c = document.getElementById('resetBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.resetArray(); });
        (_d = document.getElementById('autoDemoBtn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.startAutoDemo(); });
        (_e = document.getElementById('addCustomBtn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return _this.addCustomItem(); });
        // Sliders para demo automática
        var speedSlider = document.getElementById('demoSpeed');
        var operationsSlider = document.getElementById('demoOperations');
        speedSlider === null || speedSlider === void 0 ? void 0 : speedSlider.addEventListener('input', function (e) {
            var value = e.target.value;
            document.getElementById('speedValue').textContent = "".concat(value, "ms");
        });
        operationsSlider === null || operationsSlider === void 0 ? void 0 : operationsSlider.addEventListener('input', function (e) {
            var value = e.target.value;
            document.getElementById('opsValue').textContent = value;
        });
        // Input para elemento personalizado
        var customInput = document.getElementById('customValue');
        customInput === null || customInput === void 0 ? void 0 : customInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                _this.addCustomItem();
            }
        });
    };
    // Realiza la operación shift
    ArrayMethodsLab.prototype.performShift = function () {
        if (this.isAnimating || this.array.length === 0)
            return;
        var startTime = performance.now();
        var removedItem = this.array.shift();
        var endTime = performance.now();
        if (removedItem) {
            // Actualizar métricas
            this.metrics.shiftCount++;
            this.metrics.totalOperations++;
            this.metrics.averageTime = ((this.metrics.averageTime * (this.metrics.totalOperations - 1)) + (endTime - startTime)) / this.metrics.totalOperations;
            // Registrar en el historial
            var historyEntry = "shift() \u2192 Eliminado: \"".concat(removedItem.value, "\"");
            this.history.unshift(historyEntry);
            // Actualizar posiciones de los elementos restantes
            this.array.forEach(function (item, index) {
                item.position = index;
            });
            // Actualizar visualización
            this.updateDisplay();
            this.animateOperation('shift', removedItem);
            // Mostrar notificación
            this.showNotification("shift(): Se elimin\u00F3 \"".concat(removedItem.value, "\" del inicio"), 'info');
        }
    };
    // Realiza la operación unshift
    ArrayMethodsLab.prototype.performUnshift = function () {
        if (this.isAnimating)
            return;
        var colors = ['#61dafb', '#ff6b6b', '#ffd93d', '#8b5cf6', '#00a8ff', '#10b981', '#f59e0b'];
        var icons = ['ellipse', 'diamond', 'square', 'triangle', 'star', 'heart', 'flash'];
        var values = ['Nuevo', 'Agregado', 'Insertado', 'Añadido', 'Elemento'];
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        var randomIcon = icons[Math.floor(Math.random() * icons.length)];
        var randomValue = "".concat(values[Math.floor(Math.random() * values.length)], " ").concat(this.currentId);
        var newItem = {
            id: this.currentId++,
            value: randomValue,
            color: randomColor,
            icon: randomIcon,
            addedBy: 'unshift',
            position: 0
        };
        var startTime = performance.now();
        this.array.unshift(newItem);
        var endTime = performance.now();
        // Actualizar posiciones de todos los elementos
        this.array.forEach(function (item, index) {
            item.position = index;
        });
        // Actualizar métricas
        this.metrics.unshiftCount++;
        this.metrics.totalOperations++;
        this.metrics.averageTime = ((this.metrics.averageTime * (this.metrics.totalOperations - 1)) + (endTime - startTime)) / this.metrics.totalOperations;
        this.metrics.maxItems = Math.max(this.metrics.maxItems, this.array.length);
        // Registrar en el historial
        var historyEntry = "unshift() \u2192 Agregado: \"".concat(newItem.value, "\"");
        this.history.unshift(historyEntry);
        // Actualizar visualización
        this.updateDisplay();
        this.animateOperation('unshift', newItem);
        // Mostrar notificación
        this.showNotification("unshift(): Se agreg\u00F3 \"".concat(newItem.value, "\" al inicio"), 'success');
    };
    // Agrega un elemento personalizado
    ArrayMethodsLab.prototype.addCustomItem = function () {
        var input = document.getElementById('customValue');
        var value = input.value.trim();
        if (!value) {
            this.showNotification('Por favor, ingresa un valor para el elemento', 'warning');
            return;
        }
        var colors = ['#61dafb', '#ff6b6b', '#ffd93d', '#8b5cf6', '#00a8ff'];
        var icons = ['ellipse', 'diamond', 'square', 'triangle', 'star'];
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        var randomIcon = icons[Math.floor(Math.random() * icons.length)];
        var newItem = {
            id: this.currentId++,
            value: value,
            color: randomColor,
            icon: randomIcon,
            addedBy: 'user',
            position: 0
        };
        var startTime = performance.now();
        this.array.unshift(newItem);
        var endTime = performance.now();
        // Actualizar posiciones de todos los elementos
        this.array.forEach(function (item, index) {
            item.position = index;
        });
        // Actualizar métricas
        this.metrics.unshiftCount++;
        this.metrics.totalOperations++;
        this.metrics.averageTime = ((this.metrics.averageTime * (this.metrics.totalOperations - 1)) + (endTime - startTime)) / this.metrics.totalOperations;
        this.metrics.maxItems = Math.max(this.metrics.maxItems, this.array.length);
        // Registrar en el historial
        var historyEntry = "unshift(\"".concat(value, "\") \u2192 Agregado por usuario");
        this.history.unshift(historyEntry);
        // Limpiar input
        input.value = '';
        // Actualizar visualización
        this.updateDisplay();
        this.animateOperation('unshift', newItem);
        // Mostrar notificación
        this.showNotification("Elemento personalizado \"".concat(value, "\" agregado al inicio"), 'success');
    };
    // Reinicia el arreglo a su estado inicial
    ArrayMethodsLab.prototype.resetArray = function () {
        this.array = [];
        this.history = [];
        this.currentId = 1;
        this.metrics = {
            shiftCount: 0,
            unshiftCount: 0,
            totalOperations: 0,
            averageTime: 0,
            maxItems: 0
        };
        this.initializeArray();
        this.updateDisplay();
        this.showNotification('Arreglo reiniciado a su estado inicial', 'info');
    };
    // Inicia una demostración automática
    ArrayMethodsLab.prototype.startAutoDemo = function () {
        var _this = this;
        if (this.isAnimating)
            return;
        var speedSlider = document.getElementById('demoSpeed');
        var operationsSlider = document.getElementById('demoOperations');
        var speed = parseInt(speedSlider.value);
        var totalOperations = parseInt(operationsSlider.value);
        var operationsPerformed = 0;
        this.isAnimating = true;
        var demoBtn = document.getElementById('autoDemoBtn');
        demoBtn.innerHTML = '<ion-icon name="stop-outline" class="mr-2 animate-spin"></ion-icon> Detener Demo';
        var demoInterval = setInterval(function () {
            if (operationsPerformed >= totalOperations) {
                clearInterval(demoInterval);
                _this.isAnimating = false;
                demoBtn.innerHTML = '<ion-icon name="play-outline" class="mr-2"></ion-icon> Demo Automática';
                _this.showNotification("Demo completada: ".concat(totalOperations, " operaciones realizadas"), 'success');
                return;
            }
            // Alternar entre shift y unshift
            if (_this.array.length === 0 || Math.random() > 0.5) {
                _this.performUnshift();
            }
            else {
                _this.performShift();
            }
            operationsPerformed++;
            // Actualizar contador de demo
            document.getElementById('demoProgress').textContent = "".concat(operationsPerformed, "/").concat(totalOperations);
        }, speed);
        // Cambiar el botón para detener la demo
        var stopDemo = function () {
            clearInterval(demoInterval);
            _this.isAnimating = false;
            demoBtn.innerHTML = '<ion-icon name="play-outline" class="mr-2"></ion-icon> Demo Automática';
            demoBtn.removeEventListener('click', stopDemo);
            demoBtn.addEventListener('click', function () { return _this.startAutoDemo(); });
        };
        demoBtn.removeEventListener('click', function () { return _this.startAutoDemo(); });
        demoBtn.addEventListener('click', stopDemo);
    };
    // Actualiza la visualización del arreglo
    ArrayMethodsLab.prototype.updateDisplay = function () {
        var _this = this;
        if (!this.arrayContainer || !this.historyContainer)
            return;
        // Actualizar visualización del arreglo
        this.arrayContainer.innerHTML = '';
        this.array.forEach(function (item, index) {
            var itemElement = document.createElement('div');
            itemElement.className = "array-item flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl relative";
            itemElement.style.backgroundColor = "".concat(item.color, "20");
            itemElement.style.border = "2px solid ".concat(item.color, "40");
            itemElement.style.minWidth = '120px';
            itemElement.innerHTML = "\n        <div class=\"absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm\" style=\"background: ".concat(item.color, "\">\n          ").concat(index, "\n        </div>\n        <div class=\"text-3xl mb-2\" style=\"color: ").concat(item.color, "\">\n          <ion-icon name=\"").concat(item.icon, "-outline\"></ion-icon>\n        </div>\n        <div class=\"font-bold text-center mb-1\">").concat(item.value, "</div>\n        <div class=\"text-xs text-text-secondary text-center\">ID: ").concat(item.id, "</div>\n        ").concat(item.addedBy === 'user' ?
                '<div class="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">Usuario</div>' :
                '', "\n      ");
            _this.arrayContainer.appendChild(itemElement);
        });
        // Actualizar historial de operaciones
        this.historyContainer.innerHTML = '';
        this.history.slice(0, 10).forEach(function (entry) {
            var entryElement = document.createElement('div');
            entryElement.className = 'history-entry p-3 bg-gray-900/30 rounded-lg mb-2 text-sm border-l-4';
            // Usar indexOf en lugar de includes para compatibilidad
            if (entry.indexOf('shift()') !== -1) {
                entryElement.style.borderLeftColor = '#ff6b6b';
                entryElement.innerHTML = "<span class=\"text-react-accent-secondary\">".concat(entry, "</span>");
            }
            else {
                entryElement.style.borderLeftColor = '#61dafb';
                entryElement.innerHTML = "<span class=\"text-react-accent\">".concat(entry, "</span>");
            }
            _this.historyContainer.appendChild(entryElement);
        });
        // Actualizar métricas
        if (this.shiftCountElement) {
            this.shiftCountElement.textContent = this.metrics.shiftCount.toString();
        }
        if (this.unshiftCountElement) {
            this.unshiftCountElement.textContent = this.metrics.unshiftCount.toString();
        }
        if (this.totalOpsElement) {
            this.totalOpsElement.textContent = this.metrics.totalOperations.toString();
        }
        if (this.avgTimeElement) {
            this.avgTimeElement.textContent = this.metrics.averageTime.toFixed(2);
        }
        if (this.arrayLengthElement) {
            this.arrayLengthElement.textContent = this.array.length.toString();
        }
        // Actualizar barra de longitud
        var lengthBar = document.getElementById('arrayLengthBar');
        if (lengthBar) {
            var percentage = (this.array.length / Math.max(this.metrics.maxItems, 10)) * 100;
            lengthBar.style.width = "".concat(percentage, "%");
        }
        // Actualizar estado de botones
        var shiftBtn = document.getElementById('shiftBtn');
        if (shiftBtn) {
            shiftBtn.disabled = this.array.length === 0;
        }
    };
    // Anima una operación
    ArrayMethodsLab.prototype.animateOperation = function (operation, item) {
        var animationContainer = document.getElementById('animationContainer');
        if (!animationContainer)
            return;
        var animationElement = document.createElement('div');
        animationElement.className = "operation-animation fixed z-50 flex items-center justify-center";
        animationElement.style.color = item.color;
        if (operation === 'shift') {
            animationElement.innerHTML = "\n        <div class=\"flex items-center bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border-2 shadow-2xl\" style=\"border-color: ".concat(item.color, "\">\n          <ion-icon name=\"arrow-forward-outline\" class=\"text-2xl mr-2\"></ion-icon>\n          <div class=\"text-lg font-bold\">shift() \u2192 \"").concat(item.value, "\"</div>\n          <ion-icon name=\"exit-outline\" class=\"text-2xl ml-2\"></ion-icon>\n        </div>\n      ");
            animationElement.style.left = '50%';
            animationElement.style.top = '50%';
            animationElement.style.transform = 'translate(-50%, -50%) scale(0.5)';
            animationElement.style.opacity = '0';
            // Animación de salida
            setTimeout(function () {
                animationElement.style.transition = 'all 0.5s ease-out';
                animationElement.style.transform = 'translate(-50%, -50%) scale(1)';
                animationElement.style.opacity = '1';
            }, 10);
            setTimeout(function () {
                animationElement.style.transition = 'all 0.5s ease-in';
                animationElement.style.transform = 'translate(-150%, -50%) scale(0.5)';
                animationElement.style.opacity = '0';
            }, 1000);
            setTimeout(function () {
                animationElement.remove();
            }, 1500);
        }
        else {
            animationElement.innerHTML = "\n        <div class=\"flex items-center bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border-2 shadow-2xl\" style=\"border-color: ".concat(item.color, "\">\n          <ion-icon name=\"arrow-back-outline\" class=\"text-2xl mr-2\"></ion-icon>\n          <div class=\"text-lg font-bold\">unshift() \u2192 \"").concat(item.value, "\"</div>\n          <ion-icon name=\"enter-outline\" class=\"text-2xl ml-2\"></ion-icon>\n        </div>\n      ");
            animationElement.style.right = '50%';
            animationElement.style.top = '50%';
            animationElement.style.transform = 'translate(50%, -50%) scale(0.5)';
            animationElement.style.opacity = '0';
            // Animación de entrada
            setTimeout(function () {
                animationElement.style.transition = 'all 0.5s ease-out';
                animationElement.style.transform = 'translate(50%, -50%) scale(1)';
                animationElement.style.opacity = '1';
            }, 10);
            setTimeout(function () {
                animationElement.style.transition = 'all 0.5s ease-in';
                animationElement.style.transform = 'translate(50%, -50%) scale(0.5)';
                animationElement.style.opacity = '0';
            }, 1000);
            setTimeout(function () {
                animationElement.remove();
            }, 1500);
        }
        animationContainer.appendChild(animationElement);
    };
    // Inicializa animaciones de fondo
    ArrayMethodsLab.prototype.initializeAnimations = function () {
        this.createArrayVisualization();
    };
    // Crea visualización de arreglo en canvas
    ArrayMethodsLab.prototype.createArrayVisualization = function () {
        var _this = this;
        var canvas = document.getElementById('arrayCanvas');
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        var resizeCanvas = function () {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            _this.drawArrayVisualization(ctx);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        // Animar la visualización
        var animate = function () {
            _this.drawArrayVisualization(ctx);
            requestAnimationFrame(animate);
        };
        animate();
    };
    // Función auxiliar para dibujar rectángulos redondeados en canvas
    ArrayMethodsLab.prototype.drawRoundedRect = function (ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    };
    // Dibuja la visualización del arreglo en canvas
    ArrayMethodsLab.prototype.drawArrayVisualization = function (ctx) {
        var _this = this;
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        // Limpiar canvas
        ctx.clearRect(0, 0, width, height);
        // Dibujar fondo
        var gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
        gradient.addColorStop(0, 'rgba(10, 10, 18, 0.1)');
        gradient.addColorStop(1, 'rgba(26, 26, 46, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        // Dibujar elementos del arreglo como cajas conectadas
        var boxWidth = 80;
        var boxHeight = 60;
        var startX = width / 2 - (this.array.length * boxWidth) / 2;
        var startY = height / 2;
        // Dibujar conexiones
        ctx.strokeStyle = 'rgba(97, 218, 251, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        for (var i = 0; i < this.array.length - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(startX + i * boxWidth + boxWidth, startY);
            ctx.lineTo(startX + (i + 1) * boxWidth, startY);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        // Dibujar cajas
        this.array.forEach(function (item, index) {
            var x = startX + index * boxWidth;
            var y = startY - boxHeight / 2;
            // Dibujar caja con bordes redondeados
            ctx.fillStyle = "".concat(item.color, "30");
            ctx.strokeStyle = item.color;
            ctx.lineWidth = 2;
            _this.drawRoundedRect(ctx, x, y, boxWidth, boxHeight, 8);
            ctx.fill();
            ctx.stroke();
            // Dibujar índice
            ctx.fillStyle = item.color;
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(index.toString(), x + boxWidth / 2, y - 10);
            // Dibujar valor
            ctx.fillStyle = '#f8fafc';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(item.value, x + boxWidth / 2, y + boxHeight / 2 + 5);
            // Dibujar flecha para shift/unshift
            if (index === 0) {
                // Flecha para shift (izquierda)
                ctx.fillStyle = '#ff6b6b';
                ctx.beginPath();
                ctx.moveTo(x - 20, y + boxHeight / 2);
                ctx.lineTo(x - 10, y + boxHeight / 2 - 5);
                ctx.lineTo(x - 10, y + boxHeight / 2 + 5);
                ctx.closePath();
                ctx.fill();
                // Flecha para unshift (derecha, invertida)
                ctx.fillStyle = '#61dafb';
                ctx.beginPath();
                ctx.moveTo(x - 15, y + boxHeight / 2);
                ctx.lineTo(x - 25, y + boxHeight / 2 - 5);
                ctx.lineTo(x - 25, y + boxHeight / 2 + 5);
                ctx.closePath();
                ctx.fill();
            }
        });
        // Dibujar etiquetas
        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('shift() →', startX - 100, startY + 5);
        ctx.fillStyle = '#61dafb';
        ctx.textAlign = 'right';
        ctx.fillText('← unshift()', startX + this.array.length * boxWidth + 100, startY + 5);
    };
    // Muestra una notificación
    ArrayMethodsLab.prototype.showNotification = function (message, type) {
        var notification = document.createElement('div');
        var colors = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'warning': 'bg-yellow-500',
            'info': 'bg-blue-500'
        };
        notification.className = "fixed top-4 right-4 ".concat(colors[type], " text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full");
        // Determinar el icono basado en el tipo
        var iconName = '';
        switch (type) {
            case 'success':
                iconName = 'checkmark-circle-outline';
                break;
            case 'error':
                iconName = 'close-circle-outline';
                break;
            case 'warning':
                iconName = 'warning-outline';
                break;
            case 'info':
                iconName = 'information-circle-outline';
                break;
        }
        notification.innerHTML = "\n      <div class=\"flex items-center\">\n        <ion-icon name=\"".concat(iconName, "\" class=\"mr-2\"></ion-icon>\n        <span>").concat(message, "</span>\n      </div>\n    ");
        document.body.appendChild(notification);
        // Animar entrada
        setTimeout(function () {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 10);
        // Eliminar después de 3 segundos
        setTimeout(function () {
            notification.classList.remove('translate-x-0');
            notification.classList.add('translate-x-full');
            setTimeout(function () {
                notification.remove();
            }, 300);
        }, 3000);
    };
    return ArrayMethodsLab;
}());
// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    console.log('ArrayMethodsLab: Inicializando aplicación...');
    // Verificar si Canvas API está disponible
    if (!HTMLCanvasElement.prototype.getContext) {
        console.error('Canvas no está soportado en este navegador');
        return;
    }
    // Inicializar la aplicación
    var app = new ArrayMethodsLab();
    console.log('ArrayMethodsLab inicializado correctamente');
});
