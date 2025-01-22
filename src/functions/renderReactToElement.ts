import { createRoot } from "react-dom/client";
import React from "react";


export const renderReactToElement = (Component: React.ReactNode) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(Component);
    return container;
};