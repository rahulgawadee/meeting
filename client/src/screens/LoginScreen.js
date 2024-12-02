import React, { useRef } from "react";
import axios from "axios";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const LoginScreen = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const history = useHistory();

    const loginUser = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!email || !password) {
            M.toast({ html: "Please fill in all fields", classes: "red" });
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/login`,
                { email, password }
            );

            localStorage.setItem("Token", response.data.token); // Ensure your API sends a `token` key
            M.toast({ html: "Login Successful", classes: "green" });
            history.push("/");
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message || "Internal Server Error";
            M.toast({ html: `Error: ${errorMessage}`, classes: "red" });
        }
    };

    return (
        <div className="container">
            <div className="card-container">
                <div className="card">
                    <div className="card__header">Login</div>
                    <form className="card__body" onSubmit={loginUser}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="abc@example.com"
                                ref={emailRef}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                ref={passwordRef}
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="btn green">
                                Login
                            </button>
                            <button
                                type="button"
                                className="btn blue"
                                onClick={() => history.push("/register")}
                            >
                                Create A New Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
