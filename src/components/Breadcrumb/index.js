import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => (
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      {
        items.map((item) =>
          item.link
            ? (
              <li key={item.label}>
                <Link
                  to={item.link}
                >
                  {item.label}
                </Link>
              </li>
            )
            : (
              <li key={item.label} className="is-active">
                <a href="#" className="has-text-white" aria-current="page">{item.label}</a>
              </li>
            )
        )
      }
    </ul>
  </nav>
);

export default Breadcrumb;
