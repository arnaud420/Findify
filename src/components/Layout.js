import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendSuccessNotif } from '../actions/notif';
import Navbar from './Navbar';

const Layout = ({ children, section, container }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const notif = useSelector(state => state.notif);

  useEffect(() => {
    if (location.search === '?isAuth=1') {
      dispatch(sendSuccessNotif('Authentification réussi !'));
    }
  }, [location])

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
