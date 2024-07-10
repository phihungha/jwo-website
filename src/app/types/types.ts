export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
  unitPrice: string;
  linePrice: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
