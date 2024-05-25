export const Center = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center flex-col h-screen">
      <div className="flex justify-center">{children}</div>
    </div>
  );
};
