<script>
   export let isExpanded = false

   function clickHandler() {
      isExpanded = !isExpanded
   }
</script>

<button class="w-full" on:click={clickHandler}>
   <slot {isExpanded} name="header" />
</button>
{#if isExpanded}
   <slot />
{/if}
