import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RoleBaseRoute from "./RoleBase";

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                :
                <Navigate to='/login' replace />
            }
        </>
    )
}

export default ProtectedRoute;
