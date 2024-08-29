/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ApplyleaveService} from "../../../../services/Leave/Leave.ts";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";

interface ApproveLeaveTableProp {
    shouldRefetch: boolean;
    openModal: (employee_leave: any) => void;
}

const ApproveLeaveTable: React.FC<ApproveLeaveTableProp> = ({ shouldRefetch, openModal }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [employee_leave, setApproveLeave] = useState<any[]>([]);


    const [fetchApproveLeaveAPI, { error, isLoading }] = ApplyleaveService.useView_pendingMutation();

    const fetchData = () => {
        fetchApproveLeaveAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setApproveLeave(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch employee_leave", error);
            });
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, offset, shouldRefetch]);

    const columns = [
        {
            name: "SN",
            cell: (_row: any, index: number) => offset + index + 1,
            sortable: false,
        },
        {
            name: "Employee Name",
            selector: (row: any) => row.employee.username,
            sortable: true,
        },
        {
            name: "Employee Email",
            selector: (row: any) => row.employee.email,
            sortable: true,
        },
        {
            name: "Leave Type",
            selector: (row: any) => row.leave.name,
            sortable: true,
        },
        {
            name: "No of Days",
            selector: (row: any) => row.no_days,
            sortable: true,
        },
        {
            name: "Approval Status",
            selector: (row: any) => {
                if (row.approved_status === "Pending") {
                    return <span className="common-tag type-warning">Pending</span>;
                }
                if (row.approved_status === "Approved") {
                    return <span className="common-tag type-success">Approved</span>;
                }
                else{
                    return <span className="common-tag type-danger">Rejected</span>;
                }
            },
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                    <button onClick={() => openModal(row)}>add approval status</button>
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
                data={employee_leave}
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

export default ApproveLeaveTable;