import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';


@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:8080/libro';

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getLibroById(id: number) :Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  createLibro(libro: Libro, imagen: File) :Observable<Libro> {
    const formData = new FormData()
    formData.append('libro', new Blob ([JSON.stringify(libro)], {type: 'application/json'}));
    formData.append('file', imagen)
    
    return this.http.post<Libro>(this.apiUrl, formData);
  } 

  updateLibro (libro: Libro){
    return this.http.put(this.apiUrl, libro);

  }

  deleteLibro(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateImagenLibro(id: number, imagen:File) :Observable<Libro> {
    const formData = new FormData()
    formData.append('file', imagen)
    return this.http.put<Libro>(`${this.apiUrl}/${id}/imagen`,formData);
  }

}