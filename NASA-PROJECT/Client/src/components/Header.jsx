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
          <a style={{ color: '#bcd', textDecoration: 'none', padding: '6px 8px' }} href="#/launch">
            <i className="material-icons" style={{ marginRight: 6 }}>check_circle_outline</i>
            Launch
          </a>
        </Clickable>
        <Clickable className="clickable" onClick={onNav}>
          <a style={{ color: '#bcd', textDecoration: 'none', padding: '6px 8px' }} href="#/upcoming">
            <i className="material-icons" style={{ marginRight: 6 }}>update</i>
            Upcoming
          </a>
        </Clickable>
        <Clickable className="clickable" onClick={onNav}>
          <a style={{ color: '#bcd', textDecoration: 'none', padding: '6px 8px' }} href="#/history">
            <i className="material-icons" style={{ marginRight: 6 }}>history</i>
            History
          </a>
        </Clickable>
      </nav>
    </Centered>
    </header>
  );
};

export default Header;