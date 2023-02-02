import {useState, useEffect, useRef} from 'react'
import {useMutation} from 'react-query'
import {ChatIcon, PaperAirplaneIcon} from '@heroicons/react/outline'

import {Breadcrumb, Card, Input, HorizontalDivider} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {Sidebar} from '@/components/profile'

import {onSnapshot, doc} from 'firebase/firestore'
import db from 'helpers/firebase'
import {createChat, readChat} from 'helpers/fetch'
import {fetchAuthPost} from 'helpers/fetch'

export default function Chat() {
  const [chat, setChat] = useState([])
  const [text, setText] = useState('')
  const {mutate} = useMutation(createChat, {
    onSuccess(_) {
      setText('')
    },
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'rooms', `${user.id}`), (doc) => {
        setChat(doc.data()?.chats ?? [])
      })
      // handle supaya ga listen terus
      return () => {
        unsubscribe()
      }
    }
  }, [])

  function handleSubmitText(e) {
    e.preventDefault()
    if (text) {
      mutate({
        text: text,
      })
    }
  }

  return (
    <MainLayout>
      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <section className="mb-4 hidden sm:block">
          <Breadcrumb path={[{name: 'Beranda', path: '/'}, 'Chat']} />
        </section>

        <section className="flex sm:space-x-4">
          <Sidebar activeRoute="/chat" />
          <Card className="flex-1 p-6 text-gray-700">
            <h1 className="text-lg leading-4  tracking-wide mb-2">Chat</h1>
            <p className="text-xs text-gray-500 mb-2">
              Bicara langsung dengan <span className="font-semibold">CS DNR+</span>
            </p>
            <HorizontalDivider className="mb-4" />
            <ChatContent data={chat} />
            <form onSubmit={handleSubmitText}>
              <div className="flex items-center justify-between space-x-4">
                <Input
                  id="chat-message"
                  placeholder="Tulis Pesan"
                  withLabel={false}
                  width="flex-1"
                  className="bg-dnr-gray"
                  onChange={setText}
                  value={text}
                  autocomplete="off"
                />
                <button
                  className="rounded-full bg-dnr-turqoise flex items-center justify-center p-2"
                  // onClick={handleSubmitText}
                >
                  <PaperAirplaneIcon className="w-6 h-6 text-white transform rotate-90 translate-x-0.5 cursor-pointer" />
                </button>
              </div>
            </form>
          </Card>
        </section>
      </main>
    </MainLayout>
  )
}

function ChatContent({data = []}) {
  const chatRef = useRef(null)

  const {mutate} = useMutation('read-chat', readChat)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.lastElementChild.scrollIntoView(false)
      mutate()
    }
  }, [data])

  if (data.length === 0)
    return (
      <div className="h-96 overflow-x-scroll bg-dnr-gray rounded-lg space-y-8 p-4 mb-2 flex flex-col justify-center">
        <div className="text-center text-gray-900 text-sm">Tidak ada chat</div>
      </div>
    )

  function ChatItem({chat = {}}) {
    return (
      <div
        className={`border rounded-lg rounded-bl-none w-3/4 sm:w-1/2 bg-white p-2 text-gray-900 text-sm ${
          chat.sender_role_status === 'ADMIN' ? 'border-dnr-green' : 'border-dnr-blue p-2 ml-auto'
        }`}
      >
        {chat.text}
        <p className="text-xs text-gray-400 my-2">
          {chat.created.toDate().toDateString()}, {chat.created.toDate().toLocaleTimeString()}
        </p>
      </div>
    )
  }

  return (
    <div className="h-96 overflow-x-scroll bg-dnr-gray rounded-lg space-y-8 p-4 mb-2 flex flex-col" ref={chatRef}>
      {data.map((chat, index) => (
        <ChatItem key={index + chat.sender_id} chat={chat} />
      ))}
    </div>
  )
}
