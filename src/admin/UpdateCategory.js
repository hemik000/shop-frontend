import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getACategory, updateACategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

function UpdateCategory({ match }) {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
    createdCategory: "",
    getRedirect: false,
  });

  const { name, loading, error, getRedirect, createdCategory } = values;

  const preLoad = (productId) => {
    getACategory(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
        // console.log(categories);
      }
    });
  };

  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });
    updateACategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, createdCategory: "" });
        } else {
          setValues({
            ...values,
            name: data.name,
            loading: false,
            createdCategory: data.name,
            error: "",
          });
          setTimeout(() => {
            setValues({ ...values, getRedirect: true });
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const isLoading = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success mt-3" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdCategory ? "" : "none" }}
      >
        <h4>{createdCategory} updated successfully.</h4>
      </div>
    );
  };
  const warningMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error !== "" ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const performRedirect = () => {
    if (getRedirect) {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const createProductForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product"
      description="Add a product here"
      className="conatiner bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loading && isLoading()}
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
}

export default UpdateCategory;
