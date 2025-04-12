import FileBase64 from "react-file-base64";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import useStyles from "./styles";
import { createCar, hideModal_Car } from "../../redux/actions";
import { Button, Modal, TextField } from "@mui/material";

export default function CreateCarModal() {
  const [data, setData] = React.useState({
    carname: "",
    pricerent: "",
    cartype: "",
    carcompany: "",
    image: "",
    fdafdasfsda: "",
  });
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);

  const onClose = React.useCallback(() => {
    dispatch(hideModal_Car());
    setData({
      carname: "",
      pricerent: "",
      cartype: "",
      carcompany: "",
      image: "",
      description: "",
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createCar.createCarRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

  const body = (
    <div id="simple-modal-carname" className="bg-white mx-auto w-[500px] mt-20 p-10">
      <h2>Thêm xe mới</h2>
      <form
        noValidate
        autoComplete="off"
        className={`flex flex-col gap-4 mt-10`}
      >
        <TextField
          required
          placeholder="Tên xe"
          value={data.carname}
          onChange={(e) => setData({ ...data, carname: e.target.value })}
          InputProps={{
            style: {
              fontSize: "16px", // Thay đổi kích thước chữ trong input
            },
          }}
        />
        <TextField
          required
          placeholder="Giá xe"
          value={data.pricerent}
          type="number"
          onChange={(e) => setData({ ...data, pricerent: e.target.value })}
          InputProps={{
            style: {
              fontSize: "16px", // Thay đổi kích thước chữ trong input
            },
          }}
        />
        <TextField
          required
          placeholder="Loại xe"
          value={data.cartype}
          onChange={(e) => setData({ ...data, cartype: e.target.value })}
          InputProps={{
            style: {
              fontSize: "16px", // Thay đổi kích thước chữ trong input
            },
          }}
        />
        <TextField
          required
          placeholder="Hãng xe"
          value={data.carcompany}
          onChange={(e) => setData({ ...data, carcompany: e.target.value })}
          InputProps={{
            style: {
              fontSize: "16px", // Thay đổi kích thước chữ trong input
            },
          }}
        />
        <TextField
          multiline
          rows={5}
          required
          placeholder="Hãng xe"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          InputProps={{
            style: {
              fontSize: "16px", // Thay đổi kích thước chữ trong input
            },
          }}
        />
        <FileBase64
          accept="image/*"
          multiple={false} 
          type="file" 
          value={data.image}
          onDone={({ base64 }) => setData({ ...data, image: base64 })}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            size="large"
            onClick={onSubmit}
          >
            <span className="text-[12px]">Thêm</span>
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="m-auto">
      <Modal open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}
