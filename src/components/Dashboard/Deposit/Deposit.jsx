import React, { useState } from "react";
import "./Deposit.css";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import TransactionService from "../../Services/TransactionService";
import toast from "react-hot-toast";
import {update} from "../../../AuthReducer";

const Deposit = () => {
  const auth = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState(0);
  const handleDeposit = async () => {
    const currBalance = (await UserService.read(auth.user.id)).balance;
    const updateBalance = Number(currBalance) + Number(data.amt);
    await UserService.update(auth.user.id, {
      balance: updateBalance,
    });
    dispatch(update({ user: { ...auth.user, balance: updateBalance } }));
    const res = await TransactionService.create({
      ...data,
      type: "credit",
      status: "completed",
      to: auth.user.id,
    });
    toast.success("Amouth Deposited Successfully");
    setData({ amt: "" });
  };

  return (
    <div className="deposit">
      <div className="container">
        <div className="head">DEPOSIT FUNDS</div>
        <form>
          {(() => {
            return (
              <div className="form">
                <input
                  type="number"
                  className="one-third-input"
                  placeholder="Enter Amount"
                  onChange={(e) => setData({ ...data, amt: e.target.value })}
                  value={data.amt}
                />
              </div>
            );
          })()}
        </form>
        <div className="btn" onClick={handleDeposit}>
          <button>Deposit</button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
