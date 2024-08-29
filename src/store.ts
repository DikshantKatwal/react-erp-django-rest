import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import loaderSlice from "./slices/loaderSlice";
import serviceTypeSlice from "./slices/serviceTypeSlice";
import templateSlice from "./slices/templateSlice";
import smsSlice from "./slices/smsSlice";
import { authService } from "./services/authentication/authService";
import { serviceTypeService } from "./services/service_type/ServiceType";
import { renewalService } from "./services/renewal/Renewal";
import { onboardingService } from "./services/onboarding/Onboarding";
import { serviceService } from "./services/service/Service";
import { employeeService } from "./services/employee/Employee";
import { employeeEducationService } from "./services/employeeEducation/EmployeeEducation";
import { employeeFamilyService } from "./services/employeeFamily/EmployeeFamily";
import { employeeQualificationService } from "./services/employeeQualification/EmployeeQualification";
import { employeeReferenceService } from "./services/employeeReference/EmployeeReference";
import { employeeLanguageService } from "./services/employeeLanguage/EmployeeLanguage";
import { employeeExperienceService } from "./services/employeeExperience/EmployeeExperience";
import { ServiceHistories } from "./services/serviceHistories/ServiceHistories";
import { vendorService } from "./services/vendor/Vendor";
import { clientService } from "./services/client/Client";
import { leaveService } from "./services/employeeLeave/EmployeeLeave";
import { ApplyleaveService } from "./services/Leave/Leave";
import { employeeAttendanceService } from "./services/employeeAttendance/EmployeeAttendance";
import { HolidayService } from "./services/holiday/Holiday";
import { Attendance_configService } from "./services/attendanceConfig/AttendanceConfig";
import { templateService } from "./services/template/Template";
import { BroadcastService } from "./services/broadcast/Broadcast";
import { UploaderService } from "./services/uploader/Uploader";
import { NotificationService } from "./services/notification/Notification";
import { GroupService } from "./services/group/Group";
import { PermissionsService } from "./services/permissions/Permissions";
import { UserService } from "./services/user/User";

const store = configureStore({
  reducer: {
    loaderSlice,
    authSlice,
    serviceTypeSlice,
    templateSlice,
    smsSlice,
    [authService.reducerPath]: authService.reducer,
    [serviceTypeService.reducerPath]: serviceTypeService.reducer,
    [renewalService.reducerPath]: renewalService.reducer,
    [onboardingService.reducerPath]: onboardingService.reducer,
    [serviceService.reducerPath]: serviceService.reducer,
    [employeeService.reducerPath]: employeeService.reducer,
    [employeeEducationService.reducerPath]: employeeEducationService.reducer,
    [employeeFamilyService.reducerPath]: employeeFamilyService.reducer,
    [employeeQualificationService.reducerPath]: employeeQualificationService.reducer,
    [employeeReferenceService.reducerPath]: employeeReferenceService.reducer,
    [employeeLanguageService.reducerPath]: employeeLanguageService.reducer,
    [employeeExperienceService.reducerPath]: employeeExperienceService.reducer,
    [ServiceHistories.reducerPath]: ServiceHistories.reducer,
    [vendorService.reducerPath]: vendorService.reducer,
    [clientService.reducerPath]: clientService.reducer,
    [leaveService.reducerPath]: leaveService.reducer,
    [ApplyleaveService.reducerPath]: ApplyleaveService.reducer,
    [employeeAttendanceService.reducerPath]: employeeAttendanceService.reducer,
    [HolidayService.reducerPath]: HolidayService.reducer,
    [Attendance_configService.reducerPath]: Attendance_configService.reducer,
    [templateService.reducerPath]: templateService.reducer,
    [BroadcastService.reducerPath]: BroadcastService.reducer,
    [UploaderService.reducerPath]: BroadcastService.reducer,
    [NotificationService.reducerPath]: NotificationService.reducer,
    [GroupService.reducerPath]: GroupService.reducer,
    [PermissionsService.reducerPath]: GroupService.reducer,
    [UserService.reducerPath]: GroupService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      serviceTypeService.middleware,
      renewalService.middleware,
      onboardingService.middleware,
      serviceService.middleware,
      employeeService.middleware,
      employeeEducationService.middleware,
      employeeFamilyService.middleware,
      employeeQualificationService.middleware,
      employeeReferenceService.middleware,
      employeeLanguageService.middleware,
      employeeExperienceService.middleware,
      ServiceHistories.middleware,
      vendorService.middleware,
      clientService.middleware,
      leaveService.middleware,
      ApplyleaveService.middleware,
      employeeAttendanceService.middleware,
      HolidayService.middleware,
      Attendance_configService.middleware,
      templateService.middleware,
      BroadcastService.middleware,
      UploaderService.middleware,
      NotificationService.middleware,
      GroupService.middleware,
      PermissionsService.middleware,
      UserService.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
