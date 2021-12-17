import React, {useRef, useEffect, useState, useContext} from 'react';
import { MemoContext} from "./modules/MemoReducer";

import MemoList from "./memoList";

// 더미 데이터
import data from "../../assets/data/memoMessageData.json";  //       더미더미더미더미더미
//       더미더미더미더미더미

export default function memoList ({filter, title}) {
    // 전역 컨텍스트
    const [ memos, dispatch ] = useContext(MemoContext); 
    // const memos = data;  //       더미더미더미더미더미

    // 배열용
    const ref = useRef()
    const [cols, setCols] = useState(0)

    // 메모 필터
    const filterKeyArray = Object.keys(filter)
    const filteredMemos = memos.filter((memo) => {
        const mapResult = filterKeyArray.map((key) => {
        return filter[key] === memo[key]
        })
        const findResult = mapResult.includes(false)
        return !findResult
    })

    useEffect(() => {
        handleResize()
    }, [ref])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
        window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = (e) => {
        const colsNum = parseInt(ref.current.scrollWidth / 240)
        if (colsNum === 0) setCols(1)
        else setCols(colsNum)
    }

    return (
        <div ref={ref}>
            <MemoList memos={filteredMemos} cols={cols} title={title} />
        </div>
    );
};

