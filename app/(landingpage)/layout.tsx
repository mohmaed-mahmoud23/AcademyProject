import { ReactNode } from "react";
import Navbar from "./_components/Navbar";

export default function layoutlandingpage({ children }: { children: ReactNode }){
    return (
      <div>
        <Navbar/>
        {children}
        
      </div>
    );
}