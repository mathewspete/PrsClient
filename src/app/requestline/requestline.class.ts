import { Product } from "../product/product.class"

export class Requestline {
    id: Number = 0;
    requestId: Number;
    quantity: number = 0;
    productId: Number;
    product: Product;
}
