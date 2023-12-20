"use client";

import styles from "./project-dialog.module.css";
import onPoolFormChange from "@/app/lib/onPoolFormChange";

const numTypes = [
  "lifetimeBlocks",
  "lifetimeRewards",
  "amountInPool",
  "committedPledge",
  "activePledge",
];

export default function EditPoolForm({
  fieldsHook,
  onSubmitHandle,
}: {
  fieldsHook: [
    Partial<Pool>,
    (cb: React.SetStateAction<Partial<Pool>>) => void
  ];
  onSubmitHandle: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [fields, setFields] = fieldsHook;

  return (
    <form className={styles.form} onSubmit={onSubmitHandle}>
      <input
        name="ticker"
        value={fields.ticker || ""}
        type="text"
        placeholder="pool ticker"
        disabled={true}
        style={{ backgroundColor: "lightgrey" }}
      />
      <input
        name="poolId"
        value={fields.poolId || ""}
        type="text"
        placeholder="pool id"
        disabled={true}
        style={{ backgroundColor: "lightgrey" }}
      />
      <input
        name="amountInPool"
        value={fields.amountInPool || ""}
        type="text"
        onChange={(e) => onPoolFormChange(e, setFields)}
        placeholder="amount in pool"
      />
      <input
        name="name"
        value={fields.name || ""}
        type="text"
        onChange={(e) => onPoolFormChange(e, setFields)}
        placeholder="name"
      />
      <input
        name="activePledge"
        value={fields.activePledge || ""}
        type="text"
        onChange={(e) => onPoolFormChange(e, setFields)}
        placeholder="active pledge"
      />
      <input
        name="committedPledge"
        value={fields.committedPledge || ""}
        type="text"
        onChange={(e) => onPoolFormChange(e, setFields)}
        placeholder="committed pledge"
      />
      <input
        name="lifetimeBlocks"
        value={fields.lifetimeBlocks || ""}
        type="text"
        onChange={(e) => onPoolFormChange(e, setFields)}
        placeholder="lifetime blocks"
      />
      <input
        name="lifetimeRewards"
        value={fields.lifetimeRewards || ""}
        type="text"
        onChange={(e) => onPoolFormChange(e, setFields)}
        placeholder="lifetime rewards"
      />
      <button>update pool</button>
    </form>
  );
}
