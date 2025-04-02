export interface PurchaseItem {
  itemName: string;
  itemPrice: number;
  isEssential: string;
  itemReason: string;
  waitingPeriod?: string;
  reminderDate?: string;
  id?: string; // Optional ID for item management
  createdDate?: string; // ISO string of when the item was created
  targetDate?: string; // ISO string of when the cooling period ends
}
