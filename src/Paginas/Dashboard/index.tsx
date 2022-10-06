import {Navigate} from "react-router-dom";
import {useAuth} from "../../Contexts/AuthContext";

const Dashboard = () => {

    const { user, token } = useAuth()

    if (!user || !token) {
        console.log('NAO AUTENTICADO')
        return <Navigate replace to="/" />
    } else {
        console.log('AUTENTICADO')
        return (
            <div>
                <p>Welcome to your Dashboard</p>
            </div>
        );
    }
};

export default Dashboard;