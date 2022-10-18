import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/Utils/404";
import Discussion from "./components/Discussion";
import Footer from "./components/Utils/Footer";
import Group from "./components/Group";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import Navbar from "./components/Utils/Navbar";
import Post from "./components/Post";
import ToDo from "./components/Utils/ToDo";
import UserContextProvider from "./context/User";



function App() {

    return (
        <React.StrictMode>
            <UserContextProvider>
                <BrowserRouter>

                    <Navbar />
                    <Routes>
                        <Route index path='/' element={<MainPage />} />

                        <Route path='/discussion' element={<Discussion />} />
                        <Route path='/discussion/:postId' element={<Post />} />


                        <Route path='/group' element={<Group />} />

                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />


                        {/* TODO */}
                        <Route path='/dashboard' element={<ToDo />} />
                        <Route path='/settings' element={<ToDo />} />
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
