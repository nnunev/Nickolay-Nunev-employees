import React, { useState, useEffect } from "react";
 
const TableMaker = ({dataArray}) => {    
  const [tableArray, setTableArray] = useState([]);

  const csvFileToArray = fileString => {
    if(fileString){
      const csvHeader = fileString.toString().split("\n")[0].split(",");
      const csvRows = fileString.toString().slice(fileString.indexOf("\n") + 1).split("\n");
      const tableArray = csvRows.map(row => {
        const values = row.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
      setTableArray(tableArray);
    }  
  };
  
  useEffect(() => {
    if (dataArray) {
      csvFileToArray(dataArray)
    }
  },[dataArray]);

  const headerKeys = Object.keys(Object.assign({}, ...tableArray));
 
  const findDaysAgo = (date) => {
    const today = ((new Date()).getDate()+'/'+(new Date()).getMonth()+'/'+(new Date()).getFullYear())
    date= (date.trim() === "NULL")? today: date
    date = date.split("/")  
    return (new Date()).getDate()-date[0] + ((new Date()).getMonth()-date[1])*30 + ((new Date()).getFullYear() - date[2])*365
  }

  const dataToArray = (dataArray) => {
    let newarr = dataArray.toString().split("\n")
    newarr.shift()
    newarr= newarr.filter(function (el) {return el !== '';});
    
    newarr = newarr.map(row => { 
      row = row.split(","); 
      row[2] = findDaysAgo(row[2])
      row[3] = findDaysAgo(row[3])
      return row
    })
    return newarr
  } 
  const newarr = dataToArray(dataArray)
  
  const projects = newarr.reduce( (r,[EmployeeID, ProjectID, StartDate, EndDate])=>{
    r[ProjectID] = r[ProjectID] ?? []
    r[ProjectID].push({ProjectID,EmployeeID,StartDate,EndDate})
    return r
  }, {})
  
  
  const outputData = (projects) => {
    let winner = {project:'', employee1:'', employee2:'', days:0,}
    for (let project in projects) 
    for (let i = 0; i < projects[project].length - 1; i++) 
    for (let j = i + 1; j < projects[project].length; j++){
      let start = (projects[project][i].StartDate < projects[project][j].StartDate)? projects[project][i].StartDate : projects[project][j].StartDate
      let end = (projects[project][i].EndDate > projects[project][j].EndDate)? projects[project][i].EndDate : projects[project][j].EndDate
      if (start - end > winner.days){
        winner.project = projects[project][i].ProjectID 
        winner.employee1 = projects[project][i].EmployeeID 
        winner.employee2 = projects[project][j].EmployeeID 
        winner.days = start - end}
      console.log(start + " --- " + end)
    }
    return winner
  }

  const winner = (outputData(projects))
  
  return (
    
    <div style={{ textAlign: "center" }}> 
      <h1>Input Table</h1>
      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys && headerKeys.map((key, i) => (
              <th key={i}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableArray && tableArray.map((item, k) => (
            <tr key={k}>
              {item && Object.values(item).map((val,k) => (
                <td key={k}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Output Data</h1>           
      <table>
        <tbody>
          {newarr && newarr.map((item, k) => (
            <tr key={k}>
              {item && Object.values(item).map((val,k) => (
                <td key={k}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Winner is:</h1>
      <div className='winner'>
            {
                Object.entries(winner).map(([key, val]) => 
                    <h2 key={key}>{key}: {val}</h2>
                )
            }
      </div>
      
    </div>
  );
 }

export default TableMaker;

