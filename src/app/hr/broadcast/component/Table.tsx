/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  BroadcastService,
  useDeleteMutation,
} from "../../../../services/broadcast/Broadcast.ts";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";

interface BroadcastTableProp {
  shouldRefetch: boolean;
  openModal: (leave: any) => void;
}

const BroadcastTable: React.FC<BroadcastTableProp> = ({
  shouldRefetch,
  openModal,
}) => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [broadcast, setBroadcast] = useState<any[]>([]);

  const [delete_leave] = useDeleteMutation();

  const [fetchBroadcastAPI, { error, isLoading }] =
    BroadcastService.useFetchMutation();

  const fetchData = () => {
    fetchBroadcastAPI({ limit, offset })
      .unwrap()
      .then((response: any) => {
        setBroadcast(response.results);
        setTotalRows(response.count);
      })
      .catch((error: any) => {
        console.error("Failed to fetch broadcast", error);
      });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this broadcast?"
    );
    if (confirmed) {
      delete_leave({ id })
        .unwrap()
        .then(() => {
          fetchData();
        })
        .catch(() => {
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
      cell: (_row: any, index: number) => offset + index + 1,
      sortable: false,
    },
    {
      name: "title",
      selector: (row: any) => row.title,
      sortable: true,
      cell: (row: any) => (
        <div>
          <a onClick={() => openModal(row)}>{row.title}</a>
        </div>
      ),
    },
    {
      name: "type",
      selector: (row: any) => row.type,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row: any) => row.image,
      sortable: true,
      cell: (row: any) => (
        <span className="image-container">
            <a onClick={() => openModal(row)}>
                <img
                    src={row.image}
                    alt="No Image"
                    id="imagePreview"
                    style={{ maxWidth: "70%", maxHeight: "80%", objectFit: "cover" }}
                />
          </a>
        </span>
      ),
    },
    {
      name: "from",
      selector: (row: any) => row.from_date,
      sortable: true,
    },
    {
      name: "to",
      selector: (row: any) => row.to_date,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div>
          <PermissionWrapper
            redirect={false}
            permission="employee_leave.change_leavetype"
          >
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

export default BroadcastTable;
