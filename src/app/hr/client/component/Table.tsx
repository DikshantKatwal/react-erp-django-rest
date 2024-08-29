/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { clientService } from "../../../../services/client/Client";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface ClientTableProp {

}

const ClientTable: React.FC<ClientTableProp> = () => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [client, setClient] = useState<any[]>([]);
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const [fetchClientAPI, { error, isLoading }] = clientService.useFetchClientMutation();
    const fetchData = () => {
        fetchClientAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setClient(response.data);
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

    const handleEdit = (client: any) => {
        navigate(`/admin/client/view/${client.id}`, { state: { client } });
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
            name: "Contact Person",
            selector: (row: any) => row.contactperson,
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
                data={client}
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
export default ClientTable;
