
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-pink-100 via-white to-blue-100">
      <Sidebar/>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
