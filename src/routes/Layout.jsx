import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default function Layout() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
