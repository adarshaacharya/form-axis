import { ReactNode } from "react";

interface FormLayoutProps {
  children: ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}
