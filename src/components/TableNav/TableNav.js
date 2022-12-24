import { parse } from 'papaparse';
import React, { useContext, useState } from 'react';
import './TableNav.css';
import {context} from '../ContextApi/context';
import Table from '../Table/Table';

const TableNav = () => {
  const {postContacts,fetchContacts,arrCheck,deleteContacts}=useContext(context);
  const [click,setClick]=useState(false);
  const [delClick,setDelClick]=useState(false);
  const [highlighted,setHighlighted]=useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDelComplete, setIsDelComplete] = useState(false);

  const deleteBtnClicked=async()=>{
    const userIds=arrCheck;
    userIds.map(async(id)=>{
      return await deleteContacts(id);
    });
    fetchContacts();
  }

  return (
    <>
    <div className='table-nav-container'>
      <div className='left-nav'>
        <div className='nav-items'>
          <img src="Images/calender.png" alt="" />
          <span>Select Date</span>
          <img src="Images/downArrow.png" alt="" />
        </div>
        <div className='nav-items'>
          <img src="Images/list.png" alt="" />
          <span>Filter</span>
          <img src="Images/verticleLine.png" alt="" />
          <img src="Images/downArrow.png" alt="" />
        </div>
      </div>
      <div className='right-nav'>
        <div className='nav-items' style={{ cursor: "pointer" }} onClick={()=>setDelClick(true)} >
          <img src="Images/delet.png" alt="" />
          <span>Delete</span>
        </div>
        {delClick && (
          <div className='popup'>
            {(isDelComplete)? (
              <>
              <div>
              <img src="Images/delIconComp.png" alt="PopUp" />
              </div>
              <div className='popuptext'>Deleted Contacts</div>
              <div className='popupbtncontainer'>
                <button className='popupbtn' onClick={()=>{
                  setDelClick(!delClick);
                  setIsDelComplete(false);
                  document.location.reload();
                  }} >
                  Cancel
                </button>
              </div>
              </>
            ) : (
              <>
              <div>
                <img src="Images/impDel.png" alt="PopUp" />
              </div>
              <div className='popuptext'>Delete Contacts</div>
              <div className='popuplink'>
                Sure you want to delete this Contacts?
              </div>
              <div className='popupbtncontainer'>
                <button className='popupbtn' onClick={()=>{
                  setDelClick(!delClick);
                  setIsDelComplete(false);
                }}>
                  Cancel
                </button>
                <button className='popupbtn' onClick={()=>{
                  setIsDelComplete(true);
                  deleteBtnClicked();
                }}>
                  Ok
                </button>
              </div>
              </>
            )}
          </div>
        )}
        <div className='nav-items' style={{ cursor: "pointer" }} onClick={()=>setClick(!click)}>
            <img src="Images/sort.png" alt="" />
            <span>Import</span>
        </div>
        <div className='nav-items'>
            <img src="Images/export.png" alt="" />
            <span>Export</span>
        </div>
        {click && (
            <div className={`popup ${highlighted ? 'highlighted' : "nothighlighted"}`}
            onDragOver={(e)=>{
              e.preventDefault();
            }}
            onDragEnter={()=>setHighlighted(true)}
            onDragLeave={()=>setHighlighted(false)}
            onDrop={(e)=>{
              e.preventDefault();
              
              Array.from(e.dataTransfer.files)
              .filter((files)=> files.type === "text/csv")
              .forEach(async(file)=>{
                const text=await file.text();
                const result=parse(text,{header:true});
                result.data.pop();
                await postContacts(result.data);
                setHighlighted(false);
                setIsComplete(true);
                document.location.reload();
              });
            }}
            >{isComplete ? (
              <>
                <div>
                <img src="Images/importComplete.png" alt="PopUp" />
                </div>
                <div className="popuptext">Import Complete</div>
                <div className="popuplink">CSV File is Uploaded</div>
                <div className='popupbtncontainer'>
                  <button className='popupbtn' onClick={()=>{
                    setClick(!click);
                    setIsComplete(false);
                  }}>
                    Ok
                  </button>
                </div>
              </>
            ) : (
              <>
              <div>
                <img src="Images/importLogo.png" alt="PopUp" />
              </div>
              <div className="popuptext">Import File</div>
              <div className="popuplink">Drag & Drop a CSV File to Upload</div>
              <div className="popupbtncontainer">
                <button className='popupbtn' onClick={()=>{
                  setClick(!click);
                  setIsComplete(false);
                }}>
                  Cancel
                </button>
              </div>
              </>
            )}
            </div>
        )}
      </div>
    </div>
    <div className='mainTable-container'>
      <Table/>
    </div>
    </>
  )
}

export default TableNav;