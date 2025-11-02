# Skill Blockchain Passport - Backend Integration Points

## API Endpoints to Connect

1. **Blockchain Registry API** (`/api/blockchain/registry`): POST skill credentials → returns blockchain transaction hash, status. TODO: Replace `generateMockTxHash()` and credential issuance in `SkillBlockchainPassport.tsx` with real blockchain API.

2. **Verification Service API** (`/api/verification/verify`): POST certificate file → validates and returns verification status. TODO: Wire `handleFileUpload()` to real verification pipeline endpoint.

3. **Export/Wallet API** (`/api/wallet/export`): GET wallet data → returns downloadable wallet file or QR code. TODO: Implement `handleExportWallet()` to generate and download wallet export via API.

