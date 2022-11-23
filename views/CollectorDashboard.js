import React, { useState } from 'react';
import Box from '../components/box';
import Header from '../Header';
import '../Header.css';
import Add from '../components/Addbutton';
import Edit from '../components/editbutton';
import Delete from "../components/deletebutton";
import Tf from "../components/table";
import T from "../components/t";
import EnhancedTable from "../components/table";
class CollectorDashboard extends React.Component {
  render() {
    return (
      <div className="main">
        <Header />
        <h1 className='invoice'>Invoice List</h1>
        <Box/>
        {/* <div><Tf/></div> */}
        {/* <T/> */}
        {/* <EnhancedTable/> */}
        {/* <T/> */}
      </div>
    );
  }

}
export default CollectorDashboard;
