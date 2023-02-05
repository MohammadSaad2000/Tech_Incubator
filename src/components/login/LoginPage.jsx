import Login from "./Login";
import Register from "./Register";


const LoginPage = ({ setUser }) => {
    return (
        <div>
            <Login setUser={setUser} />
            <Register setUser={setUser}/>
        </div>
    );
}

export default LoginPage;