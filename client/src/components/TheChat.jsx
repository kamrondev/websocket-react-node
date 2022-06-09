import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:8080')

const username = Math.floor(Math.random() * 1000)

function TheChat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', (payload) => {
      setChat([...chat, payload])
    })
  })

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('message', { username, message })
    setMessage('')
    scrollToBottom()
  }

  const scrollToBottom = () => {
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.scrollTop = chatContainer.scrollHeight
  }

  return (
    <div className='w-full space-y-4'>
      <div className='px-6 py-4 overflow-x-hidden overflow-y-auto border rounded h-96 chat-container'>
        <h1>
          Your ID: <span className='font-bold'>{username}</span>
        </h1>
        {chat.map((payload, index) => {
          return (
            <div className='space-x-3'>
              <span className='font-bold'>{payload.username}:</span>
              <span key={index}>{payload.message}</span>
            </div>
          )
        })}
      </div>
      <form className='flex' onSubmit={sendMessage}>
        <input
          className='w-full px-4 py-2 border rounded-tl rounded-bl outline-none'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message...'
          required
        />
        <button
          className='px-4 py-2 text-white border rounded-tr rounded-br border-slate-900 bg-slate-900'
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default TheChat
