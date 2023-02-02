import {useQuery} from 'react-query'
import {fetchGet} from 'helpers/fetch'

export function useCategories() {
  return useQuery('categories', () => fetchGet('categories'), {
    select(categories) {
      return categories.map((category) => ({
        ...category,
        url: `/categories/${category.name.replace(/ /g, '_')}`,
      }))
    },
  })
}
