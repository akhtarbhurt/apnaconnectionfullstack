import React, { useState } from "react";
import AdminNavbar from "./component/AdminNavbar";
import Sidebar from "./component/Sidebar";
import HomePage from "./pages/HomePage";
import Activity from "./pages/Activity";
import { CiMenuBurger } from "react-icons/ci";
import Setting from "./pages/Setting";
import CompanySection from "./pages/CompanySection";
import AddCompany from "./pages/AddCompany";
import HomeContent from "./pages/HomeContent";
import FooterContent from "./pages/FooterContent";
import AddBlog from "./pages/AddBlog";
import BlogTable from "./pages/BlogTable";
import HomeTable from "./pages/HomeTable";
import Heading from "./pages/Heading";
import Categories from "./pages/Categories";
import Section from "./pages/Section";
import ClientFeedback from "./pages/ClientFeedback";
import Report from "./pages/Report";

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isResponsive, setIsResponsive] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

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
      <div>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isResponsive={isResponsive}
          handleOpenSidebar={handleOpenSidebar}
          handleTabs={handleTabs} 
          activeTab={activeTab}
        />
      </div>
      <div className={`w-full h-full bg-slate-100 flex flex-col relative`}>
        <div className="bg-white">
          <div
            className="absolute left-3 top-5 cursor-pointer block sm:block md:block lg:hidden"
            onClick={handleOpenSidebar}
          >
            <span>
              <CiMenuBurger />
            </span>
          </div>
          <div className="max-w-5xl m-auto">
            <AdminNavbar />
          </div>
        </div>
        <div className="w-full max-w-5xl m-auto">
          {activeTab === 'home' && <HomePage />} 
          {activeTab === 'setting' && <Setting />} 
          {activeTab === 'companyList' && <CompanySection />}
          { activeTab === 'addCompany' && <AddCompany/> }
          { activeTab === "layout" && < Heading handleTabs={handleTabs} /> }
          {activeTab === 'footerContent' && <FooterContent/> }
          {activeTab === 'category' && <Categories/> }
          {activeTab === "addBlog" && <AddBlog/> }
          {activeTab === "blogTable" && <BlogTable/> }
          { activeTab === "homeTable" && <HomeTable handleTabs={handleTabs}  /> }
          {activeTab === "section" && <Section/>  }
          { activeTab === "clientManagement" && <ClientFeedback/> }
          {activeTab === "report" && <Report/> }
        </div>
      </div>
    </div>
  );
}
