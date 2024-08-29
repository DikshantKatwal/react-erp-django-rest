import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAppDispatch } from "../../../../hooks";
import { serviceTypeService, useDeleteMutation } from "../../../../services/service_type/ServiceType";

interface ServiceTypeTableProp {
    shouldRefetch: boolean;
    openModal: (service_type: any) => void;
}

const ServiceTypeTable: React.FC<ServiceTypeTableProp> = ({ shouldRefetch, openModal }) => {
    const dispatch = useAppDispatch();
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [serviceTypes, setServiceTypes] = useState<any[]>([]);

    const [delete_service_type] = useDeleteMutation();

    const [fetchServiceTypeAPI, { data, error, isLoading }] = serviceTypeService.useFetch_service_typesMutation();

    const fetchData = () => {
        fetchServiceTypeAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setServiceTypes(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch service types", error);
            });
    };

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this service type?");
        if (confirmed) {
            delete_service_type({ id }).unwrap().then(() => {
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
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: any) => row.status,
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
                data={serviceTypes}
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

export default ServiceTypeTable;