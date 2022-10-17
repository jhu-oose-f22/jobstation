import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";

export default function Logout() {
    const navigate = useNavigate();
    const { toggleUser } = useContext(UserContext);

    setTimeout(() => {
        toggleUser({});
        sessionStorage.setItem('userLogin', JSON.stringify({}));
        navigate('/');
    }, 3000)

    return <div className='bg-image vh-100'
        style={{
            backgroundImage: "url(./imgs/MainPage.jpg)",
            backgroundSize: "cover"
        }
        }>
        <div className="vh-100 mask d-flex flex-column align-items-center justify-content-center "
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
        >
            <div className="mask border border-info  border-5 rounded-5 d-flex flex-column align-items-center justify-content-center text-white"
                style={
                    {
                        backgroundColor: "rgba(241, 225, 82, 0.1)",
                        width: "50%", height: "50%",
                        minWidth: 600, minHeight: 400
                    }
                }
            >
                <h1>You Have Logged Out!</h1>
                <p className="my-5">
                    Automatically redirect to
                    <Link className="mx-2 text-reset" to='/'>main page</Link>
                    in three seconds...
                </p>
            </div></div>
    </div>
}