package graph

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"maps"
	"os"
	"slices"
)

type Airport struct {
	Icao      string  `json:"icao"`
	Iata      string  `json:"iata"`
	Name      string  `json:"Name"`
	City      string  `json:"city"`
	State     string  `json:"state"`
	Country   string  `json:"country"`
	Elevation int     `json:"elevation"`
	Lat       float64 `json:"lat"`
	Lon       float64 `json:"lon"`
	Tz        string  `json:"tz"`
}

var Airports []Airport

func InitAirportData() {
	jsonFile, err := os.Open("../Airports/airports.json")
	if err != nil {
		fmt.Println(err)
	}

	jsonBytes, _ := ioutil.ReadAll(jsonFile)

	var itemsMap map[string]Airport
	err = json.Unmarshal(jsonBytes, &itemsMap)
	if err != nil {
		fmt.Println("Error parsing JSON: ", err)
	}

	Airports = slices.Collect(maps.Values(itemsMap))

	defer jsonFile.Close()

}
