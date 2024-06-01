import React, { useContext, useEffect } from 'react';
import { ToDolistContext } from '../components/ToDolistProvider'; // Adjust the path as necessary

const ToDoComponent = () => {
    const { ConnectWallet, toDoLists, currentAccount, error, allToDoList } = useContext(ToDolistContext);

    useEffect(() => {
        if (currentAccount) {
            toDoLists();
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
