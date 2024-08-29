/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { employeeReferenceService, useDeleteMutation } from "../../../../services/employeeReference/EmployeeReference.ts";
import { useLocation } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface EmployeeReferenceTableProp {
    employee?: any;
    id?: number;
    shouldRefetch: boolean;
    openModal: (renewal: any) => void;
}

const EmployeeReferenceTable: React.FC<EmployeeReferenceTableProp> = ({ shouldRefetch, openModal }) => {
    const location = useLocation();
    const employee = location.state?.employee;
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [employeereference, setEmployeeReference] = useState<any[]>([]);
    
    const [delete_service] = useDeleteMutation();
    const [id, setId] = useState(null);

    const [fetchEmployeeAPI, { error, isLoading }] = employeeReferenceService.useFetchEmployeeReferenceMutation();
    const fetchData = () => {
        setId(employee.id)
        fetchEmployeeAPI({ limit, offset ,id })
            .unwrap()
            .then((response: any) => {
                setEmployeeReference(response.results);
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
            name: "First Name",
            selector: (row: any) => row.first_name,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row: any) => row.last_name,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row: any) => row.address,
            sortable: true,
        },
        {
            name: "Occupation",
            selector: (row: any) => row.occupation,
            sortable: true,
        },
        {
            name: "Contact",
            selector: (row: any) => row.contact,
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
                data={employeereference}
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
export default EmployeeReferenceTable;
