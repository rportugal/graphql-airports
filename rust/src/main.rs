use async_graphql::{EmptyMutation, EmptySubscription, Object, Schema};
use once_cell::sync::Lazy;
use std::{collections::HashMap, time::Instant};

#[derive(serde::Deserialize)]
pub struct AirportData {
    pub icao: &'static str,
    pub iata: Option<&'static str>,
    pub name: String,
    pub city: String,
    pub state: String,
    pub country: &'static str,
    pub elevation: i32,
    pub lat: f32,
    pub lon: f32,
    pub tz: &'static str,
}

static AIRPORTS_LIST: Lazy<Vec<AirportData>> = Lazy::new(|| {
    let airports: HashMap<&'static str, AirportData> =
        serde_json::from_str(include_str!("../../Airports/airports.json")).unwrap();

    airports.into_values().collect()
});

pub struct Coordinate {
    elevation: i32,
    lat: f32,
    lon: f32,
}

#[Object]
impl Coordinate {
    pub async fn longitude(&self) -> &f32 {
        &self.lon
    }
    pub async fn latitude(&self) -> &f32 {
        &self.lat
    }
    pub async fn elevation(&self) -> &i32 {
        &self.elevation
    }
}

struct Airport {
    icao: &'static str,
    iata: Option<&'static str>,
    name: String,
    city: String,
    state: String,
    country: &'static str,
    timezone: &'static str,
    elevation: i32,
    lon: f32,
    lat: f32,
}

#[Object]
impl Airport {
    async fn icao(&self) -> &'static str {
        &self.icao
    }

    async fn iata(&self) -> &Option<&'static str> {
        &self.iata
    }

    async fn name(&self) -> &str {
        &self.name
    }

    async fn city(&self) -> &str {
        &self.city
    }

    async fn state(&self) -> &str {
        &self.state
    }

    async fn country(&self) -> &'static str {
        &self.country
    }

    async fn timezone(&self) -> &'static str {
        &self.timezone
    }

    pub async fn coordinate(&self) -> Coordinate {
        Coordinate {
            lat: self.lat,
            lon: self.lon,
            elevation: self.elevation,
        }
    }
}

pub struct Query;

#[Object]
impl Query {
    async fn airports(&self) -> Vec<Airport> {
        AIRPORTS_LIST
            .iter()
            .map(|kv| Airport {
                icao: kv.icao,
                iata: kv.iata,
                name: kv.name.clone(),
                city: kv.city.clone(),
                state: kv.state.clone(),
                country: kv.country,
                timezone: kv.tz,
                elevation: kv.elevation,
                lat: kv.lat,
                lon: kv.lon,
            })
            .collect()
    }
}

pub const Q: &str = r#"
{
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
}
"#;

#[tokio::main]
async fn main() {
    let schema = Schema::new(Query, EmptyMutation, EmptySubscription);
    schema.execute(Q).await.into_result().unwrap();

    let s = Instant::now();
    for _ in 0..500i32 {
        schema.execute(Q).await.into_result().unwrap();
    }
    println!("test duration: {}", s.elapsed().as_secs());
}
