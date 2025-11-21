const NewPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-[#252525] rounded-2xl shadow-2xl overflow-hidden p-2 md:p-8 mb-20 md:mb-0 min-h-[90vh] border-b-9 border-slate-500">
      {children}
    </div>
  );
};

export default NewPage;
