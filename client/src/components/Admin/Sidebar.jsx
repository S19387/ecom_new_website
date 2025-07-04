import { useState } from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaEnvelope,
  FaTags,
  FaShoppingCart,
  FaMoneyBill,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <FaChartPie /> },
  { name: "Statistics", path: "/dashboard/statistics", icon: <FaChartPie /> },
  { name: "Payments", path: "/dashboard/payments", icon: <FaMoneyBill /> },
  {
    name: "Orders",
    icon: <FaShoppingCart />,
    subMenu: [
      { name: "List", path: "/dashboard/orders", type: "link" },
      { name: "Create", path: "/dashboard/orders/create", type: "link" },
      { name: "Edit", path: "/dashboard/orders/edit/:orderId", type: "label" }, // label for highlight only
      { name: "Details", path: "/dashboard/orders/:orderId", type: "label" },   // label for highlight only
    ],
  },
  { name: "Category", path: "/dashboard/category", icon: <FaTags /> },
  { name: "Users", path: "/dashboard/users", icon: <FaUsers /> },
  { name: "Messages", path: "/dashboard/messages", icon: <FaEnvelope /> },
  { name: "Reviews", path: "/dashboard/reviews", icon: <FaStar /> },
];

const bottom = [
  { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Checks for both static and dynamic matches
  const isSubMenuActive = (subMenu) =>
    subMenu.some((item) =>
      item.type === "label"
        ? matchPath({ path: item.path, end: false }, location.pathname)
        : location.pathname === item.path
    );

  return (
    <aside
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-white border-r flex flex-col shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-6 border-b">
        {!collapsed && (
          <h1 className="font-bold text-2xl text-purple-700 tracking-wide">
            INNOCART
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="text-purple-700 text-xl focus:outline-none"
          title="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="mt-2">
          {menu.map((item) =>
            item.subMenu ? (
              <li key={item.name}>
                <button
                  onClick={() =>
                    setOpenMenus((prev) => ({
                      ...prev,
                      [item.name]: !prev[item.name],
                    }))
                  }
                  className={`flex items-center w-full ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-6 py-3 mx-2 rounded-md transition-all duration-200 ${
                    isSubMenuActive(item.subMenu) || openMenus[item.name]
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "text-gray-700 hover:bg-purple-50"
                  }`}
                >
                  {item.icon}
                  {!collapsed && (
                    <>
                      <span>{item.name}</span>
                      <span className="ml-auto">
                        {openMenus[item.name] ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </>
                  )}
                </button>
                {!collapsed && openMenus[item.name] && (
                  <ul className="ml-8 mt-1">
                    {item.subMenu.map((sub) =>
                      sub.type === "link" ? (
                        <li key={sub.name}>
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 rounded-md text-sm ${
                                isActive
                                  ? "bg-purple-200 text-purple-800 font-semibold"
                                  : "text-gray-600 hover:bg-purple-50"
                              }`
                            }
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      ) : (
                        <li key={sub.name}>
                          <span
                            className={`block px-4 py-2 rounded-md text-sm cursor-default ${
                              matchPath({ path: sub.path, end: false }, location.pathname)
                                ? "bg-purple-200 text-purple-800 font-semibold"
                                : "text-gray-400"
                            }`}
                          >
                            {sub.name}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center ${
                      collapsed ? "justify-center" : "gap-3"
                    } px-6 py-3 mx-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-purple-100 text-purple-700 font-semibold"
                        : "text-gray-700 hover:bg-purple-50"
                    }`
                  }
                  end={item.path === "/dashboard"}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div
          className={`${
            collapsed
              ? "hidden"
              : "mt-6 px-4 text-xs text-gray-500 uppercase font-semibold"
          }`}
        >
          Settings
        </div>
        <ul className="mt-2">
          {bottom.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } px-6 py-3 mx-2 rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200`}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="text-center text-xs text-gray-400 p-4">
          &copy; {new Date().getFullYear()} Innocart
        </div>
      )}
    </aside>
  );
}
