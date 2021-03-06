import React from 'react';
import Memo from './Memo';

import styled from 'styled-components';
import {media} from './modules/style-utils';

const Wrapper = styled.div`
  padding: 0 4rem;
  ${media.desktop`
  padding: 0 0.5rem;
`}
  margin-top: 1rem;
  header {
    font-size: 0.8rem;
    padding: 1rem;
  }
`

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-gap: 1rem;
`

const Column = styled.div`
  display: grid;
  grid-gap: 0rem;
  grid-auto-rows: max-content;
`

const MemoList = ( {memos , cols , title, deptAuth, allinfo}) => {
    const memoList = memos.map( (value, index) => <Memo 
                                                        key={value.no}
                                                        no={value.no} 
                                                        id={index}
                                                        title={value.title}
                                                        contents={value.contents}
                                                        color={value.color}
                                                        pin={value.pin}
                                                        regDate={value.regDate}
                                                        alarm = {value.alarm}
                                                        visible={value.visible}
                                                        userNo={value.userNo}
                                                        departmentNo={value.departmentNo}
                                                        checked={value.checked}
                                                        imgae={value.image}
                                                        hash={value.hash}
                                                        hashNo={value.hashNo}
                                                        hashName={value.hashName}
                                                        hashCount={value.hashCount}
                                                        handling={value.handling}
                                                        deptAuth={deptAuth}
                                                        allinfo={allinfo}
                                                        />)
    var output = []

    if (cols !== 0) {
        output = memoList.reduce((acc, child, i) => {
        acc[i % cols] = [...acc[i % cols], child]
        return acc
        }, new Array(cols).fill([]))
    }
    if (memos.length === 0) return <Wrapper></Wrapper>
    
    return (
        <Wrapper>
        <header>{title}</header>
        <List columns={cols}>
          {output.map((column, i) => (
            <Column key={i}>{column}</Column>
          ))}
        </List>
      </Wrapper>
    )
}

export default MemoList