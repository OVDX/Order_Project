declare class OrderItemDto {
    product: string;
    quantity: number;
}
export declare class CreateOrderDto {
    orderNumber: string;
    client: string;
    items: OrderItemDto[];
}
export {};
