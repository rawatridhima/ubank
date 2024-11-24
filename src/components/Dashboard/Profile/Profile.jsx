import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const auth = useSelector((x) => x.auth);
  return (
    <div className="profile">
      <div className="left">
        <div className="con">
        <div className="container">

          <div className="up">
            <img className="i1" src={require("../../../Assests/chip.png")} alt="" />
            <img className="i2"
              src={require("../../../Assests/mastercard_PNG16.png")}
              alt=""
            />
          </div>
          <div className="card">
            <h4>Total Balance</h4>
            <h3>{`Rs.${auth.user?.balance}`}</h3>
          </div>
          <h4>{`*******${auth.user?.id.slice(7,12)}`}</h4>
        </div>
        </div>
        <div className="conatain">
          <label htmlFor="name">Name</label>
          <input type="text" value={auth.user?.name} name="name" readOnly />
        </div>
        <div className="conatain">
          <label htmlFor="name">Email</label>
          <input type="text" value={auth.user?.email} name="name" readOnly />
        </div>
        <div className="conatain">
          <label htmlFor="name">Mobile Number</label>
          <input
            type="text"
            value={auth.user?.mobile_number}
            name="name"
            readOnly
          />
        </div>
        <div className="conatain">
          <label htmlFor="name">Account Number</label>
          <input type="text" value={auth.user?.id} name="name" readOnly />
        </div>
      </div>
      {/* <div className="right">

    <div className="card">
    

    </div>
    </div> */}
    </div>
  );
};

export default Profile;
