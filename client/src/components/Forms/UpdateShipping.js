import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditShipping() {
  const [input, setInput] = useState({ shipped: true });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/api/order/update/${id}`, {
        tracking_number: input.tracking_number,
        shipped: JSON.parse(input.shipped),
      })
      .then(() => navigate("/admin"));
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <form
      className="mx-auto my-5 container"
      onSubmit={handleSubmit}
      style={{ maxWidth: "350px" }}
    >
      <div className="form-group my-2">
        <label htmlFor="tracking_number">Tracking Number</label>
        <input
          type="text"
          className="form-control"
          name="tracking_number"
          id="tracking_number"
          onChange={handleChange}
        />
      </div>
      <div className="form-group my-2">
        <label htmlFor="shipped">Shipped</label>
        <select
          className="form-control"
          id="shipped"
          name="shipped"
          onChange={handleChange}
        >
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary my-2 d-block mx-auto">
        Submit
      </button>
    </form>
  );
}
