import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import { lighten, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from "react-redux";
import { Sales_SELECTED } from "../actions/actionTypes";


const StyledTableCell = withStyles((theme) => ({
    head: {

        color: "#97A1A9",
    },
    body: {
        backgroundColor: "#273D49CC",
        color: "white",
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#283a46",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "#2c414f",
        },
    },
}))(TableRow);
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'name_customer', label: 'Customer Name' },
    { id: 'cust_number', label: 'customer #' },
    { id: 'invoice_id', label: 'sales_order_id' },
    { id: 'total_open_amount', label: 'total_open_amount' },
    { id: 'due_in_date', label: 'Due date' },
    { id: 'predicted payment date', label: 'Predicted Payment Date' },
    { id: 'predicted aging bucket', label: 'Predicted Aging Bucket' },
    { id: 'notes', label: 'Notes' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                    style={{
                        color: "#14AFF1" }}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        backgroundColor: '#2c414f',
        color: 'red',
        borderCollapse: 'collapse',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    let [responseData, setResponseData] = React.useState([]);
    let [isNext, isNextFunc] = React.useState(false);
    let [pageCount, setCount] = React.useState(0);
    const mydispatch = useDispatch()
    React.useEffect(() => {
        getData();
        return () => { };
    }, []);
    const getData = () => {
        axios
            .get(
                `http://localhost:8080/1805637/InvoiceServlet?page=${pageCount}`
            )
            .then((response) => {
                setResponseData([...responseData, ...response.data]);
                isNextFunc(true);
                setCount(pageCount + 20);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = responseData.map((n) => n.invoice_id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;


    React.useEffect(() => {
        mydispatch({
            type: Sales_SELECTED,
            data: selected,
        });
        return () => { };
    }, [selected]);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <InfiniteScroll
                    height="25rem"
                    dataLength={responseData.length}
                    next={getData}
                    hasMore={isNext}
                    loader={
                        <div style={{ paddingLeft: '50%', overflow: 'hidden' }}>
                            <CircularProgress />
                        </div>
                    }
                    scrollableTarget="table"
                >
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={responseData.length}
                            />
                            <TableBody>
                                {stableSort(responseData, getComparator(order, orderBy))
                                    .map((row, index) => (
                                        // console.log(row);
                                        // const isItemSelected = isSelected(row.invoice_id);
                                        // const labelId = `enhanced-table-checkbox-${index}`;

                                        
                                            <StyledTableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.invoice_id)}
                                                role="checkbox"
                                                // aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.invoice_id}
                                                // selected={isItemSelected}

                                            >
                                                <StyledTableCell style={{ borderBottom: 0 }} padding="checkbox">
                                                    <Checkbox
                                                    style={{
                                                        color: "#14AFF1" }}
                                                        // checked={isItemSelected}
                                                        // inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell style={{ borderBottom: 0 }} component="th" scope="row">
                                                    {row.cust_name}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ borderBottom: 0 }} align="left">{row.cust_no}</StyledTableCell>
                                                <StyledTableCell style={{ borderBottom: 0 }} align="left">{row.inv_no}</StyledTableCell>
                                                <StyledTableCell style={{ borderBottom: 0 }} align="left">{row.amo}</StyledTableCell>
                                                <StyledTableCell style={{ borderBottom: 0 }} align="left">{row.due_date}</StyledTableCell>
                                                <StyledTableCell style={{ borderBottom: 0 }} align="center">__</StyledTableCell>
                                                <StyledTableCell style={{ borderBottom: 0 }} align="center">__</StyledTableCell>
                                                {/* <StyledTableCell align="left">{row.notes}</StyledTableCell> */}
                                                <StyledTableCell style={{ borderBottom: 0 }} align="left">Lorem ipsum dolor sit</StyledTableCell>
                                            </StyledTableRow >
                                        
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </InfiniteScroll>
            </Paper>
        </div>
    );
                                }
