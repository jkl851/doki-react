import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Doki from "../Doki";
import { useNavigate } from "react-router-dom";

const Transfer = ({ allinfo, bypass, check, setCheck}) => {

  const navigate = useNavigate();

  // 
  // 로그인 할때마다 세션 아이디 값을 변경해서 변경값을 ResponseEntity에 반환한 다음 
  // if (Respons.data !== null || Response.data )
  // 첫번째 세션 아이디값을 저장하고 그 뒤로 부터 틀린거 들어오면 걍 바로 로그인페이지로 리다이렉트
  // 
  // 
  useEffect(async (e) => {
    await axios
      .get("http://localhost:8080/doki/user/checkSession")
      .then((Response) => {
        
        if(Response.data.no === undefined || Response.data.no === null){
          if(bypass === true){
   
            navigate("/login");
          }
          else if(bypass === false){
   
            navigate("/login");
          }
        }
        else if(Response.data.no !== undefined || Response.data.no !== null){
          if(bypass === true){
  
            setCheck(true);
          }
          else if(bypass ===false){
          
            setCheck(true);
          }
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  if(check === true){
    return(
      
      <Fragment>
        <Doki allinfo={allinfo}/>
      </Fragment>
    );
  }
  else{
    return(
      <Fragment>
      </Fragment>
    );
  }
    
};

export default Transfer;
