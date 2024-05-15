export default function ReturStats({status, type}) {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-700 tracking-wide text-sm font-semibold">Status Pengajuan Retur Barang</span>
      <div className={` ${type === 'gray' ? 'text-gray-900' : 'text-dnr-turqoise'} font-semibold items-center`}>
        {status}
      </div>
    </div>
  )
}
