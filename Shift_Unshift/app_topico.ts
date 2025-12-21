// Aplicación educativa sobre shift() y unshift() en arreglos
// ArrayMethodsLab - Exploración de métodos de manipulación de arreglos

// Tipos y interfaces
interface ArrayOperation {
  id: number;
  name: string;
  description: string;
  method: 'shift' | 'unshift';
  complexity: 'O(1)' | 'O(n)';
  effect: string;
  icon: string;
  color: string;
}

interface ArrayItem {
  id: number;
  value: string;
  color: string;
  icon: string;
  addedBy?: 'unshift' | 'initial' | 'user';
  position: number;
}

interface PerformanceMetrics {
  shiftCount: number;
  unshiftCount: number;
  totalOperations: number;
  averageTime: number;
  maxItems: number;
}

// Clase principal de la aplicación
class ArrayMethodsLab {
  private array: ArrayItem[];
  private history: string[];
  private operationsLog: ArrayOperation[];
  private metrics: PerformanceMetrics;
  private currentId: number;
  private isAnimating: boolean;
  
  // Elementos DOM
  private arrayContainer: HTMLElement | null;
  private historyContainer: HTMLElement | null;
  private shiftCountElement: HTMLElement | null;
  private unshiftCountElement: HTMLElement | null;
  private totalOpsElement: HTMLElement | null;
  private avgTimeElement: HTMLElement | null;
  private arrayLengthElement: HTMLElement | null;
  
