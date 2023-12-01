import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_ERROR = 404;
@injectable()
export class DatabaseController {
  router: Router;
  serviceRouter: Router;
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {
    this.configureRouter();
  }

  private configureRouter(): void {
    this.router = Router();
    this.serviceRouter = Router();

    this.router.get('/', async (req, res) => {
      try {
        const doctors = await this.databaseService.getDoctors();
        res.status(HTTP_OK).json(doctors.rows);
      }
      catch (error) {
        res.status(HTTP_ERROR).json(error);
      }
    });


    this.router.post('/', async (req, res) => {
      try {
         await this.databaseService.insertDoctor(req.body);
         res.status(HTTP_CREATED).json();
      } catch (error) {
         res.status(HTTP_ERROR).json({ error: 'Failed to insert doctor.' });
      }
   });
   

  this.router.put('/', async (req, res) => {
    try {
      await this.databaseService.modifyDoctor(req.body);
      res.status(HTTP_OK).json({ message: 'Doctor modified successfully' });
    } catch (error) {
      console.error('Error modifying doctor:', error);
      res.status(HTTP_ERROR).json({ error: 'Failed to modify doctor.' });
    }
  });

  this.router.delete('/:idMedecin', (req, res) => {
    const idMedecin = Number(req.params.idMedecin);
    this.databaseService.deleteDoctor(idMedecin)
      .then(() => res.status(HTTP_OK).json())
      .catch(error => res.status(HTTP_ERROR).json(error));
  });
  
    this.router.get('/debug', async (req, res) => {
      try {
        await this.databaseService.poolDemo();
        res.status(HTTP_OK);
      }
      catch {
        res.status(HTTP_ERROR);
      }
    });

    this.serviceRouter.get('/', async (req, res) => {
      try {
        const services = await this.databaseService.getService();
        res.status(HTTP_OK).json(services.rows);
      } catch (error) {
        res.status(HTTP_ERROR).json(error);
      }
    });
  }
  
}
