export const metadata = {
  title: "api",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
