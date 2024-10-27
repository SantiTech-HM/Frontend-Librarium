
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Libro } from '../models/libro';
import { LibroService } from '../services/libro.service';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
 
})
export class HomeComponent {

  libros: Libro[] = [];
  isDeleteInProgress: boolean = false;

  constructor(
    private libroService: LibroService, 
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllLibros();
  }
  getAllLibros(){
    this.libroService.getLibros() .subscribe((data) =>{
      this.libros = data;
    });
  }

    deleteLibro(id: number){  
    this.isDeleteInProgress = true;
    this.libroService.deleteLibro(id) .subscribe({
      next:()=> {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Correcto', 
          detail: 'Libro eliminado',
        });
        this.isDeleteInProgress = false;
        this.getAllLibros();
      },
      error:()=>{
        this.isDeleteInProgress = false;
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudo eliminar el libro',
        });
      }
    });
  }
}