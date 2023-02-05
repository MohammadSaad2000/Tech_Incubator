import { Timestamp } from "@firebase/firestore";

const TableBody = ({ tableData, columns }) => {
  function getFormattedDate(timeStamp) {
    let date = new Date(timeStamp.seconds * 1000);
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear()
    );
  }

  function getFormattedValue(value) {
    if (value === null || value === undefined) {
      return "----";
    }
    if (value instanceof Timestamp) {
      return getFormattedDate(value);
    }

    return value;
  }

  function getFormattedRow(data) {
    return (
      <tr key={data.id}>
        {columns.map(({ accessor }) => {
          let tData = getFormattedValue(data[accessor]);
          return <td key={accessor}>{tData}</td>;
        })}
      </tr>
    );
  }

  return (
    <tbody>
      {tableData.map((data) => {
        return getFormattedRow(data);
      })}
    </tbody>
  );
};

export default TableBody;
