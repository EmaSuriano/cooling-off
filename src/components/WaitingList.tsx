import { PurchaseItem } from '../types';

interface WaitingListProps {
  items: PurchaseItem[];
  onRemoveItem: (index: number) => void;
}

const WaitingList = ({ items, onRemoveItem }: WaitingListProps) => {
  if (items.length === 0) {
    return (
      <p className="text-gray-500">
        Items you're considering will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b pb-4"
        >
          <div>
            <p className="font-medium">{item.itemName}</p>
            <p className="text-sm text-gray-600">
              ${item.itemPrice.toFixed(2)} • Waiting until: {item.reminderDate}{' '}
              ({item.waitingPeriod})
            </p>
          </div>
          <button
            onClick={() => onRemoveItem(index)}
            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default WaitingList;
