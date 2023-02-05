import SignOut from "./SignOut";

const Dashboard = ({ user, logout }) => {

    return(
        
        <div>
            <div>
                This is the dashboard page.
            </div>
            <div>
                <SignOut user={user} logout={logout}/>
            </div>
            
        </div>

    );

}

export default Dashboard;