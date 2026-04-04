import { useState } from 'react'
import './App.css'

function App() {
  const [cid, setCid] = useState('')
  const [data, setData] = useState(null)

  // ipfs gateway se data fetch karne wali logic
  const handleFetch = async () => {
    if (!cid) return
    try {
      const res = await fetch(`https://ipfs.io/ipfs/${cid}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      alert("IPFS fetch failed, gateway issue ho sakta hai.")
    }
  }

  return (
    <div className="ipfs-viewer">
      <h1>Satya IPFS Public Ledger</h1>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter IPFS CID (e.g. Qm...)" 
          value={cid}
          onChange={(e) => setCid(e.target.value)}
        />
        <button onClick={handleFetch}>Verify Evidence</button>
      </div>

      {data && (
        <div className="data-display">
          <h3>Verified Evidence Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
