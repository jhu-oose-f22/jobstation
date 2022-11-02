import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";


export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const { user, toggleUser } = useContext(UserContext);


    const handleLogin = (e) => {
        e.preventDefault();
        if (email === '' || password === '') return;
        let userLogin = {
            // id: '123414',
            email: email,
            avatar: null,
            username: email.slice(0, email.indexOf('@')),
            password: password,
            remember: remember,
        };
        console.log(userLogin);
        localStorage.setItem('userLogin', JSON.stringify(userLogin));
        toggleUser(userLogin);

    };
    // TODO: Register / login
    return <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center justify-content-lg-evenly  h-100 bg-light">
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
            <div className="d-flex flex-column align-items-center m-5 btn-group">
                <h1 className="">{user.username}, You Have Logged In!</h1>
                <div className=" d-flex justify-content-between w-75 mt-5 align-items-center">To
                    <Link to='/discussion' className="btn btn-outline-success text-decoration-none"> Discussion</Link>
                    <Link to='/group' className="btn btn-outline-danger text-decoration-none"> Group</Link>
                    <Link to='/dashboard' className="btn btn-outline-primary text-decoration-none"> Dashboard</Link>
                </div>

            </div>
            :
            // login
            < form className="col-auto form-group mt-4" onSubmit={handleLogin}>
                <h1>Sign In/Up right now!</h1>
                <div className="d-flex flex-column w-100 form-outline mt-4">
                    <label className="form-label">Email</label>
                    <input className=" form-control " type='email' required={true}
                        placeholder='enter email'
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="d-flex flex-column w-100 form-outline my-4">
                    <label className="form-label">Password</label>
                    <input className=" form-control" type='password' placeholder='password' required={true} value={password} onChange={e => setPassword(e.target.value)} />
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