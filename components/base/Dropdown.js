import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({as = 'div', className = '', Button, itemClassName, children, Items}) {
  return (
    <Menu as={as} className={className}>
      {({open}) => (
        <>
          <Button />

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items static className={itemClassName}>
              <Items />
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

Dropdown.Item = Menu.Item

Dropdown.Button = Menu.Button
