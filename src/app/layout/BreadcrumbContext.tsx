import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BreadcrumbContextType {
    breadcrumbs: string | JSX.Element;
    setBreadcrumbs: (breadcrumbs: string | JSX.Element) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const useBreadcrumb = (): BreadcrumbContextType => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
    }
    return context;
};

interface BreadcrumbProviderProps {
    children: ReactNode;
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = useState<string | JSX.Element>('Dashboard');

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};