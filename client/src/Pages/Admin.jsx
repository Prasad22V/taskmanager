import React, { useState } from "react";
import "./Styles/admin.css";
// import { Link } from "react-router-dom";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaEye } from "react-icons/fa";

// import { FaPhone } from "react-icons/fa";
const AdminTable = () => {

  const AllLiabrary = [
    {
      srNo: "1",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },
    {
      srNo: "2",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },
    {
      srNo: "3",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },
    {
      srNo: "4",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },
    {
      srNo: "5",

      name: "Prasad Vaidya",

      date: "12/04/23",
    },

    {
      srNo: "6",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },

   
  ];

  const AllAlternative = [
    {
      srNo: "1",

      name: "Prasad Vaidya",

      date: "12/04/23",

    },

    {
      srNo: "2",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },
    {
      srNo: "3",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },
    {
      srNo: "4",

      name: "Prasad Vaidya",

      date: "12/04/23 ",
    },
 
  ];

  const [liabraryfilteredData, setLiabraryFilteredData] = useState(AllLiabrary);
  const [alternativefilteredData, setAlternativeFilteredData] =
    useState(AllAlternative);

  return (
    <>
    <h1>AdminTable</h1>
    <div className=" table-responsive whole_tablee_tt11 bg-white shadow ">
            <table
              style={{
                borderCollapse: "collapse",
                width: "70%",
                backgroundColor: "#FFF",
                borderRadius: "10px",
              }}
              className="table-with-border-radius "
            >
              <thead>
                <tr
                  style={{ backgroundColor: "#f2f2f2" }}
                  className="table_head11"
                >
                  <th style={tableHeaderStyle}>sr.No.</th>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Date</th>
                  
                </tr>
              </thead>
              <tbody className="tbody_color">
                {alternativefilteredData.map((item, index) => (
                  <tr key={index} className="Table_all_td1">
                    <td style={tableCellStyle}>{item.srNo}</td>
                    <td style={tableCellStyle}>{item.name}</td>
                    <td style={tableCellStyle}>{item.date}</td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </>
  )
}


const tableHeaderStyle = {
padding:"10px",

  borderBottom: "1px solid #ddd",

  fontWeight: "bold",
  fontSize: "22px",
  
};

const tableRowEvenStyle = {
  backgroundColor: "#f9f9f9",
};

const tableRowOddStyle = {
  backgroundColor: "#ffffff",
};

const tableCellStyle = {

  fontSize: "18px",

  margin: "5px",
  padding:"15px 279px",
  width:"50%"
};
export default AdminTable

// border-collapse: collapse;
// width: 100%;
// background-color: rgb(255, 255, 255);
// border-radius: 10px;


// background: #FFF;
//     margin-left: 5%;
//     width: 90%;