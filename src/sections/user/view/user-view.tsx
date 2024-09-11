import { useState, useCallback } from 'react';
import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  TextField,
  Avatar,
} from '@mui/material';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editUser, setEditUser] = useState<UserProps | null>(null); // For edit functionality
  const [newUser, setNewUser] = useState<UserProps>({
    id: '',
    name: '',
    company: '',
    role: '',
    isVerified: false,
    status: '',
    avatarUrl: '', // Store uploaded image or avatar
  });

  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  // Handle opening and closing of the form
  const handleOpenForm = () => {
    setOpenForm(true);
    setEditUser(null); // Reset editing
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditUser(null);
    setNewUser({
      id: '',
      name: '',
      company: '',
      role: '',
      isVerified: false,
      status: '',
      avatarUrl: '',
    });
  };

  // Handle form submission (new user or edit)
  const handleFormSubmit = () => {
    if (editUser) {
      // Update the existing user
      const index = _users.findIndex((user) => user.id === editUser.id);
      _users[index] = { ...editUser, ...newUser };
    } else {
      // Add a new user
      const id = (Math.random() * 100000).toFixed(0);
      _users.push({ ...newUser, id });
    }
    handleCloseForm();
  };

  // Handle editing a user
  const handleEditUser = (user: UserProps) => {
    setEditUser(user);
    setNewUser(user);
    setOpenForm(true);
  };

  // Handle deleting a user
  const handleDeleteUser = (userId: string) => {
    const index = _users.findIndex((user) => user.id === userId);
    _users.splice(index, 1); // Remove the user from the list
    table.onResetPage();
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewUser((prev) => ({
          ...prev,
          avatarUrl: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenForm}
        >
          New User
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onEdit={() => handleEditUser(row)} // Edit functionality
                      onDelete={() => handleDeleteUser(row.id)} // Delete functionality
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {/* User Form Modal */}
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editUser ? 'Edit User' : 'New User'}
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={newUser.name}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, name: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Company"
            value={newUser.company}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, company: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Role"
            value={newUser.role}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, role: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Status"
            value={newUser.status}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, status: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mb: 2 }}
          >
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {newUser.avatarUrl && (
            <Avatar
              alt={newUser.name}
              src={newUser.avatarUrl}
              sx={{ width: 56, height: 56, mb: 2 }}
            />
          )}
          <Button variant="contained" fullWidth onClick={handleFormSubmit}>
            {editUser ? 'Update User' : 'Add User'}
          </Button>
        </Box>
      </Modal>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
