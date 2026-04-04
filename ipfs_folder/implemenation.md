# Implementation Details

The IPFS viewer uses a simple fetch mechanism for gateway-mediated access.
Gateway used: `https://gateway.pinata.cloud/ipfs/`

## Components
- `App.jsx`: Main entry point with route handling.
- `IPFSView.jsx`: Fetches and displays report metadata.
- `ReportImage.jsx`: Optimized image loading from CIDs.
