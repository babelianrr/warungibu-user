import { Card } from "@/components/base"
import { Button } from "@/components/button"
import { CartSummaryMobile } from "@/components/cart"
import ProtectedRoute from "@/components/HOC/ProtectedRoute"
import MainLayout from "@/components/layouts/MainLayout"
import { useRouter } from "next/router"
import { useState } from "react"

const Pembayaran = () => {
    const [isLoading, setLoading] = useState(false)
    const route = useRouter()
    return(
        <MainLayout footer={false} bottomMenu={true} heightScreen={'min-h-full'} BottomComponent={() => <CartSummaryMobile /*url=""*/ cartList={[
            {
                "id": "352421ee-068a-4c93-88e7-82ccb80c2630",
                "quantity": 1,
                "location": "Gudang",
                "final_unit_price": 12000,
                "unit_price": 12000,
                "status": "ACTIVE",
                "user_id": "d6e2224b-07a5-4e24-8cb5-87bd74d917f0",
                "order_id": null,
                "discount_percentage": 0,
                "created_at": "2023-01-19T04:39:23.068Z",
                "updated_at": "2023-01-19T04:39:23.068Z",
                "product": {
                    "id": "95ce6688-17a2-4990-8413-6bf4d7b2587d",
                    "name": "Sate padang",
                    "picture_url": null,
                    "sku_number": "SKU33683763ST",
                    "company_name": "PT XXX",
                    "description": "<p>INi adalah sate padang</p>",
                    "unit": "porsi",
                    "slug": "sate-padang-1672388345436",
                    "price": 12000,
                    "sap_price": 12000,
                    "discount_price": 0,
                    "discount_percentage": 0,
                    "discount_type": null,
                    "status": "ACTIVE",
                    "dpf": null,
                    "valid_to": "2023-02-03T17:02:00.000Z",
                    "discount_end_date": null,
                    "created_at": "2022-12-30T08:16:46.434Z",
                    "updated_at": "2022-12-30T08:20:08.456Z",
                    "images": [
                        {
                            "id": "934ce51e-385d-4521-bc20-e0c5a77b2472",
                            "url": "http://localhost:3001/product_images/1672388542174-sate.jpeg",
                            "product_id": "95ce6688-17a2-4990-8413-6bf4d7b2587d",
                            "created_at": "2022-12-30T08:20:03.325Z",
                            "updated_at": "2022-12-30T08:20:03.325Z"
                        }
                    ],
                    "promotions": [],
                    "stock": 115
                },
                "updated_price": 0,
                "selected": true
            }
        ]} />}>
            <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
                <Card className={'mt-6'}>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Jenis Layanan</span>
                        <div className="text-gray-900 font-semibold text-sm">Token Listrik Rp 50.000</div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">No Meter/ ID Pel.</span>
                        <div className="text-gray-900 font-semibold text-sm">32129382918</div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Nama</span>
                        <div className="text-gray-900 font-semibold text-sm">
                            MR. FAIS***
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Tarif/Daya</span>
                        <div className="text-gray-900 font-semibold text-sm">
                            R1 /0000001300VA
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Token Avail1</span>
                        <div className="text-gray-900 font-semibold text-sm">
                            Rp0
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Token Avail2</span>
                        <div className="text-gray-900 font-semibold text-sm">
                            Rp0
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Harga</span>
                        <div className="text-gray-900 font-semibold text-sm">
                            Rp52.750
                        </div>
                    </div>
                </Card>

                <div className="mb-3 absolute bottom-0 left-3 right-3">
                    <Button className={'w-full'} type={isLoading ? 'disabled' : 'border'} onClick={() => route.push('detail-transaksi')}>Beli</Button>
                </div>
            </section>
        </MainLayout>
    )
}

export default ProtectedRoute(Pembayaran)