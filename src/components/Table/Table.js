import React, { useContext, useState } from 'react';
import './Table.css';
import {context} from '../ContextApi/context';
import Tooltip from 'rc-tooltip';
import "rc-tooltip/assets/bootstrap.css";

const Table = () => {

  const {contacts,setArrCheck,deleteContacts}=useContext(context);
  const [pageNum,setPageNum]=useState(1);
  let limit=8;
  let pages=Math.ceil(contacts.length/limit);
  let arrOfPages=new Array(pages).fill(0);
  const start=(pageNum-1)*limit;
  const end=pageNum*limit;
  const contactsPerPage=contacts.slice(start,end);
  const left="<";
  const right=">";

  const handlePageClick=(e)=>{
    setPageNum(parseInt(e.target.value));
  }

  let arrCheck=[];
  const checkCheckBox=(e)=>{
    let clicked= e._id;
    const idx=arrCheck.indexOf(e._id);
    if(idx > -1){
      arrCheck.splice(idx,1);
    }else{
      arrCheck.push(clicked);
    }
    setArrCheck((prev)=>{
      return [...prev,...arrCheck];
    });
  }

  const checkCheckBoxAll=()=>{
    document.querySelectorAll("#checksingle").forEach((ele)=>{
      if(ele.checked === false){
        ele.checked=true;
        arrCheck.push(ele.name);
      }else{
        ele.checked=false;
        const idx=arrCheck.indexOf(ele.name);
        if(idx > -1){
          arrCheck.splice(idx,1);
        }
      }
    });
    setArrCheck(arrCheck);
  }

  const MyTooltip=({content,children})=>{
    return <Tooltip
        overlay={content}
        mouseLeaveDelay={0.2}
        mouseEnterDelay={0.1}
        defaultVisible={false}
        placement="bottom"
        overlayClassName="bbs-tooltip"
        overlayInnerStyle={{
            color: "#2DA5FC",
            background: "#FFFFFF",
            width: "223px",
            height: " 33px",
            fontSize: "18px",
            textAlign: "center",
            opacity: "1",
        }}>
          {children}
    </Tooltip>
  };

  return (
    <div>
      <table id="myTable" className="table table-hover">
        <thead>
        <input type="checkbox" id="checkAll" onClick={(checkCheckBoxAll)} />
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Company</th>
                    <th scope="col">Industry</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Country</th>
                    <th scope="col">Action</th>
        </thead>
        <tbody className='table-body'>
            {contactsPerPage.map((item,i)=>{
              if(item.name !== ""){
                return (
                  <tr key={item._id}>
                      <th>
                        <input type="checkbox" id="checksingle" onClick={()=>{checkCheckBox(item)}} name={item._id} />
                      </th>
                      <td>{item.Name}</td>
                      <td>{item.Designation}</td>
                      <td>{item.Company}</td>
                      <td>{item.Industry}</td>
                      <MyTooltip content={item.Email}>
                          <td id="email">{item.Email}</td>
                      </MyTooltip>
                      <td>{item.PhoneNumber}</td>
                      <td>{item.Country}</td>
                      <td>
                        <img src="Images/Edit-Pen.png" alt="" />
                        <img src="Images/Delete-Bin.png" alt="" onClick={()=>{
                            deleteContacts(item._id);
                            window.alert("Deleted Successfully");
                            document.location.reload();
                        }} />
                      </td>
                  </tr>
                )
              }
            })}
        </tbody>
      </table>
      <div className='page-no'>
          {(pageNum > pages) ? null : <button onClick={()=>{
            if(pageNum > 1){
              setPageNum(pageNum-1);
            }
          }}>{left}</button>}
          {
            arrOfPages.map((item,i)=>{
              return (<button value={i+1} onClick={handlePageClick}>{i+1}</button>);
            })
          }
          {
            (pageNum > pages) ? null : <button onClick={()=>{
              if(pageNum !== pages){
                setPageNum(pageNum+1);
              }
            }}> {right}</button>
          }
      </div>
    </div>
  )
}

export default Table;