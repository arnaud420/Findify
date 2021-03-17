import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar';
import './Layout.scss';

const Layout = ({ children, section, container }) => {
  const notif = useSelector(state => state.notif);

  if (notif.type && notif.message) {
    toast[notif.type](notif.message, {
      position: 'top-right',
      autoClose: 3000,
      toastId: notif.id,
    });
  }

  return (
    <main className='is-flex is-flex-direction-column'>
      <ToastContainer limit={3} />
      <Navbar />

      <div className={`main-content ${section === false ? null : 'section'}`}>
        <div className={container === false ? null : 'container'}>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Layout;
