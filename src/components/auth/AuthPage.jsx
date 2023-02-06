import LoginInput from "./LoginInput";
import RegisterInput from "./RegisterInput";
import ErrorMessage from "./ErrorMessage";

const AuthPage = ({ setUser, setError, error }) => {
  return (
    <div>
      <LoginInput setUser={setUser} setError={setError} />
      <RegisterInput setUser={setUser} setError={setError} />
      <ErrorMessage error={error} />
    </div>
  );
};

export default AuthPage;
