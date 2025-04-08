import React from "react";
import { Button } from "@/components/ui/button";
import Card from "../ui/Card";
import { statusVariants} from "./data";
import { Pencil, Trash2 } from "lucide-react";

const OrdersUI = ({properties}) => {
  const {
    handleDelete,
    orders,
  } = properties;
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
                <th className="p-3 text-left font-medium text-gray-600">
                  Tracking ID
                </th>
                <th className="p-3 text-left font-medium text-gray-600">
                  Product
                </th>
                <th className="p-3 text-left font-medium text-gray-600">
                  Customer
                </th>
                <th className="p-3 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="p-3 text-left font-medium text-gray-600">
                  Amount
                </th>
                <th className="p-3 text-left font-medium text-gray-600">
                  Payment Mode
                </th>
                <th className="p-3 text-left font-medium text-gray-600">
                  Status
                </th>
                <th className="p-3 text-right font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{order.trackingId}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3 font-medium">{order.amount}</td>
                  <td className="p-3">{order.paymentMode}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        statusVariants[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100"
                      >
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

export default OrdersUI;
