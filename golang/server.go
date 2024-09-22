package main

import (
	"example/graph"
	"log"
	"time"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
)

func main() {
	graph.InitAirportData()

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

}
