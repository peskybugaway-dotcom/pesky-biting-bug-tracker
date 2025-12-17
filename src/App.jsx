export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hide main header if a bug is selected to prevent overlap */}
      {!selectedBug && (
        <header className="fixed top-0 w-full bg-emerald-700 p-4 z-50">
          <h1 className="text-white text-center font-black">PESKY®</h1>
        </header>
      )}

      <main>
        {selectedBug ? (
          <BugDetail 
            bug={selectedBug} 
            onBack={() => {
               console.log("Back clicked");
               setSelectedBug(null);
            }} 
          />
        ) : (
          <div className="pt-20">
            <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />
          </div>
        )}
      </main>
    </div>
  );
}
