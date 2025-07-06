import { useState } from "react";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const startEdit = (tx) => {
    setEditingId(tx._id);
    setFormData({
      description: tx.description,
      amount: tx.amount,
      date: tx.date.slice(0, 10),
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await onEdit(editingId, formData);
    setEditingId(null);
    setFormData({ description: "", amount: "", date: "" });
  };

  return (
    <div className="mt-6 max-w-xl mx-auto border rounded-lg p-4 space-y-2">
      {transactions.map((tx) => (
        <div key={tx._id} className="border-b pb-2">
          {editingId === tx._id ? (
            <form onSubmit={handleEditSubmit} className="space-y-1">
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border px-2 py-1 w-full"
                placeholder="Description"
              />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: +e.target.value })
                }
                className="border px-2 py-1 w-full"
                placeholder="Amount"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border px-2 py-1 w-full"
              />
              <div className="flex gap-2 mt-1">
                <button type="submit" className="text-green-600 text-sm">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">₹{tx.amount}</p>
                <div className="flex gap-2 text-sm mt-1">
                  <button
                    onClick={() => startEdit(tx)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(tx._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
