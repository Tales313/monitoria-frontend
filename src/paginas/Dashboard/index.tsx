import {Navigate} from "react-router-dom";

const Dashboard = () => {

    const token = localStorage.getItem('token')

    if (!token) {
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