const Centered = props => {
  const { className = "", children, style = {}, ...rest } = props;

  const defaultStyle = {
    margin: "0 auto",
    maxWidth: 800,
  };

  const responsiveStyle = {
    paddingLeft: 12,
    paddingRight: 12,
  };

  return (
    <div
      className={className}
      style={{ ...defaultStyle, ...(style || {}), ...(window.innerWidth <= 800 ? responsiveStyle : {}) }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Centered;
