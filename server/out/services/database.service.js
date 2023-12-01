"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const inversify_1 = require("inversify");
const pg = require("pg");
require("reflect-metadata");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connectionConfig = {
            user: "postgres",
            database: "hopital_bd",
            password: "apasswordig",
            port: 5432,
            host: "localhost",
            keepAlive: true
        };
        this.pool = new pg.Pool(this.connectionConfig);
    }
    poolDemo() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT NOW();`);
            client.release();
            return res;
        });
    }
    getDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM Medecins ORDER BY idMedecin;`);
            client.release();
            return res;
        });
    }
    modifyDoctor(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const values = [doctor.idmedecin, doctor.prenom, doctor.nom, doctor.specialite, doctor.anneesexperience, doctor.idservice];
            const queryText = `UPDATE Medecins SET prenom = $2, nom = $3, specialite = $4, anneesexperience = $5, idservice = $6 WHERE idMedecin = $1;`;
            const res = yield client.query(queryText, values);
            client.release();
            return res;
        });
    }
    deleteDoctor(idMedecin) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const values = [idMedecin];
            const queries = ['DELETE FROM Rendezvous WHERE idmedecin = $1;', 'DELETE FROM Medecins WHERE idmedecin = $1;'];
            yield client.query(queries[0], values);
            const res = yield client.query(queries[1], values);
            client.release();
            return res;
        });
    }
    insertDoctor(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const values = [doctor.idmedecin, doctor.prenom, doctor.nom, doctor.specialite, doctor.anneesexperience, doctor.idservice];
            const queryText = `INSERT INTO Medecins (idMedecin, prenom, nom, specialite, anneesExperience, idService) VALUES($1,$2,$3,$4,$5,$6);`;
            const res = yield client.query(queryText, values);
            client.release();
            return res;
        });
    }
    getService() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM Services;`);
            client.release();
            return res;
        });
    }
};
DatabaseService = __decorate([
    (0, inversify_1.injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map