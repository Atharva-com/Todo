import React, { useEffect, useState } from 'react'
import { UilSchedule, UilPlus, UilTrashAlt, UilFileEditAlt  } from '@iconscout/react-unicons'
const Todo = () => {
 
  const getLocalItems = () => {
    const list = localStorage.getItem('Lists')
    if(list){
      return JSON.parse(localStorage.getItem('Lists'))
    }
    else{
      return []
    }
  }

  const [InputData, setInputData] = useState("")
  const [List, setList] = useState(getLocalItems())
  const [Icon, setIcon] = useState(true)
  const [EditItem, setEditItem] = useState(null)

  const Change = (e) => {
    setInputData(e.target.value)
  }


  const handleClick = () => {
    if(!InputData){
      alert("Please Fill the data")
      
    }
    else if(InputData && !Icon){
      setList(List.map((element)=>{
        if(element.id === EditItem){
          return {...element, name: InputData}
        }
        return element
      }))
      setIcon(true)
      setEditItem(null)
      setInputData('')
    }
    else{
      const allInputData = { id: new Date().getTime().toString(), name: InputData}
      setList([...List, allInputData])
      setInputData('')
    }
  }

  const handleDelete = (id) => {
    const  updatedItems = List.filter((elem)=>{
      return elem.id !== id
    })

    setList(updatedItems)
  }
 
  const handleCopy = (index) => {
    const copiedData = List.find((elem) => {
          return elem.id === index
    })
    setInputData(copiedData.name)
    setIcon(false)
    setEditItem(index)
    
  }
  useEffect(() => {
    localStorage.setItem('Lists', JSON.stringify(List))
  }, [List])
  
  return (
    <>
      <h1 className='text-center my-5 text-sky-400/75 text-4xl sm:text-6xl font-mono underline underline-offset-8 decoration-2 subpixel-antialiased font-semibold'>Make Your <span className='text-cyan-100'>TODO</span> List...</h1>
      <div className='flex flex-col items-center justify-center'>
        <UilSchedule className="text-amber-600 w-28 h-28" />
      </div>
      <p className='text-sky-400/75 mt-3 tracking-widest text-3xl font-semibold'>Add Your List Here</p>
      <input type="text" autoComplete='off' value={InputData} onChange={Change} placeholder="Add Items in your list ..." className='container mx-auto px-3 py-3 border border-slate-300 rounded-md shadow-lg shadow-blue-300/50 placeholder-slate-400 capitalize mt-5 inline-block sm:w-2/4 w-3/4 focus:outline-none text-[#164e63] text-lg font-bold bg-gray-300' />
      <div onClick={handleClick} className='relative bottom-12 left-32 sm:left-80 cursor-pointer text-[#4b5563] hover:text-[#111827] hover:scale-110 '>
        {Icon?<UilPlus size={40} />:<UilFileEditAlt size={40} />}
      </div>

      <div className="flex flex-col items-center justify-center w-3/4">
        {
          List.map((element)=>{
            return (
              <div key={element.id} className='w-full flex bg-cyan-100 px-3 py-2 my-3 rounded-md border-2 border-sky-500 text-xl subpixel-antialiased font-medium text-sky-900'>
                <div className='capitalize' >{element.name}</div>
                <div className='flex justify-end sm:absolute relative edit-btn' style={{left: '78rem'}}>
                <UilTrashAlt className="cursor-pointer text-[#4b5563] hover:text-[#111827] hover:scale-110 " onClick={()=> handleDelete(element.id)}></UilTrashAlt>
                <UilFileEditAlt className="mx-2 cursor-pointer text-[#4b5563] hover:text-[#111827] hover:scale-110 " onClick={()=> handleCopy(element.id)}/>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* <button class="rounded-lg border-2 border-sky-500 w-28 font-medium mt-3 text-xl px-2 py-2 bg-cyan-200 hover:bg-cyan-700 hover:text-sky-200 remove-btn">Checklist</button> */}
    </>
  )
}

export default Todo