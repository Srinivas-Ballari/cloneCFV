import { useState, useEffect } from 'react'
import './App.css'
import React from 'react';
import Nav  from './Nav';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import axios from 'axios';
import Charts from './charts';

export default function Display(props : any){
    
    if(props.verdict.length == 1){
    
      return (<></>);
    }

    console.log(props.verdict);
    return (<div>
    
      <div className="d-flex justify-content-around">
           <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Charts data={props.verdict} userH={props.userH} heading={"Verdict"} />
           </div> 
           <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Charts data={props.progLang} userH={props.userH} heading={"Programming_Language's"}/>
           </div>
      </div>
    
    </div>)
      
}

