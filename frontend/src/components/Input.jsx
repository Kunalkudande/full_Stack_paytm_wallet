export function Input({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
