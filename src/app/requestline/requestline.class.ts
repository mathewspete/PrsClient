import { Product } from "../product/product.class"

export class Requestline {
    id: number = 0;
    requestId: number;
    quantity: number = 0;
    productId: number;
    product: Product;
}
