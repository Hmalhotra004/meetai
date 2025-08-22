import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return <div className="h-screen bg-black">{children}</div>;
};

export default layout;
