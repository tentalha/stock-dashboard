import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

const Header: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome, {currentUser?.name || "Guest"}
          </span>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {currentUser?.name?.charAt(0) || "G"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
