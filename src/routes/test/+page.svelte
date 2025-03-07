<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {});

  let count = $state(0);
  let derivedcount = $derived(count * 2);

  let error = $state("");

  $effect(() => {
    error = count > 10 ? "count should be less than 10" : "";
    console.log(count);
  });
</script>

<div>
  <button onclick={() => count++}>increment </button>
  <h3>current count {count}</h3>
  <h3>derived count {derivedcount}</h3>

  <div>error : {error}</div>
</div>
