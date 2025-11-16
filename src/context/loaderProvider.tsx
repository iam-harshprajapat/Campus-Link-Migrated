"use client";

import GlobalLoader from "@/components/shared/notification/globalLoader";
import { createContext, useContext, useState } from "react";

interface LoaderState {
    isOpen: boolean;
    message?: string;
    progress?: number | null;
}

interface LoaderContextValue {
    showLoader: (message?: string) => void;
    updateProgress: (pct: number) => void;
    hideLoader: () => void;
    state: LoaderState;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<LoaderState>({
        isOpen: false,
        message: "",
        progress: null,
    });

    const showLoader = (message?: string) => {
        setState({
            isOpen: true,
            message,
            progress: null,
        });
    };

    const updateProgress = (pct: number) => {
        setState((prev) => ({
            ...prev,
            progress: pct,
        }));
    };

    const hideLoader = () => {
        setState({
            isOpen: false,
            message: "",
            progress: null,
        });
    };

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader, updateProgress, state }}>
            {children}
            <GlobalLoader />
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const ctx = useContext(LoaderContext);
    if (!ctx) throw new Error("useLoader must be used inside LoaderProvider");
    return ctx;
};
