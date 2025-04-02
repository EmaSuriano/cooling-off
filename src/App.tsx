import { useState, useEffect } from "react";
import PurchaseForm from "./components/PurchaseForm";
import EssentialResult from "./components/EssentialResult";
import NonEssentialResult from "./components/NonEssentialResult";
import WaitingList from "./components/WaitingList";
import { PurchaseItem } from "./types";

// Storage key constant to ensure consistency
const STORAGE_KEY = "coolingOffItems";

function App() {
  const [essentialResult, setEssentialResult] = useState<PurchaseItem | null>(
    null
  );
  const [nonEssentialResult, setNonEssentialResult] =
    useState<PurchaseItem | null>(null);
  const [waitingList, setWaitingList] = useState<PurchaseItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load waiting list from localStorage on component mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        // Validate that it's an array before setting state
        if (Array.isArray(parsedItems)) {
          setWaitingList(parsedItems);
        } else {
          console.error("Saved items is not an array:", parsedItems);
          // Initialize with empty array if data is invalid
          setWaitingList([]);
        }
      }
    } catch (error) {
      console.error("Error parsing saved items:", error);
      // Initialize with empty array if there's an error
      setWaitingList([]);
    } finally {
      // Mark as loaded regardless of outcome
      setIsLoaded(true);
    }
  }, []);

  // Save waiting list to localStorage whenever it changes
  // Only run after initial load to prevent overwriting with empty array
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(waitingList));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [waitingList, isLoaded]);

  // Add an effect to update expired items
  useEffect(() => {
    // Check once per minute if any items have completed their cooling period
    const intervalId = setInterval(() => {
      const now = new Date();
      let hasExpiredItems = false;

      // Check each item for expiration
      waitingList.forEach((item) => {
        if (item.targetDate && new Date(item.targetDate) <= now) {
          hasExpiredItems = true;
        }
      });

      // If we found expired items, update the UI to reflect this
      if (hasExpiredItems) {
        // Force a re-render without changing the data
        setWaitingList([...waitingList]);
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
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
    // Add a unique ID to each item to help with management
    const itemWithId = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setWaitingList([...waitingList, itemWithId]);
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
