import FileBase64 from "react-file-base64";
import React, { useState, useEffect } from "react";
import { fetchCars, createCar, updateCar, removeCar } from "../api/index";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MostRentedCars from "../components/MostRentedCars ";

const AdminCar = () => {
  const [cars, setCars] = useState([]);
  const [carData, setCarData] = useState({
    carname: "",
    pricerent: "",
    cartype: "",
    carcompany: "",
    description: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [setIsEditCar, setSetIsEditCar] = useState(false);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const result = await fetchCars();
    setCars(result.data);
  };

  const handleCreate = async () => {
    await createCar(carData);
    loadCars();
  };

  const handleUpdate = async (car) => {
    setCarData(car);
    setSetIsEditCar(true);
    // await updateCar(id, carData);
    // loadCars();
  };

  const handleCancelUpdate = async () => {
    setCarData({
      carname: "",
      pricerent: "",
      cartype: "",
      carcompany: "",
      description: "",
      image: "",
    });
    setSetIsEditCar(false);
  };

  const handleEdit = async () => {
    console.log(carData._id, carData);
    await updateCar({ _id: carData._id, carData: carData });
    setCarData({
      carname: "",
      pricerent: "",
      cartype: "",
      carcompany: "",
      description: "",
      image: "",
    });
    setSetIsEditCar(false)
    loadCars();
  };

  const handleDelete = async () => {
    if (selectedCar) {
      await removeCar(selectedCar._id);
      await loadCars();
      setOpen(false);
    }
  };

  const handleOpenDialog = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Quản lý xe</h2>
      <div className="flex gap-4 flex-col w-full " style={{width: '100%'}}>
        <div className="flex w-full justify-between gap-4" style={{width: '100%'}}>
          <TextField 
            sx={{ fontSize: "12px", width: '100%' }}
            className="w-full"
            label="Tên xe"
            value={carData.carname}
            onChange={(e) =>
              setCarData({ ...carData, carname: e.target.value })
            }
          />
          <TextField
            sx={{ fontSize: "12px", width: '100%' }}
            className="w-full"
            label="Giá thuê"
            value={carData.pricerent}
            onChange={(e) =>
              setCarData({ ...carData, pricerent: e.target.value })
            }
          />
          <TextField
            sx={{ fontSize: "12px", width: '100%' }}
            className="w-full"
            label="Loại xe"
            value={carData.cartype}
            onChange={(e) =>
              setCarData({ ...carData, cartype: e.target.value })
            }
          />
          <TextField
            sx={{ fontSize: "12px", width: '100%' }}
            className="w-full"
            label="Hãng xe"
            value={carData.carcompany}
            onChange={(e) =>
              setCarData({ ...carData, carcompany: e.target.value })
            }
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <TextField
            sx={{ fontSize: "12px" }}
            className="flex-1"
            label="Mô tả"
            multiline
            rows={5}
            value={carData.description}
            onChange={(e) =>
              setCarData({ ...carData, description: e.target.value })
            }
          />
          <FileBase64
            accept="image/*"
            className="w-10"
            multiple={false}
            type="file"
            value={carData.image}
            onDone={({ base64 }) => setCarData({ ...carData, image: base64 })}
          />
          {!setIsEditCar && (
            <Button onClick={handleCreate} variant="contained" color="primary">
              Thêm xe
            </Button>
          )}
          {setIsEditCar && (
            <Button onClick={handleEdit} variant="contained" color="warning">
              Sửa xe
            </Button>
          )}
          {setIsEditCar && (
            <Button
              onClick={handleCancelUpdate}
              variant="contained"
              color="warning"
            >
              Hủy sửa
            </Button>
          )}
        </div>
      </div>
      <div style={{ height: "90vh", overflow: "scroll" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh xe</TableCell>
              <TableCell>Tên xe</TableCell>
              <TableCell>Giá thuê</TableCell>
              <TableCell>Loại xe</TableCell>
              <TableCell>Hãng xe</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: "1000px" }}>
            {cars.map((car) => (
              <TableRow
                key={car._id}
                className="h-[200px]"
                style={{ height: "200px" }}
              >
                <TableCell>
                  <img
                    src={car.image}
                    className="w-40 h-[200px] rounded-md overflow-hidden object-cover "
                    style={{
                      width: "300px",
                      height: "200px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      padding: "8px",
                    }}
                    width={400}
                    height={400}
                    alt=""
                  />
                </TableCell>
                <TableCell>{car.carname}</TableCell>
                <TableCell>{car.pricerent}</TableCell>
                <TableCell>{car.cartype}</TableCell>
                <TableCell>{car.carcompany}</TableCell>
                <TableCell className="h-[200px] " height={100}>
                  <div
                    className="h-[200px] overflow-scroll"
                    style={{
                      height: "200px",
                      width: "500px",
                      overflowY: "scroll",
                    }}
                    dangerouslySetInnerHTML={{ __html: car?.description }}
                  ></div>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdate(car)} color="primary">
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleOpenDialog(car)}
                    color="secondary"
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Xác nhận xóa */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa xe {selectedCar && selectedCar.carname}{" "}
            không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminCar;
