
import { useEffect, useState, useContext } from "react";
import { MdVerified } from "react-icons/md"; // Correct import for MdVerified
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { FaLock, FaUnlock } from "react-icons/fa";
import Image from "next/image";


// Internal Import
import { ToDolistContext } from "../components/toDolistApp";
import Style from "../styles/index.module.css";
import loading from "../loading.jpg"
import Data from "@/components/Data";

const Home = () => {
  const [message, setMessage] = useState('')
  const { checkMetaMaskIsInstalled,
    ConnectWallet,
    toDoLists,
    change,
    getToDoList,
    currentAccount,
    error,
    allToDoList,
    myList,
    allAddress } = useContext(ToDolistContext);

  useEffect(() => {
    checkMetaMaskIsInstalled();
    getToDoList();
  }, []);

  return (
    <div className="Style.Home">
      <div className="Style.navBar">
        <Image src={loading} alt="logo" width={50} height={50} fetchpriority="high" />
        <div className="style.connect">
          {!currentAccount ? (
            <button onClick={() => ConnectWallet()}>ConnectWallet</button>
          ) : (
            <button>{currentAccount.slice(0, 20)}...</button>
          )}
        </div>

      </div>
      <div className="Style.home_box">
        <div className="Style.home_completed">
          <h2>ToDoListHistory</h2>
          <div>{myList.map((el, i) => (
            <div className="Style.home_completed_list">
              <MdVerified className="Style.iconcolor" />
              <p>{el.slice(0, 30)}..</p>
            </div>
          ))}</div>
        </div>
        <div className="Style.home-create">
          <div className="Style.home_create_box">
            <h2>Create ToDo Blockchain</h2>
            <div className="Style.home_create_Input">
              <input type="Text"
                placeholder="Enter your ToDoList"
                onChange={(e) => setMessage(e.target.value)} />
              {currentAccount ? (
                <RiSendPlaneFill className="Style.iconBlack" onClick={() => toDoLists(message)} />) : (<RiSendPlaneFill className="style.iconBlack"
                  onClick={() => ConnectWallet} />)}
            </div>
            <Data allToDoList={allToDoList}
              allAddress={allAddress}
              myList={myList}
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;