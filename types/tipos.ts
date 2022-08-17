export interface Libro {
    fecha: Date;
    id: number;
    link_google: string;
    link_imagen: string;
    titulo: string;
}

export interface Usuario {
    apellido: string;
    id: number;
    nom_usuario: string;
    nombre: string;
    pass: string;
    puede_entrar: number;
    rango: number;
}
