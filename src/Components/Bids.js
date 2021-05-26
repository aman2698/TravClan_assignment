import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
const Bids = ({location}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell>ID</TableCell>
              <TableCell align="center">Car Title</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {location.state.bids.map((row) => (
              <TableRow key={row.id}>
                
                <TableCell >{row.id}</TableCell>
                <TableCell align="center">{row.carTitle}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}


export default Bids
