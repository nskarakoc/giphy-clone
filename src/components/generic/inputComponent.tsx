export default function InputComponent({
  placeholder,
  setValue,
  value,
}: {
  placeholder: string;
  setValue: (value: string) => void;
  value: string;
}) {
  return (
    <input
      className="text-black h-14 px-2 rounded-lg w-full"
      type="text"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={placeholder}
      value={value}
    />
  );
}
