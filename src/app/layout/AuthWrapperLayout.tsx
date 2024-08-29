import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useCheckAuthQuery, useFetch_permissionQuery } from "../../services/authentication/authService";
import { RootState } from "../../store";

const AuthWrapperLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const {isAuthenticated, permissions} = useAppSelector((state: RootState) => state.authSlice);
    const { data:isUserAuthenticted, error, isLoading } = useCheckAuthQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { isFetching } = useFetch_permissionQuery( 'fetch_permission', {
        skip: permissions.length !== 0,
        refetchOnMountOrArgChange: true,
    });
    useEffect(() => {
      if(isLoading) return;
      if (!isAuthenticated || !isUserAuthenticted) {
        navigate("/login");
      }
    }, [error, isUserAuthenticted,isAuthenticated, isLoading, isFetching, permissions]);
    if (isLoading) {
        return null; // or a loading spinner
    }
    return <>{children}</>;
};

export default AuthWrapperLayout;