import { PurchaseItem } from "../types";

interface EssentialResultProps {
  item: PurchaseItem;
  onAddToEssentials: () => void;
}

const EssentialResult = ({ item, onAddToEssentials }: EssentialResultProps) => {
  return (
    <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 rounded-lg shadow-md p-6 mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Purchase Assessment</h2>
      <p className="mb-2">
        You've indicated this is an <strong>essential purchase</strong>.
      </p>
      <p className="mb-4">
        For essential items, it's reasonable to proceed with the purchase, but
        still consider:
      </p>
      <ul className="list-disc pl-5 mb-6">
        <li className="mb-1">
          Could you find a better price by shopping around?
        </li>
        <li className="mb-1">
          Are there more affordable alternatives that would meet your needs?
        </li>
        <li className="mb-1">Does this fit within your current budget?</li>
      </ul>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm">
        <h3 className="font-medium text-lg mb-2">{item.itemName}</h3>
        <p className="mb-1">Price: ${item.itemPrice.toFixed(2)}</p>
        <p>Reason: {item.itemReason}</p>
      </div>

      <button
        onClick={onAddToEssentials}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
      >
        Acknowledge
      </button>
    </div>
  );
};

export default EssentialResult;
