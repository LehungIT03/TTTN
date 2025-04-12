import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { getReportData } from '../api';

const Invoice = () => {
  const [data, setData] = useState([]);

  const fetchRevenueData = async () => {
    try {
      const response = await getReportData();
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching revenue data", error);
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const generatePDF = (invoiceId) => {
    const element = document.getElementById(invoiceId);
    html2pdf().from(element).save();
  };
  
  return (
    <div className='h-screen' style={{overflowY: 'scroll', height: '100vh'}}>
      {data.map((item, index) => (
        <div key={index} id={`invoice-${index}`} className="invoice-container" style={styles.invoiceContainer}>
          <h1 style={styles.header}>Invoice</h1>

          {/* Invoice Info */}
          <div style={styles.invoiceInfo}>
            <p><strong>Invoice Date:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
            <p><strong>Invoice Number:</strong> #{Math.floor(Math.random() * 100000)}</p>
          </div>

          {/* Customer Info */}
          <div style={styles.customerInfo}>
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {item.userName || "Unknown"}</p>
            <p><strong>Email:</strong> {item.userEmail || "Unknown"}</p>
          </div>

          {/* Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Tên xe</th>
                <th>Đơn giá</th>
                <th>Loại xe</th>
                <th>Day Rent</th>
                <th>Deposit</th>
                <th>Total Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.contractId}</td>
                <td>{item.carname}</td>
                <td>{item.pricerent}</td>
                <td>{item.cartype}</td>
                <td>{item.dayRent}</td>
                <td>{item.deposits}</td>
                <td>{item.totalPrice}</td>
                <td>
                  <img src={item.image} className='w-20 rounded-xl h-20' />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Total */}
          <div style={styles.total}>
            <h3>Total Amount: {item.totalPrice} Đ</h3>
          </div>

          <p>Thank you for your business!</p>

          {/* Generate PDF Button for Each Invoice */}
          <button onClick={() => generatePDF(`invoice-${index}`)} style={styles.button}>
            Download Invoice as PDF
          </button>
        </div>
      ))}
    </div>
  );
};

// Basic styles for the invoice
const styles = {
  invoiceContainer: {
    width: '1000px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    textDecoration: 'underline',
  },
  invoiceInfo: {
    marginBottom: '20px',
  },
  customerInfo: {
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  total: {
    textAlign: 'right',
    marginTop: '20px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Invoice;
