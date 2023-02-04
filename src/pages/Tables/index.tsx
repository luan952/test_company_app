import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IUploadViewModel } from 'viewModels';
import { useEffect } from 'react';
import { UploadController } from '../../controllers/UploadController';
import { Container, Body } from "./style";
import { ResponsiveAppBar } from '../../components/navBar';

interface Column {
  id: 'travelDate' | 'travelNumber' | 'driver' | 'sign' | 'vehicleType'
  | 'operation' | 'destine' | 'boxNumber' | 'stopNumber' | 'numberKM'
  | 'travelType' | 'value';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'travelDate', label: 'Data', minWidth: 120 },
  { id: 'travelNumber', label: 'Número da Viagem', minWidth: 100 },
  { id: 'driver', label: 'Motorista', minWidth: 120 },
  { id: 'sign', label: 'Placa', minWidth: 120 },
  { id: 'vehicleType', label: 'Tipo de Veículo', minWidth: 120 },
  { id: 'operation', label: 'Origem', minWidth: 120 },
  { id: 'destine', label: 'Destino', minWidth: 120 },
  { id: 'boxNumber', label: 'Caixas Carregadas', minWidth: 120 },
  { id: 'stopNumber', label: 'Entregas', minWidth: 120 },
  { id: 'numberKM', label: 'Número de KM', minWidth: 120 },
  { id: 'travelType', label: 'Tipo de Viagem', minWidth: 120 },
  { id: 'value', label: 'Valor', minWidth: 120 },
];

interface Data {
  uploadViewModel: IUploadViewModel;
}

function createData(
  uploadViewModel: IUploadViewModel
): Data {
  return { uploadViewModel };
}


export function Tables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rows, setRows] = React.useState<Data[]>([]);
  const [uploadTemplate, setUploadTemplate] = React.useState<IUploadViewModel[]>([]);

  useEffect(() => {
    UploadController.getAll().then((response) => {
      setUploadTemplate(response);
    });
  }, []);

  return (
    <Body>
      <ResponsiveAppBar />
      <Container>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadTemplate
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {
                                typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]'
                                  ? value.toLocaleDateString("pt-Br", {
                                    dateStyle: "short",
                                    timeZone: "America/Sao_Paulo"
                                  })
                                  : String(value)
                              }
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={uploadTemplate.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Body>

  );
}