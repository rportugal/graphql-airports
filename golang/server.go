package main

import (
	"example/graph"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "4000"

func main() {
	graph.InitAirportData()

	argsWithoutProg := os.Args[1:]

	if len(argsWithoutProg) > 0 {
		log.Println("sequential")
		c := client.New(handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}})))

		query := `{
		 airports {
		   icao
		   iata
		   name
		   city
		   state
		   country
		   coordinate {
		     longitude
		     latitude
		     elevation
		   }
		   timezone
		 }
		}`

		start := time.Now()
		for range 500 {
			_, err := c.RawPost(query)
			if err != nil {
				log.Fatal(err)
			}
		}
		end := time.Now()
		log.Println("test duration:", end.Sub(start).Seconds(), "s")
	} else {
		port := os.Getenv("PORT")
		if port == "" {
			port = defaultPort
		}

		srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

		http.Handle("/", playground.Handler("GraphQL playground", "/query"))
		http.Handle("/graphql", srv)

		log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
		log.Fatal(http.ListenAndServe(":"+port, nil))
	}

}
