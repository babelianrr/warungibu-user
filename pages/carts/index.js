import React, {useState, useContext} from 'react'
import {useQuery, useQueryClient, useMutation} from 'react-query'

import MainLayout from '@/components/layouts/MainLayout'
import Breadcrumb from '@/components/base/Breadcrumb'
import SelectedProduct from '@/components/products/SelectedProduct'
import Button from '@/components/button/Button'
import {CartEmpty, CartList, CartFetching, ModalConfirmation, CartSummaryMobile} from '@/components/cart'
import ProtectedRoute from '@/components/HOC/ProtectedRoute'
import {fetchAuthGet, fetchAuthPost} from 'helpers/fetch'
import {CartCountContext} from 'contexts/CartCountContext'

function fetchCart() {
  return fetchAuthGet('carts').then((data) => data.map((item) => ({...item, selected: true})))
}

function Cart() {
  const queryClient = useQueryClient()
  const {value, setValue} = useContext(CartCountContext)

  const [idDelete, setIdDelete] = useState(null)
  const [open, setOpen] = useState(false)

  const {data, isLoading} = useQuery('carts', () => fetchCart())
  const {mutate} = useMutation('carts/update', (cart) => fetchAuthPost(`carts/${cart.id}`, cart, 'PATCH'))
  const {mutate: deleteCart} = useMutation('carts', (cartId) => fetchAuthPost(`carts/${cartId}`, {}, 'DELETE'), {
    onSuccess() {
      const existing = queryClient.getQueryData('carts')
      const newCart = existing.filter((cart) => cart.id !== idDelete)
      queryClient.setQueryData('carts', () => newCart)
      const newCount = newCart.reduce((total, item) => total + item.quantity, 0)

      setValue({count: newCount})
    },
  })

  const handleClickDelete = () => {
    deleteCart(idDelete)
  }

  const handleChangeQty = (cartId, newQty) => {
    const existing = queryClient.getQueryData('carts')
    const newCart = []
    let updatedCart = {}

    existing.forEach((item) => {
      if (item.id === cartId) {
        newCart.push({...item, quantity: newQty})
        updatedCart = {
          id: item.id,
          location: item.location,
          quantity: newQty,
        }
      } else {
        newCart.push(item)
      }
    })

    const newCount = newCart.reduce((total, item) => total + item.quantity, 0)

    setValue({count: newCount})

    queryClient.setQueryData('carts', () => newCart)
    mutate(updatedCart)
  }

  const handleChangeCheckbox = (selectedItem) => {
    const existing = queryClient.getQueryData('carts')

    const newCartList = existing.map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          selected: !item.selected,
        }
      }
      return item
    })

    queryClient.setQueryData('carts', () => newCartList)
  }

  return (
    <MainLayout backTo={'/'} BottomComponent={() => <CartSummaryMobile cartList={data} />}>
      <ModalConfirmation open={open} setOpen={setOpen} onChange={handleClickDelete} />
      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <section className="hidden sm:flex justify-between mb-4">
          <Breadcrumb path={[{name: 'Beranda', path: '/'}, 'Keranjang Belanja']} />
        </section>
        <section className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-6 items-start mb-6">
          {isLoading ? (
            <CartFetching />
          ) : data.length === 0 ? (
            <CartEmpty />
          ) : (
            <CartList
              cartList={data}
              setIdDelete={setIdDelete}
              handleChangeQty={handleChangeQty}
              handleChangeCheckbox={handleChangeCheckbox}
              setOpen={setOpen}
            />
          )}
        </section>
        <section>
          <SelectedProduct />
        </section>
      </main>
    </MainLayout>
  )
}

export default ProtectedRoute(Cart)
