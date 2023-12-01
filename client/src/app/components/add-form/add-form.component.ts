import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationService } from 'src/app/services/communication.service';
import { Doctor } from 'src/interfaces/Doctor';
import { DialogComponent } from '../dialog/dialog.component';
import { Service } from 'src/interfaces/Service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  addForm: FormGroup;
  specialiteMapping: Service[] = [];
  doctors: Doctor[];


  constructor(private fb: FormBuilder, private communication: CommunicationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.communication.getDoctors().subscribe({
      next: (docs: Doctor[]) => {
        this.doctors = docs;
        this.communication.getService().subscribe({
          next: (services: Service[]) => {
            this.specialiteMapping = services;
            this.updateSpecialiteOptions();
          }})
      },
    });

    this.addForm = this.fb.group({
      idmedecin: ['', [Validators.required, Validators.min(0)]],
      prenom: [''],
      nom: [''],
      specialite: ['Dermatologie'],
      anneesexperience: ['', [Validators.required, Validators.min(0)]],
      idservice: [0, [Validators.required, Validators.min(0), Validators.max(9)]],
    });
  }

  updateSpecialiteOptions(): void {
    this.addForm.get('idservice')!.valueChanges.subscribe((idService) => {
    const selectedSpecialite = this.specialiteMapping.find(mapping => mapping.idservice === idService)?.nomservice;
    this.addForm.get('specialite')!.setValue(selectedSpecialite);
    });
  }


  isDocIdDuplicate(): boolean {
    const docId = this.addForm.get('idmedecin')?.value;
    return this.doctors.some((doctor: Doctor) => doctor.idmedecin === docId);
  }
  

  onSubmit(): void { 
    if (this.addForm.valid && !this.isDocIdDuplicate()) {
      const formData: Doctor = {
        idmedecin: this.addForm.get('idmedecin')?.value,
        prenom: this.addForm.get('prenom')?.value,
        nom: this.addForm.get('nom')?.value,
        specialite: this.addForm.get('specialite')?.value,
        anneesexperience: this.addForm.get('anneesexperience')?.value,
        idservice: this.addForm.get('idservice')?.value,
      };
  
      this.communication.insertDoctor(formData).subscribe({
        next: () => {
          const dialogRefSec = this.dialog.open(DialogComponent, {
            disableClose: true,
            data: { title: 'Confirmation', message: 'Le médecin a été ajouté avec succès !' },
          });
          dialogRefSec.afterClosed().subscribe(() => {
            location.reload();
          });
        },
        error: (error) => {
          console.error('Médecin non ajouté:', error);
        },
      });
    } else {
      if(this.isDocIdDuplicate()) {
        const dialogRefSec = this.dialog.open(DialogComponent, {
          disableClose: true,
          data: { title: 'Erreur', message: 'Identifiant déjà utilisé.' },
        });
        dialogRefSec.afterClosed().subscribe(() => {
          this.dialog.open(AddFormComponent, {
            disableClose: true,
          });
        });
      } else {
        const dialogRefSec = this.dialog.open(DialogComponent, {
          disableClose: true,
          data: { title: 'Erreur', message: 'Veuillez entrer des données valides.' },
        });
        dialogRefSec.afterClosed().subscribe(() => {
          this.dialog.open(AddFormComponent, {
            disableClose: true,
          });
        });
      }
      
    }
  }
  

  handleKeydown(event: KeyboardEvent): void {
    const allowedKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
  
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
