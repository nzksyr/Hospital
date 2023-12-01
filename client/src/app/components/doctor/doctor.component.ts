import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommunicationService } from 'src/app/services/communication.service';
import { Doctor } from 'src/interfaces/Doctor';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ModifyFormComponent } from '../modify-form/modify-form.component';
import { AddFormComponent } from '../add-form/add-form.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctor: Doctor;
  dialogOpen: boolean = false;
  dataSource: MatTableDataSource<Doctor> = new MatTableDataSource(this.doctors);



  constructor(private communication: CommunicationService, private dialog: MatDialog) { 
  }
  ngOnInit(): void {
    this.communication.getDoctors().subscribe({
      next: (docs: Doctor[]) => {
          this.doctors = docs;
      },
  });
  }
  selectDoctor(row: any): void {
    this.selectedDoctor = row;
  }

  openConfirmationDialog(): void {  
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: this.selectedDoctor,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  openModifyForm(): void {
    this.dialog.open(ModifyFormComponent, {
      disableClose: true,
      data: this.selectedDoctor,
    });
  }

  openAddForm(): void {
    this.dialog.open(AddFormComponent, {
      disableClose: true,
      data: this.doctors,
    });
  }
  

  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }
    
}


