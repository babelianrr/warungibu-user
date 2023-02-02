import OrderCard from './OrderCard'
import ReturCard from './ReturCard'

export default function OrderDetail({list, type = 'order', refetch}) {
  return (
    <section className="h-full">
      <div className="space-y-4">
        {type === 'order' ? (
          <>
            {list.map((item, index) => (
              <OrderCard key={index} item={item} refetch={refetch} />
            ))}
          </>
        ) : (
          <>
            {list.map((status, index) => (
              <ReturCard key={index} status={status} />
            ))}
          </>
        )}
      </div>
    </section>
  )
}
