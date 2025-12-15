// ============================================
// DEMOSTRACIÓN DE INTERFACES Y CLASES EN TYPESCRIPT
// ============================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ----- CLASES -----
// 1. Clase básica que implementa una interface
var Gerente = /** @class */ (function () {
    // Constructor
    function Gerente(id, nombre, edad, departamento) {
        this.bonos = 0; // Propiedad privada
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.puesto = "Gerente";
        this.departamento = departamento;
    }
    // Implementación del método de la interface
    Gerente.prototype.saludar = function () {
        console.log("Hola, soy ".concat(this.nombre, ", ").concat(this.puesto, " del departamento de ").concat(this.departamento.nombre));
    };
    // Método público
    Gerente.prototype.asignarBono = function (monto) {
        this.bonos += monto;
        console.log("Bono de $".concat(monto, " asignado a ").concat(this.nombre, ". Total bonos: $").concat(this.bonos));
    };
    Object.defineProperty(Gerente.prototype, "salarioTotal", {
        // Getter
        get: function () {
            var base = 5000;
            return "$".concat(base + this.bonos);
        },
        enumerable: false,
        configurable: true
    });
    // Método estático
    Gerente.esMayorDeEdad = function (edad) {
        return edad >= 18;
    };
    return Gerente;
}());
// 2. Clase con herencia
var Desarrollador = /** @class */ (function (_super) {
    __extends(Desarrollador, _super);
    function Desarrollador(id, nombre, edad, departamento, lenguaje) {
        var _this = _super.call(this, id, nombre, edad, departamento) || this;
        _this.proyectos = [];
        _this.puesto = "Desarrollador";
        _this.lenguaje = lenguaje;
        return _this;
    }
    // Sobreescritura de método
    Desarrollador.prototype.saludar = function () {
        console.log("Hola, soy ".concat(this.nombre, ", desarrollador ").concat(this.lenguaje, " en ").concat(this.departamento.nombre));
    };
    Desarrollador.prototype.agregarProyecto = function (proyecto) {
        this.proyectos.push(proyecto);
        console.log("Proyecto \"".concat(proyecto, "\" agregado a ").concat(this.nombre));
    };
    Desarrollador.prototype.listarProyectos = function () {
        console.log("Proyectos de ".concat(this.nombre, ":"));
        this.proyectos.forEach(function (proyecto, index) {
            console.log("  ".concat(index + 1, ". ").concat(proyecto));
        });
    };
    return Desarrollador;
}(Gerente));
// 3. Clase abstracta
var MiembroEquipo = /** @class */ (function () {
    function MiembroEquipo() {
    }
    MiembroEquipo.prototype.presentarse = function () {
        console.log("Soy un miembro del equipo");
    };
    return MiembroEquipo;
}());
// ----- FUNCIONES QUE USAN INTERFACES -----
function procesarEmpleado(empleado) {
    console.log("\n=== Procesando empleado: ".concat(empleado.nombre, " ==="));
    empleado.saludar();
    console.log("ID: ".concat(empleado.id));
    console.log("Puesto: ".concat(empleado.puesto));
    if (empleado.salario) {
        console.log("Salario: $".concat(empleado.salario));
    }
}
// ----- IMPLEMENTACIÓN Y USO -----
console.log("=== DEMOSTRACIÓN DE INTERFACES Y CLASES EN TYPESCRIPT ===\n");
// Crear instancias
var deptoIT = {
    nombre: "Tecnología",
    ubicacion: "Piso 3"
};
var deptoRH = {
    nombre: "Recursos Humanos",
    ubicacion: "Piso 2"
};
// Usar clase Gerente
var gerente1 = new Gerente(1001, "Ana García", 35, deptoIT);
gerente1.saludar();
gerente1.asignarBono(1000);
console.log("Salario total de ".concat(gerente1.nombre, ": ").concat(gerente1.salarioTotal, "\n"));
// Usar clase Desarrollador (herencia)
var dev1 = new Desarrollador(2001, "Carlos López", 28, deptoIT, "TypeScript");
dev1.saludar();
dev1.asignarBono(500);
dev1.agregarProyecto("Sistema de Gestión");
dev1.agregarProyecto("API REST");
dev1.listarProyectos();
console.log("Salario total de ".concat(dev1.nombre, ": ").concat(dev1.salarioTotal, "\n"));
// Crear objetos usando la interface directamente
var empleadoDirecto = {
    id: 3001,
    nombre: "María Rodríguez",
    edad: 30,
    puesto: "Diseñadora",
    departamento: deptoRH,
    salario: 4000,
    saludar: function () {
        console.log("Hola, soy ".concat(this.nombre, ", ").concat(this.puesto));
    }
};
// Probar función con interface
procesarEmpleado(empleadoDirecto);
procesarEmpleado(gerente1);
// Usar interface para función
var sumar = function (a, b) { return a + b; };
console.log("\nSuma usando interface Calculadora: 10 + 5 = ".concat(sumar(10, 5)));
// Usar interface con índice de firma
var configuracion = {
    tema: "oscuro",
    idioma: "español",
    region: "América Latina"
};
console.log("\nConfiguración:");
for (var key in configuracion) {
    console.log("  ".concat(key, ": ").concat(configuracion[key]));
}
// Usar método estático
console.log("\n\u00BFEs mayor de edad Carlos (".concat(dev1.edad, ")? ").concat(Gerente.esMayorDeEdad(dev1.edad) ? "Sí" : "No"));
console.log("\u00BFEs mayor de edad un ni\u00F1o de 15 a\u00F1os? ".concat(Gerente.esMayorDeEdad(15) ? "Sí" : "No"));
console.log("\n=== FIN DE LA DEMOSTRACIÓN ===");
