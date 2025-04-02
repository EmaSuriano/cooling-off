import { useState, useEffect } from "react";
import PurchaseForm from "./components/PurchaseForm";
import EssentialResult from "./components/EssentialResult";
import NonEssentialResult from "./components/NonEssentialResult";
import WaitingList from "./components/WaitingList";
import { PurchaseItem } from "./types";

function App() {
  const [essentialResult, setEssentialResult] = useState<PurchaseItem | null>(
    null
  );
  const [nonEssentialResult, setNonEssentialResult] =
    useState<PurchaseItem | null>(null);
  const [waitingList, setWaitingList] = useState<PurchaseItem[]>([]);

  // Load waiting list from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("coolingOffItems");
    if (savedItems) {
      try {
        setWaitingList(JSON.parse(savedItems));
      } catch (error) {
        console.error("Error parsing saved items:", error);
      }
    }
  }, []);

  // Save waiting list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("coolingOffItems", JSON.stringify(waitingList));
  }, [waitingList]);

  const handleFormSubmit = (item: PurchaseItem) => {
    // Reset previous results
    setEssentialResult(null);
    setNonEssentialResult(null);

    if (item.isEssential === "yes") {
      setEssentialResult(item);
    } else {
      setNonEssentialResult(item);
    }
  };

  const addToWaitingList = (item: PurchaseItem) => {
    setWaitingList([...waitingList, item]);
    setNonEssentialResult(null);
  };

  const removeFromWaitingList = (index: number) => {
    const updatedList = [...waitingList];
    updatedList.splice(index, 1);
    setWaitingList(updatedList);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 text-gray-800 dark:text-gray-200">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-8">
          🛒 Cooling-Off Period Purchase Assistant
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            New Purchase Consideration
          </h2>
          <PurchaseForm onSubmit={handleFormSubmit} />
        </div>

        {essentialResult && (
          <EssentialResult
            item={essentialResult}
            onAddToEssentials={() => setEssentialResult(null)}
          />
        )}

        {nonEssentialResult && (
          <NonEssentialResult
            item={nonEssentialResult}
            onAddToWaitlist={addToWaitingList}
          />
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Your Cooling-Off Waiting List
          </h2>
          <WaitingList
            items={waitingList}
            onRemoveItem={removeFromWaitingList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
