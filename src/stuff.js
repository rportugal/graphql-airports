const data = {
  airports: [
    {
      kind: 'Field',
      name: {
        kind: 'Name',
        value: 'airports',
        loc: {
          start: 4,
          end: 12
        }
      },
      arguments: [],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'icao',
              loc: {
                start: 19,
                end: 23
              }
            },
            arguments: [],
            directives: [],
            loc: {
              start: 19,
              end: 23
            }
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'iata',
              loc: {
                start: 28,
                end: 32
              }
            },
            arguments: [],
            directives: [],
            loc: {
              start: 28,
              end: 32
            }
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'name',
              loc: {
                start: 37,
                end: 41
              }
            },
            arguments: [],
            directives: [],
            loc: {
              start: 37,
              end: 41
            }
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'city',
              loc: {
                start: 46,
                end: 50
              }
            },
            arguments: [],
            directives: [],
            loc: {
              start: 46,
              end: 50
            }
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'state',
              loc: {
                start: 55,
                end: 60
              }
            },
            arguments: [],
            directives: [],
            loc: {
              start: 55,
              end: 60
            }
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'country',
              loc: {
                start: 65,
                end: 72
              }
            },
            arguments: [],
            directives: [],
            loc: {
              start: 65,
              end: 72
            }
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'coordinate',
              loc: {
                start: 77,
                end: 87
              }
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'longitude',
                    loc: {
                      start: 96,
                      end: 105
                    }
                  },
                  arguments: [],
                  directives: [],
                  loc: {
                    start: 96,
                    end: 105
                  }
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'latitude',
                    loc: {
                      start: 112,
                      end: 120
                    }
                  },
                  arguments: [],
                  directives: [],
                  loc: {
                    start: 112,
                    end: 120
                  }
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'elevation',
                    loc: {
                      start: 127,
                      end: 136
                    }
                  },
                  arguments: [],
                  directives: [],
                  loc: {
                    start: 127,
                    end: 136
                  }
                }
              ],
              loc: {
                start: 88,
                end: 142
              }
            },
            loc: {
              start: 77,
              end: 142
            }
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'timezone',
              loc: {
                start: 147,
                end: 155
              }
            },
            arguments: [],
            directives: [],
            loc: {
              start: 147,
              end: 155
            }
          }
        ],
        loc: {
          start: 13,
          end: 159
        }
      },
      loc: {
        start: 4,
        end: 159
      }
    }
  ]
};

function countFields(field) {
  let count = 0;
  if (!field.kind) {
    count += countFields(Object.values(field)[0]);
  }

  if (field.kind === 'Field') {
    console.log(field.name);
    count += 1;
  }

  if (field.selectionSet) {
    field.selectionSet.selections.forEach(element => {
      count += countFields(element);
    });
  }

  return count;
}

const c = countFields(data);
console.log(c);
