const Share = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-[600px] p-8 text-center space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Shared Document</h1>
        <div className="bg-card border border-border rounded-xl p-12">
          <p className="text-muted-foreground">Document preview will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Share;
