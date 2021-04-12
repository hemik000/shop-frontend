import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

function Cart() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // setProducts(loadCart());
    if (loadCart().error || loadCart().length === 0) {
      setError(true);
    } else {
      setProducts(loadCart());
    }
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  const loadCheckOut = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };
  const errormMessage = () => {
    return (
      <div className="alert alert-warning">
        <h2>Cart is Empty</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to check out">
      <div className="row d-flex justify-content-center">
        <div className="col-4 text-center">{error && errormMessage()}</div>
      </div>
      <div className="row text-center">
        <div className="col-6">{loadAllProducts(products)}</div>
        <div className="col-6">
          <PaymentB products={products} />
        </div>
      </div>
    </Base>
  );
}

export default Cart;
