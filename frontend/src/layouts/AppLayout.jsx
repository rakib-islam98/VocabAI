import Navbar from "../components/common/Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="py-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;