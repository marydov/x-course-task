import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default function Layout(props) {
  return (
    <div className="App">
      <Header setUserName={props.setUserName} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
