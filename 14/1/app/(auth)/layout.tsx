export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b-2 text-center">
      20% off for next 2 days
      {children}
    </div>
  );
}
