const numTypes = [
  "lifetimeBlocks",
  "lifetimeRewards",
  "amountInPool",
  "committedPledge",
  "activePledge",
];

export default function onPoolFormChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFields: (prev: React.SetStateAction<Partial<Pool>>) => void
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
