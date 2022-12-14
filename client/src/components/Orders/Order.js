import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../pages/Loading";
import { Restricted } from "../../pages";

export default function Order() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/order/${id}`)
      .then(({ data }) => {
        setItems(JSON.parse(data.content));
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [id]);

  if (error) return <Restricted />;
  if (loading) return <Loading />;

  return (
    <div className="container my-4">
      <div className="row">
        <h3> Order # {id} </h3>
      </div>
      <div className="row">
        {items.map(({ item, quantity }) => {
          return (
            <div className="card flex-row align-self-start p-4 my-2" key={item.id}>
              <img
                src={item.image}
                className="card-image-top align-self-center"
                alt=""
                style={{
                  width: "10rem",
                  height: "10rem",
                  objectFit: "scale-down",
                }}
              />
              <div className="card-body py-1">
                <div className="d-flex justify-content-between">
                  <h5>{item.name}</h5>
                  <h5>RM {item.price * quantity}</h5>
                </div>
                <h6>Quantity: {quantity}</h6>
                <h6>Price per unit: RM {item.price}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
