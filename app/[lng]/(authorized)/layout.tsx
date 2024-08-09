import NavBar from "@/components/common/navbar";

export default function AthorizedLayout({
  children, // will be a page or nested layout
  params: {
    lng
  }
}: {
  children: React.ReactNode;
  params: {
    lng: string
  }
}) {
  return (
    <>
      <NavBar lng={lng}>{children}</NavBar>
    </>
  );
}
