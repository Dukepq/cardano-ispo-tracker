import styles from "./ispo.module.css";

type Params = {
  params: {
    ispo: string;
  };
};

export default function Ispo({ params: { ispo } }: Params) {
  console.log(ispo);
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div>{ispo}</div>
    </>
  );
}