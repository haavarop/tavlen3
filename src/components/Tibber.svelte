<script>

    import { getClient, query } from 'svelte-apollo';
    import ApolloClient from 'apollo-boost';
    import { setClient } from 'svelte-apollo';

    import { createHttpLink } from 'apollo-link-http'
    import { setContext } from 'apollo-link-context'

    import account from "./token.js";

    import { CONSUMPTION } from "./queries";
    import { each } from 'svelte/internal';

    import PriceIconSelector from "./icons/PriceIconSelector.svelte";

    import TibberIcon from "./icons/TibberIcon.svelte";
    import Zap from "./icons/Zap.svelte";

	const TIBBER_URI = "https://api.tibber.com/v1-beta/gql";
	const TIBBER_WS = "wss://api.tibber.com/v1-beta/gql/subscriptions";
    
    const httpLink = new createHttpLink({
        uri: TIBBER_URI,
        fetch,
    })


    const client = new ApolloClient({
        headers: {
            authorization: `Bearer ${account.token}`
        },
        uri: TIBBER_URI
    })

    const q = query(client, {query: CONSUMPTION});


</script>

<div>
    <p>Tibber stuff goes here!</p>
    {#await $q}
        <p>Getting the stuff...</p>
    {:then result}
        {#each result.data.viewer.homes as home}
        {console.log(home)}
        <div class="tibber-card">
            <div class="content-container">
                <TibberIcon />
                <div class="text-container">
                    <p>Data for {home.address.address1}</p>
                    <span class="text-icon-alignment">
                        <p class="force-text">Strømpris nå: {Number(home.currentSubscription.priceInfo.current.total)*100} øre</p>
                        <PriceIconSelector type={home.currentSubscription.priceInfo.current.level} />
                    </span>
                </div>
            </div>
            <div class="text-container">
                <span>
                    <p>Forbruk siste 30 dager</p>
                </span>
                <div class="text-icon-alignment max-size">
                    <p class="force-text">{Number(home.consumption.pageInfo.totalConsumption).toFixed(2)}</p>
                    <Zap />
                    <p class="force-text-right">{Number(home.consumption.pageInfo.totalCost).toFixed(2)}kr</p>
                </div>
            </div>
        </div>
        {/each}
    {/await}
    <div>

    </div>
</div>

<style>

    .tibber-card {
        max-width: 382px;
        height: 262px;
        background: linear-gradient(115.02deg, #2B8192 0%, #52BDD2 100%);
        color: #FFF;
        font-size: 24px;
    }

    .content-container {
        display: flex;
        flex-direction: row;
    }

    .text-container {
        line-height: 0px;
        margin-left: 8px;
    }

    .max-size {
        max-width: 210px;
    }

    .text-icon-alignment {
        display: flex;
        flex-direction: row;
    }

    .force-text {
        margin-top: 0px;
    }



    .force-text-right {
        margin: 0px 0 0 auto;
    }

    

</style>