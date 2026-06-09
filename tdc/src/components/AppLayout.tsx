import Sidebar from "./Sidebar";

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Sidebar />

      <main
        className="
        ml-64
        min-h-screen
        bg-slate-100
        p-8
        "
      >
        {children}
      </main>
    </>
  );
}