import React, { useState } from "react";
import TableMaker from "./components/tableMaker";


const App = () => {
  const [file, setFile] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const fileReader = new FileReader();
 
  const handleOnChange = (e) => { 
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      setFile(inputFile);
    }
  };
    
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = async ({target}) => {
        const result = target.result;
        setDataArray(result);
      };
      fileReader.readAsText(file);
    }
  };

return (
    
    <div style={{ textAlign: "center" }}>
      <h1>Enter file location</h1>
      <form>
        <input name={"file"} type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange}/>
        <button onClick={(e) => {handleOnSubmit(e);}}>
          SUBMIT
        </button>
      </form>
      <br />
      <TableMaker dataArray = {dataArray}/>
    </div>
  );
}

export default App;

