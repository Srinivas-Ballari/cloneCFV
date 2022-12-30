import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';
import Nav  from './Nav';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import axios from 'axios';
import Charts from './charts';
import Barcharts from './Barcharts';


function App() {
  const [progLang,setpl] = useState<any>([{}]);
  const [tag,settag] = useState<any>([{}]);
  const [index,setindex] = useState<any>([{}]);
  const [rating,setrating] = useState<any>([{}]);
  const [data,setdata] = useState<any>();
  const[verdict,setverdict]=useState<any>([{}]);
  const [userH,setuserH] = useState<any>("");
  
  const updateUserName = (event:any)=>{
    setuserH(event.target.value);
  }

    const fetchData=() =>{
        axios.get("https://codeforces.com/api/user.status?handle="+userH).then((res)=>{
          setdata(res.data);

          //  built map
          const mp1 = new Map();
          const mp2 = new Map();
          const mp3 = new Map();
          const mp4 = new Map();
          const mp5 = new Map();


          for(let i=0;i<res.data.result.length;i++){
            if (mp1.has(res.data.result[i].verdict)) {
              mp1.set(res.data.result[i].verdict, mp1.get(res.data.result[i].verdict) + 1);
            } else {
              mp1.set(res.data.result[i].verdict, 1);
            }

            if (mp2.has(res.data.result[i].programmingLanguage)) {
              mp2.set(res.data.result[i].programmingLanguage, mp2.get(res.data.result[i].programmingLanguage) + 1);
            } else {
              mp2.set(res.data.result[i].programmingLanguage, 1);
            }

            //build index map
            
            if (mp4.has(res.data.result[i].problem.index)) {
              mp4.set(res.data.result[i].problem.index, mp4.get(res.data.result[i].problem.index) + 1);
            } else {
              mp4.set(res.data.result[i].problem.index, 1);
            }

            let temp = res.data.result[i].problem.tags;
            
            for(let j=0;j<temp.length;j++){
              if (mp3.has(res.data.result[i].problem.tags[j])) {
                mp3.set(res.data.result[i].problem.tags[j], mp3.get(res.data.result[i].problem.tags[j]) + 1);
              } else {
                mp3.set(res.data.result[i].problem.tags[j], 1);
              }
            }

            if (mp5.has(res.data.result[i].problem.rating)) {
              mp5.set(res.data.result[i].problem.rating, mp5.get(res.data.result[i].problem.rating) + 1);
            } else {
              mp5.set(res.data.result[i].problem.rating, 1);
            }


          }

          //creating the data array
        
        let arr = [{}];
        for (const [cverdict, count] of mp1) {
          let tempObj = {
            name:cverdict,
            value:count
          };
          arr.push(tempObj);
        }
        setverdict([...arr]);

        let parr = [{}];
        for (const [cverdict, count] of mp2) {
          let tempObj = {
            name:cverdict,
            value:count
          };
          parr.push(tempObj);
        }
        setpl([...parr]);

        let tarr = [{}];
        for (const [ctag, count] of mp3) {
          let tempObj = {
            name:ctag,
            value:count
          };
          tarr.push(tempObj);
        }
        settag([...tarr]);

        let iarr = [{}];
        for (const [ind, count] of mp4) {
          let tempObj = {
            name:ind,
            value:count
          };
          iarr.push(tempObj);
        }
        setindex([...iarr]);

        let rarr = [{}];
        for (const [rating, count] of mp5) {
          let tempObj = {
            name:rating,
            value:count
          };
          rarr.push(tempObj);
        }
        setrating([...rarr]);
        
      
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
              <Charts data={verdict} userH={userH} heading={"Verdict of"} flag={false}/>
            </div> 
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
              <Charts data={progLang} userH={userH} heading={"Programming_Language's of"} flag={false}/>
            </div>
        </div>

        <div className="d-flex justify-content-around">
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
              <Charts data={tag} userH={userH} heading={"Tag's of"} flag={true}/>
            </div>
        </div>

        <div className="d-flex justify-content-around">
          <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Barcharts data={index} heading={"Level's of"} userH={userH}/> 
          </div>
          <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Barcharts data={rating} heading={"Rating of"} userH={userH}/> 
          </div>   
        </div>
        
        


      </div>  

    )
}

export default App

