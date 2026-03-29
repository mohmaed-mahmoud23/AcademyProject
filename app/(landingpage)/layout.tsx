import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Foter";

export default function layoutlandingpage({ children }: { children: ReactNode }){
    return (
      <div>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    );
}