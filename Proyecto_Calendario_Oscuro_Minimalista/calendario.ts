// Clase principal del calendario
class Calendario {
    private fechaActual: Date;
    private fechaSeleccionada: Date | null;
    private eventos: Array<{fecha: Date, titulo: string}>;

    constructor() {
        this.fechaActual = new Date();
        this.fechaSeleccionada = null;
        this.eventos = this.inicializarEventosEjemplo();
    }

    // Inicializar algunos eventos de ejemplo
    private inicializarEventosEjemplo() {
        const hoy = new Date();
        const manana = new Date();
        manana.setDate(hoy.getDate() + 1);
        
        const proximaSemana = new Date();
        proximaSemana.setDate(hoy.getDate() + 7);
        
        return [
            { fecha: hoy, titulo: "Reunión importante" },
            { fecha: manana, titulo: "Entrega de proyecto" },
            { fecha: proximaSemana, titulo: "Cita con el médico" }
        ];
    }

    // Obtener el mes y año actual
    getMesActual(): string {
        const opciones: Intl.DateTimeFormatOptions = { 
            month: 'long', 
            year: 'numeric' 
        };
        return this.capitalizeFirstLetter(this.fechaActual.toLocaleDateString('es-ES', opciones));
    }

    // Capitalizar primera letra
    private capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Cambiar al mes anterior
    mesAnterior(): void {
        this.fechaActual.setMonth(this.fechaActual.getMonth() - 1);
        this.actualizarVista();
    }

    // Cambiar al mes siguiente
    mesSiguiente(): void {
        this.fechaActual.setMonth(this.fechaActual.getMonth() + 1);
        this.actualizarVista();
    }

    // Ir al día actual
    irAHoy(): void {
        this.fechaActual = new Date();
        this.seleccionarDia(new Date());
        this.actualizarVista();
    }

    // Seleccionar un día específico
    seleccionarDia(fecha: Date): void {
        this.fechaSeleccionada = fecha;
        this.actualizarInfoDiaSeleccionado();
        this.actualizarVista();
    }

    // Obtener eventos para una fecha específica
    obtenerEventosParaFecha(fecha: Date): Array<{fecha: Date, titulo: string}> {
        return this.eventos.filter(evento => 
            evento.fecha.getDate() === fecha.getDate() &&
            evento.fecha.getMonth() === fecha.getMonth() &&
            evento.fecha.getFullYear() === fecha.getFullYear()
        );
    }

    // Generar los días del mes actual
    generarDiasDelMes(): Date[] {
        const year = this.fechaActual.getFullYear();
        const month = this.fechaActual.getMonth();
        
        // Primer día del mes
        const primerDia = new Date(year, month, 1);
        // Último día del mes
        const ultimoDia = new Date(year, month + 1, 0);
        
        // Día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
        const primerDiaSemana = primerDia.getDay();
        
        // Total de días en el mes
        const totalDias = ultimoDia.getDate();
        
        // Array para almacenar todos los días a mostrar
        const dias: Date[] = [];
        
        // Agregar días del mes anterior (si es necesario)
        const mesAnterior = new Date(year, month, 0);
        const diasMesAnterior = mesAnterior.getDate();
        
        for (let i = primerDiaSemana - 1; i >= 0; i--) {
            const dia = new Date(year, month - 1, diasMesAnterior - i);
            dias.push(dia);
        }
        
        // Agregar días del mes actual
        for (let i = 1; i <= totalDias; i++) {
            const dia = new Date(year, month, i);
            dias.push(dia);
        }
        
        // Agregar días del mes siguiente (si es necesario)
        const diasRestantes = 42 - dias.length;
        for (let i = 1; i <= diasRestantes; i++) {
            const dia = new Date(year, month + 1, i);
            dias.push(dia);
        }
        
        return dias;
    }

    // Actualizar la vista del calendario
    actualizarVista(): void {
        // Actualizar el título del mes
        const mesElemento = document.getElementById('current-month');
        if (mesElemento) {
            mesElemento.textContent = this.getMesActual();
        }
        
        // Generar la cuadrícula de días
        this.generarCuadricula();
        this.actualizarInfoDiaSeleccionado();
    }

