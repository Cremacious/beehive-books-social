const NewPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-[#252525] rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 mb-20 md:mb-0">
      {children}
    </div>
  );
};

export default NewPage;
