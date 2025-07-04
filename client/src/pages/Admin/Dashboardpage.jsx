import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

// Mock data for different periods
const salesTargetData = {
  Weekly: { current: 260, target: 400 },
  Monthly: { current: 1200, target: 2000 },
  Annually: { current: 15000, target: 24000 }
};

const mockDashboardData = {
  totalSales: 23890,
  orders: 1543,
  customers: 789,
  totalProfit: 7250,
  salesOverview: [
    { month: "Jan", sales: 3200 },
    { month: "Feb", sales: 4100 },
    { month: "Mar", sales: 3900 },
    { month: "Apr", sales: 5100 },
    { month: "May", sales: 4570 },
    { month: "Jun", sales: 5120 },
  ],
  salesPrev: [
    { label: "Jan", value: 3200 },
    { label: "Feb", value: 4100 },
    { label: "Mar", value: 3900 },
    { label: "Apr", value: 5100 },
    { label: "May", value: 4570 },
    { label: "Jun", value: 5120 },
  ],
  profitPrev: [
    { label: "Jan", value: 900 },
    { label: "Feb", value: 1100 },
    { label: "Mar", value: 950 },
    { label: "Apr", value: 1300 },
    { label: "May", value: 1200 },
    { label: "Jun", value: 1700 },
  ],
};

const COLORS = ["#3b82f6", "#e5e7eb"]; // Blue and light gray

export default function DashboardPage() {
  const [targetPeriod, setTargetPeriod] = useState("Weekly");
  const salesTarget = salesTargetData[targetPeriod];
  const salesTargetPercent = Math.round((salesTarget.current / salesTarget.target) * 100);
  const circularChartData = [
    { name: "Achieved", value: salesTargetPercent },
    { name: "Remaining", value: 100 - salesTargetPercent },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Welcome to the Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Sales Card with Previous Chart */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 mb-2">Total Sales</span>
          <span className="text-2xl font-bold mb-2">
            ${mockDashboardData.totalSales.toLocaleString()}
          </span>
          <div className="w-full h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockDashboardData.salesPrev}>
                <Area type="monotone" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Orders Card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 mb-2">Orders</span>
          <span className="text-2xl font-bold mb-2">
            {mockDashboardData.orders.toLocaleString()}
          </span>
        </div>
        {/* Customers Card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 mb-2">Customers</span>
          <span className="text-2xl font-bold mb-2">
            {mockDashboardData.customers.toLocaleString()}
          </span>
        </div>
        {/* Total Profit Card with Previous Chart */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <span className="text-gray-500 mb-2">Total Profit</span>
          <span className="text-2xl font-bold mb-2">
            ${mockDashboardData.totalProfit.toLocaleString()}
          </span>
          <div className="w-full h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockDashboardData.profitPrev}>
                <Area type="monotone" dataKey="value" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales Target Circular Progress Card with Dropdown */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col md:flex-row items-center justify-between max-w-md">
        <div>
          <div className="flex items-center mb-2">
            <span className="font-semibold text-lg">Sales target</span>
            <select
              className="ml-3 px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium outline-none"
              value={targetPeriod}
              onChange={e => setTargetPeriod(e.target.value)}
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
          <div className="text-2xl font-bold">
            {salesTarget.current}{" "}
            <span className="text-gray-400 font-normal">/ {salesTarget.target} Units</span>
          </div>
          <div className="text-gray-500 text-sm mt-1">Made this {targetPeriod.toLowerCase()}</div>
        </div>
        <div className="w-24 h-24">
          <PieChart width={96} height={96}>
            <Pie
              data={circularChartData}
              cx="50%"
              cy="50%"
              innerRadius={34}
              outerRadius={44}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {circularChartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
              ))}
            </Pie>
            <text
              x={48}
              y={52}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-lg font-semibold"
              fill="#222"
            >
              {salesTargetPercent}%
            </text>
          </PieChart>
        </div>
      </div>

      {/* Sales Overview Line Chart */}
      <div className="bg-white rounded-2xl shadow p-8 mb-8">
        <p className="text-gray-600 mb-4">Sales Overview</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockDashboardData.salesOverview}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
