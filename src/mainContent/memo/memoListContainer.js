import React, {useRef, useEffect, useState, useContext} from 'react';
import { MemoContext } from "./modules/MemoReducer";

import MemoList from "./MemoList";

export default function memoList ({filter, title}) {
    // 전역 컨텍스트
    const [ memos, dispatch ] = useContext(MemoContext); 

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
        const colsNum = parseInt(ref.current.scrollWidth / 300)
        if (colsNum === 0) setCols(1)
        else setCols(colsNum)
    }

    return (
        <div className="memo_list" ref={ref}>
            <MemoList memos={filteredMemos} cols={cols} title={title} />
        </div>
    );
};

