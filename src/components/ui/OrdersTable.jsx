import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "../ui/Card";
import axios from "axios";
import { mockProducts } from "./data";
import OrdersUI from "./OrdersUI";
const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    const properties ={
      handleDelete,
      orders,
      setOrders,
      loading,
      setLoading,
      error,
      setError
    }
  return (
     <OrdersUI properties={properties}/>
  );
};

export default OrdersTable;
