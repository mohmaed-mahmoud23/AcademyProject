"use client";

import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import { SessionProvider } from "next-auth/react";

const ProvidersComponetns = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
};

export default ProvidersComponetns;
