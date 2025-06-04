import React, { useState, useEffect } from "react";
import "./List.css";
import { toast } from "react-toastify";
import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const BACKEND_URL = import.meta.env.URL || "http://localhost:4000";
  const removeItem = useCallback(async (id) => {
    await axios
      .delete(`${BACKEND_URL}/food/remove/${id}`)
      .then((res) => {
        if (res.data.success) {
          toast.warning(res.data.message);
          fetchData();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.data.message);
      });
  })

  const fetchData = async () => {
    axios
      .get(`${BACKEND_URL}/food/list/`)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setList(res.data.foods);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="list add flex-col">
        <h1>All Food List</h1>
        <table className="list-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Food Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, idx) => {
                return (
                  <tr key={idx} className="list-item-format">
                    <td>
                      <img src={`${BACKEND_URL}/images/${item.image}`} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>₹ {item.price}</td>
                    <td>
                      <button onClick={() => {
                        removeItem(item._id);
                      }} className="dlt-btn">Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
