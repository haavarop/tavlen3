import ApolloClient, { gql } from "apollo-boost";


export const CONSUMPTION = gql`{
    viewer {
        homes {
          
          address {
            address1
            
          }
          consumption(resolution: DAILY, last: 30) {
            pageInfo {
              totalCost
              totalConsumption
            }
            nodes{
              from
              to
              cost
              consumption
              unitPrice
              unitPriceVAT
            }
          }
         
          currentSubscription {
            priceInfo {
              current {
                total
                level
              }
            }
          }
        }
      }   
}`