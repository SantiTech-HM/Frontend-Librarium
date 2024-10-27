
import { Imagen } from "./imagen";

export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    genero: string;
    paginas: number;
    precio: number;
    imagen?: Imagen;
}