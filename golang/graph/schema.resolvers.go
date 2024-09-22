package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.54

import (
	"context"
	"example/graph/model"
)

// Airports is the resolver for the airports field.
func (r *queryResolver) Airports(ctx context.Context) ([]*model.Airport, error) {
	//panic(fmt.Errorf("not implemented: Airports - airports"))
	//model.Airport{Iata: "foo"}
	//var foo []*model.Airport = make([]*model.Airport, 0)
	ret := make([]*model.Airport, len(Airports))
	//foo := model.Airport{City: &Airports[0].City}
	for i := range Airports {
		ret[i] = &model.Airport{
			Icao:     &Airports[i].Icao,
			Iata:     &Airports[i].Iata,
			Name:     &Airports[i].Name,
			City:     &Airports[i].City,
			State:    &Airports[i].State,
			Country:  &Airports[i].Country,
			Timezone: &Airports[i].Tz,
			Coordinate: &model.Coordinate{
				Latitude:  &Airports[i].Lat,
				Longitude: &Airports[i].Lon,
				Elevation: &Airports[i].Elevation,
			},
		}
	}
	return ret, nil
}

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
