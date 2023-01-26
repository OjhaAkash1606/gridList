import React, { lazy, Suspense } from "react";
const Customer = lazy(() => import("./Grid.js"));

function App() {
  return (
    // lazy loding used here
    <Suspense fallback={<div>Loading</div>}>
      <Customer></Customer>
    </Suspense>
  );
}

export default App;
