import { PurchaseItem } from '../types';

interface NonEssentialResultProps {
  item: PurchaseItem;
  onAddToWaitlist: (item: PurchaseItem) => void;
}

const NonEssentialResult = ({
  item,
  onAddToWaitlist,
}: NonEssentialResultProps) => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md p-6 mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">
        Cooling-Off Period Recommended
      </h2>
      <p className="mb-2">
        You've indicated this is a <strong>non-essential purchase</strong>.
      </p>
      <p className="mb-4">
        I recommend implementing a cooling-off period before deciding:
      </p>

      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <h3 className="font-medium text-lg mb-2">{item.itemName}</h3>
        <p className="mb-1">Price: ${item.itemPrice.toFixed(2)}</p>
        <p className="mb-3">Reason: {item.itemReason}</p>
        <p className="mb-2">
          Recommended waiting period:
          <span className="ml-1 font-bold text-red-600">
            {item.waitingPeriod}
          </span>
        </p>
        <div className="text-gray-600 italic mb-3">
          If you decide not to buy this item, you'll save $
          {item.itemPrice.toFixed(2)}
        </div>
        <p className="text-blue-600 font-medium">
          Set a calendar reminder for {item.reminderDate} to reconsider this
          purchase.
        </p>
      </div>

      <button
        onClick={() => onAddToWaitlist(item)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Add to Waiting List
      </button>
    </div>
  );
};

export default NonEssentialResult;
