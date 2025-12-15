function saludar(mensaje: string): void {
    console.log(mensaje);
}

const mensaje: string = "¡Hola Mundo desde TypeScript en Manjaro!";
saludar(mensaje);

// Ejemplo adicional con interfaces
interface Persona {
    nombre: string;
    edad: number;
}

const usuario: Persona = {
    nombre: "Carlos",
    edad: 25
};

console.log(`Usuario: ${usuario.nombre}, Edad: ${usuario.edad}`);
