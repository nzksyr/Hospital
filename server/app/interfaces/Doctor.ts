export class Doctor {
    idmedecin: number;
    prenom: string;
    nom: string; 
    specialite: string;
    anneesexperience: number;
    idservice: number;
    public constructor(init?: Partial<Doctor>) {
              Object.assign(this, init);
          }
      }
