import { RouteObject } from "react-router-dom";
import Login from "../app/authentication/Login";
import AuthWrapperLayout from "../app/layout/AuthWrapperLayout";
import Base from "../app/layout/Base";
import ServiceType from "../app/hr/service_type/ServiceType"
import Renewal from "../app/hr/renewal/Renewal";
import Onboarding from "../app/hr/onboarding/Onboarding";
import Service from "../app/hr/service/Service";
import ServiceForm from "../app/hr/service/components/Form";
import Employee from "../app/hr/employee/Employee";
import EmployeeForm from "../app/hr/employee/component/Form";
import EmployeeEducation from "../app/hr/employee_education/EmployeeEducation";
import EmployeeFamily from "../app/hr/employee_family/EmployeeFamily";
import EmployeeQualification from "../app/hr/employee_qualification/EmployeeQualification";
import EmployeeReference from "../app/hr/employee_reference/EmployeeReference";
import EmployeeLanguage from "../app/hr/employee_language/EmployeeLanguage";
import EmployeeExperience from "../app/hr/employee_experience/EmployeeExperience";
import ServiceHistories from "../app/hr/service_histories/ServiceHistories";
import NewEmployeeForm from "../app/hr/forms/EmployeeForm";
import NewInternForm from "../app/hr/forms/InternForm";
import NewVendorForm from "../app/hr/forms/VendorForm";
import NewClientForm from "../app/hr/forms/ClientForm";
import SuccessPage from "../app/hr/forms/success";
import ErrorPage from "../app/hr/forms/error";
import Leave from "../app/hr/employee_leave/Leave";
import ApplyLeave from "../app/hr/Leave/ApplyLeave";
import ApproveLeave from "../app/hr/aprove_leave/ApproveLeave";
import PermissionWrapper from "../app/layout/PermissionWrapperLayout";
import EmployeeCreatePassword from "../app/hr/reset_password/ResetPassword";
import EmployeeAttendance from "../app/hr/employee_attendance/EmployeeAttendance";
import Holiday from "../app/hr/holiday/Holiday";
import AttendanceConfig from "../app/hr/attendance_config/AttendanceConfig";
// import Templates from "../app/hr/template/Template";
import Template from "../app/hr/template/Template";
import UpdateTemplate from "../app/hr/template/component/UpdateTemplate";
import SMSTemplate from "../app/hr/sms_template/SmsTemplate";
import UpdateSMSTemplate from "../app/hr/sms_template/component/updateSMSTemplate";
import Broadcast from "../app/hr/broadcast/Broadcast";
import EditClientForm from "../app/hr/client/EditClient";
import EmployeeAttendanceSummary from "../app/hr/employee_attendance/EmployeeAttendanceSummary";
import EditVendorForm from "../app/hr/vendor/Vendor";
import EditInternForm from "../app/hr/internship/Internship";
import NotificationPage from "../app/hr/notifications/Notification";
import UserNotification from "../app/hr/user_based_notification/UserBasedNotification";
import Group from "../app/hr/group/Group";
import PermissionForm from "../app/hr/permission/ManagePermission";
import User from "../app/hr/user/User";
import UserPermissionForm from "../app/hr/permission/UserManagePermission";
import EmployeeAttendanceDaily from "../app/hr/employee_attendance/employeeAttendanceDaily";
import ViewEmployee from "../app/hr/employee/component/View";
import Client from "../app/hr/client/Client";
import ViewClient from "../app/hr/client/ViewClient";
import Settings from "../app/hr/settings";

