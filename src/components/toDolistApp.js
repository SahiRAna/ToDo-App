import React, { useEffect, useState, createContext } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { ToDoListAddress, ToDoListAbi } from '../pages/constant'; // Adjust the path as necessary

const fetchContract = (signerOrProvider) => {
    console.log("ToDoListAddress:", ToDoListAddress); // Log address
    return new ethers.Contract(ToDoListAddress, ToDoListAbi, signerOrProvider);
};

export const ToDolistContext = createContext();

export const ToDolistProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [error, setError] = useState('');
    const [allToDoList, setAllToDoList] = useState([]);
    const [myList, setMyList] = useState([]);
    const [allAddress, setAllAddress] = useState([]);

    // Check if MetaMask is installed
    const checkMetaMaskIsInstalled = async () => {
        if (!window.ethereum) {
            setError("Install MetaMask");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log(accounts[0]);
            } else {
                setError("No accounts found. Please install MetaMask and reload.");
            }
        } catch (err) {
            setError("Error connecting to MetaMask");
            console.error(err);
        }
    };

    useEffect(() => {
        checkMetaMaskIsInstalled();
    }, []);

    // Connect Wallet
    const ConnectWallet = async () => {
        if (!window.ethereum) {
            setError("Install MetaMask");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log(accounts[0]);
            } else {
                setError("No accounts found. Please install MetaMask and reload.");
            }
        } catch (err) {
            setError("Error connecting to MetaMask");
            console.error(err);
        }
    };

    // Interact with the smart contract
    const toDoLists = async (message) => {
        try {
            if (!message || message.length === 0) {
                setError("Message cannot be empty");
                return;
            }
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            // const provider = new ethers.BrowserProvider(connection);
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            // console.log(contract);

            console.log("Message:", message);
            const createListTx = await contract.createList(message);
            await createListTx.wait();
            console.log('Transaction successful:', createListTx);
            // Assuming you want to fetch tasks or interact with the contract
            // const tasks = await contract.getTasks(); // Example method call
            // setAllToDoList(tasks); // Set the state with fetched tasks
        } catch (error) {
            setError("Something went wrong in creating the list");
            console.error(error);
        }
    };
    const getToDoList = async () => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            // const provider = new ethers.BrowserProvider(connection);
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            // Getting Data--//
            const allAddress = await contract.getAddress();
            setAllAddress(allAddress);
            console.log(allAddress);
            allAddress.map(async (el) => {
                const getSingleData = await contract.getCreatorData(el);
                allToDoList.push(getSingleData);
                console.log(getSingleData);
            });
            const allMessage = await contract.getMessage();
            setMyList(allMessage);
            const addresses = await contract.getAddress();
            setAllAddress(addresses);

            // Fetch data for each address
            const allData = await Promise.all(
                addresses.map(async (address) => {
                    const data = await contract.getCreatorData(address);
                    return data;
                })
            );
            setAllToDoList(allData);
            console.log(allData);

            // Get all messages
            const messages = await contract.getMessage();
            setMyList(messages);
        } catch (error) {
            setError("Something went wrong in getting Data");

        }
    };
    // ---Changing the state to False and True--//
    const change = async (address) => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            // const provider = new ethers.BrowserProvider(connection);
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const state = await contract.toggle(address);
            state.wait();
            console.log(state);

        } catch (error) {
            setError("Something went wrong in getting Data");
        }
    };
    useEffect(() => {
        getToDoList();
    }, []);


    return (
        <ToDolistContext.Provider value={{
            checkMetaMaskIsInstalled,
            ConnectWallet,
            toDoLists,
            change,
            getToDoList,
            currentAccount,
            error,
            allToDoList,
            myList,
            allAddress
        }}>
            {children}
        </ToDolistContext.Provider>
    );
};
const ToDoComponent = () => {
    const { ConnectWallet, toDoLists, currentAccount, error, getToDoList, allToDoList } = useContext(ToDolistContext);

    useEffect(() => {
        if (currentAccount) {
            toDoLists();
            getToDoList();
        }
    }, [currentAccount]);

    return (
        <div>
            <button onClick={ConnectWallet}>Connect Wallet</button>
            {error && <p>{error}</p>}
            <ul>
                {allToDoList.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoComponent;