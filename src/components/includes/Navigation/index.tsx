import React, { Component } from 'react';
import HrNavigation from './HrNavigation';
import CrmNavigation from './CrmNavigation';
import { useNavigation } from '../NavigationContext';

const Navigation = () => {
    const { navigationType } = useNavigation();

    return (
        <>
            {navigationType === 'hrm' && <HrNavigation />}
            {navigationType === '' || navigationType === undefined || navigationType === null && <HrNavigation />}
            {navigationType === 'crm' && <CrmNavigation />}
            {/* You can add a default navigation component if needed */}
        </>
    );
};

export default Navigation;
