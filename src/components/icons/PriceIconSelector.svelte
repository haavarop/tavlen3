<script>
    import DownwardTrend from "./DownwardTrend.svelte";
    import UpwardTrend from "./UpwardTrend.svelte";
    import Neutral from "./Neutral.svelte";

    const options = {
        VERY_CHEAP: "#1ED725",
        CHEAP: "#09C010",
        NORMAL: "#D3D41E",
        EXPENSIVE: "#EB8614",
        VERY_EXPENSIVE: "#EE5310"

    }

    export let type;
    

</script>

<div class="pos">
    {#if type.includes("CHEAP")}
        <DownwardTrend  stroke={type.includes("VERY") ? options.VERY_CHEAP : options.CHEAP} /> 
    {:else if type.includes("EXPENSIVE")}
        <UpwardTrend class="pos" stroke={type.includes("VERY") ? options.VERY_EXPENSIVE : options.EXPENSIVE} />
    {:else}
        <Neutral class="pos" stroke={options.NORMAL} />
    {/if}
</div>
<style>
    .pos {
        margin: -10px 0 0 8px;
    }
</style>


