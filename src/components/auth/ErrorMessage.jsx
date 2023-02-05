import errorMessages from "../../errorMessages.json";

const ErrorMessage = ({ error }) => {
  function getErrorMessage() {
    if (error === null) return null;

    return errorMessages[error.code];
  }

  return <div>{getErrorMessage()}</div>;
};

export default ErrorMessage;
