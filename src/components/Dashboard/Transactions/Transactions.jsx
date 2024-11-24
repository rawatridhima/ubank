import React, { useEffect, useState } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import Loader from "../../Loader/Loader";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./Transactions.css";
import { db } from "../../../Firebase";
import { onValue, ref } from "firebase/database";
import TransactionService from "../../Services/TransactionService";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [transactions, setTransactions] = useState("");
  const auth = useSelector((x) => x.auth);
  // const getTransactions=async()=>{
  //   Object.values(data).forEach(x=>{
  //     if(x.from === auth.user.id || x.to === auth.user.id){
  //       if( x.to === null ){
  //         setTransactions({...transactions,x,type:"withdraw",to:"#"});
  //         count+=1;

  //       }else  if( x.from === null ){
  //         setTransactions({...transactions,x,type:"credit",from:"#"});
  //         count+=1;

  //       }else {
  //         if(x.from===auth.user.id ){
  //         setTransactions({...transactions,x,type:"debit"})}
  //         if(x.to===auth.user.id ){
  //           setTransactions({...transactions,x,type:"credit"})}
  //           count+=1;
  //       }
  //     }

  //   })

  // }
  useEffect(() => {
    try {
      onValue(ref(db, "transactions"), async (snapshot) => {
        const res = snapshot.val();
        setTransactions(res);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="Transactions">
      <div className="top">
        <SearchBar
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {loader ? (
        <Loader size={50} fullWidth={true} />
      ) : transactions ? (
        <div className="bottom">
          {console.log(transactions)}
          <table>
            <thead>
              <tr>
                <td>S.No.</td>
                <td>From</td>
                <td>To</td>
                <td>Type</td>
                <td>Amount</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {Object.entries(transactions)
                .sort((a, b) => {
                  return new Date(b[1].timeStamp) - new Date(a[1].timeStamp);
                })
                .map((h, key) => {
                  if (h[1].from === auth.user.id || h[1].to === auth.user.id)
                    return (
                      
                      <tr key={key}>
                      {console.log(h[1])}
                        <td
                          style={{
                            borderLeft: `5px solid var(--${
                              h[1].from != null && h[1].to != null
                                ? h[1].from === auth.user.id
                                  ? "hover"
                                  : h[1].to === auth.user.id
                                  ? "secColor-1"
                                  : h[1] === "debit"
                                  ? "hover"
                                  : h[1] === "credit"
                                  ? "secColor-1"
                                  : "secColor-2"
                                : h[1] === "debit"
                                ? "hover"
                                : h[1] === "credit"
                                ? "secColor-1"
                                : "secColor-2"
                            })`,
                          }}
                          data-id={"S.No."}
                        >
                          <h3>{key + 1}</h3>
                        </td>
                        <td data-id={"From"}>
                          <h3>{h[1].from ? h[1].from : "#"}</h3>
                        </td>
                        <td data-id={"To"}>
                          <h3>{h[1].to ? h[1].to : "#"}</h3>
                        </td>
                        <td data-id={"Type"}>
                          <h3>
                            {h[1].from != null && h[1].to != null
                              ? (h[1].from === auth.user.id
                                ? "debit"
                                : h[1].to === auth.user.id
                                ? "credit"
                                : h[1].type)
                              : h[1].type}
                          </h3>
                        </td>
                        <td data-id={"Amount"}>
                          <h3>{h[1].amt}</h3>
                        </td>
                        <td data-id={"Status"}>
                          <h3>{h[1].status}</h3>
                        </td>
                      </tr>
                    );
                })}
            </tbody>
          </table>
          <div className="keys">
            {[
              { name: "Credit", color: `var(--secColor-1)` },
              { name: "Debit", color: `var(--hover)` },
              { name: "Withdraw", color: `var(--secColor-2)` },
            ].map((x, i) => (
              <div key={i} className="key">
                <div
                  style={{ backgroundColor: x.color }}
                  className="circle"
                ></div>
                <h3>{x.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="empty-text-signal">No Transactions!!</h3>
      )}
    </div>
  );
};

export default Transactions;
