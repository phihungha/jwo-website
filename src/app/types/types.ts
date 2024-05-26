export interface ShoppingEvent {
  time: number;
  type: string;
  item_names: string[];
}
export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
}
