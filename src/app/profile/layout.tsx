import ProtectedRoute from "@/utilities/routesUtil";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
