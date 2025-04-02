import { PurchaseItem } from "../types";
import TimerProgressBar from "./TimerProgressBar";

interface WaitingListProps {
  items: PurchaseItem[];
  onRemoveItem: (index: number) => void;
}

const WaitingList = ({ items, onRemoveItem }: WaitingListProps) => {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        Items you're considering will appear here.
      </p>
    );
  }

  // Sort items by target date (earliest first)
  const sortedItems = [...items].sort((a, b) => {
    if (!a.targetDate || !b.targetDate) return 0;
    return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
  });

  return (
    <div className="space-y-6">
      {sortedItems.map((item, index) => (
        <div
          key={index}
          className="border dark:border-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="">
              <p className="font-medium">
                {item.itemName}
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 italic">
                  Reason: {item.itemReason}
                </p>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ${item.itemPrice.toFixed(2)} • {item.waitingPeriod} cooling
                period
              </p>
            </div>

            <div className="flex flex-col items-end">
              <button
                onClick={() => onRemoveItem(index)}
                className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
              {item.reminderDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Target date: {item.reminderDate}
                </p>
              )}
            </div>
          </div>

          {item.createdDate && item.targetDate && (
            <TimerProgressBar
              createdDate={item.createdDate}
              targetDate={item.targetDate}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default WaitingList;
