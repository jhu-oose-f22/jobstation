import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "./components/404";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BRAND } from "./context/const";
import UserContextProvider from "./context/user";



function App() {
    const name = useContext(BRAND);

    return (
        <React.StrictMode>
            <UserContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path='/discussion' />
                        <Route path='/group' />
                        <Route index path='/*' element={<PageNotFound />} />

                    </Routes>
                    <Footer />
                </BrowserRouter>
            </UserContextProvider>
        </React.StrictMode>
    );
}

export default App;
