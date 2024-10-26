import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, TablePagination, TableSortLabel, Typography } from '@mui/material';
import { OrderTableRow, OrdersHeaderFilter } from './components';
import { useEffect, useState } from 'react';
import { useLazyGetOrdersQuery } from '@/features/orders';
import { useHandleRequest } from '@/hooks/use-handle-request';
import { Filters } from './types';
import { SortOrderType } from '@/types/defaults';
import { Loader } from '@/components/common';
import { useOrdersTableStyles } from './orders-table.styles';

export const defaultFromDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
export const defaultToDate = new Date();

export const OrdersTable = () => {
  const [getOrders, { isFetching, data: { data: { orders = [], total = 0 } = {} } = {} }] = useLazyGetOrdersQuery();
  const [sortOrder, setSortOrder] = useState<SortOrderType>('desc');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleRequest = useHandleRequest();
  const [filters, setFilters] = useState<Filters>({ from: defaultFromDate, to: defaultToDate });
  const styles = useOrdersTableStyles();

  const fetchOrders = async (defaultPage?: number) => {
    await handleRequest({
      request: async () => {
        const result = await getOrders({ params: { ...filters, page: defaultPage ?? page, limit: rowsPerPage, from: filters.from?.toJSON(), to: filters.to?.toJSON(), sort: sortOrder } });
        return result;
      },
    })
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchOrders(0);
  }, [filters, sortOrder, rowsPerPage]);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  return (
    <Container className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h4" fontWeight="bold">Orders ({total})</Typography>
        <OrdersHeaderFilter filters={filters} setFilters={setFilters} />
      </Box>
      {isFetching ? (
        <Loader sx={{ minHeight: "60vh" }} />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell className={styles.customerHeadCell}>Customer</TableCell>
                  <TableCell className={styles.productInfoHeadCell}>Product info</TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active
                      direction={sortOrder}
                      onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                    >
                      Ordered At
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <OrderTableRow key={row.orderID} order={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
}
