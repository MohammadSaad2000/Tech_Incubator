const AuthMessage = ({ authMessage }) => {


    function getFormattedAuthMessage() {
        if (authMessage === null) 
            return null;

        let msg = authMessage.replace("Firebase: ", "");
        msg = msg.substring(0, msg.lastIndexOf(" ("));
        return msg;
    }

    return(

        <div>
            {getFormattedAuthMessage()}    
        </div>

    );

}

export default AuthMessage;