<script lang="ts">
   // Internal private state.
   export let running = true
   let completed = false

   // You'll need to set a color.
   export let color: string

   // You can set the width manually, if you know the percent of completion, but if you're
   // using the start/complete methods you won't need to set this.
   export let percent: number

   // These are defaults that you shouldn't need to change, but are exposed here in case you do.
   export let minimum = 0.08
   export let maximum = 0.994
   export let settleTime = 700
   export let intervalTime = 700
   export let stepSizes = [0, 0.005, 0.01, 0.02]

   $: width = minimum + percent * (maximum - minimum)

   // Stop the auto-increment functionality and manually set the width of the progress bar.
   export const setWidthRatio = (widthRatio: number) => {
      stop()
      width = widthRatio
      completed = false
      running = true
   }

   // Primarily used for tests, but can also be used for external monitoring.
   export const getState = () => {
      return {
         width,
         running,
         completed,
         color,
         minimum,
         maximum,
         settleTime,
         intervalTime,
         stepSizes
      }
   }

   export let barStyle = ''
   $: barStyle =
      ((color && `background-color: ${color};`) || '') +
      ((width && width * 100 && `width: ${width * 100}%;`) || '')
   // the box shadow of the leader bar uses `color` to set its shadow color
   export let leaderColorStyle = ''
   $: leaderColorStyle = (color && `background-color: ${color}; color: ${color};`) || ''

   $: {
      if (width >= maximum) {
         completed = true
      }
   }
</script>

<svelte:head>
   <style>
      .svelte-progress-bar {
         position: fixed;
         top: 0;
         left: 0;
         height: 2px;
         transition: width 0.21s ease-in-out;
         z-index: 1;
      }

      .svelte-progress-bar-hiding {
         transition: top 0.8s ease;
         top: -8px;
      }

      .svelte-progress-bar-leader {
         position: absolute;
         top: 0;
         right: 0;
         height: 3px;
         width: 100px;
         transform: rotate(2.5deg) translate(0px, -4px);
         box-shadow: 0 0 8px;
         z-index: 2;
      }
   </style>
</svelte:head>

{#if width}
   <div
      class="svelte-progress-bar"
      class:running
      class:svelte-progress-bar-hiding={completed}
      style={barStyle}>
      {#if running}
         <div class="svelte-progress-bar-leader" style={leaderColorStyle} />
      {/if}
   </div>
{/if}
