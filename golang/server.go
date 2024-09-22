package main

import (
	"example/graph"
	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
	"log"
	"time"
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
	//j, err := json.MarshalIndent(raw.Data, "", "    ")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Println(string(j))
}
