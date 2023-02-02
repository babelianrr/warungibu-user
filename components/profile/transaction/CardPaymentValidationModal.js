import {Modal, TextArea, HorizontalDivider, Card, Input} from '@/components/base'
import {OrderStatus} from "@/components/profile";
import formatDate from "../../../helpers/formatDate";
import {AddressBox} from "@/components/address";
import currencyConverter from "../../../helpers/currencyConverter";
import {generatePriceFromCart} from "../../../helpers/generatePrice";
import NavLink from "@/components/base/NavLink";
import {Button} from "@/components/button";
import {DownloadIcon} from "@heroicons/react/outline";
import useOrderDetail from "../../../hooks/useOrderDetail";
import usePromotionCode from "../../../hooks/usePromotionCode";
import React, {useEffect, useState} from "react";
import CartItem from "@/components/cart/CartItem";
import PromotionCard from "@/components/profile/transaction/PromotionCard";
import {fetchAuthPost} from "../../../helpers/fetch";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import ThreeDs from "@/components/profile/transaction/ThreeDs";

export default function CardPaymentValidationModal({open, setOpen, payment, token, check, discount, cardCvn, orderId, auth}) {

  const router = useRouter()
  const {isLoading, data} = usePromotionCode(token, orderId)
  const [selectedPromo, setSelectedPromo] = useState('')
  const [skip, setSkip] = React.useState(false)
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [buttonType, setButtonType] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [paymentChargeMessage, setPaymentChargeMessage] = useState('')
  const [needAuth, setNeedAuth] = useState(false)
  const [chargeProcess, setChargeProcess] = useState(false)
  const [authValid, setAuthValid] = useState(false)
  const [verify3DS, setVerify3DS] = useState({})


  useEffect(() => {
    if (data) {
      if(data.length > 0) {
        if (selectedPromo === '') {
          calculatePromoCodeDiscount(data[0])
        }
      }
    }

    if (verify3DS) {
      if(verify3DS.status === 'VERIFIED'){
        setChargeProcess(true)

        const req = {
          tokenID: token.id,
          authID: verify3DS.authentication_id,
          cardCvn: cardCvn,
          externalID: orderId,
          promoCode: promoCode,
          discount_amount: discountAmount
        }
        fetchAuthPost(`orders/${orderId}/charge`, req).then(
            charge =>{
              setPaymentChargeMessage('Melakukan Proses Pembayaran, Mohon tunggu')
              setNeedAuth(false)
              if(charge.message === 'success'){
                setPaymentChargeMessage('Pembayaran Berhasil!')
                router.push('detail?state=Need%20Review&order_id='+orderId)
              }
            }
        )
      } else {
        setChargeProcess(false)
      }
    }

    if(!chargeProcess){
      window.addEventListener('message', (event) => {
        if (event.origin === 'https://redirect.xendit.co' && !chargeProcess){
          setVerify3DS(JSON.parse(event.data));
        }
      });
    }
  }, [data, verify3DS])

  function calculatePromoCodeDiscount(promotion){
    const discountPercent = parseInt(promotion.discount_percentage);
    setPromoCode(promotion.code)
    setDiscountPercentage(discountPercent)
    setSelectedPromo(promotion.id)
    const initialDiscountAmount = payment.total_amount * (parseInt(promotion.discount_percentage)/100);
    if(initialDiscountAmount >= promotion.max_discount_amount){
      setDiscountAmount(promotion.max_discount_amount);
    } else{
      setDiscountAmount(initialDiscountAmount)
    }
  }

  function handleSelect(e){
    if(selectedPromo === e.id){
      setPromoCode('')
      setSelectedPromo('')
      setDiscountPercentage(0)
      setDiscountAmount(0)
    } else {
      calculatePromoCodeDiscount(e)
    }
  }

  function handlePayment(){
    if(token.status !== 'VERIFIED'){
      setNeedAuth(true)
    } else {

      const req = {
        tokenID: token.id,
        authID: token.authentication_id,
        cardCvn: cardCvn,
        externalID: orderId,
        promoCode: promoCode,
        discount_amount: discountAmount
      }
      fetchAuthPost(`orders/${orderId}/charge`, req).then(
          charge =>{
            setPaymentChargeMessage('Melakukan Proses Pembayaran, Mohon tunggu')
            setChargeProcess(true)
            setNeedAuth(false)
            if(charge.message === 'success'){
              setPaymentChargeMessage('Pembayaran Berhasil!')
              router.push('detail?state=Need%20Review&order_id='+orderId)
            } else {
              setPaymentChargeMessage('Pembayaran Gagal!')
              setChargeProcess(false)
            }
          }
      )
    }
    discount(discountAmount)
    check(true)
    setButtonType('processing')
  }

  async function chargePayment() {
    const req = {
      tokenID: token.id,
      authID: token.authentication_id,
      cardCvn: cardCvn,
      externalID: orderId,
      promoCode: promoCode,
      discount_amount: discountAmount
    }
    return await fetchAuthPost(`orders/${orderId}/charge`, req);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      size='bigger1'
    >
      {
        chargeProcess ? (
                <h2>{paymentChargeMessage}</h2>
            ) :
          needAuth ?
            (
                <ThreeDs
                  url={token.payer_authentication_url}
                  setMessage={setVerify3DS}
                />
            ) :
            (
                <div className="text-center sm:mt-0 sm:w-full">
                  <div className="w-full mb-4 text-sm space-y-2">
                    <Card>
                      <h4 className="text-base text-gray-900 font-semibold mb-2">Ringkasan Belanja</h4>
                      <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-xs">Total Belanja</span>
                        <div className="text-gray-900 font-semibold">{currencyConverter(payment.total_amount)}</div>
                      </div>
                      {
                        discountPercentage > 0 ? (
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-gray-700 tracking-wide text-xs">Discount</span>
                              <div className="text-gray-900 font-semibold">{currencyConverter(discountAmount)}</div>
                            </div>
                        ) : null
                      }
                      <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 tracking-wide text-xs">
                Ongkos Kirim Dari: <span className="text-gray-900">DKI Jakarta</span>
              </span>
                        <div className="text-gray-900 font-semibold">Rp 0</div>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-xs">Total Pembayaran</span>
                        {
                          discountPercentage > 0 ? (
                              <div className="text-gray-900 font-semibold">{currencyConverter(payment.total_amount - discountAmount)}</div>
                          ) : (
                              <div className="text-gray-900 font-semibold">{currencyConverter(payment.total_amount)}</div>
                          )
                        }

                      </div>
                    </Card>
                    { token && open ? (
                        <Card>
                          <h4 className="text-base text-gray-900 font-semibold mb-2">Detail Metode Pembayaran</h4>
                          <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700 tracking-wide text-xs">Tipe Pembayaran</span>
                            <div className="text-gray-900 font-semibold">[{token.card_info.brand}] - {token.card_info.type} CARD</div>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700 tracking-wide text-xs">Bank</span>
                            <div className="text-gray-900 font-semibold">{token.card_info.bank}</div>
                          </div>
                        </Card>
                    ) : (
                        <Card className="w-full mb-4 text-sm">
                          <h4 className="text-base text-gray-900 font-semibold mb-2">Detail Metode Pembayaran</h4>
                          <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                          <h4>Proses Pengambilan Data</h4>
                        </Card>
                    )
                    }
                    <Card>
                      <h4 className="text-base text-gray-900 font-semibold mb-2">Kupon Promosi</h4>
                      <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                      {
                        !open || isLoading ? (
                            <Card className="w-full mb-4 text-sm">
                              <h4>Proses Pengambilan Data</h4>
                            </Card>
                        ) : data.length < 1 ? (
                            <Card className="w-full mb-4 text-sm">
                              <h4>Belum Ada Promo Saat ini.</h4>
                            </Card>
                        ) : (
                            data.map((promo) => (
                                promo.min_purchase <= payment.total_amount ? (
                                    <PromotionCard
                                        key={promo.id}
                                        promotion={promo}
                                        isSelected={selectedPromo}
                                        handleSelect={handleSelect}
                                    />
                                ) : null
                            ))
                        )
                      }
                    </Card>
                    <div className="flex space-x-2 mb-4 mt-10">
                      <Button className="flex-1" onClick={handlePayment} type={buttonType}>
                        Selesaikan Pembayaran
                      </Button>
                    </div>
                  </div>
                </div>
            )
      }

    </Modal>
  )
}
