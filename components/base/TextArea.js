import {useEffect, useState} from 'react'
import {InputLabel} from '@/components/labels'
import {classNames} from 'helpers/classNames'
import useInput from 'hooks/useInput'

export default function TextArea({
  error,
  id,
  label,
  placeholder,
  defaultValue = '',
  disabled = false,
  onChange = () => {},
  className,
  width = 'w-full',
  withLabel = true,
  background = 'bg-dnr-gray',
  border = 'border-gray-300',
  boldLabel = false,
  validation = {},
  ...rest
}) {
  const [value, setValue, setFocus, errorValue] = useInput(defaultValue, validation)

  function handleOnChange(e) {
    if (onChange) {
      const newValue = onChange(e.target.value) || e.target.value
      setValue(newValue)
    } else {
      setValue(e.target.value)
    }
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const baseClassess =
    'border border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-gray-900 w-full rounded-md shadow text-sm'
  const disabledClass = 'bg-gray-100 border-gray-300 cursor-not-allowed'

  return (
    <div className="w-full">
      <InputLabel error={error || errorValue} id={id} label={label} />
      <div className="mt-1">
        <textarea
          className={classNames(baseClassess, disabled ? disabledClass : null)}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          {...rest}
        ></textarea>
      </div>
    </div>
  )
}
