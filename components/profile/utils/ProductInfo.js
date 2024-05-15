export default function ProductInfo() {
  return (
    <div className="space-y-4 divide-y divide-dnr-dark-orange divide-opacity-40 my-4">
      <div className="flex items-center pt-2 justify-between">
        <div className="flex space-x-4 items-center">
          <div className="border border-gray-300 p-1 rounded-md">
            <img
              className="w-10"
              src="https://www.watsons.co.id/medias/CDR-EFF-NEW-10S-TUB-22038.jpg?context=bWFzdGVyfGZyb250L3pvb218OTgzODZ8aW1hZ2UvanBlZ3xmcm9udC96b29tLzg5NjgzNDQ5MjgyODYuanBnfDgzZDJmZWUzN2EwY2FhNzFhMmY5MTEwZGM2NjRiYWUxOGI2MDM4YjVjNjI0YjNhN2U2ZTBhMWRmNTNiZjVhNDA"
              alt="CDR"
            />
          </div>
          <div>
            <h5 className="text-sm">CDR (Calsium D Redoxon)</h5>
            <span className="text-xs text-dnr-dark-orange">Rp 300.000 x 10 pcs</span>
          </div>
        </div>
      </div>
    </div>
  )
}