  constructor() {
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
  private initializeArray(): void {
    const initialItems = [
      { value: 'Primero', color: '#61dafb', icon: 'ellipse' },
      { value: 'Segundo', color: '#ff6b6b', icon: 'diamond' },
      { value: 'Tercero', color: '#ffd93d', icon: 'square' },
      { value: 'Cuarto', color: '#8b5cf6', icon: 'triangle' },
      { value: 'Quinto', color: '#00a8ff', icon: 'star' }
    ];
    
    initialItems.forEach((item, index) => {
      this.array.push({
        id: this.currentId++,
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
  }
  
  // Configura los event listeners
  private setupEventListeners(): void {
    // Botones de operaciones
    document.getElementById('shiftBtn')?.addEventListener('click', () => this.performShift());
    document.getElementById('unshiftBtn')?.addEventListener('click', () => this.performUnshift());
    document.getElementById('resetBtn')?.addEventListener('click', () => this.resetArray());
    document.getElementById('autoDemoBtn')?.addEventListener('click', () => this.startAutoDemo());
    document.getElementById('addCustomBtn')?.addEventListener('click', () => this.addCustomItem());
    
    // Sliders para demo automática
    const speedSlider = document.getElementById('demoSpeed') as HTMLInputElement;
    const operationsSlider = document.getElementById('demoOperations') as HTMLInputElement;
    
    speedSlider?.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;
      document.getElementById('speedValue')!.textContent = `${value}ms`;
    });
    
    operationsSlider?.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;
      document.getElementById('opsValue')!.textContent = value;
    });
    
    // Input para elemento personalizado
    const customInput = document.getElementById('customValue') as HTMLInputElement;
    customInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addCustomItem();
      }
    });
  }
  
  // Realiza la operación shift
  private performShift(): void {
    if (this.isAnimating || this.array.length === 0) return;
    
    const startTime = performance.now();
    const removedItem = this.array.shift();
    const endTime = performance.now();
    
    if (removedItem) {
      // Actualizar métricas
      this.metrics.shiftCount++;
      this.metrics.totalOperations++;
      this.metrics.averageTime = ((this.metrics.averageTime * (this.metrics.totalOperations - 1)) + (endTime - startTime)) / this.metrics.totalOperations;
      
      // Registrar en el historial
      const historyEntry = `shift() → Eliminado: "${removedItem.value}"`;
      this.history.unshift(historyEntry);
      
      // Actualizar posiciones de los elementos restantes
      this.array.forEach((item, index) => {
        item.position = index;
      });
      
      // Actualizar visualización
      this.updateDisplay();
      this.animateOperation('shift', removedItem);
      
      // Mostrar notificación
      this.showNotification(`shift(): Se eliminó "${removedItem.value}" del inicio`, 'info');
    }
  }
  
  // Realiza la operación unshift
  private performUnshift(): void {
    if (this.isAnimating) return;
    
    const colors = ['#61dafb', '#ff6b6b', '#ffd93d', '#8b5cf6', '#00a8ff', '#10b981', '#f59e0b'];
    const icons = ['ellipse', 'diamond', 'square', 'triangle', 'star', 'heart', 'flash'];
    const values = ['Nuevo', 'Agregado', 'Insertado', 'Añadido', 'Elemento'];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomValue = `${values[Math.floor(Math.random() * values.length)]} ${this.currentId}`;
    
    const newItem: ArrayItem = {
      id: this.currentId++,
      value: randomValue,
      color: randomColor,
      icon: randomIcon,
      addedBy: 'unshift',
      position: 0
    };
    
    const startTime = performance.now();
    this.array.unshift(newItem);
    const endTime = performance.now();
    
    // Actualizar posiciones de todos los elementos
    this.array.forEach((item, index) => {
      item.position = index;
    });
    
    // Actualizar métricas
    this.metrics.unshiftCount++;
    this.metrics.totalOperations++;
    this.metrics.averageTime = ((this.metrics.averageTime * (this.metrics.totalOperations - 1)) + (endTime - startTime)) / this.metrics.totalOperations;
    this.metrics.maxItems = Math.max(this.metrics.maxItems, this.array.length);
    
    // Registrar en el historial
    const historyEntry = `unshift() → Agregado: "${newItem.value}"`;
    this.history.unshift(historyEntry);
    
    // Actualizar visualización
    this.updateDisplay();
    this.animateOperation('unshift', newItem);
    
    // Mostrar notificación
    this.showNotification(`unshift(): Se agregó "${newItem.value}" al inicio`, 'success');
  }
  
  // Agrega un elemento personalizado
  private addCustomItem(): void {
    const input = document.getElementById('customValue') as HTMLInputElement;
    const value = input.value.trim();
    
    if (!value) {
      this.showNotification('Por favor, ingresa un valor para el elemento', 'warning');
      return;
    }
    
    const colors = ['#61dafb', '#ff6b6b', '#ffd93d', '#8b5cf6', '#00a8ff'];
    const icons = ['ellipse', 'diamond', 'square', 'triangle', 'star'];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    const newItem: ArrayItem = {
      id: this.currentId++,
      value: value,
      color: randomColor,
      icon: randomIcon,
      addedBy: 'user',
      position: 0
    };
    
    const startTime = performance.now();
    this.array.unshift(newItem);
    const endTime = performance.now();
    
    // Actualizar posiciones de todos los elementos
    this.array.forEach((item, index) => {
      item.position = index;
    });
    
    // Actualizar métricas
    this.metrics.unshiftCount++;
    this.metrics.totalOperations++;
    this.metrics.averageTime = ((this.metrics.averageTime * (this.metrics.totalOperations - 1)) + (endTime - startTime)) / this.metrics.totalOperations;
    this.metrics.maxItems = Math.max(this.metrics.maxItems, this.array.length);
    
    // Registrar en el historial
    const historyEntry = `unshift("${value}") → Agregado por usuario`;
    this.history.unshift(historyEntry);
    
    // Limpiar input
    input.value = '';
    
    // Actualizar visualización
    this.updateDisplay();
    this.animateOperation('unshift', newItem);
    
    // Mostrar notificación
    this.showNotification(`Elemento personalizado "${value}" agregado al inicio`, 'success');
  }
  
  // Reinicia el arreglo a su estado inicial
  private resetArray(): void {
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
  }
  
  // Inicia una demostración automática
  private startAutoDemo(): void {
    if (this.isAnimating) return;
    
    const speedSlider = document.getElementById('demoSpeed') as HTMLInputElement;
    const operationsSlider = document.getElementById('demoOperations') as HTMLInputElement;
    
    const speed = parseInt(speedSlider.value);
    const totalOperations = parseInt(operationsSlider.value);
    
    let operationsPerformed = 0;
    
    this.isAnimating = true;
    const demoBtn = document.getElementById('autoDemoBtn')!;
    demoBtn.innerHTML = '<ion-icon name="stop-outline" class="mr-2 animate-spin"></ion-icon> Detener Demo';
    
    const demoInterval = setInterval(() => {
      if (operationsPerformed >= totalOperations) {
        clearInterval(demoInterval);
        this.isAnimating = false;
        demoBtn.innerHTML = '<ion-icon name="play-outline" class="mr-2"></ion-icon> Demo Automática';
        this.showNotification(`Demo completada: ${totalOperations} operaciones realizadas`, 'success');
        return;
      }
      
      // Alternar entre shift y unshift
      if (this.array.length === 0 || Math.random() > 0.5) {
        this.performUnshift();
      } else {
        this.performShift();
      }
      
      operationsPerformed++;
      
      // Actualizar contador de demo
      document.getElementById('demoProgress')!.textContent = `${operationsPerformed}/${totalOperations}`;
    }, speed);
    
    // Cambiar el botón para detener la demo
    const stopDemo = () => {
      clearInterval(demoInterval);
      this.isAnimating = false;
      demoBtn.innerHTML = '<ion-icon name="play-outline" class="mr-2"></ion-icon> Demo Automática';
      demoBtn.removeEventListener('click', stopDemo);
      demoBtn.addEventListener('click', () => this.startAutoDemo());
    };
    
    demoBtn.removeEventListener('click', () => this.startAutoDemo());
    demoBtn.addEventListener('click', stopDemo);
  }
  
  // Actualiza la visualización del arreglo
  private updateDisplay(): void {
    if (!this.arrayContainer || !this.historyContainer) return;
    
    // Actualizar visualización del arreglo
    this.arrayContainer.innerHTML = '';
    
    this.array.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = `array-item flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl relative`;
      itemElement.style.backgroundColor = `${item.color}20`;
      itemElement.style.border = `2px solid ${item.color}40`;
      itemElement.style.minWidth = '120px';
      
      itemElement.innerHTML = `
        <div class="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style="background: ${item.color}">
          ${index}
        </div>
        <div class="text-3xl mb-2" style="color: ${item.color}">
          <ion-icon name="${item.icon}-outline"></ion-icon>
        </div>
        <div class="font-bold text-center mb-1">${item.value}</div>
        <div class="text-xs text-text-secondary text-center">ID: ${item.id}</div>
        ${item.addedBy === 'user' ? 
          '<div class="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">Usuario</div>' : 
          ''}
      `;
      
      this.arrayContainer.appendChild(itemElement);
    });
    
    // Actualizar historial de operaciones
    this.historyContainer.innerHTML = '';
    
    this.history.slice(0, 10).forEach(entry => {
      const entryElement = document.createElement('div');
      entryElement.className = 'history-entry p-3 bg-gray-900/30 rounded-lg mb-2 text-sm border-l-4';
      
      // Usar indexOf en lugar de includes para compatibilidad
      if (entry.indexOf('shift()') !== -1) {
        entryElement.style.borderLeftColor = '#ff6b6b';
        entryElement.innerHTML = `<span class="text-react-accent-secondary">${entry}</span>`;
      } else {
        entryElement.style.borderLeftColor = '#61dafb';
        entryElement.innerHTML = `<span class="text-react-accent">${entry}</span>`;
      }
      
      this.historyContainer.appendChild(entryElement);
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
    const lengthBar = document.getElementById('arrayLengthBar');
    if (lengthBar) {
      const percentage = (this.array.length / Math.max(this.metrics.maxItems, 10)) * 100;
      lengthBar.style.width = `${percentage}%`;
    }
    
    // Actualizar estado de botones
    const shiftBtn = document.getElementById('shiftBtn') as HTMLButtonElement;
    if (shiftBtn) {
      shiftBtn.disabled = this.array.length === 0;
    }
  }
  
  // Anima una operación
  private animateOperation(operation: 'shift' | 'unshift', item: ArrayItem): void {
    const animationContainer = document.getElementById('animationContainer');
    if (!animationContainer) return;
    
    const animationElement = document.createElement('div');
    animationElement.className = `operation-animation fixed z-50 flex items-center justify-center`;
    animationElement.style.color = item.color;
    
    if (operation === 'shift') {
      animationElement.innerHTML = `
        <div class="flex items-center bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border-2 shadow-2xl" style="border-color: ${item.color}">
          <ion-icon name="arrow-forward-outline" class="text-2xl mr-2"></ion-icon>
          <div class="text-lg font-bold">shift() → "${item.value}"</div>
          <ion-icon name="exit-outline" class="text-2xl ml-2"></ion-icon>
        </div>
      `;
      animationElement.style.left = '50%';
      animationElement.style.top = '50%';
      animationElement.style.transform = 'translate(-50%, -50%) scale(0.5)';
      animationElement.style.opacity = '0';
      
      // Animación de salida
      setTimeout(() => {
        animationElement.style.transition = 'all 0.5s ease-out';
        animationElement.style.transform = 'translate(-50%, -50%) scale(1)';
        animationElement.style.opacity = '1';
      }, 10);
      
      setTimeout(() => {
        animationElement.style.transition = 'all 0.5s ease-in';
        animationElement.style.transform = 'translate(-150%, -50%) scale(0.5)';
        animationElement.style.opacity = '0';
      }, 1000);
      
      setTimeout(() => {
        animationElement.remove();
      }, 1500);
    } else {
      animationElement.innerHTML = `
        <div class="flex items-center bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border-2 shadow-2xl" style="border-color: ${item.color}">
          <ion-icon name="arrow-back-outline" class="text-2xl mr-2"></ion-icon>
          <div class="text-lg font-bold">unshift() → "${item.value}"</div>
          <ion-icon name="enter-outline" class="text-2xl ml-2"></ion-icon>
        </div>
      `;
      animationElement.style.right = '50%';
      animationElement.style.top = '50%';
      animationElement.style.transform = 'translate(50%, -50%) scale(0.5)';
      animationElement.style.opacity = '0';
      
      // Animación de entrada
      setTimeout(() => {
        animationElement.style.transition = 'all 0.5s ease-out';
        animationElement.style.transform = 'translate(50%, -50%) scale(1)';
        animationElement.style.opacity = '1';
      }, 10);
      
      setTimeout(() => {
        animationElement.style.transition = 'all 0.5s ease-in';
        animationElement.style.transform = 'translate(50%, -50%) scale(0.5)';
        animationElement.style.opacity = '0';
      }, 1000);
      
      setTimeout(() => {
        animationElement.remove();
      }, 1500);
    }
    
    animationContainer.appendChild(animationElement);
  }
  
  // Inicializa animaciones de fondo
  private initializeAnimations(): void {
    this.createArrayVisualization();
  }
  
  // Crea visualización de arreglo en canvas
  private createArrayVisualization(): void {
    const canvas = document.getElementById('arrayCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.drawArrayVisualization(ctx);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animar la visualización
    const animate = () => {
      this.drawArrayVisualization(ctx);
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  // Función auxiliar para dibujar rectángulos redondeados en canvas
  private drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
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
  }
  
  // Dibuja la visualización del arreglo en canvas
  private drawArrayVisualization(ctx: CanvasRenderingContext2D): void {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar fondo
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) / 2
    );
    gradient.addColorStop(0, 'rgba(10, 10, 18, 0.1)');
    gradient.addColorStop(1, 'rgba(26, 26, 46, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar elementos del arreglo como cajas conectadas
    const boxWidth = 80;
    const boxHeight = 60;
    const startX = width / 2 - (this.array.length * boxWidth) / 2;
    const startY = height / 2;
    
    // Dibujar conexiones
    ctx.strokeStyle = 'rgba(97, 218, 251, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    
    for (let i = 0; i < this.array.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(startX + i * boxWidth + boxWidth, startY);
      ctx.lineTo(startX + (i + 1) * boxWidth, startY);
      ctx.stroke();
    }
    
    ctx.setLineDash([]);
    
    // Dibujar cajas
    this.array.forEach((item, index) => {
      const x = startX + index * boxWidth;
      const y = startY - boxHeight / 2;
      
      // Dibujar caja con bordes redondeados
      ctx.fillStyle = `${item.color}30`;
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 2;
      
      this.drawRoundedRect(ctx, x, y, boxWidth, boxHeight, 8);
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
  }
  
  // Muestra una notificación
  private showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    const notification = document.createElement('div');
    const colors = {
      'success': 'bg-green-500',
      'error': 'bg-red-500',
      'warning': 'bg-yellow-500',
      'info': 'bg-blue-500'
    };
    
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    
    // Determinar el icono basado en el tipo
    let iconName = '';
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
    
    notification.innerHTML = `
      <div class="flex items-center">
        <ion-icon name="${iconName}" class="mr-2"></ion-icon>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
      notification.classList.add('translate-x-0');
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
      notification.classList.remove('translate-x-0');
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('ArrayMethodsLab: Inicializando aplicación...');
  
  // Verificar si Canvas API está disponible
  if (!HTMLCanvasElement.prototype.getContext) {
    console.error('Canvas no está soportado en este navegador');
    return;
  }
  
  // Inicializar la aplicación
  const app = new ArrayMethodsLab();
  
  console.log('ArrayMethodsLab inicializado correctamente');
});