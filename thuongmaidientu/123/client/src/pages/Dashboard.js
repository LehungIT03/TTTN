import React from 'react';
import RevenueReport from '../components/Dashboard/RevenueReport';
import RevenueTable from '../components/Dashboard/RevenueTable';
import MostRentedCars from '../components/MostRentedCars ';

const Dashboard = () => {
  return (
    <div>
      <h1>Thống kê dữ liệu</h1>
      {/* Nội dung thống kê ở đây */}
      <RevenueTable />
      <MostRentedCars /> 
    </div>
  );
};

export default Dashboard;