    // Generar la cuadrícula de días
    private generarCuadricula(): void {
        const cuadricula = document.getElementById('calendar-grid');
        if (!cuadricula) {
            console.error('No se encontró el elemento calendar-grid');
            return;
        }
        
        // Limpiar cuadrícula
        cuadricula.innerHTML = '';
        
        // Obtener los días a mostrar
        const dias = this.generarDiasDelMes();
        
        // Obtener la fecha actual (hoy)
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        // Crear elementos para cada día
        dias.forEach(dia => {
            const diaElemento = document.createElement('div');
            diaElemento.className = 'day';
            
            // Verificar si es del mes actual
            if (dia.getMonth() !== this.fechaActual.getMonth()) {
                diaElemento.classList.add('other-month');
            } else {
                diaElemento.classList.add('current-month');
            }
            
            // Verificar si es hoy
            const diaComparar = new Date(dia);
            diaComparar.setHours(0, 0, 0, 0);
            
            if (diaComparar.getTime() === hoy.getTime()) {
                diaElemento.classList.add('today');
            }
            
            // Verificar si está seleccionado
            if (this.fechaSeleccionada) {
                const seleccionadoComparar = new Date(this.fechaSeleccionada);
                seleccionadoComparar.setHours(0, 0, 0, 0);
                
                if (diaComparar.getTime() === seleccionadoComparar.getTime()) {
                    diaElemento.classList.add('selected');
                }
            }
            
            // Agregar número del día
            const numeroElemento = document.createElement('div');
            numeroElemento.className = 'day-number';
            numeroElemento.textContent = dia.getDate().toString();
            diaElemento.appendChild(numeroElemento);
            
            // Agregar indicador de eventos si hay eventos para este día
            const eventos = this.obtenerEventosParaFecha(dia);
            if (eventos.length > 0) {
                const eventosElemento = document.createElement('div');
                eventosElemento.className = 'day-events';
                
                const cantidadPuntos = Math.min(eventos.length, 3);
                for (let i = 0; i < cantidadPuntos; i++) {
                    const punto = document.createElement('div');
                    punto.className = 'event-dot';
                    eventosElemento.appendChild(punto);
                }
                
                diaElemento.appendChild(eventosElemento);
            }
            
            // Agregar evento click para seleccionar el día
            diaElemento.addEventListener('click', () => {
                this.seleccionarDia(dia);
            });
            
            cuadricula.appendChild(diaElemento);
        });
    }

    // Actualizar la información del día seleccionado
    private actualizarInfoDiaSeleccionado(): void {
        const infoElemento = document.getElementById('selected-date');
        const eventoElemento = document.getElementById('event-text');
        
        if (!infoElemento || !eventoElemento) {
            console.error('No se encontraron elementos para mostrar información');
            return;
        }
        
        if (this.fechaSeleccionada) {
            const opciones: Intl.DateTimeFormatOptions = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            
            const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES', opciones);
            infoElemento.textContent = this.capitalizeFirstLetter(fechaFormateada);
            
            const eventos = this.obtenerEventosParaFecha(this.fechaSeleccionada);
            
            if (eventos.length > 0) {
                eventoElemento.textContent = `${eventos.length} evento(s) - ${eventos[0].titulo}`;
            } else {
                eventoElemento.textContent = "Sin eventos";
            }
        } else {
            infoElemento.textContent = "No hay día seleccionado";
            eventoElemento.textContent = "Sin eventos";
        }
    }

    // Inicializar el calendario
    inicializar(): void {
        console.log('Inicializando calendario...');
        
        // Seleccionar hoy por defecto
        this.seleccionarDia(new Date());
        
        // Configurar botones de navegación
        const botonAnterior = document.getElementById('prev-month');
        const botonSiguiente = document.getElementById('next-month');
        const botonHoy = document.getElementById('today-btn');
        
        if (botonAnterior) {
            botonAnterior.addEventListener('click', () => {
                console.log('Mes anterior');
                this.mesAnterior();
            });
        } else {
            console.error('No se encontró el botón prev-month');
        }
        
        if (botonSiguiente) {
            botonSiguiente.addEventListener('click', () => {
                console.log('Mes siguiente');
                this.mesSiguiente();
            });
        } else {
            console.error('No se encontró el botón next-month');
        }
        
        if (botonHoy) {
            botonHoy.addEventListener('click', () => {
                console.log('Ir a hoy');
                this.irAHoy();
            });
        } else {
            console.error('No se encontró el botón today-btn');
        }
        
        // Actualizar fecha actual en el pie de página
        this.actualizarFechaActual();
        
        // Actualizar la vista inicial
        this.actualizarVista();
    }

    // Actualizar la fecha actual en el pie de página
    private actualizarFechaActual(): void {
        const fechaActualElemento = document.getElementById('current-date');
        if (!fechaActualElemento) return;
        
        const hoy = new Date();
        const opciones: Intl.DateTimeFormatOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const fechaFormateada = hoy.toLocaleDateString('es-ES', opciones);
        fechaActualElemento.textContent = this.capitalizeFirstLetter(fechaFormateada);
    }
}

// Hacer la clase disponible globalmente
(window as any).Calendario = Calendario;