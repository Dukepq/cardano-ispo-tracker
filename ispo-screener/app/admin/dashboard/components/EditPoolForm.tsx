"use client";

import styles from "./project-dialog.module.css";
import onPoolFormChange from "@/app/lib/onPoolFormChange";

export default function EditPoolForm({
  children,
  fieldsHook,
  onSubmitHandle,
}: {
  children?: React.ReactNode;
  fieldsHook: [
    Partial<Pool>,
    (cb: React.SetStateAction<Partial<Pool>>) => void
  ];
  onSubmitHandle: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [fields, setFields] = fieldsHook;
  return (
    <form className={styles.form} onSubmit={onSubmitHandle}>
      <div className={styles.wrapper}>
        <label htmlFor="ticker">ticker: </label>
        <input
          name="ticker"
          value={fields.ticker || ""}
          type="text"
          disabled={true}
          style={{ filter: "grayscale(0.8)" }}
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="id">id: </label>
        <input
          name="poolId"
          value={fields.poolId || ""}
          type="text"
          disabled={true}
          style={{ filter: "grayscale(0.8)" }}
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="amountInPool">amount in pool: </label>
        <input
          name="amountInPool"
          value={fields.amountInPool || ""}
          type="text"
          onChange={(e) => onPoolFormChange(e, setFields)}
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="name">name: </label>
        <input
          name="name"
          value={fields.name || ""}
          type="text"
          onChange={(e) => onPoolFormChange(e, setFields)}
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="activePledge">active pledge: </label>
        <input
          name="activePledge"
          value={fields.activePledge || ""}
          type="text"
          onChange={(e) => onPoolFormChange(e, setFields)}
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="committedPledge">committed pledge: </label>
        <input
          name="committedPledge"
          value={fields.committedPledge || ""}
          type="text"
          onChange={(e) => onPoolFormChange(e, setFields)}
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="lifetimeBlocks">lifetime blocks: </label>
        <input
          name="lifetimeBlocks"
          value={fields.lifetimeBlocks || ""}
          type="text"
          onChange={(e) => onPoolFormChange(e, setFields)}
        />
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="lifetimeRewards">lifetime rewards: </label>
        <input
          name="lifetimeRewards"
          value={fields.lifetimeRewards || ""}
          type="text"
          onChange={(e) => onPoolFormChange(e, setFields)}
        />
      </div>
      <div>
        <button className={styles["button-wrapper"]}>update pool</button>
        {children}
      </div>
    </form>
  );
}
