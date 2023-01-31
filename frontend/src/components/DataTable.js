import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button'
import useAxios from '../utils/useAxios';
import GetAppIcon from '@mui/icons-material/GetApp';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField'
import Collapse from '@mui/material/Collapse';
import { useEffect } from 'react';
import SnackWarning from './SnackWarning';
import ExportExcel from './ExportExcel';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007982',
    },
    secondary: {
      main: '#197001',
    },
  },
});


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
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'username',
    align: 'left',
    disablePadding: true,
    label: 'Username',
  },
  {
    id: 'cr',
    align: 'center',
    disablePadding: false,
    label: 'CR',
  },
  {
    id: 'date',
    align: 'center',
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'description',
    align: 'center',
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'value',
    align: 'right',
    disablePadding: false,
    label: 'Value (R$)',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={`${headCell.align}`}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const [openSearch, setOpenSearch] = React.useState(false);
  const { numSelected } = props;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }} K
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.title}
        </Typography>
      )}
      <Collapse in={openSearch} >
        <TextField
          label="Search request"
          variant='standard'
          value={props.search}
          onChange={e => props.setSearch(e.target.value)}
          style={{ margin: '0 1rem 1rem 0', }}
          fullWidth
        />
      </Collapse>
      <Tooltip title="Search request">
        <IconButton onClick={() => { setOpenSearch(prev => !prev); }}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
        <ExportExcel
          excelData={props.history ? props.data.filter( obj => obj.approval === true) : props.data.filter( obj => obj.approval === false)}
          fileName={`Export-${year}-${month}-${day}`}
          setOpenDonwload={props.setOpenDonwload}
          openDonwload={props.openDonwload}
        />

      {props.delete ?
        <>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={() => props.handleDelete()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            null
          )}</>
        :
        null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const api = useAxios();
  const [selectedId, setSelectedId] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnackError, setOpenSnackError] = React.useState(false);
  var sum = selectedId?.map(item => (parseFloat(props.data?.find(obj => obj?.id === item)?.value))).reduce((a, b) => a + b, 0);
  const [quantity, setQuantity] = React.useState(0);
  const [openDonwload, setOpenDonwload] = React.useState(true);
  const url = 'purchaserequest/update'

  const handleReset = () => {
    console.log(props.data)
    props.data.forEach(element => {
      api.put(`${url}/${element.id}/`,
        {
          approval: false,
          cr: props.data.find(item => item.id == element.id).cr,
          date: props.data.find(item => item.id == element.id).date,
          description: props.data.find(item => item.id == element.id).description,
          email: props.data.find(item => item.id == element.id).email,
          username: props.data.find(item => item.id == element.id).username,
          value: props.data.find(item => item.id == element.id).value,
          value_currency: "BRL"
        }
      ).then((response) => {
        console.log(response)
      }
      )
    });
  }


  const handleApprove = () => {
    props.handleGet()
    selectedId.forEach(element => {
      api.put(`${url}/${element}/`,
        {
          approval: true,
          cr: props.data.find(item => item.id === element).cr,
          date: props.data.find(item => item.id === element).date,
          description: props.data.find(item => item.id === element).description,
          email: props.data.find(item => item.id === element).email,
          username: props.data.find(item => item.id === element).username,
          value: props.data.find(item => item.id === element).value,
          value_currency: "BRL"
        }
      ).then((response) => {
        props.handleGet();
        setSelected([]);
        setSelectedId([]);
        setOpenSnack(true);
      }
      )
    });
    setQuantity(selectedId.length)

  }

  const handleDelete = () => {
    let url = 'purchaserequest/delete'
    selectedId.forEach(element => {
      api.delete(`${url}/${element}/`).then(r => {
        props.handleGet();
        setSelectedId([]);
        setSelected([]);
        setOpenSnackError(true);
      }
      )
    });
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.data.map((n, index) => index);
      setSelectedId(props.data.map(obj => obj.id))
      setSelected(newSelected);
      return;
    }
    setSelectedId([])
    setSelected([]);
  };

  const handleClick = (event, index, item) => {
    handleSum();
    if (selectedId.includes(item.id)) {
      setSelected(selectedId.filter((id) => id !== item.id));
      selectedId.splice(selectedId.indexOf(item.id), 1);
    } else {
      setSelectedId(selectedId.concat(item.id));
    }

    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (item) => selected.indexOf(item) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

  const handleSum = () => {
    if (sum != NaN) {
      return sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    } else {
      sum = 0
    }
  }

  useEffect(() => {
  })

  const buttonApprove = {
    width: '30%',
    height: '3rem',
    marginBottom: '0.5rem'
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ width: '80%', mb: 2, marginTop: '5rem', padding: '0.5rem 1rem 1rem 1rem' }}>
          {props.loaded ? (
            <>
              <EnhancedTableToolbar
                numSelected={selected.length}
                title={props.title}
                delete={props.delete}
                search={search}
                setSearch={setSearch}
                handleGet={props.handleGet}
                handleDelete={handleDelete}
                orderBy={orderBy}
                data={props.data}
                setOpenDonwload={setOpenDonwload}
                openDonwload={openDonwload}
              />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750, }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={props.data?.length}
                  />
                  <TableBody>
                    {stableSort(props.data, getComparator(order, orderBy))
                      .filter(
                        (item) => (
                          (item.username.toLowerCase().includes(search.toLowerCase()) ||
                            item.description.toLowerCase().includes(search.toLowerCase()) ||
                            item.value.includes(search) ||
                            item.cr.includes(search))
                          && item.approval == props.history
                        )
                      )
                      .map((item, index) => {
                        const isItemSelected = isSelected(index);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, index, item)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                            style={{ background: props.delete ? '#fff' : '#EAEAEA' }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none">{item.username}
                            </TableCell>
                            <TableCell align="center">{item.cr}</TableCell>
                            <TableCell align="center">{item.date}</TableCell>
                            <TableCell align="left" style={{ maxWidth: '20rem' }}>
                              {item.description.length > 70 ?
                                item.description.slice(0, isItemSelected ? Infinity : 70) + '...' :
                                item.description
                              }
                            </TableCell>
                            <TableCell align="right">R$ {item.value}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: props.delete ? 13 : ((dense ? 13 : 53) * emptyRows),
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ display: 'flex', flexDirection: props.delete ? 'column' : 'inline', justifyContent: 'space-between' }} >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <p
                    style={{ display: 'flex', alignItems: 'center', marginRight: '1rem', fontWeight: 'bold', color: '#007982', marginBottom: '0' }}>
                    {handleSum()}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: props.delete ? 'space-between' : 'flex-end', marginTop: '1rem' }}>
                  {props.delete ?
                    (<FormControlLabel
                      control={<Switch checked={dense} onChange={handleChangeDense} />}
                      label="Dense padding"
                    />) : (null)}
                </div>
                {props.delete ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary"
                      style={buttonApprove}
                      onClick={() => handleApprove()}
                    >
                      To Approve
                    </Button>
                  </div>
                ) : null}
                {/* <Button
                  onClick={() => handleReset()}
                >
                  reset
                </Button> */}
                <SnackWarning
                  quantity={quantity}
                  severity='success'
                  setOpenSnack={setOpenSnack}
                  openSnack={openSnack}
                  message='approved successfully!'
                />
                <SnackWarning
                  quantity={quantity}
                  severity='error'
                  setOpenSnack={setOpenSnackError}
                  openSnack={openSnackError}
                  message='deleted successfully!'
                />
                <SnackWarning
                  severity='info'
                  setOpenSnack={setOpenDonwload}
                  openSnack={openDonwload}
                  message='downloaded successfully!'
                />
              </div>
            </>
          ) :
            (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}>
                <CircularProgress size={50} color="primary" />
              </div>
            )
          }
        </Paper>
      </Box>
    </ThemeProvider>
  );
}