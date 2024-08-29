import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAppDispatch } from "../../../../hooks";
import { serviceService, useDeleteMutation, useUpdateRenewalMutation } from "../../../../services/service/Service.ts";
import { Link, useNavigate } from "react-router-dom";

interface ServiceTableProp {

}

const ServiceTable: React.FC<ServiceTableProp> = () => {
    const dispatch = useAppDispatch();
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [service, setService] = useState<any[]>([]);
    const navigate = useNavigate();
    const [delete_service] = useDeleteMutation();
    const [updateRenewal] = useUpdateRenewalMutation();

    const [fetchServiceAPI, { data, error, isLoading }] = serviceService.useFetchServiceMutation();

    const fetchData = () => {
        fetchServiceAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setService(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch service", error);
            });
    };

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

    const handleRenew = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to renew this service?");
        if (confirmed) {
            updateRenewal({ id }).unwrap().then(() => {
                fetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };
    const calculateDaysRemaining = (expireDate) => {
        if (!expireDate) return 'No expire date';
        const today = new Date();
        const expire = new Date(expireDate);
        const differenceInTime = expire.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
        if (differenceInDays>15){
            return <span className="common-tag type-success">Active</span>;
        }
        return differenceInDays >= 0 ? <span className="common-tag type-danger">{differenceInDays} Days Remaining</span> : 'Expired';
    };

    const handleEdit = (service: any) => {
        navigate(`/admin/services/edit/${service.id}`, { state: { service } });
    };

    useEffect(() => {
        fetchData();
    }, [limit, offset]);

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
            name: "Client Name",
            selector: (row: any) => row.client.name,
            sortable: true,
        },
        {
            name: "Service Type",
            selector: (row: any) => row.service_type.name,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row: any) => row.currency_id+'. '+ row.price,
            sortable: true,
        },
        {
            name: "Start Date",
            selector: (row: any) => row.start_date,
            sortable: true,
        },
        {
            name: "Expire Date",
            selector: (row: any) => row.expire_date,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: any) => calculateDaysRemaining(row.expire_date),
            sortable: true,
        },
        
        {
            name: "Actions",
            cell: (row: any) => (
                <div>
                    <button onClick={() => handleRenew(row.id)}>Renew?</button>
                    <button onClick={() => handleEdit(row)}>Edit</button>
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
                data={service}
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

export default ServiceTable;