import React, { useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Pagination from "./Pagination";

import { GlobalContext } from "../Context/GlobalState";

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const Customer = (props) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sort, setSort] = React.useState("max");
  const [data, setData] = React.useState();
  const { customers, getCustomers } = useContext(GlobalContext);

  let emptyRows;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isMaximum = (row) => {
    const condition = (element) => element.id === row.id;
    let index = data.findIndex(condition);

    let newArr = [...data];
    newArr[index].active = !row.active;
    setData(newArr);
  };
  useEffect(() => {
    if (data && sort == "min") {
      let objs = [...data];
      objs.sort((a, b) =>
        Math.max.apply(
          Math,
          a.bids.map(function (o) {
            return o.amount;
          })
        ) >
        Math.max.apply(
          Math,
          b.bids.map(function (o) {
            return o.amount;
          })
        )
          ? 1
          : Math.max.apply(
              Math,
              b.bids.map(function (o) {
                return o.amount;
              })
            ) >
            Math.max.apply(
              Math,
              a.bids.map(function (o) {
                return o.amount;
              })
            )
          ? -1
          : 0
      );
      setData(objs);
    } else if (data && sort === "max") {
      let objs = [...data];
      objs.sort((a, b) =>
        Math.max.apply(
          Math,
          a.bids.map(function (o) {
            return o.amount;
          })
        ) <
        Math.max.apply(
          Math,
          b.bids.map(function (o) {
            return o.amount;
          })
        )
          ? 1
          : Math.max.apply(
              Math,
              b.bids.map(function (o) {
                return o.amount;
              })
            ) <
            Math.max.apply(
              Math,
              a.bids.map(function (o) {
                return o.amount;
              })
            )
          ? -1
          : 0
      );
      setData(objs);
    }
  }, [sort]);
  useEffect(() => {
    emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        (customers && customers.length) - page * rowsPerPage
      );
    customers.forEach(function (element) {
      element.active = true;
    });
    setData(customers);
  }, [customers]);
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer name (with avtar)</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Premium</StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={(e) => setSort(sort === "max" ? "min" : "max")}
            >
              Max/Min bid  {sort==="max"?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>}
            </StyledTableCell>
            <StyledTableCell align="center"> Max/Min toggler</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            (rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" style={{ width: 160 }} scope="row">
                  <img src={row.avatarUrl} width="80" height="80" alt="avtar" />
                  {row.firstname} {row.firstname}{" "}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.phone}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.hasPremium ? "Premium" : "Not Premium"}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.active
                    ? Math.max.apply(
                        Math,
                        row.bids.map(function (o) {
                          return o.amount;
                        })
                      )
                    : Math.min.apply(
                        Math,
                        row.bids.map(function (o) {
                          return o.amount;
                        })
                      )}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Switch
                    checked={row.active}
                    onChange={(e) => isMaximum(row)}
                    color="primary"
                    name="max"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </TableCell>
              </TableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={customers && customers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={Pagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Customer;
