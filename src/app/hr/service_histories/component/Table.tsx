/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useFetchServiceHistoriesMutation } from "../../../../services/serviceHistories/ServiceHistories";

interface ServiceHistoriesTableProp {
}

const ServiceHistoriesTable: React.FC<ServiceHistoriesTableProp> = () => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [servicehistories, setServiceHistories] = useState<any[]>([]);

    const [fetchServiceHistoriesAPI, { error, isLoading }] = useFetchServiceHistoriesMutation();

    const fetchData = () => {
        fetchServiceHistoriesAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setServiceHistories(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch servicehistories", error);
            });
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
            name: "Client Name",
            selector: (row: any) => row.client.name,
            sortable: true,
        },
        {
            name: "Started Date",
            selector: (row: any) => row.start_date,
            sortable: true,
        },
        {
            name: "Expired Date",
            selector: (row: any) => row.expire_date,
            sortable: true,
        },
        {
            name: "Amount",
            selector: (row: any) => row.currency_id+'. '+row.paid_amount,
            sortable: true,
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
                data={servicehistories}
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

export default ServiceHistoriesTable;