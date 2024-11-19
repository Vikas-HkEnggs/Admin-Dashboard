import React from "react";
import { MaterialReactTable } from "material-react-table";

const Table = ({ columns, data, options }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      {...options} 
      className="bg-white"
    />
  );
};

export default Table;
