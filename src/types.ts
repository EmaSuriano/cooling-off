export interface PurchaseItem {
  itemName: string;
  itemPrice: number;
  isEssential: string;
  itemReason: string;
  waitingPeriod?: string;
  reminderDate?: string;
}
