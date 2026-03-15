import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../../api/adminApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const statsRes = await adminApi.getStats();
        setStats(statsRes.data);

        const chartRes = await adminApi.getRevenueChart();
        setChartData(chartRes.data);

      } catch (error) {

        console.error("Dashboard error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);


  if (loading)
    return (
      <AdminLayout>
        <p className="text-center mt-20 text-gray-500">
          Loading dashboard...
        </p>
      </AdminLayout>
    );


  if (!stats)
    return (
      <AdminLayout>
        <p className="text-center mt-20 text-red-500">
          Không tải được dữ liệu
        </p>
      </AdminLayout>
    );


  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>


      {/* STAT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            {(stats.revenue ?? 0).toLocaleString()} đ
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-2xl font-bold">
            {stats.orders}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Users</p>
          <h2 className="text-2xl font-bold">
            {stats.users}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Products</p>
          <h2 className="text-2xl font-bold">
            {stats.products}
          </h2>
        </div>

      </div>


      {/* CHART */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Revenue by Month
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </AdminLayout>

  );

}