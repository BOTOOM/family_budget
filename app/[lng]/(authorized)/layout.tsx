import NavBar from "@/components/common/navbar";

export default function AthorizedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar>{children}</NavBar>
    </>
  );
}
