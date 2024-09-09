import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  selectPerPage,
  selectTotalItems,
} from "../../redux/contacts/selectors";
import { setPage, setPerPage } from "../../redux/contacts/slice";

export default function Pagination() {
  // const [page, setPage] = useState(2);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const page = useSelector(selectPage);
  const rowsPerPage = useSelector(selectPerPage);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(1));
  };

  return totalItems > 10 ? (
    <TablePagination
      component="div"
      count={totalItems}
      page={page - 1}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    />
  ) : (
    <></>
  );
}
