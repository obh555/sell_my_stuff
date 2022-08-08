import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading";
import domain from "../../utils";

export default function EditAddress() {
  const [address, setAddress] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${domain}/api/address`).then(({ data }) => {
      setAddress(data);
      setInput({
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        city: data.city,
        postal_code: data.postal_code,
        country: "Malaysia",
      });
      setLoading(false);
    });
  }, []);

  const invalid = (value) => errors.some((err) => err.param === value) && "is-invalid";
  const message = (value) => errors.find((err) => err.param === value)?.msg;

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateAddress = address ? axios.put(`${domain}/api/address`, { ...input }) : axios.post(`${domain}/api/address`, { ...input });
    updateAddress.then(() => navigate("/account")).catch((err) => setErrors(err.response.data.error));
  };

  const handleChange = (event) => {
    setInput((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) return <Loading />;

  return (
    
      <div className="container my-5 d-flex justify-content-center">
        <form className="col col-md-8 col-lg-5 col-xl-3" onSubmit={handleSubmit}>
          <div className="form-group mt-4">
            <label htmlFor="address_line1">Address Line 1</label>
            <input type="text" className={`form-control ${invalid("address_line1")}`} name="address_line1" id="address_line1" onChange={handleChange} value={input.address_line1} />
            <div className="invalid-feedback">{message("address_line1")}</div>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="address_line2">Address Line 2</label>
            <input type="text" className={"form-control"} name="address_line2" id="address_line2 " onChange={handleChange} value={input.address_line2} />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="city">City</label>
            <input type="text" className={`form-control ${invalid("city")}`} name="city" id="city" onChange={handleChange} value={input.city} />
            <div className="invalid-feedback">{message("city")}</div>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="postal_code">Postal Code</label>
            <input type="text" className={`form-control ${invalid("postal_code")}`} name="postal_code" id="postal_code" onChange={handleChange} value={input.postal_code} />
            <div className="invalid-feedback">{message("postal_code")}</div>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="country">Country</label>
            <input type="text" className={`form-control ${invalid("country")}`} name="country" id="country" value={input.country} disabled />
            <div className="invalid-feedback">{message("country")}</div>
          </div>
          <button type="submit" className="btn btn-primary mt-4 d-block mx-auto">
            Submit
          </button>
        </form>
      </div>
    
  );
}