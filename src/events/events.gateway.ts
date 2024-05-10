import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {} from '@nestjs/platform-socket.io';
import { Server, Socket } from 'socket.io';
import { Inject, Logger, forwardRef } from '@nestjs/common';
import { StockService } from 'src/stock/stock.service';
import { BuysellService } from 'src/buysell/buysell.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    // methods: ['GET', 'POST'],
    // transports: ['websocket', 'polling'],
    // credentials: true,
  },
  // allowEIO3: true,
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => StockService))
    private stockService: StockService,
    @Inject(forwardRef(() => BuysellService))
    private buysellService: BuysellService,
  ) {}

  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() server: Server;

  @SubscribeMessage('updateStockRequest')
  async handleUpdateStock(client: Socket, payload: any) {
    const data = await this.stockService.getStockByName(payload);
    this.logger.log(`Data send to client: ${data.length}`);

    const sanData = this.stockService.getSan();

    client.emit('updateStock', { data, sanData });
  }

  afterInit(server: Server) {
    console.log(server);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnect: ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    // delete
    this.logger.log(`Client connected: ${client.id}`);
    console.log(args);
  }

  async sendStockUpdateSignal() {
    this.logger.log(`Emit stock update signal`);

    this.server.emit('stockUpdated', true);
  }
}
