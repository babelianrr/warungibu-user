import {useState, useEffect, Fragment, useRef} from 'react'
import {onSnapshot, doc, getDoc} from 'firebase/firestore'
import {useMutation} from 'react-query'
import {Popover, Transition} from '@headlessui/react'
import {ChatIcon, PaperAirplaneIcon, ChevronDownIcon} from '@heroicons/react/outline'

import {Input} from '@/components/base'

import db from 'helpers/firebase'
import {createChat, readChat} from 'helpers/fetch'
import {fetchAuthPost} from 'helpers/fetch'

export default function ChatWidget() {
  const [chat, setChat] = useState([])
  const [text, setText] = useState('')
  const [totalUnread, setTotalUnread] = useState(0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'rooms', `${user.id}`), (doc) => {
        const chats = doc.data()?.chats ?? []
        setChat(chats)

        // calculate total chat admin, unread
        const totalUnreadMessage = chats.reduce((pre, curr) => {
          if (curr.read_receiver === false && curr.sender_role_status === 'ADMIN') {
            pre += 1
          }
          return pre
        }, 0)
        setTotalUnread(totalUnreadMessage)
      })
      // handle supaya ga listen terus
      return () => {
        unsubscribe()
      }
    }
  }, [])

  const {mutate} = useMutation(createChat, {
    onSuccess(_) {
      setText('')
    },
  })

  function handleSubmitText(e) {
    e.preventDefault()
    if (text) {
      mutate({
        text: text,
      })
    }
  }

  return (
    <div className="fixed bottom-5 right-8 z-20">
      <Popover className="relative">
        <Popover.Button className="bg-dnr-dark-green px-4 py-2 border-2 shadow-lg border-white rounded-lg text-white flex items-center space-x-2 cursor-pointer">
          {totalUnread !== 0 ? (
            <div className="bg-dnr-dark-orange w-5 h-5 flex items-center justify-center rounded-full -top-1.5 -right-1.5 absolute text-xs text-white">
              <span>{totalUnread}</span>
            </div>
          ) : null}
          <ChatIcon className="w-6 h-6" />
          <span>Chat</span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10">
            {({close}) => (
              <div className="bg-white absolute mb-2 right-0 bottom-10 w-96 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div className="">
                    <div className="flex space-x-2 items-center  mb-2">
                      <ChatIcon className="w-6 h-6 text-dnr-dark-green" />
                      <h1 className="text-lg leading-4 tracking-wide">Chat</h1>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      Bicara langsung dengan <span className="font-semibold">CS DNR+</span>
                    </p>
                  </div>
                  <ChevronDownIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={close} />
                </div>

                <ChatContent setTotalUnread={setTotalUnread} chat={chat} />
                <form onSubmit={handleSubmitText}>
                  <div className="flex items-end justify-between space-x-4">
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
                    <div className="rounded-full bg-dnr-turqoise flex items-center justify-center p-2">
                      <PaperAirplaneIcon className="w-5 h-5 text-white transform rotate-90 translate-x-0.5" />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

function ChatContent({setTotalUnread = () => {}, chat = []}) {
  // read chat when open widget
  const {mutate} = useMutation(readChat)
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.lastElementChild.scrollIntoView(false)
      mutate()
    }
  }, [chat])

  if (chat.length === 0)
    return (
      <div className="h-96 overflow-x-scroll bg-dnr-gray rounded-lg space-y-8 p-4 mb-2 flex flex-col justify-center">
        <div className="text-center text-gray-900 text-sm">Tidak ada chat</div>
      </div>
    )

  function ChatItem({item = {}}) {
    return (
      <div
        className={`border rounded-lg rounded-br-none w-1/2 bg-white p-2 text-gray-900 text-sm ${
          item.sender_role_status === 'ADMIN' ? 'border-dnr-green' : 'border-dnr-blue ml-auto text-right'
        }`}
      >
        {item.text}
        <p className="text-xs text-gray-400 my-2">
          {item.created.toDate().toDateString()}, {item.created.toDate().toLocaleTimeString()}
        </p>
      </div>
    )
  }

  return (
    <div className="h-80 overflow-x-scroll bg-dnr-gray rounded-lg space-y-8 p-4 mb-2" ref={chatRef}>
      {chat.map((item, index) => (
        <ChatItem key={index + item.sender_id} item={item} />
      ))}
    </div>
  )
}
