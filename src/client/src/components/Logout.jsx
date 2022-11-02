import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";

export default function Logout() {
    const navigate = useNavigate();
    const { toggleUser } = useContext(UserContext);
    const [countdown, setCountdown] = useState(3);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (countdown > 0) {
            setTimer(setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000));
        } else {
            navigate('/');
        }

        return () => {
            toggleUser({});
            localStorage.clear();
            sessionStorage.clear();
            if (timer) {
                clearTimeout(timer);
                setTimer(null);
            }
        }
    }, [toggleUser, countdown])


    return <div className='bg-image h-100'
        style={{
            backgroundImage: "url(./imgs/MainPage.jpg)",
            backgroundSize: "cover"
        }
        }>
        <div className="h-100 mask d-flex flex-column align-items-center justify-content-center "
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
                    in {countdown} seconds...
                </p>
            </div></div>
    </div>
}