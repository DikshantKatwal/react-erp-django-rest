/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { employeeExperienceService, useDeleteMutation } from "../../../../services/employeeExperience/EmployeeExperience.ts";
import {useLocation} from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface EmployeeExperienceTableProp {
    employee?: any;
    id?: number;
    shouldRefetch: boolean;
    openModal: (renewal: any) => void;
}

const EmployeeExperienceTable: React.FC<EmployeeExperienceTableProp> = ({ shouldRefetch, openModal }) => {
    const location = useLocation();
    const employee = location.state?.employee;
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [employeeexperience, setEmployeeExperience] = useState<any[]>([]);
    
    const [delete_service] = useDeleteMutation();
    const [id, setId] = useState(null);

    const [fetchEmployeeAPI, { error, isLoading }] = employeeExperienceService.useFetchEmployeeExperienceMutation();
    const fetchData = () => {
        setId(employee.id)
        fetchEmployeeAPI({ limit, offset ,id })
            .unwrap()
            .then((response: any) => {
                setEmployeeExperience(response.results);
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
            name: "Organization",
            selector: (row: any) => row.organization,
            sortable: true,
        },
        {
            name: "Designation",
            selector: (row: any) => row.designation,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row: any) => row.address,
            sortable: true,
        },
        {
            name: "Salary",
            selector: (row: any) => row.salary,
            sortable: true,
        },
        {
            name: "Major role",
            selector: (row: any) => row.major_role,
            sortable: true,
        },
        {
            name: "Start Date",
            selector: (row: any) => row.start_date,
            sortable: true,
        },
        {
            name: "End Date",
            selector: (row: any) => row.end_date,
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
                data={employeeexperience}
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
export default EmployeeExperienceTable;
