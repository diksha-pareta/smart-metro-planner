const NextActions = ({ suggestions }: { suggestions: string }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h3 className="text-lg font-bold mb-2">What Can I Do Next?</h3>
    <div className="text-sm whitespace-pre-wrap">{suggestions}</div>
  </div>
);