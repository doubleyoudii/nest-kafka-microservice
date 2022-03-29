import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './create-order-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    // Emit event to the Billing Service
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent(randomString, userId, price),
    );
  }
}
