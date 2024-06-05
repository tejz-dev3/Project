import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";
import Header from "./components/Header/Header";

function App() {
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    response = await response.json();
    // adding only 5 initial users data
    response = response.map((el) => ({ ...el, status: "Inactive" }));
    console.log(response, "response");
    setData(response.slice(0, 5));
  };

  const addUsersData = (userInfo) => {
    setData([...data, userInfo]);
  };

  const editUserInfo = (userId) => {
    setIsEditMode(true);
    const userData = data.find((el) => el.id == userId);
    setUserInfo(userData);
    navigate("/");
  };

  const editUserData = (userInfo) => {
    debugger;
    const updatedData = data.map((el) => {
      if (el.id == userInfo.id) {
        return { ...el, status: userInfo.status, phone: userInfo.phone };
      } else {
        return el;
      }
    });
    setData(updatedData);
    setIsEditMode(false);
    setUserInfo(null);
  };
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <Form
                addUsersData={addUsersData}
                isEditMode={isEditMode}
                userInfo={userInfo}
                editUserData={editUserData}
              />
            }
          />
          <Route
            path="/view-users"
            element={<Table data={data} editUserInfo={editUserInfo} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
