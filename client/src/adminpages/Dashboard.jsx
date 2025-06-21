// src/adminpages/AdminDashboard.jsx
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function AdminDashboard() {
  const kpis = [
    { title: "Total User", value: "40,689", change: "8.5%", arrow: "up", icon: "👥" },
    { title: "Total Order", value: "10,293", change: "1.3%", arrow: "up", icon: "📦" },
    { title: "Total Sales", value: "$89,000", change: "4.3%", arrow: "down", icon: "📈" },
    { title: "Total Pending", value: "2,040", change: "1.8%", arrow: "up", icon: "⏳" },
  ];

  const chartData = {
    labels: Array.from({ length: 12 }).map((_, i) => `${(i + 1) * 5}k`),
    datasets: [
      {
        data: [20, 45, 30, 50, 40, 60, 55, 65, 60, 70, 55, 60],
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
        pointBackgroundColor: "white",
      },
    ],
  };

  const deals = [
    { name: "Apple Watch", location: "6096 Marjolaine Landing", date: "12.09.2019", pcs: 423, amount: "$34,295", status: "Delivered" },
    // ...more deals
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <div className="text-3xl">{kpi.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{kpi.title}</p>
              <p className="text-xl font-semibold">{kpi.value}</p>
              <p className={`text-sm ${kpi.arrow === "up" ? "text-green-500" : "text-red-500"}`}>
                {kpi.arrow === "up" ? "▲ " : "▼ "}
                {kpi.change}
                {kpi.arrow === "up" ? " Up" : " Down"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <p className="text-lg font-medium mb-4">Sales Details</p>
        <Line data={chartData} />
      </div>

      {/* Deals Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg font-medium mb-4">Deals Details</p>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              {["Product Name", "Location", "Date - Time", "Piece", "Amount", "Status"].map((t) => (
                <th key={t} className="py-2">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="py-3">{deal.name}</td>
                <td className="py-3">{deal.location}</td>
                <td className="py-3">{deal.date}</td>
                <td className="py-3">{deal.pcs}</td>
                <td className="py-3">{deal.amount}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${deal.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-gray-100"}`}>
                    {deal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
