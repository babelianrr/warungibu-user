import {Modal} from '@/components/base'

export default function ImageModal({open, setOpen, alt, src}) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="text-center sm:mt-0 sm:w-full">
        <div className="bg-white rounded-lg border-2 cursor-pointer">
          <img src={`${process.env.NEXT_PUBLIC_URL}${src}`} alt={alt} className="w-full h-full p-1" />
        </div>
      </div>
    </Modal>
  )
}
