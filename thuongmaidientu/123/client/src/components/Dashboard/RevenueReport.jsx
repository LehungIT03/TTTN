import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { saveAs } from 'file-saver';
import axios from "axios";

const RevenueReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get("/revenue-report", {
        params: { startDate, endDate },
        responseType: "blob", // Đảm bảo dữ liệu trả về là một file
      });

      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "Revenue_Report.xlsx");
    } catch (error) {
      console.error("Error downloading the report", error);
    }
  };

  return (
    <div>
      <h1>Revenue Report</h1>
      <TextField
        type="date"
        label="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        type="date"
        label="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleDownloadReport}>
        Download Report
      </Button>
    </div>
  );
};

export default RevenueReport;
