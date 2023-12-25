const numTypes = ["distributingAmount", "maxSupply"];

export default function onProjectFormChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFields: (prev: React.SetStateAction<Partial<ISPO>>) => void
) {
  const { value, name } = e.target;
  if (numTypes.includes(name)) {
    const valueNum = Number(value);
    if (isNaN(valueNum)) return;
    setFields((prev) => {
      return { ...prev, [name]: valueNum };
    });
  } else {
    setFields((prev) => {
      return { ...prev, [name]: value };
    });
  }
}
