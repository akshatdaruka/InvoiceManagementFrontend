import React from 'react';
import './Header.css'
import pic1 from '../src/assets/companyLogo.svg';
import pic2 from '../src/assets/logo.svg';

class Header extends React.Component {  
 render() {
        return (
            <div>
                <div className="left">
                    <img src={pic1} />
                    ABC Products
                </div>
                <div className="mid">
                    <img src={pic2} />
                </div>
            </div >
        );
    }
}

export default Header;