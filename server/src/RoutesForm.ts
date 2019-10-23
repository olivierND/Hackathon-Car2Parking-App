import { injectable } from 'inversify';
import { Router, Request, Response } from 'express';
import { MongoDB } from './BD/MongoDB';
import { WebService } from './WebService';

@injectable()
export class RoutesForm extends WebService {
    public readonly mainRoute: string = '/test';
    private _mongodb: MongoDB;

    public constructor() {
        super();
        this._mongodb = new MongoDB();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get('/', async (req: Request, res: Response) => {
            console.log(this._mongodb.isConnected());
        });

        return router;
    }
}