import NavLink from 'components/base/NavLink'

export default function Category({categories, type}) {
  return (
    <div className="mt-4 sm:mt-10 relative mb-4">
      {type === 'produk' &&
        <img src="/assets/delivery_man.png" className=" absolute bottom-0 hidden sm:block" width={200} />
      }
      <div className="bg-white py-3 px-5 sm:py-5 sm:px-5 flex flex-col sm:flex-row rounded-md shadow-sm sm:space-x-4 w-full sm:w-11/12 ml-auto space-y-0 sm:space-y-4 sm:space-y-0">
        <section className="text-dnr-light-gray text-sm w-full sm:w-1/3 sm:ml-28">
          {type === 'produk' &&
            <p className="leading-tight font-light mt-2 hidden sm:block">Bingung Cari Produk Apa?</p>
          }
          <h3 className="text-xl sm:text-3xl tracking-normal text-gray-900 font-semibold my-3 force-line-height">
            {type === 'produk' &&
            <>
            Yuk Pilih Kategori <br className="hidden sm:block"/>Produk Kami
            </>
            }
            {type === 'kebutuhan' &&
            <>
            Kebutuhan Harian
            </>
            }
          </h3>
          {type === 'produk' ?
            <p className="leading-tight font-light mb-1 hidden sm:block">
              Kami menyediakan berbagai macam produk, Dari produk consumers, obat dan vitamin, alat kesehatan, produk
              kecantikan, dan masih banyak lagi lainnya.
            </p>
            :
            <p className="leading-tight font-light mb-1 hidden sm:block">
              Kami menyediakan berbagai macam produk kebutuhan harian.
            </p>
          }
        </section>

        <section className="flex overflow-x-auto overflow-y-hidden space-x-4 sm:space-x-0 sm:grid sm:grid-rows-1 sm:grid-cols-5 sm:gap-3 p-1 sm:p-0">
          {categories.map((category) => (
            <NavLink key={category.id} href={category.url}>
              <div className="flex-shrink-0 flex flex-col pt-1 space-y-5 text-dnr-light-gray items-center cursor-pointer group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white shadow-custom grid place-items-center rounded-lg">
                  <img src={category.icon_url} alt={category.name} className="w-16 h-16 mobile-size-img sm:w-18 sm:h-18" />
                </div>
                <p className="leading-tight font-light text-sm text-center text-dnr-light-gray mt-force">{category.name}</p>
              </div>
            </NavLink>
          ))}
        </section>
      </div>
    </div>
  )
}
