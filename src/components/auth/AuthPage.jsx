import LoginInput from "./LoginInput";
import RegisterInput from "./RegisterInput";
import AuthMessage from "./ErrorMessage"

const ErrorPage = ({ setUser, setAuthMessage, authMessage }) => {
    return (
        <div>
            <LoginInput setUser={setUser} setAuthMessage={setAuthMessage}/>
            <RegisterInput setUser={setUser} setAuthMessage={setAuthMessage}/>
            <AuthMessage authMessage={authMessage}/>
        </div>
    );
}

export default ErrorPage;