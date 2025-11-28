import React from 'react';
import { Link } from "react-router-dom";
import Clickable from "./Clickable";
import Centered from "./Centered";

// Simple header component — layout handled with inline styles

const Header = props => {
  const { onNav, ...rest } = props;
  return (
    <header style={{ background: '#071021', color: '#bcd', padding: '12px 0' }} {...rest}>
      <Centered style={{ display: 'flex', alignItems: 'center', lineHeight: '80px' }}>
        <img src="/favicon.png" alt="" style={{ margin: '15px 10px 15px 0', height: 50 }} />
        <div style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 28 }}>NASA Mission Control</div>
      <nav style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <Clickable className="clickable" onClick={onNav}>
          <Link style={{ color: '#bcd', textDecoration: 'none', padding: '6px 8px' }} to="/launch">
            <i className="material-icons" style={{ marginRight: 6 }}></i>
            Launch
          </Link>
        </Clickable>
        <Clickable className="clickable" onClick={onNav}>
          <Link style={{ color: '#bcd', textDecoration: 'none', padding: '6px 8px' }} to="/upcoming">
            <i className="material-icons" style={{ marginRight: 6 }}></i>
            Upcoming
          </Link>
        </Clickable>
        <Clickable className="clickable" onClick={onNav}>
          <Link style={{ color: '#bcd', textDecoration: 'none', padding: '6px 8px' }} to="/history">
            <i className="material-icons" style={{ marginRight: 6 }}></i>
            History
          </Link>
        </Clickable>
      </nav>
    </Centered>
    </header>
  );
};

export default Header;