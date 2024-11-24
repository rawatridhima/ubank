import React, { useState } from "react";
import "../Deposit/Deposit.css";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import TransactionService from "../../Services/TransactionService";
import toast from "react-hot-toast";
import { update } from "../../../AuthReducer";

const Withdraw = () => {
  const auth = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const handleWithdraw = async () => {
    const currBalance = (await UserService.read(auth.user.id)).balance;
    if (Number(currBalance) >= Number(data.amt)) {
      const updateBalance = Number(currBalance) - Number(data.amt);
      await UserService.update(auth.user.id, { balance: updateBalance });
      dispatch(update({ user: { ...auth.user, balance: updateBalance } }));
      auth.user.balance = updateBalance;
      const res = await TransactionService.create({
        ...data,
        type: "withdraw",
        status: "completed",
        from: auth.user.id,
      });
      toast.success("Amouth Withdrawn Successfully");
    } else {
      const res = await TransactionService.create({
        ...data,
        type: "withdraw",
        status: "rejected",
        from: auth.user.id,
      });
      toast.error("Insufficient amount");
    }
    setData({ amt: "" });
  };
  return (
    <div className="deposit">
      <div className="container">
        <div className="head">WITHDRAW FUNDS</div>
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
        <div className="btn" onClick={handleWithdraw}>
          <button>Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
