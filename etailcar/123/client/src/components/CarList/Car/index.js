import React from "react";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

export default function Car({ car }) {
  return (
    // <div className="h-[400px] w-1/4 ">
    //   <Card className="m-2 flex flex-col  py-6">
    //     <CardHeader
    //       avatar={<Avatar>{car.carname}</Avatar>}
    //       title=car.carname
    //       subheader={moment(car.updatedAt).format("HH:MM MMM DD,YYYY")}
    //       action={
    //         <IconButton>
    //           <MoreVertIcon />
    //         </IconButton>
    //       }
    //     />
    //     <CardMedia
    //       image={car.image || ""}
    //       title="Title"
    //       className={"w-[240px] h-[135px] mx-auto rounded-md"}
    //     />
    //     <CardContent>
    //       <Typography variant="h5" color="textPrimary">
    //         Giá thuê: {car.pricerent} đ
    //       </Typography>
    //       <Typography variant="h5" color="textPrimary">
    //         Công ty: {car.carcompany}
    //       </Typography>
    //       <Typography variant="h5" color="textPrimary">
    //         Loại xe: {car.cartype}
    //       </Typography>
    //     </CardContent>
    // <Link
    //   className="btn btn-primary"
    //   to={
    //     // "/thue-xe?&id=" + car._id + "&carname=" + car.carname + "&pricerent=" + car.pricerent
    //     "/card-detail?&id=" + car._id + "&carname=" + car.carname + "&pricerent=" + car.pricerent
    //   }
    // >
    //   Thuê Xe
    // </Link>
    //   </Card>
    // </div>
    <Link
      to={
        //  "/thue-xe?&id=" + car._id + "&carname=" + car.carname + "&pricerent=" + car.pricerent
        "/card-detail?&id=" +
        car._id +
        "&carname=" +
        car.carname +
        "&pricerent=" +
        car.pricerent
      }
      className="h-[400px] w-1/4 mb-6"
    >
      <div class="thumbnail m-2 h-full py-6 flex flex-col">
        <Link
          href="/cho-thue-xe-35-cho-thaco-meadow-29f-00546/1/1/6/1222245/0/vn.html"
          title="Cho thuê xe 35 chỗ Thaco Meadow 29F 0054"
          style={{ textDecoration: "none" }}
        >
          <img
            src={car.image || ""}
            alt="cho-thue-xe-35-cho-thaco-meadow-29f-00546"
            title="cho-thue-xe-35-cho-thaco-meadow-29f-00546"
            style={{
              "max-width": "100%",
              height: "auto",
              border: "1px solid #FFFFFF",
            }}
          />
        </Link>
        <div class="tenspduc flex flex-col flex-1">
          <a
            href="/cho-thue-xe-35-cho-thaco-meadow-29f-00546/1/1/6/1222245/0/vn.html"
            title="Cho thuê xe 35 chỗ Thaco Meadow 29F 0054"
            style={{ "text-decoration": "none" }}
          >
            Giá thuê: {car.pricerent}
          </a>
        </div>
        <div class="namepriceduc px-[10px]">
          <label>
            <span>Tên xe: </span>
            <strong>{car.carname}</strong>
          </label>
          <label>
            <span> Loại xe: </span>
            <strong>{car.cartype}</strong>
            <span> đ </span>
          </label>
          <label>
            <span>Hãng xe: </span>
            <strong>{car.carcompany}</strong>
          </label>
          <Link
            className="btn btn-primary"
            to={
              // "/thue-xe?&id=" + car._id + "&carname=" + car.carname + "&pricerent=" + car.pricerent
              "/card-detail?&id=" +
              car._id +
              "&carname=" +
              car.carname +
              "&pricerent=" +
              car.pricerent
            }
          >
            Thuê Xe
          </Link>
        </div>
      </div>
    </Link>
  );
}
