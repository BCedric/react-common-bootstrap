import { useEffect, useMemo, useState } from 'react'

const useFormField = (initValue, validator = () => true) => {
  const [val, setVal] = useState(initValue)
  const resetVal = () => setVal(initValue)

  let isValid = useMemo(() => validator(val), [val])

  return [val, setVal, isValid, resetVal]
}

export default useFormField
