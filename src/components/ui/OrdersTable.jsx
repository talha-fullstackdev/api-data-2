import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "../ui/Card";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const statusVariants = {
    Delivered: "bg-green-100 text-green-800",
    Process: "bg-blue-100 text-blue-800",
    Canceled: "bg-red-100 text-red-800",
    Dollmersi: "bg-purple-100 text-purple-800",
  };

  const mockProducts = [
    "Hat", "Laptop", "Phone", "Bag", "Headset",
    "Mouse", "Clock", "T-shirt", "Monitor", "Keyboard"
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [page1, page2] = await Promise.all([
          axios.get("https://reqres.in/api/users?page=1"),
          axios.get("https://reqres.in/api/users?page=2"),
        ]);

        const allUsers = [...page1.data.data, ...page2.data.data];

        const transformedData = allUsers.slice(0, 10).map((item, index) => ({
          trackingId: `#${10000 + index}`,
          product: mockProducts[index % mockProducts.length],
          customer: `${item.first_name} ${item.last_name}`,
          date: new Date(2022, index % 12, (index % 28) + 1).toLocaleDateString('en-GB'),
          amount: `$${(100 + Math.random() * 9000).toFixed(2)}`,
          paymentMode: index % 2 === 0 ? "Transfer Bank" : "Cash on Delivery",
          status: ["Delivered", "Process", "Canceled", "Dollmersi"][index % 4],
        }));

        setOrders(transformedData);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    const filtered = orders.filter((order) => order.trackingId !== id);
    setOrders(filtered);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Orders</h2>
          <Button disabled>Add Customer</Button>
        </div>
        <Card className="text-center">Loading orders...</Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <Card className="text-center text-red-600">Failed to fetch orders. Please try again later.</Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Orders</h2>
        <Button>Add Customer</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left font-medium text-gray-600">Tracking ID</th>
                <th className="p-3 text-left font-medium text-gray-600">Product</th>
                <th className="p-3 text-left font-medium text-gray-600">Customer</th>
                <th className="p-3 text-left font-medium text-gray-600">Date</th>
                <th className="p-3 text-left font-medium text-gray-600">Amount</th>
                <th className="p-3 text-left font-medium text-gray-600">Payment Mode</th>
                <th className="p-3 text-left font-medium text-gray-600">Status</th>
                <th className="p-3 text-right font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{order.trackingId}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3 font-medium">{order.amount}</td>
                  <td className="p-3">{order.paymentMode}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusVariants[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100"
                        onClick={() => handleDelete(order.trackingId)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default OrdersTable;
