import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const NotePage = () => {

    let {noteId} = useParams()
    let [note, setNote]=useState(null)
    let navigate = useNavigate()

    useEffect(()=>{
        getNote()
    }, [])

    let getNote = async () => {
        if (noteId ==='new') return

        let response = await fetch(`/api/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body:JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body:JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete/`,{
        method:'DELETE',
        headers:{
            'Content-Type': "application/json"
        }})
        navigate('/')
    }

    let handleSubmit = () => {
        if(noteId !== 'new' && note.body === ''){
            deleteNote()
        }
        else if (noteId !== 'new'){
            updateNote()
        }
        else if (noteId === 'new' && note.body !== null){
            createNote()
        }
        navigate('/')
    }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
            <svg onClick={handleSubmit} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>chevron-left</title>
                <path d="M11 16l13-13v-3l-16 16 16 16v-3l-13-13z"></path>
            </svg>
            </h3>
            {noteId !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ):(
                <button onClick={handleSubmit}>Done</button>
            )}
        </div>
        <textarea onChange={(e)=>{setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>  {/*"?" to not get error when note is null*/}
    </div>
  )
}

export default NotePage