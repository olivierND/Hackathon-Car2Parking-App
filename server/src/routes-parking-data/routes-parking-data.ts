import { injectable, inject } from 'inversify';
import { WebService } from '../WebService';
import { Router, Request, Response } from 'express';
import { MongoDB } from '../BD/MongoDB';
import Types from '../Types';
import { SocketServerService } from '../socket-io.service';
import { Document } from 'mongoose';

const OK_STATUS: number = 200;
const TIMER_DELAY: number = 1000;

@injectable()
export class RoutesParkingData extends WebService {

    public readonly mainRoute: string;

    public constructor( @inject(Types.SocketServerService) private socket: SocketServerService,
                        private mongoDB: MongoDB = new MongoDB()) {
        super();
        this.mainRoute = '';
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get('/getParkingData', (req: Request, res: Response) => {
            this.mongoDB.model.find({ Occupation: 0 }, (err: Error, data: Document) => {
                res.status(OK_STATUS).json(data);
            });
        });

        router.post('/reservation/:id/:time', (req: Request, res: Response) => {
            this.mongoDB.model.findOneAndUpdate({ sNoPlace: req.params.id }, { $set: { Occupation: 1 } }).then((parkingSpot: Document) => {
                res.status(OK_STATUS).json(parkingSpot);
                const timeout: number = (req.params.time - 5) * TIMER_DELAY;
                setTimeout(() => {
                    this.socket.reservationOverNotif(req.params.id);
                    // this.mongoDB.model.findOneAndUpdate({ sNoPlace: req.params.id }, { $set: { Occupation: 0 } })
                    //     .then((parking: Document) => {
                    //         this.socket.reservationOver(parking);
                    //     });
                // tslint:disable-next-line:align
                }, timeout);
            });
        });

        router.post('/reservationAuto/:id/', (req: Request, res: Response) => {
            this.mongoDB.model.findOneAndUpdate({ sNoPlace: req.params.id }, { $set: { Occupation: 1 } })
                .then((parkingSpot: Document) => {
                    this.socket.reservation(req.params.id);
                    res.status(OK_STATUS).json(parkingSpot);
                });
        });

        router.post('/reservationOverInFive/:id/', (req: Request, res: Response) => {
            setTimeout(() => {
              this.mongoDB.model.findOneAndUpdate({ sNoPlace: req.params.id }, { $set: { Occupation: 0 } })
              .then((parkingSpot: Document) => {
                  this.socket.reservationOver(parkingSpot);
                  res.status(OK_STATUS).json(parkingSpot);
              });
            }, 5000);

        });

        router.post('/reservationOverInFive/:id/', (req: Request, res: Response) => {
          this.mongoDB.model.findOneAndUpdate({ sNoPlace: req.params.id }, { $set: { Occupation: 1 } })
              .then((parkingSpot: Document) => {
                  this.socket.reservation(req.params.id);
                  res.status(OK_STATUS).json(parkingSpot);
              });
      });

        return router;
    }

}
