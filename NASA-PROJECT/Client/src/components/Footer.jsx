import Centered from "./Centered";

const Footer = () => {
  return (
    <footer style={{ padding: 12, background: '#071021', color: '#bcd' }}>
      <Centered>
        <p style={{ fontSize: 14, margin: "10px 0" }}>
          This is not an official site and is not affiliated with NASA or SpaceX in any way. For educational purposes only.
        </p>
      </Centered>
    </footer>
  );
};

export default Footer;