const routes: RouteObject[] = [
    { path: '/login', element: <Login /> },
    { path: '', element: <Login /> },
    {
        path: '/admin',
        element: <AuthWrapperLayout><Base /></AuthWrapperLayout>,
        children: [
            { path: '/admin/crm/clients', element: <Client /> },
            { path: '/admin/crm/service-types', element: <ServiceType /> },
            { path: '/admin/crm/renewal', element: <Renewal /> },
            {
                path: '/admin/onboarding', element: (
                    <PermissionWrapper redirect={false} permission="onboarding.view_onboarding">
                        <Onboarding />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/crm/services', element: (
                    <PermissionWrapper redirect={false} permission="service.change_service">
                        <Service />
                    </PermissionWrapper>
                )
            },
            { path: '/admin/crm/services/add', element: <ServiceForm /> },
            { path: '/admin/crm/services/edit/:id', element: <ServiceForm /> },
            {
                path: '/admin/crm/service-histories', element: (
                    <PermissionWrapper redirect={false} permission="service_histories.view_servicehistories">
                        <ServiceHistories />
                    </PermissionWrapper>
                )
            },

            { path: '/admin/employees', element: <Employee /> },
            { path: '/admin/client/view/:id', element: <ViewClient /> },
            { path: '/admin/employee/edit/:id', element: <EmployeeForm /> },
            { path: '/admin/employee/view/:id', element: <ViewEmployee /> },
            { path: '/admin/employee-education', element: <EmployeeEducation /> },
            { path: '/admin/employee-family', element: <EmployeeFamily /> },
            { path: '/admin/employee-qualification', element: <EmployeeQualification /> },
            { path: '/admin/employee-reference', element: <EmployeeReference /> },
            { path: '/admin/employee-language', element: <EmployeeLanguage /> },
            { path: '/admin/employee-experience', element: <EmployeeExperience /> },
            { path: '/admin/notifications', element: <NotificationPage /> },

            {
                path: '/admin/leave-type', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.change_leavetype">
                        <Leave />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/apply-leave', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.add_employeeleave">
                        <ApplyLeave />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/approve-leave', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <ApproveLeave />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/attendance', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <EmployeeAttendance />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/holiday', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <Holiday />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/attendance_config', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <AttendanceConfig />
                    </PermissionWrapper>
                )
            },

            {
                path: '/admin/templates/email', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <Template />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/templates/email/edit/:id', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <UpdateTemplate />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/templates/sms', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <SMSTemplate />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/templates/sms/edit/:id', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <UpdateSMSTemplate />
                    </PermissionWrapper>
                )
            },

            {
                path: '/admin/broadcast', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <Broadcast />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/client/edit/:id', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <EditClientForm />
                    </PermissionWrapper>
                )
            },

            {
                path: '/admin/attendance/summary/', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <EmployeeAttendanceSummary />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/vendor/edit/:id', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <EditVendorForm />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/intern/edit/:id', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <EditInternForm />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/user-notification/', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <UserNotification />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/auth/settings', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <Settings />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/auth/group', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <Group />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/auth/group', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <Group />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/auth/permissions/:id', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <PermissionForm />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/auth/users/', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <User />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/auth/user/permissions/:id', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <UserPermissionForm />
                    </PermissionWrapper>
                )
            },
            {
                path: '/admin/attendance/daily_attendance/', element: (
                    <PermissionWrapper redirect={false} permission="employee_leave.delete_employeeleave">
                        <EmployeeAttendanceDaily />
                    </PermissionWrapper>
                )
            },


        ]
    },
    {
        path: '/api',
        children: [
            { path: '/api/employee-invite', element: <NewEmployeeForm /> },
            { path: '/api/admin/employee/employee/:id/', element: <NewEmployeeForm /> },
            { path: '/api/admin/employee/create_password/:id', element: <EmployeeCreatePassword /> },
            { path: '/api/admin/employee/intern/:id/', element: <NewInternForm /> },
            { path: '/api/admin/vendor/vendor/:id/', element: <NewVendorForm /> },
            { path: '/api/admin/client/client/:id/', element: <NewClientForm /> },
            { path: '/api/admin/saved', element: <SuccessPage /> },
            { path: '/api/admin/error', element: <ErrorPage /> },

        ]
    }
]


export { routes }