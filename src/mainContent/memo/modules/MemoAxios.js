import axios from 'axios';

const getMemoListByGroup = async (groupNo) => {
    await axios
      .get(`http://localhost:8080/list/${groupNo}`)
      .then((Response) => {
        console.log("메모 리스트 API호출 : " + JSON.stringify(Response.data.list));
        setUserUpdateModalData({
          no: Response.data.list.no,
          name: Response.data.list.userName,
          email: Response.data.list.email,
          comment: Response.data.list.comment,
          password: Response.data.list.password,
          passwordcheck: Response.data.list.passwordcheck,
          isOpen: true,
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };