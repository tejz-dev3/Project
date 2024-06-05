import React from "react";
import "./Table.css";

const Table = ({ data, editUserInfo }) => {
  if (!data.length) {
    return <h2 className="no-data">No data to display</h2>;
  }
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              {/* //showing dummy status if API doesnt have these */}
              <td>{item.status || "Inactive"}</td>

              <td>
                <button
                  className="action-btn"
                  onClick={() => editUserInfo(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
