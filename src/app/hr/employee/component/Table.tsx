/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { employeeService} from "../../../../services/employee/Employee.ts";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface EmployeeTableProp {

}

const EmployeeTable: React.FC<EmployeeTableProp> = () => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [employee, setEmployee] = useState<any[]>([]);
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const [fetchEmployeeAPI, { error, isLoading }] = employeeService.useFetchEmployeeMutation();
    const fetchData = () => {
        fetchEmployeeAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setEmployee(response.results);
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

    const handleEdit = (employee: any) => {
        navigate(`/admin/employee/view/${employee.id}`, { state: { employee } });
    };


    const columns = [
        {
            name: "SN",
            cell: (_row: any, index: number) => offset + index + 1,
            sortable: false,
        },
        {
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true,
            cell: (row: any) => (
                <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleEdit(row)}>
                    {row.name} {row.last_name}
                </div>
            ),
        },
        {
            name: "Email",
            selector: (row: any) => row.email,
            sortable: true,
            cell: (row: any) => (
                <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleEdit(row)}>
                    {row.email}
                </div>
            ),
        },
        {
            name: "Contact",
            selector: (row: any) => row.contact,
            sortable: true,
        },
        {
            name: "PAN",
            selector: (row: any) => row.pan,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <button onClick={() => handleEdit(row)}>Edit</button>
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
                data={employee}
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
export default EmployeeTable;
