import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Brand } from "./context/const";
import UserContextProvider from "./context/user";



function App() {
    const name = useContext(Brand);

    return (
        <React.StrictMode>
            <UserContextProvider>
                <BrowserRouter>
                    <Navbar name={name} />
                    <Routes>


                    </Routes>
                    <Footer name={name} />
                </BrowserRouter>
            </UserContextProvider>
        </React.StrictMode>
    );
}

export default App;
