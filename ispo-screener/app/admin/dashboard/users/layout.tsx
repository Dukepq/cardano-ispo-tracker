export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ margin: "0 auto" }}>{children}</div>
    </>
  );
}
