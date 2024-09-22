Demonstrates the issue [Slow response times with large documents](https://github.com/graphql/graphql-js/issues/723) and how Rust and Go have an advantage over Node on this CPU-bound problem.
I don't claim to be an expert on either Rust or Go, so take these results with a pinch of salt :-)

### Results on Mac Mini M1:

- Node - 172s
- Rust - 48s
- Go - 82s

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

- Go:

```
cd golang
go build
./example
```
