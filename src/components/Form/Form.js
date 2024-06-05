import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Form.css";
import { useNavigate } from "react-router-dom";

const Form = ({ addUsersData, isEditMode, userInfo, editUserData }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: userInfo ? userInfo.username : "",
      email: userInfo ? userInfo.email : "",
      phone: userInfo ? userInfo.phone : "",
      status: userInfo ? userInfo.status : "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters long"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      status: Yup.string()
        .required("Status is required")
        .oneOf(
          ["Active", "Inactive"],
          "Status must be either Active or Inactive"
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      
      
      if (isEditMode) {
        const updatedUserData = {
            ...values,
            id: userInfo.id,
            // phone: values.phone,
            // status: values.status
          };
        editUserData(updatedUserData);
      } else {
        const userInfo = { ...values, id: Date.now() }; // Included unique ID
        addUsersData(userInfo);
      }
      resetForm();
      navigate("/view-users");
    },
  });

  return (
    <div className="form_container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h3 className="form_title">{isEditMode ? "Edit User" : "Add User"}</h3>
        <div className="input_field">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your name here"
            {...formik.getFieldProps("username")}
            disabled={isEditMode}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="input_field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email ID"
            {...formik.getFieldProps("email")}
            disabled={isEditMode}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="input_field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="input_field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" {...formik.getFieldProps("status")}>
            <option value="" label="Select status" />
            <option value="Active" label="Active" />
            <option value="Inactive" label="Inactive" />
          </select>
          {formik.touched.status && formik.errors.status ? (
            <div className="error">{formik.errors.status}</div>
          ) : null}
        </div>
        <div className="submit_btn">
          <button type="submit">{isEditMode ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
