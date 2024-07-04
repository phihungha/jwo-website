export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
  unitPrice: number;
  linePrice: number;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
