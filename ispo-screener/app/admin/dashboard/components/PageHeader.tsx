export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header
      style={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "2rem",
        borderBottom: "1px solid rgba(128, 128, 128, 0.5)",
        backgroundColor: "#121826",
        overflow: "hidden",
      }}
    >
      {children}
    </header>
  );
}
