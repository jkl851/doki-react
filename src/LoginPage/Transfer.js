import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Doki from "../Doki";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const Transfer = ({ allinfo }) => {
=======
const Transfer = ({ allinfo, setAllinfo}) => {
>>>>>>> main

  
  const navigate = useNavigate();
  const [flag, setFlag] = useState();

  useEffect(async (e) => {
    await axios
      .get("http://localhost:8080/doki/user/checkSession")
      .then((Response) => {
<<<<<<< HEAD
        
        if(Response.data[0] === undefined || Response.data[0] === null){
          alert("1번");
          navigate("/login");
        }
        else if(allinfo === null){
          alert("2번");
          navigate("/login");
        }
        else if(allinfo !== null){
=======

        if(Response.data.no === undefined || Response.data.no === null){
            navigate("/login");
        }
        else if(allinfo.no === null){
          navigate("/login");
        }
        else if(allinfo.no !== null){
>>>>>>> main
          setFlag(true);
        }
      })
      .catch((Error) => {
        console.log(Error);
        navigate("/login");
      });
    }, []);

<<<<<<< HEAD
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
=======
    if(allinfo !== null){
      useEffect(()=> {
        axios
        .get(
            "http://localhost:8080/doki/user/getDepartmentUserPermission/" + allinfo.no)
        .then((Response) => {
    
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
      }, [])
    }
    
    if(flag === true){
      return(
        <Fragment>
          <Doki allinfo={allinfo} setAllinfo={setAllinfo}/>
        </Fragment>
      );
    }
    else{
      return(
        <Fragment>
        </Fragment>
      );
    }
  
  
>>>>>>> main
    
};

export default Transfer;