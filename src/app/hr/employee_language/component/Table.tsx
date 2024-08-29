/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { employeeLanguageService, useDeleteMutation } from "../../../../services/employeeLanguage/EmployeeLanguage.ts";
import {useLocation } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface EmployeeLanguageTableProp {
    employee?: any;
    id?: number;
    shouldRefetch: boolean;
    openModal: (renewal: any) => void;
}

const EmployeeLanguageTable: React.FC<EmployeeLanguageTableProp> = ({ shouldRefetch, openModal }) => {
    const location = useLocation();
    const employee = location.state?.employee;
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [employeelanguage, setEmployeeLanguage] = useState<any[]>([]);
    
    const [delete_service] = useDeleteMutation();
    const [id, setId] = useState(null);

    const [fetchEmployeeAPI, { error, isLoading }] = employeeLanguageService.useFetchEmployeeLanguageMutation();
    const fetchData = () => {
        setId(employee.id)
        fetchEmployeeAPI({ limit, offset ,id })
            .unwrap()
            .then((response: any) => {
                setEmployeeLanguage(response.results);
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
            name: "Language",
            selector: (row: any) => row.language,
            sortable: true,
        },
        {
            name: "Reading",
            selector: (row: any) => row.read,
            sortable: true,
        },
        {
            name: "Writing",
            selector: (row: any) => row.write,
            sortable: true,
        },
        {
            name: "Speaking",
            selector: (row: any) => row.speak,
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
                data={employeelanguage}
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
export default EmployeeLanguageTable;
