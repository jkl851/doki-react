import React, {Fragment, useRef, useEffect, useState} from 'react';
import '../assets/css/dropdown.css';
import HashDropDownList from './HashDropDownList';
import axios from 'axios';

import {filterFunction, myFunction, myFunction3 } from '../assets/js/dropdown';

export default function SidebarHash() {


    //1번 부서라고 가정
    let no = 1;
    const [hashDropDownDatas, setHashDropDownDatas] = useState([]);

    //해쉬 초기값 호출 (해쉬 검색 X)
    useEffect(async() => {
        await axios.get(`http://localhost:8080/doki/hash/getHashList/${no}`)
        .then((Response) => {
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
    const [hint, setHint] = useState(null);
    const searchHash = (name) => {
        console.log("해쉬명 HINT : " + name);
        // setHint({hint: name});
        $("#myDropdown").hide();
    };




    //외부클릭 시 화면 닫기
    const outsideRef = useOutSideRef(null);
    function useOutSideRef() {
        const ref= useRef(null);

        useEffect(() => {
            function handelClickOutside(event) {
                if(ref.current && !ref.current.contains(event.target)) {
                    $("#myDropdown").hide();
                } else {
                    $("#myDropdown").show();
                }
            }
            document.addEventListener('click', handelClickOutside);

            return () => {
                document.removeEventListener('click', handelClickOutside);
            };
        });

        return ref;
    }


    return (
        <div className="dropdown" ref={outsideRef}>
            <input type="text" 
                placeholder="#Hash Tag" 
                id="myInput" 
                // onClick={{javascript:shoion}
                onKeyUp={filterFunction} 
                onMouseUp={myFunction} 
                onMouseDown={myFunction3}
                onKeyUp={onChangeSearchKey}
                autocomplete='off'/>  
            <HashDropDownList 
                hashDropDownDatas={hashDropDownDatas}
                searchHash={searchHash}
                />
        </div>
    )
}