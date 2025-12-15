// ============================================
// DEMOSTRACIÓN DE INTERFACES Y CLASES EN TYPESCRIPT
// ============================================

// ----- INTERFACES -----

// 1. Interface básica
interface Persona {
    nombre: string;
    edad: number;
    saludar(): void;
}

// 2. Interface con propiedades opcionales y de solo lectura
interface Empleado extends Persona {
    readonly id: number;
    puesto: string;
    salario?: number;  // Propiedad opcional
    departamento: Departamento;
}

// 3. Interface para tipos de objeto
interface Departamento {
    nombre: string;
    ubicacion: string;
}

// 4. Interface para funciones
interface Calculadora {
    (a: number, b: number): number;
}

// 5. Interface con índice de firma
interface Diccionario {
    [key: string]: string;
}

// ----- CLASES -----

// 1. Clase básica que implementa una interface
class Gerente implements Empleado {
    // Propiedades
    readonly id: number;
    nombre: string;
    edad: number;
    puesto: string;
    departamento: Departamento;
    private bonos: number = 0;  // Propiedad privada

    // Constructor
    constructor(id: number, nombre: string, edad: number, departamento: Departamento) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.puesto = "Gerente";
        this.departamento = departamento;
    }

    // Implementación del método de la interface
    saludar(): void {
        console.log(`Hola, soy ${this.nombre}, ${this.puesto} del departamento de ${this.departamento.nombre}`);
    }

    // Método público
    asignarBono(monto: number): void {
        this.bonos += monto;
        console.log(`Bono de $${monto} asignado a ${this.nombre}. Total bonos: $${this.bonos}`);
    }

    // Getter
    get salarioTotal(): string {
        const base = 5000;
        return `$${base + this.bonos}`;
    }

    // Método estático
    static esMayorDeEdad(edad: number): boolean {
        return edad >= 18;
    }
}

// 2. Clase con herencia
class Desarrollador extends Gerente {
    lenguaje: string;
    proyectos: string[] = [];

    constructor(id: number, nombre: string, edad: number, departamento: Departamento, lenguaje: string) {
        super(id, nombre, edad, departamento);
        this.puesto = "Desarrollador";
        this.lenguaje = lenguaje;
    }

    // Sobreescritura de método
    saludar(): void {
        console.log(`Hola, soy ${this.nombre}, desarrollador ${this.lenguaje} en ${this.departamento.nombre}`);
    }

    agregarProyecto(proyecto: string): void {
        this.proyectos.push(proyecto);
        console.log(`Proyecto "${proyecto}" agregado a ${this.nombre}`);
    }

    listarProyectos(): void {
        console.log(`Proyectos de ${this.nombre}:`);
        this.proyectos.forEach((proyecto, index) => {
            console.log(`  ${index + 1}. ${proyecto}`);
        });
    }
}

// 3. Clase abstracta
abstract class MiembroEquipo {
    abstract trabajar(): void;
    
    presentarse(): void {
        console.log("Soy un miembro del equipo");
    }
}

// ----- FUNCIONES QUE USAN INTERFACES -----

function procesarEmpleado(empleado: Empleado): void {
    console.log(`\n=== Procesando empleado: ${empleado.nombre} ===`);
    empleado.saludar();
    console.log(`ID: ${empleado.id}`);
    console.log(`Puesto: ${empleado.puesto}`);
    
    if (empleado.salario) {
        console.log(`Salario: $${empleado.salario}`);
    }
}

// ----- IMPLEMENTACIÓN Y USO -----

console.log("=== DEMOSTRACIÓN DE INTERFACES Y CLASES EN TYPESCRIPT ===\n");

// Crear instancias
const deptoIT: Departamento = {
    nombre: "Tecnología",
    ubicacion: "Piso 3"
};

const deptoRH: Departamento = {
    nombre: "Recursos Humanos",
    ubicacion: "Piso 2"
};

// Usar clase Gerente
const gerente1 = new Gerente(1001, "Ana García", 35, deptoIT);
gerente1.saludar();
gerente1.asignarBono(1000);
console.log(`Salario total de ${gerente1.nombre}: ${gerente1.salarioTotal}\n`);

// Usar clase Desarrollador (herencia)
const dev1 = new Desarrollador(2001, "Carlos López", 28, deptoIT, "TypeScript");
dev1.saludar();
dev1.asignarBono(500);
dev1.agregarProyecto("Sistema de Gestión");
dev1.agregarProyecto("API REST");
dev1.listarProyectos();
console.log(`Salario total de ${dev1.nombre}: ${dev1.salarioTotal}\n`);

// Crear objetos usando la interface directamente
const empleadoDirecto: Empleado = {
    id: 3001,
    nombre: "María Rodríguez",
    edad: 30,
    puesto: "Diseñadora",
    departamento: deptoRH,
    salario: 4000,
    saludar() {
        console.log(`Hola, soy ${this.nombre}, ${this.puesto}`);
    }
};

// Probar función con interface
procesarEmpleado(empleadoDirecto);
procesarEmpleado(gerente1);

// Usar interface para función
const sumar: Calculadora = (a: number, b: number): number => a + b;
console.log(`\nSuma usando interface Calculadora: 10 + 5 = ${sumar(10, 5)}`);

// Usar interface con índice de firma
const configuracion: Diccionario = {
    tema: "oscuro",
    idioma: "español",
    region: "América Latina"
};
console.log("\nConfiguración:");
for (const key in configuracion) {
    console.log(`  ${key}: ${configuracion[key]}`);
}

// Usar método estático
console.log(`\n¿Es mayor de edad Carlos (${dev1.edad})? ${Gerente.esMayorDeEdad(dev1.edad) ? "Sí" : "No"}`);
console.log(`¿Es mayor de edad un niño de 15 años? ${Gerente.esMayorDeEdad(15) ? "Sí" : "No"}`);

console.log("\n=== FIN DE LA DEMOSTRACIÓN ===");