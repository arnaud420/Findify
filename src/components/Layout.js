import Navbar from './Navbar';

const Layout = ({ children, section, container }) => (
  <main>
    <Navbar />
    <div className={section === false ? null : 'section'}>
      <div className={container === false ? null : 'container'}>
        {children}
      </div>
    </div>
  </main>
);

export default Layout;
