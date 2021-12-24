import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Doki from "../Doki";
import { useNavigate } from "react-router-dom";

const Transfer = ({ allinfo }) => {

  
  const navigate = useNavigate();
  const [flag, setFlag] = useState();

  useEffect(async (e) => {
    await axios
      .get("http://localhost:8080/doki/user/checkSession")
      .then((Response) => {
        
        if(Response.data[0] === undefined || Response.data[0] === null){
          alert("1번");
          navigate("/login");
        }
        else if(allinfo === null){
          alert("2번");
          navigate("/login");
        }
        else if(allinfo !== null){
          setFlag(true);
        }
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