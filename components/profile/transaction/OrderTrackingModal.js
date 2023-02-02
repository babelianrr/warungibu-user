import Image from 'next/image'
import {AddressBox} from '../../address'
import {Modal, HorizontalDivider} from '../../base'

import formatDate, {formatTime, formatSimpleDate} from 'helpers/formatDate'
import DeliveryIllustration from 'public/assets/delivery.svg'
import { authenticatedUser } from 'helpers/isAuthenticated'
import { useQuery } from 'react-query'
import { fetchAuthGet } from 'helpers/fetch'

function generateMessageEvent(event) {
  if (event.status === 'PROCESSED') {
    return 'Pesanan sedang di proses'
  }
  if (event.status === 'ONGOING') {
    return 'Pesanan sedang di kirim'
  }

  if (event.status === 'DELIVERED') {
    return 'Pesananan telah sampai'
  }

  if (event.status === 'COMPLETED') {
    return 'Pesananan telah selesai'
  }
}

export default function OrderTrackingModal({open, setOpen, order}) {
  const {order_events = [], shipment, payment} = order
  const ongoingEvent = order_events ? order_events.find((order) => order.status === 'ONGOING') : null

  const userId = authenticatedUser().id
  // Address
  const { data: addressData, isLoading: isLoadingAddress } = useQuery(['address', userId], () =>
    fetchAuthGet(`users/${userId}`)
  )
  const mainAddress = addressData?.outlet_types_id?.address

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full text-sm">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Lacak Pesanan
        </Modal.Title>
        <HorizontalDivider />
        <div className="flex justify-between items-center mb-2 ">
          <span className="text-gray-700 tracking-wide text-xs">Kurir</span>
          <div className="text-dnr-blue font-semibold items-center">
            {/* <span>DNR Logistik</span> */}
            <span>KURIR</span>
          </div>
        </div>
        <HorizontalDivider className="mb-4" />
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 tracking-wide text-xs">Nomor Resi</span>
          <div className="text-gray-900 font-semibold">{shipment.track_number}</div>
        </div>
        <HorizontalDivider className="mb-4" />
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 tracking-wide text-xs">Tanggal Pesanan</span>
          <div className="text-gray-900 font-semibold">{formatDate(order.created_at)}</div>
        </div>
        <HorizontalDivider className="mb-4" />

        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 tracking-wide text-xs">Tanggal Pengiriman</span>
          <div className="text-gray-900 font-semibold">{ongoingEvent ? formatDate(ongoingEvent.timestamp) : null}</div>
        </div>
        <HorizontalDivider className="mb-4" />

        {/* <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 tracking-wide text-xs">Penerima</span>
          <div className="text-gray-900 font-semibold">John</div>
        </div>
        <HorizontalDivider className="mb-4" /> */}

        <div className="mb-4">
          <h4 className="text-base text-gray-900 mb-4">Alamat Pengiriman</h4>
          <AddressBox
            address={{
              // label: shipment.address.label,
              description:
                // shipment.address.full_address + ' ' + shipment.address.city + ' ' + shipment.address.province,
                mainAddress,
            }}
          />
        </div>

        <div className="mb-4">
          <h4 className="text-base text-gray-900 mb-4">Status Pengiriman</h4>
          <Image src={DeliveryIllustration} alt="Delivery Illustration" width={600} height={200} />

          <div className="flow-root text-sm">
            <ul className="">
              {/* <li className="flex items-center space-x-6 pb-8">
                <div>
                  <p className="text-gray-900 text-right font-semibold">12.00</p>
                  <p className="text-gray-700 text-xs">Rabu, 09 Juni</p>
                </div>

                <div className="relative">
                  <div className="w-4 h-4 bg-dnr-dark-orange rounded-full"></div>
                  <span
                    className="absolute top-4 left-2 -ml-px h-12 w-0.5 border border-gray-300 border-dashed"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-gray-900 font-semibold">Paket Menuju ke Penerima</p>
                  <p className="text-gray-700 text-xs">Tanggerang Selatan</p>
                </div>
              </li>
              <li className="flex items-center space-x-6 pb-8">
                <div>
                  <p className="text-gray-900 text-right font-semibold">12.00</p>
                  <p className="text-gray-700 text-xs">Rabu, 09 Juni</p>
                </div>

                <div className="relative">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <span
                    className="absolute top-4 left-2 -ml-px h-12 w-0.5 border border-gray-300 border-dashed"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-gray-900 font-semibold">Paket Telah Dibawa</p>
                  <p className="text-gray-700 text-xs">Tanggerang Selatan</p>
                </div>
              </li> */}
              {order_events
                ? order_events
                    .slice(1)
                    .reverse()
                    .map((event, index) => (
                      <li className="flex items-center space-x-6 pb-8" key={event.timestamp}>
                        <div>
                          <p className="text-gray-900 text-right font-semibold">{formatTime(event.timestamp)}</p>
                          <p className="text-gray-700 text-xs">{formatSimpleDate(event.timestamp)}</p>
                        </div>

                        <div className="relative">
                          <div
                            className={`w-4 h-4 ${index === 0 ? 'bg-dnr-dark-orange' : 'bg-gray-400'} rounded-full`}
                          ></div>
                          <span
                            className="absolute top-4 left-2 -ml-px h-12 w-0.5 border border-gray-300 border-dashed"
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <p className="text-gray-900 font-semibold">{generateMessageEvent(event)}</p>
                          {/* <p className="text-gray-700 text-xs">Tanggerang Selatan</p> */}
                        </div>
                      </li>
                    ))
                : null}
              {payment.status === 'SUCCESS' ? (
                <li className="flex items-center space-x-6">
                  <div>
                    <p className="text-gray-900 text-right font-semibold">{formatTime(payment.updated)}</p>
                    <p className="text-gray-700 text-xs">{formatSimpleDate(payment.updated)}</p>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    {/* <span
                    className="absolute top-4 left-2 -ml-px h-10 w-0.5 border border-gray-300 border-dashed"
                    aria-hidden="true"
                  /> */}
                  </div>

                  <div>
                    <p className="text-gray-900 font-semibold">Pembayaran dikonfirmasi</p>
                    {/* <p className="text-gray-700 text-xs">Dikonfirmasi oleh sistem</p> */}
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  )
}
