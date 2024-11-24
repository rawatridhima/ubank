import React, { useState } from "react";
import "../Deposit/Deposit.css";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import TransactionService from "../../Services/TransactionService";
import toast from "react-hot-toast";
import {update} from "../../../AuthReducer";

const Transfer = () => {
  const auth = useSelector((x) => x.auth);
  const dispatch=useDispatch();
  const [data, setData] = useState("");
  const handleTransfer = async () => {
    const currBalanceUser = (await UserService.read(auth.user.id)).balance;
    const u2 = await UserService.read(data.to);
    if (!u2) {
      toast.error("Wrong account number.");
    } else {
      const cbt = (await UserService.read(data.to)).balance;
      console.log(Number(currBalanceUser), Number(data.amt));
      if (Number(currBalanceUser) >= Number(data.amt)) {
        const updateBalance = Number(currBalanceUser) - Number(data.amt);
        await UserService.update(auth.user.id, {
         
          balance: updateBalance,
        });
        dispatch(update({ user: { ...auth.user, balance: updateBalance } }));
        const ubt = Number(cbt) + Number(data.amt);
        console.log(ubt, cbt);
        await UserService.update(data.to, { balance: ubt });
        const res = await TransactionService.create({
          ...data,
          type: "debit",
          status: "completed",
          from: auth.user.id,
          to: data.to,
        });
        toast.success("Amouth Transaferred Successfully");
      } else {
        const res = await TransactionService.create({
          ...data,
          type: "debit",
          status: "rejected",
          from: auth.user.id,
        });
        toast.error("Insufficient amount");
      }
    }
    setData({ amt: "", to: "" });
  };
  return (
    <div className="deposit">
      <div className="container">
        <div className="head">TRANSFER FUNDS</div>
        <form>
          {(() => {
            return (
              <div className="form">
                <input
                  type="text"
                  className="one-third-input"
                  placeholder="Enter Account Number"
                  onChange={(e) => setData({ ...data, to: e.target.value })}
                  value={data.to}
                />
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
        <div className="btn" onClick={handleTransfer}>
          <button>Transafer</button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
