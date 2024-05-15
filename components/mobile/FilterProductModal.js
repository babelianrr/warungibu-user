import {Modal, HorizontalDivider, Input} from '@/components/base'
import {NavCategory} from 'pages/categories/[product]'
import {StarIcon} from '@heroicons/react/outline'
import {useRouter} from 'next/router'
import {Button} from '@/components/button'

export default function FilterProductModal({
  open,
  setOpen,
  categories,
  isLoading,
  changeMaxPrice,
  changeMinPrice,
  changeRating,
  setFiltered,
  minPrice,
  maxPrice,
  rating,
  reset,
}) {
  const router = useRouter()
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="text-center sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Filter Produk
        </Modal.Title>
        <HorizontalDivider />
        <div className="flex flex-col p-4">
          <div className="flex space-x-6 justify-between items-center mb-4 text-sm">
            <p className="font-bold">Kategori</p>
            <p
              className="text-gray-500 hover:text-dnr-turqoise cursor-pointer"
              onClick={() => {
                setOpen(false)
                router.push(`/categories/all`)
                reset()
              }}
            >
              Reset
            </p>
          </div>
          <nav>
            {isLoading ? (
              <p className="py-4 text-gray-700 text-center text-lg">Proses Pengambilan Data</p>
            ) : (
              <ul>
                {categories.map((category) => (
                  <NavCategory key={category.id} href={category.url} onClick={() => setOpen(false)}>
                    {category.name}
                  </NavCategory>
                ))}
              </ul>
            )}
          </nav>

          <HorizontalDivider className="mb-4" />
          <div className="mb-4 space-y-4">
            <h2 className="text-sm font-bold mb-4">Harga</h2>
            <Input
              id="minPrice"
              placeholder="Harga Minimum"
              prefix="Rp"
              autoComplete="off"
              onChange={changeMinPrice}
              defaultValue={minPrice}
            />
            <Input
              id="maxPrice"
              placeholder="Harga Maximum"
              prefix="Rp"
              autoComplete="off"
              onChange={changeMaxPrice}
              defaultValue={maxPrice}
            />
          </div>
          <HorizontalDivider className="mb-4" />
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-4">Rating</h2>
            <div className="flex space-x-4 items-center">
              <input
                id="check"
                name="key"
                value="value"
                type="checkbox"
                checked={!!rating}
                onChange={changeRating}
                className="h-4 w-4 border-gray-300 rounded text-dnr-dark-orange focus:ring-dnr-orange"
              />
              <label className="flex space-x-2 items-center text-sm">
                <StarIcon className="h-4 w-4 text-dnr-dark-orange" />
                <p className="text-sm">4 Keatas</p>
              </label>
            </div>
          </div>
          <HorizontalDivider className="mb-4" />
          <Button
            onClick={() => {
              setOpen(false)
              setFiltered()
            }}
          >
            Filter Produk
          </Button>
        </div>
      </div>
    </Modal>
  )
}
