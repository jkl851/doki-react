import React, {useState, useEffect} from 'react';
import User from './User.js'

const EntireUserList = ({userDatas, deptUserDatas, isInvited, setIsInvited, flag, setFlag}) => {
    const [checkedItems, setCheckedItems] = useState(new Set());


    const checkedItemHandler = (isChecked, id) => {
        if (isChecked) {
          checkedItems.add(id);
          setCheckedItems(checkedItems);
        } else if (!isChecked && checkedItems.has(id)) {
          checkedItems.delete(id);
          setCheckedItems(checkedItems);
        }

        console.log(checkedItems)
        
        // 핸들러 호출해서 checkedItems를 집어 넣고
        
      };
    
    useEffect(() => {
        const count = deptUserDatas.length;
        console.log('count ' + count)
        setIsInvited(userDatas.map((element, index, array) => {
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
                    setIsInvited={setIsInvited}
                    flag={flag}
                    setFlag={setFlag}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                    checkedItemHandler={checkedItemHandler}
                    
                />)}
        </ul>
    );
};

export default EntireUserList;