Demonstrates the issue [Slow response times with large documents](https://github.com/graphql/graphql-js/issues/723) and how Rust has an advantage over Node on this CPU-bound problem.

### Results on Mac Mini M1:

- Node - 172s
- Rust - 48s

### Running

- Node:

```
cd node
npm install
npm run benchmark:js
```

- Rust:

```
cd rust
cargo run --release
```
