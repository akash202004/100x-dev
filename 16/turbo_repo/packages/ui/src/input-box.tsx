export const InputBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>InputBox Component</h1>
      {children}
      <input type="text" />
    </div>
  );
};
