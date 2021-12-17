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
 // {memos.map((value, index) => {
  //   return (
  //     <Memo
  //       key={index}
  //       id={index}
  //       title={value.title}
  //       contents={value.contents}
  //       color={value.color}
  //     />
  //   );
  // })}
const MemoList = ( {memos , cols , title}) => {
    const memoList = memos.map( (value, index) => <Memo key={index} 
                                                        id={index}
                                                        title={value.title}
                                                        contents={value.contents}
                                                        color={value.color} />)
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