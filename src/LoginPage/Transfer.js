import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Doki from "../Doki";

import { useNavigate } from "react-router-dom";

const Transfer = ({ allinfo , deptInfo, setAllinfo}) => {
  const [session, setSession] = useState(false);
  const navigate = useNavigate();

  useEffect(async (e) => {
    await axios
      .post("http://localhost:8080/doki/user/checkSession")
      .then((Response) => {
        
        if (Response.data === "no session") {
          setSession(false);
          navigate("/login");
        }
        if (Response.data === "has session") {
          setSession(true);
        }
      })
      .catch((Error) => {
        console.log(Error);
      });


      // 로그인 한 유저의 부서정보와 권한정보를 가져온다
      await axios
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
  }, []);

  if (session == true) {
    console.log('======= all info ======')
    console.log(allinfo)
    return (
      <Fragment>
        <Doki allinfo={allinfo} setAllinfo={setAllinfo} deptInfo={deptInfo} />
      </Fragment>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default Transfer;
