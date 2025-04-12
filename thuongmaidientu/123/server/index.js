import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { CarModel } from "./models/CarModel.js";
import data from "./rentcar.json" with { type: "json" };
import cars from "./routers/cars.js";
import contracts from "./routers/contracts.js";
import detailscontracts from "./routers/detailscontracts.js";
import posts from "./routers/posts.js";
import reviews from "./routers/reviews.js";
import users from "./routers/users.js";

const app = express();
const PORT = process.env.PORT || 5000;
// const URI = 'mongodb://localhost:27017/rentcar';
const URI =
  "mongodb+srv://hung:admin@cluster0.iir89ee.mongodb.net/TTTN?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/posts", posts);
app.use("/users", users);
app.use("/cars", cars);
app.use("/contracts", contracts);
app.use("/detailscontracts", detailscontracts);
app.use("/reviews", reviews);

const importData = async () => {
  try {
    const count = await CarModel.countDocuments();
    if (count === 0) {
      let formattedData = [];
      for (let i = 0; i < data.length; i++) {
        const createdAt = new Date();
        const updatedAt = new Date();
        console.log();

        // Kiểm tra xem có phải là một ngày hợp lệ không
        if (isNaN(createdAt) || isNaN(updatedAt)) {
          continue; // Bỏ qua mục này và tiếp tục với mục tiếp theo
        }
        console.log(data[i].carname);
        formattedData.push({
          carname: data[i].carname,
          pricerent: data[i].pricerent,
          cartype: data[i].cartype,
          carcompany: data[i].carcompany,
          image: data[i].image,
          description: data[i].description,
          createdAt,
          updatedAt,
        });
      }

      // Chỉ chèn vào cơ sở dữ liệu nếu dữ liệu hợp lệ
      if (formattedData.length > 0) {
        await CarModel.insertMany(formattedData);
        console.log("Data imported successfully");
      } else {
        console.log("No valid data to import");
      }
    } else {
      console.log("Data already exists");
    }
  } catch (error) {
    console.error("Error importing data:", error);
  }
};

const start = async () => {
  await importData();
};

start();

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB:", err);
  });
