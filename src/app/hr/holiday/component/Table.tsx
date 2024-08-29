/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HolidayService, useDeleteMutation } from "../../../../services/holiday/Holiday.ts";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";

interface HolidayTableProp {
    shouldRefetch: boolean;
    openModal: (leave: any) => void;
}

const HolidayTable: React.FC<HolidayTableProp> = ({ shouldRefetch, openModal }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [broadcast, setHoliday] = useState<any[]>([]);

    const [delete_leave] = useDeleteMutation();

    const [fetchHolidayAPI, { error, isLoading }] = HolidayService.useFetchMutation();

    const fetchData = () => {
        fetchHolidayAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setHoliday(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch holidays", error);
            });
    };

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this holiday?");
        if (confirmed) {
            delete_leave({ id }).unwrap().then(() => {
                fetchData();
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
            name: "title",
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row: any) => row.description,
            sortable: true,
        },
        {
            name: "From",
            selector: (row: any) => row.date_en,
            sortable: true,
        },
        {
            name: "To",
            selector: (row: any) => row.date_en_to,
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
                data={broadcast}
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

export default HolidayTable;