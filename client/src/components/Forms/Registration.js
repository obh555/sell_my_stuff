import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
export default function Registration({ onLogin }) {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/register", { ...input });
      const { username, password } = input;
      const { data: user } = await axios.post("/api/login", {
        username,
        password,
      });
      onLogin.handleUser(user.isLoggedIn);
      onLogin.handleAdmin(user.isAdmin);
      await Swal.fire({
        icon: "success",
        title: "Account successfully created",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const invalid = (value) =>
    errors.some((err) => err.param === value) && "is-invalid";
  const message = (value) => errors.find((err) => err.param === value)?.msg;

  return (
    <form
      className="mx-auto my-5 container"
      onSubmit={handleSubmit}
      style={{ maxWidth: "350px" }}
    >
      <div className="text-end">
        <Link to="/">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </Link>
      </div>
      <h5>Kindly fill up below:</h5>
      <div className="form-group mt-4">
        <label>First Name</label>
        <input
          type="text"
          className={`form-control ${invalid("first_name")}`}
          name="first_name"
          onChange={handleChange}
        />
        <div className="invalid-feedback">{message("first_name")}</div>
      </div>
      <div className="form-group mt-4">
        <label>Last Name:</label>
        <input
          type="text"
          className={`form-control ${invalid("last_name")}`}
          name="last_name"
          onChange={handleChange}
        />
        <div className="invalid-feedback">{message("last_name")}</div>
      </div>
      <div className="form-group my-4">
        <label>Username:</label>
        <input
          type="text"
          className={`form-control ${invalid("username")}`}
          name="username"
          onChange={handleChange}
        />
        <div className="invalid-feedback">{message("username")}</div>
      </div>
      <div className="form-group mt-4">
        <label className="d-block">
          <div className="d-flex align-items-end justify-content-between">
            <div>Password:</div>
            <div className="App">
              <i
                className="fa fa-exclamation-circle opacity-50"
                data-tip
                data-for="registerTip"
                aria-hidden="true"
              ></i>
              <ReactTooltip
                id="registerTip"
                place="top"
                effect="solid"
                type="dark"
              >
                Password must be at least 5 characters long
              </ReactTooltip>
            </div>
          </div>
        </label>
        <input
          type="password"
          className={`form-control ${invalid("password")}`}
          name="password"
          autoComplete="off"
          onChange={handleChange}
        />
        <div
          className="invalid-feedback"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Tooltip on top"
        >
          {message("password")}
        </div>
      </div>
      <div className="form-group mt-4">
        <label>Email Address:</label>
        <input
          type="email"
          className={`form-control ${invalid("email")}`}
          name="email"
          onChange={handleChange}
        />
        <div className="invalid-feedback">{message("email")}</div>
      </div>
      <div className="form-group mt-4">
        <label>Mobile Number:</label>
        <div className="d-flex">
          <span className="mt-1">+6</span>
          <input
            type="text"
            className={`form-control ${invalid("mobile")} ms-2`}
            name="mobile"
            onChange={handleChange}
          />
        </div>
        <div className="invalid-feedback">{message("mobile")}</div>
      </div>
      <div className="form-group mt-4">
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </div>
    </form>
  );
}
