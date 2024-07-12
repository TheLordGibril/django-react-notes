import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArrowLeft from '../assets/arrow-left.jsx'

const NotePage = () => {

    let {noteId} = useParams()
    let [note, setNote]=useState(null)

    useEffect(()=>{
        getNote()
    }, [])

    let getNote = async () => {
        let response = await fetch(`/api/notes/${noteId}`)
        console.log(response)
        let data = await response.json()
        setNote(data)
    }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft/>
                </Link>
            </h3>
        </div>
        <textarea onChange={(e)=>{setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>  {/*"?" to not get error when note is null*/}
    </div>
  )
}

export default NotePage