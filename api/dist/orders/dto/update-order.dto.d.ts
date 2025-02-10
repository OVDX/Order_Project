declare class OrderItemDto {
    product?: string;
    quantity?: number;
}
export declare class UpdateOrderDto {
    orderNumber?: string;
    client?: string;
    items?: OrderItemDto[];
    status?: string;
}
export {};
