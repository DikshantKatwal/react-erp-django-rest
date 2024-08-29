import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { useViewMutation } from "../../../services/permissions/Permissions.ts";
import { GroupService } from "../../../services/group/Group.ts";
interface PermissionFormProps {
    permission?: unknown;
    id?: number;
}

const PermissionForm: React.FC<PermissionFormProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const permission = location.state?.permission;
    

    const [allPermissions, setAllPermissions] = useState<unknown[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    const [fetchAllPermissionsAPI] = useViewMutation();
    const [fetchGroupPermissionsAPI] = GroupService.usePermissionGroupMutation();
    const fetchData = async () => {
        try {
            const response: any = await fetchAllPermissionsAPI({});
            const permissionArray = response.data?.permission_array;

            if (Array.isArray(permissionArray)) {
                setAllPermissions(permissionArray)
            } else if (typeof permissionArray === 'object' && permissionArray !== null) {
                // Convert object to array of objects
                const permissions: unknown = [];
                Object.entries(permissionArray).forEach(([key, values]) => {
                    values.forEach((permission: any) => {
                        permissions.push({
                            contentType: key,
                            id: permission.id,
                            displayName: permission['display name'],
                            codename: permission.codename
                        });
                    });
                });
                setAllPermissions(permissions);
            } else {
                console.error("Unexpected response format", response.data);
            }
        } catch (error: any) {
            console.error("Failed to fetch employees", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (permission && Array.isArray(permission.permissions)) {
            setSelectedPermissions(permission.permissions);
        }
    }, [permission]);

    const handleCheckboxChange = (id: number) => {
        setSelectedPermissions((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((permissionId) => permissionId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleSave = () => {
        fetchGroupPermissionsAPI({ role_id: permission.id, permission_id:selectedPermissions}).unwrap().then(() => {
            navigate('/admin/auth/group');
        }).catch(() => {

        });

    };

    const groupedPermissions = allPermissions.reduce((acc, permission) => {
        if (!acc[permission.contentType]) {
            acc[permission.contentType] = [];
        }
        acc[permission.contentType].push(permission);
        return acc;
    }, {} as { [key: string]: any[] });

    return (
        <div id="common-list-page">
            <section className="content-section">
            <button className='co-btn' onClick={handleSave}>Save</button>
            {Object.keys(groupedPermissions).map((contentType) => (
                <div key={contentType}>
                    <div className="custom-container">
                    <div className="section-content">
                     <div className="common-content-box">
                    <h4>{contentType}</h4>
                    {groupedPermissions[contentType].map((permission) => (
                        <div key={permission.id}>
                            <p>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedPermissions.includes(permission.id)}
                                        onChange={() => handleCheckboxChange(permission.id)}
                                    />
                                    {permission.displayName}
                                </label>
                            </p>
                        </div>
                    ))}
                    </div>
                    </div>
            </div>
                </div>
                
            ))}
            
            </section>
        </div>
    );
}

export default PermissionForm;
