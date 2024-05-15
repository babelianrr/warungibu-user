export default function InputLabel({id, error, label, boldLabel, className}) {
  return (
    <label
      htmlFor={id}
      className={`block text-sm font-light ${error ? 'text-red-900' : 'text-gray-400'} ${
        boldLabel ? 'font-normal' : ''
      } ${className}`}
    >
      {label}
    </label>
  )
}
