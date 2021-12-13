import React, {useEffect} from 'react';
import User from './User.js'

const EntireUserList = ({userDatas, deptUserDatas, isInvited, setIsInvited, flag, setFlag}) => {
    
    useEffect(() => {
        const count = deptUserDatas.length;
        console.log('count ' + count)
        setIsInvited(userDatas.map((element, index, array) => {
        // console.log(index)  // 현재 element가 속한 index
        // console.log(array)  // 해당 배열
            for(let i=0; i<count; i++){
                if(deptUserDatas[i].no === element.no ) {
                    return true;
                }

                if(i+1 == count && element.no != deptUserDatas[i].no){
                    return false;
                }
            }
        }))
    }, [])
    
    return (
        <ul > 
            {userDatas.map((userData, index) => 
                <User 
                    key={userData.no}
                    no={userData.no}
                    name={userData.userName + " " + userData.position}
                    image={userData.image}
                    isInvited={isInvited}
                    flag={flag}
                    setFlag={setFlag}
                />)}
        </ul>
    );
};

export default EntireUserList;