import { useSelector } from "react-redux";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    // console.log({ isAdminRoute, user, userRole });

    if (isAdminRoute && userRole === 'ADMIN') {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return (
            <NotPermitted />
        );
    }
}

export default RoleBaseRoute;
