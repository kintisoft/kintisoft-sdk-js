# **@kintisoft/sdk**
### Official JavaScript/TypeScript SDK for KintiSoft Public API

[![NPM Version](https://img.shields.io/npm/v/@kintisoft/sdk.svg)](https://www.npmjs.com/package/@kintisoft/sdk)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The **KintiSoft JavaScript SDK** provides a modern, typed and easy-to-use interface to interact with the **KintiSoft Public API**, supporting browser environments, Node.js, Angular, React, Vue, and more.

---

## Installation

```bash
npm install @kintisoft/sdk
```

or with yarn:

```bash
yarn add @kintisoft/sdk
```

---

## Configuration

The SDK requires two parameters:

| Parameter | Description |
|----------|-------------|
| `tenant` | Tenant subdomain (e.g. `"acme"`, `"demo"`) |
| `apiKey` | Public API Key for external integrations |

⚠️ **Never use private API keys in frontend projects.**

---

## Project Structure

```
src/
  httpClient.ts
  index.ts
  modules/
    prospects.ts
```

---

## Build From Source

```bash
npm run build
```

This generates the output inside the `dist/` directory.

---

## Publishing to npm

If you are a maintainer:

```bash
npm version patch   # or minor, major
npm publish --access public
```

---

## Contributing

Pull requests and improvements are welcome!  
Feel free to open issues or feature requests.

---

## License

MIT © KintiSoft
