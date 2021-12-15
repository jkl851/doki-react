import React, {useState, useEffect} from 'react';
import User from './User.js'

const EntireUserList = ({userDatas, deptUserDatas, isInvited, setIsInvited, setFlag, allUserKeyword}) => {
    const [checkedItems, setCheckedItems] = useState([]);


    const checkedItemHandler = (isChecked, id) => {
        if (isChecked) {
          checkedItems.push(id);
          setCheckedItems(checkedItems);
        } else if (!isChecked) {
          let pos = checkedItems.indexOf(id)
          checkedItems.splice(pos, 1);
          setCheckedItems(checkedItems);
        }
        
        const length = isInvited.length;
        console.log(length)

        const arr = [];
        for(let i=0 ; i<length; i++){
            for(let j=0; j<checkedItems.length; j++){
                if(i === checkedItems[j]){
                    arr[i] = true;
                    break;
                } 

                if(j+1 === checkedItems.length){
                    arr[i] = false;
                }
            }
        }
        
        console.log(arr);
        setFlag(arr);
        
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
            {userDatas
                .filter(userData => userData.userName.indexOf(allUserKeyword) !== -1 || userData.position.indexOf(allUserKeyword) !== -1)
                .map((userData, index) => 
                    <User 
                        key={userData.no}
                        no={userData.no}
                        name={userData.userName + " " + userData.position}
                        image={userData.image}
                        isInvited={isInvited}
                        checkedItemHandler={checkedItemHandler}
                        
                    />)}
        </ul>
    );
};

export default EntireUserList;