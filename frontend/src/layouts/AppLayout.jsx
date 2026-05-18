import Container from "../components/ui/Container";
import Navbar from "../components/common/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <Container>
          <Navbar />
        </Container>
      </header>

      <main className="py-6">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
}