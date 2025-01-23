import React from 'react';
import SideBar from './Sidebar';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <section className="flex flex-col bg-gradient-to-br from-[#F0F0F0] via-[#B1ECFF] to-[#0F83C3] h-full w-full">
      <div className="fixed z-10 h-screen">
        <SideBar />
      </div>
      <main className=" pl-14 pt-7 w-full relative z-0 min-h-screen h-full">{children}</main>
    </section>
  );
}

export default Layout;
