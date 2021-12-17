import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import HashItem from './HashItem';
import axios from 'axios'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

`;

const HashTag = styled.div`
  z-index: 9999;
  position: absolute;
  width: 200px;
  height: 280px;
  background: white;
  fontSize: 5px;

  transform: translate(-200%, 15%);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  cursor: default;

  flex-wrap: wrap;
  align-items: center;
  
`;

const HeadLabel = styled.div`
//   background: ${({ color }) => color}
    height: 15%;
   background: #ececec;
   border: 1px solid;
`

const HashTagWindow = () => {
    const [allHashDatas, setAllHashDatas] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/doki/hash/getAllHashList`)
        .then((Response) => {
            console.log('===== Get Hash 응답받음! =====')
            console.log(Response)
            console.log('=============================')
            setAllHashDatas(
                Response.data
            );
        })
        .catch((Error) => {console.log(Error)})
    }, [])

    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <Wrapper>
            <HashTag>
                <div style={{
                    width: '100%',
                    height: "20px",
                    backgroundColor:"#efefef",
                    border: "solid 1px"}}>
                    <label >메모 해시태그 지정</label>
                </div>
                
                {/* 해시 검색 */}
                <div style={{width:'100%',height:'25px', border:'1px solid'}}>
                    <input 
                        onChange={handleKeyword}
                        value={keyword}
                        style={{textAlign:'center', float: 'left', position:'relative',border:'1px solid', width: '90%', height:'100%'}}
                        type="text" placeholder='해시태그 입력'></input>
                    <button style={{textAlign:'center', float: 'right', border:'1px solid',width: '10%', height: '100%'} }>x</button>
                </div>
                {/* 해시 리스트 */}
                <div style={{overflowY: 'auto',border: '1px solid #ff0000', width: '100%', height:'210px'}}>
                    {
                        allHashDatas
                            .filter(data => {
                                return data.name.indexOf(keyword) !== -1})
                            .map((data, index) => {
                                return <HashItem
                                    key={index}
                                    no={data.no}
                                    name={data.name}
                                />
                        })
                        
                    }
                </div>

                {
                    
                    allHashDatas.forEach(element => {
                        if(element.name !== keyword){
                            return true;
                        }

                    }) &&
                    // {/* 검색의 keyword와 리스트의 해시 값의 일치 유무에 따라 display를 보였다 안보였다 토글한다*/}
                    (<div style={{ cursor:'pointer', border:'1px solid #00ff00',width: '100%', height:'25px'}}>
                        <img style={{float:'left', border:'1px solid', width: '10%', height:'90%'}}></img>
                        '
                        <span >{keyword}</span>
                        ' 만들기
                    </div>)
            
                    
                }
                

                
                
            </HashTag>
        </Wrapper>
    )
};

export default HashTagWindow;