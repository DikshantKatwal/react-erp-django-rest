/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { employeeEducationService, useDeleteMutation } from "../../../../services/employeeEducation/EmployeeEducation.ts";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface EmployeeEducationTableProp {
    employee?: any;
    id?: number;
    shouldRefetch: boolean;
    openModal: (renewal: any) => void;
}

const EmployeeEducationTable: React.FC<EmployeeEducationTableProp> = ({ shouldRefetch, openModal }) => {
    const location = useLocation();
    const employee = location.state?.employee;
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [employeeeducation, setEmployeeEducation] = useState<any[]>([]);
    
    const [delete_service] = useDeleteMutation();
    const [id, setId] = useState(null);

    const [fetchEmployeeAPI, { error, isLoading }] = employeeEducationService.useFetchEmployeeEducationMutation();
    const fetchData = () => {
        setId(employee.id)
        fetchEmployeeAPI({ limit, offset ,id })
            .unwrap()
            .then((response: any) => {
                setEmployeeEducation(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch service", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, [limit, offset, id, shouldRefetch]);

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (confirmed) {
            delete_service({ id }).unwrap().then(() => {
                fetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };


    const columns = [
        {
            name: "SN",
            cell: (row: any, index: number) => offset + index + 1,
            sortable: false,
        },
        {
            name: "Degree",
            selector: (row: any) => row.degree,
            sortable: true,
        },
        {
            name: "Program",
            selector: (row: any) => row.program,
            sortable: true,
        },
        {
            name: "Board",
            selector: (row: any) => row.board,
            sortable: true,
        },
        {
            name: "Institution",
            selector: (row: any) => row.institution,
            sortable: true,
        },
        {
            name: "Marks",
            selector: (row: any) => row.marks,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <button onClick={() => openModal(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
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
                data={employeeeducation}
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
export default EmployeeEducationTable;
