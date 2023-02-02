import {Fragment, useState} from 'react'
import Modal from '@/components/base/Modal'
import {ArrowLeftIcon} from '@heroicons/react/outline'
import {HorizontalDivider} from '@/components/base'
import {Transition} from '@headlessui/react'

export default function StepModal({open, setOpen, pages, initialPage, overflowHidden = true, ...rest}) {
  const [activePage, setActivePage] = useState(pages[initialPage])
  const {title, Component} = activePage

  function goTo(page) {
    setActivePage(pages[page])
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      overflowHidden={overflowHidden}
      onClose={() => setActivePage(pages[initialPage])}
    >
      <div className="text-center sm:mt-0 sm:w-full">
        <Modal.Title
          as="h3"
          className="text-xl  leading-6 tracking-wide font-medium text-gray-900 text-left mb-4 flex items-center space-x-2 "
        >
          {activePage.before ? (
            <ArrowLeftIcon className="w-5 h-5 cursor-pointer text-gray-500 " onClick={() => goTo(activePage.before)} />
          ) : null}
          <span className="text-center flex-1 ">{title}</span>
        </Modal.Title>
        {/* {Object.entries(pages).map(([key, {id, Component}]) => (
          <Transition
            as={Fragment}
            show={key === activePageKey}
            key={id}
            enter="transition duration-300"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
             <Component goTo={goTo} /> 
          </Transition> *
        ))} */}
        {/* {Component({goTo})} */}
        <div className="px-2 sm:px-0">
          <Component goTo={goTo} {...rest} />
        </div>
      </div>
    </Modal>
  )
}
