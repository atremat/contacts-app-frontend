import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, selectPerPage } from "../../redux/contacts/selectors";
import { setPage, setPerPage } from "../../redux/contacts/slice";

export default function Pagination() {
  // const [page, setPage] = useState(2);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const page = useSelector(selectPage);
  const rowsPerPage = useSelector(selectPerPage);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(1));
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
}
