import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Doki from "../Doki";
import { useNavigate } from "react-router-dom";

const Transfer = ({ allinfo, setAllinfo}) => {

  const navigate = useNavigate();
  const [flag, setFlag] = useState();

  useEffect(async (e) => {
    await axios
      .get("http://localhost:8080/doki/user/checkSession")
      .then((Response) => {

        if(Response.data.no === undefined || Response.data.no === null){
            navigate("/login");
        }
        else if(allinfo.no === null){
          navigate("/login");
        }
        else if(allinfo.no !== null){
          setFlag(true);
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
    }, []);

    
    useEffect(async (e) => {
      // 로그인 한 유저의 부서정보와 권한정보를 가져온다
      
      await axios
      .get(
          "http://localhost:8080/doki/user/getDepartmentUserPermission/" + allinfo.no)
      .then((Response) => {
        if(allinfo.no === null || allinfo.no === undefined){
          navigate("/login");
        }
        const deptInfo = Response.data.map(data => {
          return {
            "departmentNo" : data.departmentNo,
            "auth" : data.auth
          }
        })
        
        const newObj = Object.assign({}, allinfo, {"deptInfo" : deptInfo});
        console.log(newObj)
        setAllinfo(newObj)
      })
      .catch((Error) => {
          console.log(Error);
      });
    
  }, []);


  if(flag === true){
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