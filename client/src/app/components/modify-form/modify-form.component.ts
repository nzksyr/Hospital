import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommunicationService } from 'src/app/services/communication.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Doctor } from 'src/interfaces/Doctor';
import { Service } from 'src/interfaces/Service';

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.css']
})
export class ModifyFormComponent implements OnInit {

  editForm: FormGroup;
  specialiteMapping: Service[] = [];

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public selectedDoctor: Doctor, private communication: CommunicationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.communication.getService().subscribe({
      next: (services: Service[]) => {
        this.specialiteMapping = services;
        this.updateSpecialiteOptions();
      },
    });

    this.editForm = this.fb.group({
      idmedecin: [this.selectedDoctor.idmedecin],
      prenom: [this.selectedDoctor.prenom, [Validators.required]],
      nom: [this.selectedDoctor.nom, [Validators.required]],
      specialite: [this.selectedDoctor.specialite],
      anneesexperience: [this.selectedDoctor.anneesexperience, [Validators.required, Validators.min(0)]],
      idservice: [this.selectedDoctor.idservice, [Validators.required, Validators.min(0), Validators.max(9)]],
    });
  }

  updateSpecialiteOptions(): void {
      this.editForm.get('idservice')!.valueChanges.subscribe((idService) => {
      const selectedSpecialite = this.specialiteMapping.find(mapping => mapping.idservice === idService)?.nomservice;
      this.editForm.get('specialite')!.setValue(selectedSpecialite);
      });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formData: Doctor = {
        idmedecin: this.selectedDoctor.idmedecin,
        prenom: this.editForm.get('prenom')?.value,
        nom: this.editForm.get('nom')?.value,
        specialite: this.editForm.get('specialite')?.value,
        anneesexperience: this.editForm.get('anneesexperience')?.value,
        idservice: this.editForm.get('idservice')?.value,
      };

      this.communication.modifyDoctor(formData).subscribe({
        next: () => {
          const dialogRefSec = this.dialog.open(DialogComponent, {
            disableClose: true,
            data: { title: 'Confirmation', message: 'Le médecin a été modifié avec succès !' },
          });
          dialogRefSec.afterClosed().subscribe(() => {
            location.reload();
          });
        },
        error: (error) => {
          console.error('Médecin non modifié:', error);
        },
      });
    } else {
      const dialogRefSec = this.dialog.open(DialogComponent, {
        disableClose: true,
        data: { title: 'Erreur', message: 'Veuillez entrer des données valides.' },
      });
      dialogRefSec.afterClosed().subscribe(() => {
        this.dialog.open(ModifyFormComponent, {
          disableClose: true,
          data: this.selectedDoctor,
        });
      });
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const allowedKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
