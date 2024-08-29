/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { leaveService, useDeleteMutation } from "../../../../services/employeeLeave/EmployeeLeave.ts";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";
import toast, { Toaster } from 'react-hot-toast';

interface LeaveTableProp {
    shouldRefetch: boolean;
    openModal: (leave: any) => void;
}

const LeaveTable: React.FC<LeaveTableProp> = ({ shouldRefetch, openModal }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [leave, setLeave] = useState<any[]>([]);

    const [delete_leave] = useDeleteMutation();

    const [fetchLeaveAPI, { error, isLoading }] = leaveService.useFetch_leaveMutation();

    const fetchData = () => {
        fetchLeaveAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setLeave(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch leave", error);
            });
    };
    const success = () => toast.success('Leave Type Deleted');
    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this leave?");
        if (confirmed) {
            delete_leave({ id }).unwrap().then(() => {
                fetchData();
                success();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
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
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <PermissionWrapper redirect={false} permission="employee_leave.change_leavetype">
                    <button onClick={() => openModal(row)}>Edit</button>
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
                data={leave}
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

export default LeaveTable;