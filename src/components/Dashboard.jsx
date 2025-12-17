import React from "react";

export default function Dashboard() {
  return (
    <div style={{ background: 'red', color: 'white', padding: '100px', fontSize: '40px' }}>
      <h1>Vercel is Working!</h1>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
