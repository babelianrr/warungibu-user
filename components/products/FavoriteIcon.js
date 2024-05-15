import {useEffect, useState} from 'react'
import {HeartIcon, ShoppingCartIcon} from '@heroicons/react/outline'
import {useMutation} from 'react-query'
import {fetchGet, fetchAuthPost} from 'helpers/fetch'
import {isAuthenticated, authenticatedUser} from 'helpers/isAuthenticated'

export default function FavoriteIcon({product, refetch, isFavorite}) {
  const [favorite, setFavorite] = useState(isFavorite)

  useEffect(() => {
    setFavorite(isFavorite)
  }, [isFavorite])

  const {mutate} = useMutation('add-to-favorite', (id) => fetchAuthPost(`products/${id}/favorites`), {
    onSuccess: refetch,
  })
  const {mutate: deleteFavorite} = useMutation(
    'remove-from-favorite',
    (id) => fetchAuthPost(`products/${id}/favorites`, {}, 'DELETE'),
    {
      onSuccess: refetch,
    }
  )

  function handleFavorite(event) {
    event.stopPropagation()
    if (favorite) {
      deleteFavorite(product.id)
    } else {
      mutate(product.id)
    }
    setFavorite(!favorite)
  }

  if (isAuthenticated()) {
    return (
      <HeartIcon
        className={`w-6 h-6 ${
          favorite ? 'text-red-500' : 'text-gray-200 opacity-70'
        } hover:text-red-500 hover:opacity-100 cursor-pointer fill-current custom-fav`}
        onClick={handleFavorite}
      />
    )
  }

  return null
}
