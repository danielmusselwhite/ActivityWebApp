import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccounts";
import SimpleFrag from "../app/shared/components/SimpleFrag";


export default function RequireAuth() {
    const { currentUser, loadingUserInfo } = useAccount();
    const location = useLocation();

    if (loadingUserInfo) {
        return <SimpleFrag message="Loading user information..." />
    }

        if (!currentUser) {
            return <Navigate to='/login' state={{ from: location }} replace />
    }

  return (
    <Outlet />
  )
}