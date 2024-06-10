import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import CompanyNavbar from "./component/CompanyNavbar";
import Home from "./pages/Home";
import CompanySidebar from "./component/CompanySidebar";
import CompanyProfile from "./pages/CompanyProfile";
import ReviewManagement from "./pages/ReviewManagement";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isResponsive, setIsResponsive] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenSidebar = () => {
    setIsResponsive(!isResponsive);
  };

  const handleTabs = (tab) => {
    setActiveTab(tab);
    if (isResponsive) {
      setIsResponsive(false);
    }
  };

  return (
    <div className="flex">
      <CompanySidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleTabs={handleTabs}
        activeTab={activeTab}
      />
      <div className={`w-full h-full bg-slate-100 flex flex-col relative`}>
        <div className="bg-white">
          <div
            className="absolute left-3 top-5 cursor-pointer block sm:block md:block lg:hidden"
            onClick={handleOpenSidebar}
          >
            <CiMenuBurger />
          </div>
          <div className="max-w-5xl m-auto">
            <CompanyNavbar handleTabs={handleTabs} />
          </div>
        </div>
        <div className="w-full max-w-5xl m-auto">
          {activeTab === "home" && <Home />}
          {activeTab === "profile" && <CompanyProfile />}
          {activeTab === "reviewManagement" && <ReviewManagement />}
        </div>
      </div>
    </div>
  );
}
