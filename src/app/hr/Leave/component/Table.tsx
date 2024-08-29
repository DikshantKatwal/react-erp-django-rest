/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ApplyleaveService } from "../../../../services/Leave/Leave.ts";

interface EmployeeLeaveTableProp {
    shouldRefetch: boolean;
    openModal: (employee_leave: any) => void;
}

const EmployeeLeaveTable: React.FC<EmployeeLeaveTableProp> = ({ shouldRefetch, openModal }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [employee_leave, setEmployeeLeave] = useState<any[]>([]);

    
    const [fetchEmployeeLeaveAPI, { error, isLoading }] = ApplyleaveService.useFetch_leaveMutation();

    const fetchData = () => {
        fetchEmployeeLeaveAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setEmployeeLeave(response.results);
                setTotalRows(response.count);

                const hasPending = response.results.some((item: any) => item.approved_status === "Pending");
                setPolling(hasPending);
            })
            .catch((error: any) => {
                console.error("Failed to fetch employee_leave", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [limit, offset, shouldRefetch]);
    const [polling, setPolling] = useState(false);
    const pollingInterval = 10000;
    useEffect(() => {
        if (polling) {
            const interval = setInterval(() => {
                fetchData();
            }, pollingInterval);

            return () => clearInterval(interval);
        }
    }, [polling, limit, offset, shouldRefetch]);

    const columns = [
        {
            name: "SN",
            cell: (_row: any, index: number) => offset + index + 1,
            sortable: false,
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
            name: "Approved By",
            selector: (row: any) => row.approved_by?.username || '',
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
            cell: (row: any) => {
                if (row.approved_status === "Pending") {
                    return (
                    <div>
                        <button onClick={() => openModal(row)}>Edit</button>
                    </div>
                    )}
                if (row.approved_status === "Approved") {
                    return (
                        <div>
                            <button onClick={() => openModal(row)}>View</button>
                        </div>
                        )}
                else{
                    return (
                        <div>
                            <button onClick={() => openModal(row)}>View</button>
                        </div>
                        )}
                
          
        },}
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

export default EmployeeLeaveTable;