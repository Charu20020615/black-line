export default function InputField({ label, type = 'text', value, onChange, name, placeholder, required = false }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-700" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}


