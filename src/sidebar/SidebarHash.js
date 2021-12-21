import React, {Fragment, useRef, useEffect, useState} from 'react';
import '../assets/css/dropdown.css';
import HashDropDownList from './HashDropDownList';
import axios from 'axios';

import {filterFunction, myFunction, myFunction3 } from '../assets/js/dropdown';
// import $ from 'jquery';

export default function SidebarHash({division}) {


    //1번 부서라고 가정
    let no = division;
    const [hashDropDownDatas, setHashDropDownDatas] = useState([]);

    //해쉬 초기값 호출 (해쉬 검색 X)
    useEffect(async() => {
        console.log(no);
        await axios.get(`http://localhost:8080/doki/hash/getHashList/${no}`)
        .then((Response) => {
            console.log(Response.data)
            setHashDropDownDatas(
                Response.data
                
            );
        })
        .catch((Error) => {console.log(Error)})
    }, [])


    //검색을 입력하고 땠을때 이벤트 발생 (검색 키워드 적용)
    const onChangeSearchKey = async(e) => {
        await axios.get(`http://localhost:8080/doki/hash/getHashList/${no}`, {
            params: {
                hint: e.target.value
            }
        })
        .then((Response) => {
            setHashDropDownDatas(
                Response.data
            );
        })
        .catch((Error) => {console.log(Error)})
    }


    //Dropdown 클릭시 해당 데이터 입력
    const [hint, setHint] = useState([]);
    const searchHash = (name) => {
        console.log("해쉬명 HINT1 : " + name);
        setHint({hashName: name});


        $('#myDropdown').hide;
        
    };

    //해쉬 검색창외에 다른 곳 클릭시 Dropdown을 닫게끔 하기
    const itemRef = useItemRef(null);
    function useItemRef() {
        const ref1= useRef(null);
        
        useEffect(() => {
            function handelClickItem(event) {
                if(ref1.current && !ref1.current.contains(event.target)) {
                    $("#myDropdown").hide();
                } else {
                    $("#myDropdown").show();
                }
            }
            document.addEventListener('click', handelClickItem);
            
            return () => {
                document.removeEventListener('click', handelClickItem);
            };
        });
        
        return ref1;
    }

    //Input 값을 변경하려면 state를 이용해야함
    function handleChange(e) {
        setHint(e.target.value);
    }

    
    return (
        <div className="dropdown" 
            // ref={outsideRef}
            >
            <input type="text" 
                placeholder="#Hash Tag" 
                id="myInput"
                value={hint.hashName}
                onKeyUp={filterFunction} 
                onMouseUp={myFunction} 
                onMouseDown={myFunction3}
                onKeyUp={onChangeSearchKey}
                onChange={handleChange}
                ref={itemRef}
                autoComplete='off'/>  

                <HashDropDownList 
                    hashDropDownDatas={hashDropDownDatas}
                    searchHash={searchHash}
                    
                    />
        </div>
    )
}