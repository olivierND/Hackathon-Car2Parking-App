import { Container } from 'inversify';
import { App } from './app';
import { RoutesForm } from './RoutesForm';
import Types from './Types';
import { RoutesParkingData } from './routes-parking-data/routes-parking-data';
import { SocketServerService } from './socket-io.service';

const container: Container = new Container();

container.bind('App').to(App);
container.bind(Types.RoutesForm).to(RoutesForm);

container.bind(Types.RoutesParkingData).to(RoutesParkingData);

container.bind(Types.SocketServerService).to(SocketServerService).inSingletonScope();

export { container };
