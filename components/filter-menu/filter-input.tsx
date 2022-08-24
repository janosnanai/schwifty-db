function FilterInput({
  name,
  onChange,
  value,
}: {
  name: string;
  onChange: (value: string) => void;
  value?: string | null;
}) {
  return (
    <input
      onChange={(event) => onChange(event.target.value)}
      className="px-2 py-1 rounded-lg bg-slate-700"
      value={value || ""}
      placeholder={`filter by ${name}...`}
    />
  );
}

export default FilterInput;
