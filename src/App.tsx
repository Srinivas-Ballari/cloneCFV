import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';
import Nav  from './Nav';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import axios from 'axios';
import Charts from './charts';


function App() {
  const [progLang,setpl] = useState([{}]);
  const [data,setdata] = useState("");
  const[verdict,setverdict]=useState([{}]);
  const [userH,setuserH] = useState("");

  // const [data,setData] = useState("");
  
  const updateUserName = (event:any)=>{
    setuserH(event.target.value);
  }

  const fetchData=() =>{
      axios.get("https://codeforces.com/api/user.status?handle="+userH).then((res)=>{
        setdata(res.data);

        //  built a map
        const mp = new Map();
        for(let i=0;i<res.data.result.length;i++){
          if (mp.has(res.data.result[i].verdict)) {
            mp.set(res.data.result[i].verdict, mp.get(res.data.result[i].verdict) + 1);
          } else {
            mp.set(res.data.result[i].verdict, 1);
          }

          if (mp.has(res.data.result[i].programmingLanguage)) {
            mp.set(res.data.result[i].programmingLanguage, mp.get(res.data.result[i].programmingLanguage) + 1);
          } else {
            mp.set(res.data.result[i].programmingLanguage, 1);
          }

        }

        //creating the data array
      
      let arr = [{}];
      for (const [cverdict, count] of mp) {
        let tempObj = {
          name:cverdict,
          value:count
        };
        arr.push(tempObj);
      }
      setverdict([...arr]);

      let parr = [{}];
      for (const [cverdict, count] of mp) {
        let tempObj = {
          name:cverdict,
          value:count
        };
        parr.push(tempObj);
      }
      setpl([...parr]);

})

      
      

}



  return (
    <div>  

    <Nav />

    {/* input form */}
    <div className="form1">
      <div className="mb-3">
      <label  className="form-label">CodeForce's UserName</label>
      <input type="text" className="form-control" id="exampleInputPassword1" onChange={updateUserName}/>
      <button type="submit"  className="btn btn-primary submit" onClick={fetchData}>Submit</button>
      </div>
    </div>
    {/* input form closes here. */}
    
    <div className="d-flex justify-content-around">
           <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Charts data={verdict} userH={userH} heading={"Verdict"} />
           </div> 
           {/* <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Charts data={progLang} userH={userH} heading={"Programming_Language's"}/>
           </div> */}
      </div>
    </div>  

  )
}

export default App

