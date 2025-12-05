import { useState } from 'react';

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const reset = () => setValues(initialValues);
  return { values, onChange, reset, setValues };
}


