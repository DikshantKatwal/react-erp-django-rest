/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { UserService } from "../../../../services/user/User";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface UserTableProp {

}

const UserTable: React.FC<UserTableProp> = () => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [user, setUser] = useState<any[]>([]);
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const [fetchUserAPI, { error, isLoading }] = UserService.useFetchUserMutation();
    const fetchData = () => {
        fetchUserAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setUser(response);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch service", error);
            });
    };
    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, offset]);

    const handlePermission = (user: any) => {
        navigate(`/admin/auth/user/permissions/${user.id}`, { state: { user } });
    };


    const columns = [
        {
            name: "SN",
            cell: (_row: any, index: number) => offset + index + 1,
            sortable: false,
        },
        {
            name: "Name",
            selector: (row: any) => row.first_name ,
            sortable: true,
          
        },
        {
            name: "Email",
            selector: (row: any) => row.email,
            sortable: true,
         
        },
        {
            name: "Permission Count",
            selector: (row: any) => row.user_permissions.length,
            sortable: true,
        },
        {
            name: "Group ",
            selector: (row: any) => row.groups,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <button onClick={() => handlePermission(row)}>Add Permission</button>
                </div>
            ),
        },
    ];
    const handlePageChange = (page: number) => {
        setOffset((page - 1) * limit);
    };

    const handleRowsPerPageChange = (newLimit: number) => {
        setLimit(newLimit);
        setOffset(0);
    };
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading data</p>}
            <DataTable
                columns={columns}
                data={user}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
                paginationRowsPerPageOptions={[10, 20, 30]}
            />
        </div>
    );
};
export default UserTable;
