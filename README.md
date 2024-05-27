1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   cd ecommerce-api
2. npm install
3. buatkan file .env
4. dan isi semua enverenmen
DATABASE_URL="dari prisma"
PORT=7000
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_CLOUD_KEY=""
CLOUDINARY_CLOUD_SECRET=""
MIDTRANS_SERVER_KEY=""


API Endpoints
Categories
Create Category
URL: https://backend-tokopedia-xrep.vercel.app/categories
Method: POST
Body:
json
Salin kode
{
  "category_name": "Electronics"
}
Success Response:
Code: 200
Content:
json
Salin kode
{
  "id": 1,
  "category_name": "Electronics"
}
Get All Categories
URL: /categories
Method: GET
Success Response:
Code: 200
Content:
json
Salin kode
[
  {
    "id": 1,
    "category_name": "Electronics"
  }
]
Delete Category
URL: https://backend-tokopedia-xrep.vercel.app/categories/:id
Method: DELETE
Success Response:
Code: 200
Content:
json
Salin kode
{
  "message": "Category deleted successfully"
}

untuk hit product salin component react ini

Upload Product
URL: https://backend-tokopedia-xrep.vercel.app/upload
Method: POST
Body:
form
import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState("");
  const [sales, setSales] = useState(0);
  const [sellerId, setSellerId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSalesChange = (e) => {
    setSales(e.target.value);
  };

  const handleSellerIdChange = (e) => {
    setSellerId(e.target.value);
  };

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...images];
      newImages[index] = files[0];
      setImages(newImages);
    }
  };

  const handleAddImageInput = () => {
    setImages([...images, null]);
  };

  const handleRemoveImageInput = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("rating", rating);
      formData.append("location", location);
      formData.append("sales", sales);
      formData.append("seller_id", sellerId);
      formData.append("category_id", categoryId);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            API_KEY: import.meta.env.VITE_API_KEY,
          },
        }
      );

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setProductName("");
      setDescription("");
      setPrice(0);
      setRating(0);
      setLocation("");
      setSales(0);
      setSellerId(0);
      setCategoryId(0);
      setImages([]);
    } catch (error) {
      setErrorMessage("Failed to upload images.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <label>Product Name:</label>
          <input
            className="border border-green-500 rounded-lg p-2 mx-9"
            type="text"
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Description:</label>
          <textarea
            className="border border-green-500 rounded-lg p-2 mx-9"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="flex flex-col items-center">
          <label>Price:</label>
          <input
            className="border border-green-500 rounded-lg p-2 mx-9"
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Rating:</label>
          <input
            className="border border-green-500 rounded-lg p-2 mx-9"
            type="number"
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Location:</label>
          <input
            className="border border-green-500 rounded-lg p-2 mx-9"
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Sales:</label>
          <input
            className="border border-green-500 rounded-lg p-2 mx-9"
            type="number"
            value={sales}
            onChange={handleSalesChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Seller ID:</label>
          <input
            className="border border-green-500 rounded-lg p-2 mx-9"
            type="number"
            value={sellerId}
            onChange={handleSellerIdChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Category ID:</label>
          <input
            className="border border-green-500 rounded-lg p-2 mx-9"
            type="number"
            value={categoryId}
            onChange={handleCategoryIdChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Images:</label>
          {images.map((image, index) => (
            <div key={index}>
              <input
                className="border border-green-500 rounded-lg p-2 mx-9"
                type="file"
                onChange={(e) => handleImageChange(e, index)}
              />
              {image && (
                <img
                  className="mt-2"
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  style={{ maxWidth: "200px" }}
                />
              )}
              <button
                className="border bg-red-500 text-black rounded-lg p-2"
                type="button"
                onClick={() => handleRemoveImageInput(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="border bg-green-500 text-black rounded-lg p-2 mt-6"
            type="button"
            onClick={handleAddImageInput}
          >
            Add Image
          </button>
        </div>

        <button
          className="px-4 py-2 mt-7 border bg-green-500 text-black rounded-lg "
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;

Success Response:
Code: 200
Content:
json
Salin kode
{
  "success": true,
  "message": "Uploaded!",
  "data": {
    "id": 1,
    "product_name": "Laptop",
    "price": 1000,
    "description": "A high-end laptop",
    "rating": 4.5,
    "location": "New York",
    "sales": 100,
    "detailproduct": {
      "urls": [
        "http://res.cloudinary.com/.../image1.jpg",
        "http://res.cloudinary.com/.../image2.jpg"
      ]
    },
    "seller_id": 1,
    "category_id": 1,
    "created_at": "2024-05-27T10:00:00.000Z"
  }
}
Get All Products
URL: https://backend-tokopedia-xrep.vercel.app/products
Method: GET
Success Response:
Code: 200
Content:
json
Salin kode
[
  {
    "id": 1,
    "product_name": "Laptop",
    "price": 1000,
    "description": "A high-end laptop",
    "rating": 4.5,
    "location": "New York",
    "sales": 100,
    "detailproduct": {
      "urls": [
        "http://res.cloudinary.com/.../image1.jpg",
        "http://res.cloudinary.com/.../image2.jpg"
      ]
    },
    "seller_id": 1,
    "category_id": 1,
    "created_at": "2024-05-27T10:00:00.000Z"
  }
]
Get Product by ID
URL: https://backend-tokopedia-xrep.vercel.app/products/:id
Method: GET
Success Response:
Code: 200
Content:
json
Salin kode
{
  "id": 1,
  "product_name": "Laptop",
  "price": 1000,
  "description": "A high-end laptop",
  "rating": 4.5,
  "location": "New York",
  "sales": 100,
  "detailproduct": {
    "urls": [
      "http://res.cloudinary.com/.../image1.jpg",
      "http://res.cloudinary.com/.../image2.jpg"
    ]
  },
  "seller_id": 1,
  "category_id": 1,
  "created_at": "2024-05-27T10:00:00.000Z"
}
Delete Product
URL: https://backend-tokopedia-xrep.vercel.app/products/:id
Method: DELETE
Success Response:
Code: 200
Content:
json
Salin kode
{
  "message": "Product deleted successfully"
}
Stores
Create Store
URL: /stores
Method: POST
Body:
json
Salin kode
{
  "store_name": "Best Store",
  "owner_id": 1
}
Success Response:
Code: 200
Content:
json
Salin kode
{
  "id": 1,
  "store_name": "Best Store",
  "owner_id": 1
}
Get All Stores
URL: /stores
Method: GET
Success Response:
Code: 200
Content:
json
Salin kode
[
  {
    "id": 1,
    "store_name": "Best Store",
    "owner_id": 1
  }
]
Delete Store
URL: /stores/:id
Method: DELETE
Success Response:
Code: 200
Content:
json
Salin kode
{
  "message": "Store deleted successfully"
}
Users
Register User
URL: /register
Method: POST
Body:
json
Salin kode
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
Success Response:
Code: 200
Content:
json
Salin kode
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  },
  "token": "jwt_token"
}
Login User
URL: https://backend-tokopedia-xrep.vercel.app/login
Method: POST
Body:
json
Salin kode
{
  "email": "john@example.com",
  "password": "password123"
}
Success Response:
Code: 200
Content:
json
Salin kode
{
  "token": "jwt_token"
}
Get All Users (Secret)
URL: https://backend-tokopedia-xrep.vercel.app/v1/users/scret
Method: GET
Success Response:
Code: 200
Content:
json
Salin kode
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
]
Error Handling
All endpoints return an error response in the following format:

json
Salin kode
{
  "error": "Error message"
}
Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.


follow tiktok @ahmadafriza25
