import React, { useEffect, useState } from "react";
import Profile from "./Profile/Profile";
import Transactions from "./Transactions/Transactions";
import "./Dashboard.css";
import { BiTransfer } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { PiHandDepositDuotone } from "react-icons/pi";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import Deposit from "./Deposit/Deposit";
import Withdraw from "./Withdraw/Withdraw";
import Transfer from "./Transfer/Transfer";
import { RiFolderTransferFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../AuthReducer";
import { IoLogOutOutline } from "react-icons/io5";

const Dashboard = () => {
  // states
  const [component, setComponent] = useState(0);
  const [active, setActive] = useState(false);
  const auth = useSelector((x) => x.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const menus = [
    {
      name: "Profile",
      icon: <FaUser />,
      component: <Profile />,
      heading: [`Profile`, `see your details`],
    },

    {
      name: "Deposit Funds",
      icon: <PiHandDepositDuotone />,
      component: <Deposit />,
      heading: [`Deposit Funds`, `add money`],
    },

    {
      name: "Withdraw Funds",
      icon: <PiHandWithdrawDuotone />,
      component: <Withdraw />,
      heading: [`Withdraw Funds`, `withdraw money`],
    },
    {
      name: "Transfer Funds ",
      icon: <RiFolderTransferFill />,
      component: <Transfer />,
      heading: [`Transfer Funds`, `transfer money to others`],
    },
    {
      name: "Transactions History",
      icon: <BiTransfer />,
      component: <Transactions />,
      heading: [`Transactions History`, `see history`],
    },
  ];
  useEffect(() => {
    if (!auth.isAuth) navigate("/");
  }, []);
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <div className="dash">
        <div className="left">
          <div className="head">
            <img src={require("../../Assests/logo.jpeg")} alt="" />
            <h3>UBANK</h3>
          </div>
          <div className="elements">
            {menus.map((obj, i) => {
              return (
                <button
                  i={i}
                  className={i === component ? "active" : ""}
                  onClick={() => {
                    setComponent(i);
                    setActive((prev) => !prev);
                  }}
                >
                  {obj.icon}
                  <h5>{obj.name}</h5>
                </button>
              );
            })}
          </div>
          <div className="buttons">
            <button onClick={() => setModal(true)}>
              <IoIosLogOut />
              <h3>Logout</h3>
            </button>
          </div>
        </div>
        <div className="right">
          <div className="headings">
            <h3>{menus[component].heading[0]} </h3>
            <h5>{menus[component].heading[1]}</h5>
          </div>
          <div className="box">
            {menus.map((x, i) => {
              if (i === component) return x.component;
            })}
          </div>
        </div>
      </div>
      {modal ? (
        <div className="modal">
          <div className="boxs">
            <h2>Are you sure you want to logout?</h2>
            <div className="line">
              <button onClick={() => setModal(false)}>Cancel</button>
              <button onClick={handleLogOut}> Yes</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
