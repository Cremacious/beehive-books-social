const NewPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full darkContainer1 rounded-2xl shadow-2xl overflow-hidden p-4 md:p-6 lg:p-8 mb-20 md:mb-0 min-h-[90vh]">
      {children}
    </div>
  );
};

export default NewPage;
