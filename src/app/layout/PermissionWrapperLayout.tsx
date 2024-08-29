import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";

interface PermissionProps {
    permission?: any;
    children: React.ReactNode;
    redirect: boolean;
}

const PermissionWrapper: React.FC<PermissionProps> = ({ children, permission, redirect }) => {
    const permissions = useSelector((state: RootState) => state.authSlice.permissions);
    const navigate = useNavigate();
    var permission_check = useMemo(() => {
        const hasPermission = permissions.includes('all_permissions') || permissions.includes(permission);
        if (!hasPermission && redirect) {
          navigate('/access-forbidden');
        }
        return hasPermission;
      }, [permissions, redirect, navigate]);

    return permission_check ? <>{children}</> : null;

};

export default PermissionWrapper;