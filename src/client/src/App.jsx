import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/404";
import Discussion from "./components/Discussion";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import ToDo from "./components/ToDo";
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
                        <Route path='/discussion/:postId'
                            loader={async ({ request, params }) => {
                                console.log(params);
                                return params
                            }}
                            element={<Post />} />


                        <Route path='/group' />

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
