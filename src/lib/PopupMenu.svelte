<script lang="ts">
   import { onMount } from 'svelte'
   import { createEventDispatcher } from 'svelte'

   const dispatch = createEventDispatcher()

   export let show = false // menu state
   let menu: Element // menu DOM reference
   let button: Element // button DOM reference
   let class_ = ''
   export { class_ as class }
   export let btnClass = ''

   onMount(() => {
      const handleOutsideClick = (event) => {
         if (show && !menu.contains(event.target) && !button.contains(event.target)) {
            show = false
            dispatch('close')
         }
      }

      const handleEscape = (event) => {
         if (show && event.key === 'Escape') {
            show = false
            dispatch('close')
         }
      }

      // add events when element is added to the DOM
      document.addEventListener('click', handleOutsideClick, false)
      document.addEventListener('keyup', handleEscape, false)

      // remove events when element is removed from the DOM
      return () => {
         document.removeEventListener('click', handleOutsideClick, false)
         document.removeEventListener('keyup', handleEscape, false)
      }
   })
</script>

<!-- In order for popup to not display inline it might need a parent with `relative` class -->
<button bind:this={button} class={'outline-none ' + btnClass} on:click={() => (show = !show)}>
   <slot />
</button>

<div bind:this={menu}>
   {#if show}
      <slot name="menu" />
   {/if}
</div>
