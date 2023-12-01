import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from 'src/app/services/communication.service';
import { Doctor } from 'src/interfaces/Doctor';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public doctor: Doctor, private communication: CommunicationService, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  deleteDoctor() {
    this.communication.deleteDoctor(this.doctor.idmedecin).subscribe({
      next: () => {
        this.dialog.open(DialogComponent, {
          disableClose: true,
          data: {title: 'Confirmation', message: "Le médecin a été supprimé avec succès !"},
        }
        );
      },
      error: (error) => {
        console.error('Médecin non inséré:', error);
      },
    });
  }
}
