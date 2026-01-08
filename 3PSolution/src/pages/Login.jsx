import { useState } from "react";
import { useLoginMutation } from "../redux/features/authSlice";

const Login = () => {
    const [loginApi, { isLoading }] = useLoginMutation();

    const [mobile, setmobile] = useState("0172635191");
    const [password, setPassword] = useState("abc12345t");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginApi({
                mobile,
                password,
            }).unwrap();

            // console.log("Login response:", res);

            if (res?.token && res?.user) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                window.location.href = "/";
            } else {
                alert("Login failed: invalid response from server");
            }
        } catch (err) {
            alert(err?.data?.message || "Invalid credentials");
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow w-96"
            >
                <h2 className="text-2xl mb-4">Login</h2>

                <input
                    type="text"
                    placeholder="mobile"
                    className="w-full mb-3 p-2 border rounded"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
