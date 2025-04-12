# mern-app-server
Địa chỉ call API để nhận danh sách dữ liệu (GET)
http://localhost:5000/cars


http://localhost:5000/users


http://localhost:5000/contracts


http://localhost:5000/detailscontracts


Cũng địa chỉ trên nhưng để thêm danh sách dữ liệu thì xài (POST)

--------------------------------------------------------------------
Địa chỉ call API để chỉnh sửa dữ liệu (POST)
http://localhost:5000/cars/update

http://localhost:5000/users/update

http://localhost:5000/contracts/update

http://localhost:5000/detailscontracts/update


---------------------------------------------------------------------
Địa chỉ call API để xóa dữ liệu (POST)
http://localhost:5000/cars/remove

http://localhost:5000/users/remove

http://localhost:5000/contracts/remove

http://localhost:5000/detailscontracts/remove


----------------------------------------------------------------------
1. Sử dụng postman để kiểm tra danh sách car: 
GET : http://localhost:5000/cars 
=> Nhận được tập tin json :

[
    
    {
        
        "carname": "Ford Ranger Xls At 2016",
        "cartype": "Dòng xe: Ranger",
        "carcompany": "Ford",
        "_id": "6243c6777355cb3d60d04e01",
        "pricerent": "566000000",
        "image": "data:image/.......",
        "createdAt": "2022-03-30T03:08:20.776Z",
        "updatedAt": "2022-03-30T03:08:20.776Z",
        "__v": 0

    
    }

}

2. Sử dụng postman để thêm hopdong: 

POST : http://localhost:5000/contracts 

body : 

{
    
    "userid": "6242f4e1172804056c138685",

    "totalprice": 70000000,

    "status": "Waiting..."

}

kết quả trả về sau khi thành công thêm dữ liệu:

{

    "status": "Waiting...",

    "_id": "624449d484e2af2324946985",

    "userid": "6242f4e1172804056c138685",

    "totalprice": "70000000",

    "createdAt": "2022-03-30T12:15:16.965Z",

    "updatedAt": "2022-03-30T12:15:16.965Z",

    "__v": 0

}


3. Sử dụng postman để sửa hopdong: 

POST : http://localhost:5000/contracts/update 

body : 

{

    "_id": "62444a6a84e2af2324946987",
    
    "userid": "6242f4e1172804056c138685",

    "totalprice": 70000000,

    "status": "Done"

}

kết quả trả về sau khi thành công sửa dữ liệu:

{

    "status": "Done",

    "_id": "62444a6a84e2af2324946987",

    "userid": "6242f4e1172804056c138685",

    "totalprice": "70000000",

    "createdAt": "2022-03-30T12:17:46.957Z",

    "updatedAt": "2022-03-30T12:20:12.922Z",

    "__v": 0
}

4. Sử dụng postman để xóa hopdong: 

POST : http://localhost:5000/contracts/remove 

body : 

{

    "_id": "62444b9484e2af2324946990"

}

kết quả trả về sau khi thành công xóa dữ liệu:

{

    "status": "Waiting...e",
    "_id": "62444b9484e2af2324946990",
    "userid": "6242f4e1172804056c138685",
    "totalprice": "70000000",
    "createdAt": "2022-03-30T12:22:44.832Z",
    "updatedAt": "2022-03-30T12:22:44.832Z",
    "__v": 0
}