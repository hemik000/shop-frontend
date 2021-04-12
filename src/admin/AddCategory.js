import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCatgory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //Backend request
    createCatgory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h1 className="text-success">Category created successfully</h1>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h1 className="text-danger">Failed to create category</h1>;
    }
  };

  const myCategoryFrom = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
          onChange={handleChange}
          value={name}
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create Category"
      description="Add a new category."
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryFrom()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;
