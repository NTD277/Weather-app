"use client";

import {createContext, ReactNode, useContext} from "react";

interface PanelProps {
    title: ReactNode;
    children: ReactNode;
}

const PanelProps = createContext<PanelProps | null>(null)


export const useAccount = () => {
    const context = useContext(PanelProps)

    if (context === null) {
        throw new Error("useAccount must be used within a AccountProvider")
    }
    return context
}