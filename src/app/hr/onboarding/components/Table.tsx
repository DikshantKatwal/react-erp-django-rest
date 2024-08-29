/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { onboardingService, useDeleteMutation, useResendMutation } from "../../../../services/onboarding/Onboarding";
import { useNavigate } from "react-router-dom";
import { employeeService } from "../../../../services/employee/Employee";
import { clientService } from "../../../../services/client/Client";
import { vendorService } from "../../../../services/vendor/Vendor";
import toast from 'react-hot-toast';


interface OnboardingTableProp {
    shouldRefetch: boolean;
    openModal: (renewal: any) => void;
}

const OnboardingTable: React.FC<OnboardingTableProp> = ({ shouldRefetch, openModal }) => {
    const [fetchOnboardingAPI, { error, isLoading }] = onboardingService.useFetchOnboardingMutation();
    const [fetchEmployeeAPI] = employeeService.useFetchEmployeeMutation();
    const [fetchClientAPI] = clientService.useFetchClientMutation();
    const [fetchVendorAPI] = vendorService.useFetchVendorMutation();

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [onboarding, setOnboarding] = useState<any[]>([]);
    const navigate = useNavigate();
    const [delete_onboarding] = useDeleteMutation();
    const [resend_onboarding] = useResendMutation();
    const [employee, setEmployee] = useState<any[]>([]);
    const [client, setClient] = useState<any[]>([]);
    const [vendor, setVendor] = useState<any[]>([]);
    const success = (s: string) => toast.success(s);
    // const navigate = useNavigate();
    const handleEdit = (row: { id: any; }) => {
        const matchedEmployee = employee.find(emp => emp.onboarding === row.id);
        const matchedClient = client.find(cli => cli.onboarding === row.id);
        const matchedVendor = vendor.find(ven => ven.onboarding === row.id);
        if (matchedEmployee) {
            if (!matchedEmployee.isintern) {
                navigate(`/admin/employee/view/${matchedEmployee.id}`, { state: { employee: matchedEmployee } });
            }
            else{
                navigate(`/admin/intern/edit/${matchedEmployee.id}`, { state: { intern: matchedEmployee } });
            }
        }
        if (matchedClient) {
            navigate(`/admin/client/edit/${matchedClient.id}`, { state: { client: matchedClient } });
        } 
        if (matchedVendor) {
            navigate(`/admin/vendor/edit/${matchedVendor.id}`, { state: { vendor: matchedVendor } });
        } 
    };

    const fetchData = () => {
        fetchOnboardingAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setOnboarding(response.results);
                setTotalRows(response.count);
            })
            .catch((error: any) => {
                console.error("Failed to fetch onboardings", error);
            });

        fetchClientAPI({ limit, offset })
            .unwrap()
            .then((response: any) => {
                setClient(response.data);
            })
            .catch((error: any) => {
                console.error("Failed to fetch client", error);
            });

        fetchEmployeeAPI({ limit, offset })
        .unwrap()
        .then((response: any) => {
            setEmployee(response.results);
        })
        .catch((error: any) => {
            console.error("Failed to fetch service", error);
        });
        fetchVendorAPI({ limit, offset })
        .unwrap()
        .then((response: any) => {
            setVendor(response.results);
        })
        .catch((error: any) => {
            console.error("Failed to fetch service", error);
        });
    };

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this form?");
        if (confirmed) {
            delete_onboarding({ id }).unwrap().then(() => {
                fetchData();
                success('Deleted');
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };

    const handleResend = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to resend this form?");
        if (confirmed) {
            resend_onboarding({ id }).unwrap().then(() => {
                fetchData();
                success('Resend Successful');
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
            cell: (_row: any, index: number) => offset + index + 1,
            sortable: false,
        },
        {
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: any) => row.email,
            sortable: true,
            cell: (row: any) => (
                <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleEdit(row)}>
                    {row.email}
                </div>
            ),},
        {
            name: "Position",
            selector: (row: any) => row.user_type,
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
                    {row.status !== 'Active' && <button onClick={() => handleResend(row.id)}>Resend</button>}
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
                data={onboarding}
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

export default OnboardingTable;