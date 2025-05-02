import { Card } from "@/components/base"
import { Button } from "@/components/button"
import { CartSummaryMobile } from "@/components/cart"
import CartSummaryMobileToken from "@/components/cart/CartSummaryMobileToken"
import { ErrorModal } from "@/components/detailProduct"
import ProtectedRoute from "@/components/HOC/ProtectedRoute"
import MainLayout from "@/components/layouts/MainLayout"
import VerifikasiPpob from "@/components/ppob/VerifikasiPpob"
import currencyConverter from "helpers/currencyConverter"
import { fetchAuthPost } from "helpers/fetch"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useMutation, useQuery } from "react-query"

const Pembayaran = () => {
    const [order, setOrder] = useState('')
    const [open, setOpen] = useState(false)
    const [openVerifikasi, setOpenVerifikasi] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState(false)
    const router = useRouter()
    const { slug } = router.query
    // console.log('slug :', slug)
    const {isLoading:isLoadingDetail, mutate:mutateDetail, error:errorDetail} = useMutation(['detail-checkout'], (payload) => fetchAuthPost(`ppob/checkout`, payload), {
        onSuccess(response) {
            setOrder(response)
        },
        retry: false,
    })
    
    // const {isLoading, mutate, error} = useMutation(['checkout'], (payload) => fetchAuthPost(`ppob`, payload), {
    //     onSuccess(response) {
    //         router.push(`/profile/transaksi/detail?state=Pembayaran%20Tempo&order_id=${response.order.id}`)
    //     },
    //     onError(error){
    //         setOpen(true)
    //         setErrorMessage('Transaksi tidak dapat dilanjutkan, coba lagi nanti')
    //     }
    // })

    const checkout = () => {
        const payload = {
            customer_no: slug.split('-')[1],
            buyer_sku_code: slug.split('-')[0]
        }
        localStorage.payloadorder = JSON.stringify(payload, null, 2)
        router.push('/token-listrik/pembayaran/pin-confirmation')
    }

    useEffect(() => {
        if(slug){
            mutateDetail({
                customer_no: slug.split('-')[1],
                buyer_sku_code: slug.split('-')[0]
            })
        }
    }, [slug])

    return(
        <>
            <VerifikasiPpob 
                setOpen={setOpenVerifikasi} 
                open={openVerifikasi} 
                title="Konfirmasi pin"
                // message="Apakah anda yakin untuk menghapus rekening ini"
                onConfirm={(pin) => mutate({
                    pin:pin,
                    customer_no: slug.split('-')[1],
                    buyer_sku_code: slug.split('-')[0]
                })}
                confirmLabel="Submit"
                type="information"
            />
            {isLoadingDetail ? (
                <MainLayout footer={false} bottomMenu={true} heightScreen={'min-h-full'} >
                    <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto min-h-screen">
                        <Card className={'mt-6 animate-pulse'}>
                            <Skeleton count={5} />
                            <div className="animate-pulse">
                                <div className="h-2 bg-slate-700 rounded"></div>
                            </div>
                        </Card>
                    </section>
                </MainLayout>
            ) : (
                <MainLayout footer={false} bottomMenu={true} heightScreen={'min-h-full'} >
                    <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto min-h-screen">
                        <Card className={'mt-6'}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 tracking-wide text-xs">Jenis Layanan</span>
                                <div className="text-gray-900 font-semibold text-sm">Token Listrik</div>
                            </div>

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 tracking-wide text-xs">No Meter/ ID Pel.</span>
                                <div className="text-gray-900 font-semibold text-sm">{order?.customer_no ?? '-'}</div>
                            </div>

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 tracking-wide text-xs">Nama</span>
                                <div className="text-gray-900 font-semibold text-sm">
                                    {order?.name ?? '-'}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 tracking-wide text-xs">Tarif/Daya</span>
                                <div className="text-gray-900 font-semibold text-sm">
                                    {order?.segment_power ?? '-'}
                                </div>
                            </div>

                            {/* <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 tracking-wide text-xs">Token Avail1</span>
                                <div className="text-gray-900 font-semibold text-sm">
                                    {currencyConverter(order?.cost_ppn ?? 0) === '-' ? 0 : currencyConverter(order?.cost_ppn ?? 0)}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 tracking-wide text-xs">Token Avail2</span>
                                <div className="text-gray-900 font-semibold text-sm">
                                    {currencyConverter(order?.cost_ppj ?? 0) === '-' ? 0 : currencyConverter(order?.cost_ppj ?? 0)}
                                </div>
                            </div> */}

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 tracking-wide text-xs">Harga</span>
                                <div className="text-gray-900 font-semibold text-sm">
                                    {currencyConverter(order?.sell_price ?? 0)}
                                </div>
                            </div>
                            
                        </Card>
                        <div className="mb-3 mt-12 hidden sm:block">
                            {/* <Button className={'w-full'} type={isLoading ? 'disabled' : 'border'} onClick={() => checkout()}>Beli</Button> */}
                            <Button className={'w-full'} type={isLoadingDetail ? 'disabled' : 'border'} 
                                onClick={() => checkout()}
                            >
                                Beli
                            </Button>
                        </div>
                        {/* Mobile ui */}
                        <div className="fixed inset-x-0 bottom-0 z-50  sm:hidden">
                            <div className=" w-full px-4 py-2 border-2 shadow-lg border-white bg-white rounded-lg flex justify-between">
                                <div className="font-extralight text-sm flex-1 flex flex-col space-y-1">
                                <p className="text-xs">{`Total Harga Barang`}</p>
                                <p className="text-dnr-dark-orange text-base font-bold">{currencyConverter(order?.sell_price)}</p>
                                </div>
                                <Button
                                className="flex-1"
                                    type={isLoadingDetail ? 'disabled' : ''}
                                    onClick={() => checkout()}
                                >{`Beli`}</Button>
                            </div>
                        </div>
                        <ErrorModal open={open} setOpen={setOpen} message={ErrorMessage} title="Gagal" />
                    </section>
                </MainLayout>
            )}
        </>
    )
}

export default ProtectedRoute(Pembayaran)