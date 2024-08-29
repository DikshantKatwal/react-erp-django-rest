/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GroupService, useDeleteMutation } from "../../../../services/group/Group.ts";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";
import { useNavigate } from "react-router-dom";

interface GroupTableProp {
    shouldRefetch: boolean;
    openModal: (group: any) => void;
}

const GroupTable: React.FC<GroupTableProp> = ({ shouldRefetch, openModal }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [group, setGroup] = useState<any[]>([]);
    const navigate = useNavigate();
    const [delete_group] = useDeleteMutation();

    const [fetchGroupAPI, { error, isLoading }] = GroupService.useFetchMutation();

    const fetchData = () => {
        fetchGroupAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setGroup(response.data);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch group", error);
            });
    };

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this group?");
        if (confirmed) {
            delete_group({ id }).unwrap().then(() => {
                fetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };
    const handleManagePermissions = (permission: any) => {
        navigate(`/admin/auth/permissions/${permission.id}`, { state: { permission } });
    };

    useEffect(() => {
        fetchData();
    }, [limit, offset, shouldRefetch]);

    const columns = [
        {
            name: "SN",
            cell: (row: any, index: number) => offset + index + 1,
            sortable: false,
        },
        {
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: "Total User Count",
            selector: (row: any) => row.user_ids.length,
            sortable: true,
        },
        {
            name: "Total Permission Granted",
            selector: (row: any) => row.permissions.length,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <PermissionWrapper redirect={false} permission="employee_group.change_grouptype">
                    <button onClick={() => openModal(row)}>Edit</button>
                    <button onClick={() => handleManagePermissions(row)}>Manage Permissions</button>
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                    </PermissionWrapper>
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
                data={group}
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

export default GroupTable;