export class Service {
    idservice: number;
    nomservice: string;
    public constructor(init?: Partial<Service>) {
              Object.assign(this, init);
          }
      }
