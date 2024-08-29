/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useFetchMutation, useDeleteMutation } from "../../../../services/notification/Notification.ts";
import PermissionWrapper from "../../../layout/PermissionWrapperLayout.tsx";

interface UserNotificationTableProp {
  shouldRefetch: boolean;
  openModal: (leave: any) => void;
}

const UserNotificationTable: React.FC<UserNotificationTableProp> = ({
  shouldRefetch,
  openModal,
}) => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [broadcast, setUserNotification] = useState<any[]>([]);

  const [delete_leave] = useDeleteMutation();

  const [fetchUserNotificationAPI, { error, isLoading }] =useFetchMutation();

  const fetchData = () => {
    fetchUserNotificationAPI({ limit, offset })
      .unwrap()
      .then((response: any) => {
        setUserNotification(response.results);
        setTotalRows(response.count);
      })
      .catch((error: any) => {
        console.error("Failed to fetch broadcast", error);
      });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user notification?"
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
      name: "To User",
      selector: (row: any) => row.employee,
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
                    alt="Image preview"
                    id="imagePreview"
                    style={{ maxWidth: "70%", maxHeight: "80%", objectFit: "cover" }}
                />
          </a>
        </span>
      ),
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

export default UserNotificationTable;
