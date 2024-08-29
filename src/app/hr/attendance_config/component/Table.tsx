/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Attendance_configService, useDeleteMutation } from "../../../../services/attendanceConfig/AttendanceConfig.ts";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";

interface AttendanceConfigTableProp {
    shouldRefetch: boolean;
    openModal: (attendanceConfig: any) => void;
}

const AttendanceConfigTable: React.FC<AttendanceConfigTableProp> = ({ shouldRefetch, openModal }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [attendanceConfig, setAttendanceConfig] = useState<any[]>([]);

    const [delete_attendanceConfig] = useDeleteMutation();

    const [fetchAttendanceConfigAPI, { error, isLoading }] = Attendance_configService.useFetch_attendance_configMutation();

    const fetchData = () => {
        fetchAttendanceConfigAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setAttendanceConfig(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch attendanceConfig", error);
            });
    };

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this attendanceConfig?");
        if (confirmed) {
            delete_attendanceConfig({ id }).unwrap().then(() => {
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
            cell: (_: any, index: number) => offset + index + 1,
            sortable: false,
        },
        {
            name: "username",
            selector: (row: any) => row.username,
            sortable: true,
        },
        {
            name: "password",
            selector: (row: any) => row.password,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <PermissionWrapper redirect={false} permission="employee_attendanceConfig.change_attendanceConfigtype">
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
                data={attendanceConfig}
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

export default AttendanceConfigTable;