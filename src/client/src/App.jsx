import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "./components/404";
import Footer from "./components/Footer";
import { MainPage } from "./components/MainPage";
import Navbar from "./components/Navbar";
import { ToDo } from "./components/ToDo";
import UserContextProvider from "./context/user";



function App() {

    return (
        <React.StrictMode>
            <UserContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route index path='/' element={<MainPage />} />

                        <Route path='/discussion' />
                        <Route path='/group' />

                        <Route path='/login' element={<ToDo />} />


                        {/* TODO */}
                        <Route path='/dashboard' element={<ToDo />} />
                        <Route path='/settings' element={<ToDo />} />
                        <Route path='/logout' element={<ToDo />} />
                        <Route path='/notifications' element={<ToDo />} />

                        {/* Errors */}
                        <Route path='/*' element={<PageNotFound />} />

                    </Routes>
                    <Footer />
                </BrowserRouter>
            </UserContextProvider>
        </React.StrictMode>
    );
}

export default App;
