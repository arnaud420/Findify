import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';

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
    <main>
      <ToastContainer limit={3} />
      <Navbar />
      <div className={section === false ? null : 'section'}>
        <div className={container === false ? null : 'container'}>
          {children}
        </div>
      </div>
    </main>
  );
}

export default Layout;
