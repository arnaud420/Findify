const IconText = ({ children, icon, className }) => (
  <span className={`icon-text is-flex ${className ? className : ''}`}>
    <span className="icon">
      {icon}
    </span>
    <span>{children}</span>
  </span>
);

export default IconText;
