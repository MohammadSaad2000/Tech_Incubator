import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "./SortableTable";

const Table = ({ caption, data, columns, setIsPopupOpen, setSelectedTask }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <table className="table">
        <caption>{caption}</caption>
        <TableHead {...{ columns, handleSorting }} />
        <TableBody
          {...{ columns, tableData, setIsPopupOpen, setSelectedTask }}
        />
      </table>
    </>
  );
};

export default Table;
