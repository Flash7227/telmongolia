const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="fixed inset-0 bg-slate-900 z-50"></div>
      <div className="absolute top-0 z-50 w-full">{children}</div>
    </div>
  );
};

export default Layout;
