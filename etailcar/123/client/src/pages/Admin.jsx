import React, { useState } from "react";
import { AppBar, Tabs, Tab, Typography, Box } from "@mui/material";
import Dashboard from "./Dashboard";
import AdminCar from "./CardAdmin";
import Invoice from "./Order";
import Header from "../components/Header";
import RentCarAdmin from "./RentCarAdmin";

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div >
      <Header />
      <div className="flex h-[calc(100vh-72px)]">
        <div className="flex w-[160px]">
          <Tabs className="w-full"
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary" 
            variant="fullWidth" 
            orientation="vertical"
          >
            <Tab sx={{fontSize: '12px'}} label="Thống kê dữ liệu"/>
            <Tab sx={{fontSize: '12px'}}  label="Quản lý xe" />
            <Tab label="Quản lý thuê xe" sx={{fontSize: '12px'}} />
            <Tab label="Hóa đơn" sx={{fontSize: '12px'}} />
          </Tabs>
        </div>
        <div className="flex-1">
        <TabPanel value={selectedTab} index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <AdminCar />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <RentCarAdmin />
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <Invoice />
        </TabPanel>
        </div>
      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ padding: "16px", width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default AdminPage;
