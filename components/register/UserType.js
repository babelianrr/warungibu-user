import {Button} from '@/components/button'

export default function UserType({goToNext}) {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
      <Button className="flex-1 text-white" color="orange" type="disabled">
        Pengguna Baru
      </Button>
      <Button className="flex-1" color="orange" type="border" onClick={goToNext}>
        Pengguna lama
      </Button>
    </div>
  )
}
