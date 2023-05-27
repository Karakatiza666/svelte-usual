<script lang="ts">
   export let color: string
   export let number: number
</script>

<div class="img-container">
   <slot />
   {#if number}
      <div class={` badge ${color}`}>{number}</div>
   {/if}
</div>

<style>
   .img-container {
      position: relative;
   }
   .badge {
      position: absolute;
      top: -10px;
      right: -5px;
      padding: 0px 6px;
      border-radius: 50%;
      font-size: 1em;
      font-weight: bold;
      color: white;
   }
</style>
