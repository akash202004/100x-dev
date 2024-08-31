export function InputBox({ label, placeholder, name, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="w-full px-2 py-1 border"
      />
    </div>
  );
}
