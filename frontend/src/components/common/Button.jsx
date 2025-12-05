export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) {
  const base = 'px-4 py-2 rounded transition-colors duration-150';
  const styles = variant === 'secondary'
    ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
    : 'bg-black text-white hover:bg-gray-800';
  return (
    <button type={type} className={`${base} ${styles} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}


