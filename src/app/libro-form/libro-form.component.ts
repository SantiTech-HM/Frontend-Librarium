import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../services/libro.service';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileSelectEvent } from 'primeng/fileupload';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    FileUploadModule,
   
  ],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.scss'
})
export class LibroFormComponent {

  formLibro!:FormGroup
  isSaveInProgress: boolean = false; 
  edit: boolean = false;
  selectedFile:File | null = null;
   
  constructor(
    private fb : FormBuilder, 
    private libroService:LibroService, 
    private activatedRoute:ActivatedRoute,
    private messageService:MessageService,
    private router:Router
  
  ){

    this.formLibro = this.fb.group({
      id: [null],
      titulo : ['', Validators.required],
      autor:   ['', Validators.required],
      genero:  ['', Validators.required],
      paginas:  [1, [Validators.required, Validators.min(1)]],
      precio:  [0, [Validators.required, Validators.min(0)]],
      imagen: [null]
    });
  }
  ngOnInit(): void{
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getLibroById(+id!);
    }
  }

  onFileSeletected(event: FileSelectEvent){
    this.selectedFile = event.files[0];
  }

  getLibroById(id: number){
    this.libroService.getLibroById(id) .subscribe({
      next: (foundLibro) =>{
        this.formLibro.patchValue(foundLibro);
      },
      error:()=>{
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No encontrado'
        });
        this.router.navigateByUrl('/');
      },
    });
  }
  
  createLibro(){
    if (this.formLibro.invalid) {
      
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Revise los campos e intente nuevamente',
        });
        return;     
    }
    if (!this.selectedFile) {
      
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'seleccione una imagen e intete nuevamente',
      });
      return;     
  }
    this.isSaveInProgress = true;
    this.libroService.createLibro(this.formLibro.value, this.selectedFile) .subscribe({
      next:()=> {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Guardado', 
          detail: 'Libro guardado correctamente',
        });
        this.isSaveInProgress = false
        this.router.navigateByUrl('/');
      },
      error:()=>{
        this.isSaveInProgress = false
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Revise los campos e intente nuevamente',
        });
      }
    });
  }

  changeImagen(event: FileSelectEvent){
    this.selectedFile = event.files[0];
 if (!this.selectedFile) {
      
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'seleccione una imagen e intete nuevamente',
      });
      return;     
  }
  this.libroService.updateImagenLibro(this.formLibro.value.id, this.selectedFile).subscribe({
    next:()=> {
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Guardado', 
        detail: 'Libro actualizado correctamente',
      });
      this.isSaveInProgress = false;
      this.router.navigateByUrl('/');
    },
    error:()=>{
      this.isSaveInProgress = false;
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Revise el archivo seleccionado',
      });
     },
    });
  }

  updateLibro(){
    if (this.formLibro.invalid) {
      
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Revise los campos e intete nuevamente',
        });
        return;     
    }
    this.isSaveInProgress = true;
    this.libroService.updateLibro(this.formLibro.value) .subscribe({
      next:()=> {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Guardado', 
          detail: 'Libro actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error:()=>{
        this.isSaveInProgress = false;
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Revise los campos e intete nuevamente',
        });
      },
    });
  }
}
