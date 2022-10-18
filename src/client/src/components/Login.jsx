import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";


export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const { user, toggleUser } = useContext(UserContext);


    const handleLogin = (e) => {
        e.preventDefault();
        let userLogin = {
            id: '123414',
            email: email,
            username: 'wby',
            password: password,
            remember: remember,
        };
        console.log(userLogin);
        sessionStorage.setItem('userLogin', JSON.stringify(userLogin));
        toggleUser(userLogin);

        window.history.go(-1);
    };
    // TODO: Register / login
    return <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center justify-content-lg-evenly min-vh-100 bg-light">
        <div className="col-auto col-lg-6 d-flex flex-column align-items-center justify-content-center mt-4">
            <img className="me-3 rounded-circle" width='300' src='./imgs/Logo.png' alt='Logo of Job Station' loading="lazy" />
            <div className="d-flex flex-column my-5 mx-3">
                <h1>Preparing for Interview/OA/...?</h1>
                <h2>Job Station is All You Need!</h2>
            </div>
        </div>
        <div className="vr d-none d-lg-block my-lg-auto my-0" style={{ height: "75vh" }}></div>
        <hr className="hr d-block d-lg-none mx-lg-0 mx-auto my-0" style={{ width: "75%" }} />

        {/* Has Logged In */}
        {isLoggedIn(user) ?

            <h1>You Have Logged In!</h1>


            :
            // login
            < form className="col-auto form-group mt-4" onSubmit={handleLogin}>
                <h1>Sign In/Up right now!</h1>
                <div className="d-flex flex-column w-100 form-outline mt-4">
                    <label className="form-label">Email</label>
                    <input className=" form-control" type='email'
                        placeholder='enter email'
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="d-flex flex-column w-100 form-outline my-4">
                    <label className="form-label">Password</label>
                    <input className=" form-control" type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe"
                        value={remember} onChange={e => { setRemember(e.target.value) }} />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button className="btn btn-primary w-100 my-4">
                    Login
                </button>
            </form>
        }



    </div >;
}