import { useState, FormEvent } from "react";
import { PurchaseItem } from "../types";

interface PurchaseFormProps {
  onSubmit: (item: PurchaseItem) => void;
}

const PurchaseForm = ({ onSubmit }: PurchaseFormProps) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [isEssential, setIsEssential] = useState("");
  const [itemReason, setItemReason] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const price = parseFloat(itemPrice);
    if (isNaN(price) || price < 0) {
      alert("Please enter a valid price");
      return;
    }

    const waitingPeriod = determineWaitingPeriod(price);
    const createdDate = new Date();
    const targetDate = calculateTargetDate(waitingPeriod, createdDate);

    const purchaseItem: PurchaseItem = {
      itemName,
      itemPrice: price,
      isEssential,
      itemReason: itemReason || "No reason provided",
      waitingPeriod,
      createdDate: createdDate.toISOString(),
      targetDate: targetDate.toISOString(),
      reminderDate: targetDate.toLocaleDateString(),
    };

    onSubmit(purchaseItem);

    // Keep form values (don't reset) for better UX
  };

  // Determine appropriate waiting period based on price
  const determineWaitingPeriod = (price: number): string => {
    if (price < 50) {
      return "24 hours";
    } else if (price < 100) {
      return "48 hours";
    } else if (price < 500) {
      return "1 week";
    } else {
      return "30 days";
    }
  };

  // Calculate the target date based on waiting period
  const calculateTargetDate = (
    waitingPeriod: string,
    startDate: Date
  ): Date => {
    const targetDate = new Date(startDate);

    if (waitingPeriod === "24 hours") {
      targetDate.setDate(targetDate.getDate() + 1);
    } else if (waitingPeriod === "48 hours") {
      targetDate.setDate(targetDate.getDate() + 2);
    } else if (waitingPeriod === "1 week") {
      targetDate.setDate(targetDate.getDate() + 7);
    } else {
      targetDate.setDate(targetDate.getDate() + 30);
    }

    return targetDate;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="item-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          What do you want to buy?
        </label>
        <input
          type="text"
          id="item-name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                     text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="e.g., Wireless headphones"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="item-price"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Price ($)
        </label>
        <input
          type="number"
          id="item-price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                     text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
          min="0"
          step="0.01"
          placeholder="e.g., 99.99"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="item-essential"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Is this purchase essential?
        </label>
        <select
          id="item-essential"
          value={isEssential}
          onChange={(e) => setIsEssential(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                     text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">-- Please select --</option>
          <option value="yes">Yes (necessity for daily living)</option>
          <option value="no">No (want rather than need)</option>
          <option value="maybe">Not sure</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="item-reason"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Why do you want this item?
        </label>
        <textarea
          id="item-reason"
          value={itemReason}
          onChange={(e) => setItemReason(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                     text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., My current headphones are broken and I need them for work calls"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Get Advice
      </button>
    </form>
  );
};

export default PurchaseForm;
