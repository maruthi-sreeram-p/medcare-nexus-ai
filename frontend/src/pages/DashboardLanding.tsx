import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { MainLayout } from '../layouts/MainLayout';
import { DoctorDashboard } from './doctor/DoctorDashboard';
import { PatientDashboard } from './patient/PatientDashboard';
import { StaffDashboard } from './staff/StaffDashboard';
import { AdminDashboard } from './admin/AdminDashboard';

export const DashboardLanding: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'ROLE_ADMIN':
        return <AdminDashboard />;
      case 'ROLE_DOCTOR':
        return <DoctorDashboard />;
      case 'ROLE_STAFF':
        return <StaffDashboard />;
      case 'ROLE_PATIENT':
      default:
        return <PatientDashboard />;
    }
  };

  return <MainLayout>{renderDashboardByRole()}</MainLayout>;
};
