import { Doctor } from "@app/interfaces/Doctor";
import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "hopital_bd",
    password: "apasswordig",
    port: 5432,
    host: "localhost",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async poolDemo(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT NOW();`);
    client.release();
    return res;
  }


  public async getDoctors(): Promise<pg.QueryResult> {
    const client = await this.pool.connect(); 
    const res = await client.query(`SELECT * FROM Medecins ORDER BY idMedecin;`);
    client.release();
    return res;
  }

  public async modifyDoctor(doctor: Doctor): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values = [doctor.idmedecin, doctor.prenom, doctor.nom, doctor.specialite, doctor.anneesexperience, doctor.idservice];
    const queryText: string = `UPDATE Medecins SET prenom = $2, nom = $3, specialite = $4, anneesexperience = $5, idservice = $6 WHERE idMedecin = $1;`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }
 

  public async deleteDoctor(idMedecin: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values: number[] = [idMedecin];
    const queries: string[] = ['DELETE FROM Rendezvous WHERE idmedecin = $1;', 'DELETE FROM Medecins WHERE idmedecin = $1;']
    await client.query(queries [0], values);  
    const res = await client.query(queries[1], values);    
    client.release();
    return res;
}


  public async insertDoctor(doctor: Doctor): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values = [doctor.idmedecin, doctor.prenom, doctor.nom, doctor.specialite, doctor.anneesexperience, doctor.idservice];
    const queryText: string = `INSERT INTO Medecins (idMedecin, prenom, nom, specialite, anneesExperience, idService) VALUES($1,$2,$3,$4,$5,$6);`;
    const res = await client.query(queryText, values);
    client.release();

    return res;
  }
  public async getService(): Promise<pg.QueryResult> {
    const client = await this.pool.connect(); 
    const res = await client.query(`SELECT * FROM Services;`);
    client.release();
    return res;
  }
  
}
