import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface NavigationContextProps {
    navigationType: string | null;
    setNavigationType: (type: string) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize navigationType from localStorage, default to null
    const [navigationType, setNavigationType] = useState<string | null>(() => {
        return localStorage.getItem('navigationType') || null;
    });

    useEffect(() => {
        // Save navigationType to localStorage whenever it changes
        if (navigationType !== null) {
            localStorage.setItem('navigationType', navigationType);
        } else {
            localStorage.removeItem('navigationType');
        }
    }, [navigationType]);

    return (
        <NavigationContext.Provider value={{ navigationType, setNavigationType }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
