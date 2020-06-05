import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <div className="page-footer">
      <Link className="footer-link" to="/conditions"> <strong>Conditions of Use</strong> </Link>
      <Link className="footer-link" to="/privacy"><strong> Privacy Notice</strong></Link>
      <Link className="footer-link" to="/interestbasedads"><strong>Interest-Based Ads</strong></Link>
      <Link className="footer-link-rights" to="/smallshop">&nbsp;<strong>© 2020, Smallshop.com, Inc. or its affiliates</strong></Link>
    </div>
  )
}

export default Footer;
