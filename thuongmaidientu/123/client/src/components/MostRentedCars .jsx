import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../api';

const MostRentedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchMostRentedCars = async () => {
      try {
        const response = await axios.get(`${URL}/detailscontracts/most-rented`);
        setCars(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMostRentedCars();
  }, []);

  return (
    <div className="most-rented-container">
      <h1 className="title">Most Rented Cars</h1>
      <div className="cars-list">
        {cars.map((car, index) => (
          <div key={index} className="car-item">
            <div className="car-name">{car.carname}</div>
            <div className="car-details">
              <span className="rent-count">{car.rentCount} rentals</span>
              <span className="price">Price: ${car.pricerent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRentedCars;
