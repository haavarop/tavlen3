<script>

    import { getClient, query } from 'svelte-apollo';
    import ApolloClient from 'apollo-boost';
    import { setClient } from 'svelte-apollo';

    import { createHttpLink } from 'apollo-link-http'
    import { setContext } from 'apollo-link-context'

    import account from "./token.js";

    import { CONSUMPTION } from "./queries";
    import { each } from 'svelte/internal';

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
        <p>Data for {home.address.address1}</p>
        {/each}
    {/await}
    <div>

    </div>
</div>