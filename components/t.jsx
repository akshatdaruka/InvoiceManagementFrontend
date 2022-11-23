import React, { useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
export default function API() {
    let [responseData, setResponseData] = React.useState([]);
    let [isNext, isNextFunc] = React.useState(false);
    let [pageCount, setCount] = React.useState(1);

    useEffect(() => {
        moreData();
    }, []);

    function getData() {
        axios
            .get(`http://localhost:8080/1805637/read?index=${pageCount}`)
            .then((response) => {

                setResponseData([...responseData, ...response.data]);
                isNextFunc(true);

            })
            .catch((error) => {
                console.log("Error!");
            });
    }

    function moreData() {
        setCount(pageCount + 1);
        getData();
    }


    return (
        <div id="table" style={{ overflow: 'scroll' }}>

            <InfiniteScroll
                height="25rem"
                dataLength={responseData.length}
                next={moreData}
                hasMore={isNext}
                loader={
                    <div style={{ paddingLeft: '50%', overflow: 'hidden' }}>
                        <CircularProgress />
                    </div>
                }
                scrollableTarget="table"
            >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableCell>name_customer</TableCell>
                            <TableCell align="right">cust_number</TableCell>
                            <TableCell align="right">invoice_id</TableCell>
                            <TableCell align="right">total_open_amount</TableCell>
                            <TableCell align="center">due_in_date</TableCell>
                            <TableCell align="center">notes</TableCell>
                        </TableHead>
                        <TableBody>
                            {responseData.map((data, index) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {data.name_customer}
                                    </TableCell>
                                    <TableCell align="right">{data.cust_number}</TableCell>
                                    <TableCell align="right">{data.invoice_id}</TableCell>
                                    <TableCell align="right">{data.total_open_amount}</TableCell>
                                    <TableCell align="right">{data.due_in_date}</TableCell>
                                    <TableCell align="right">{data.notes}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </InfiniteScroll>
        </div>
    );
}
