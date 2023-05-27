<script lang="ts">
   import { browser } from '$app/environment'
   import { onDestroy } from 'svelte'

   export let value: Blob | undefined
   let readValue: string | undefined
   let reader: FileReader
   let dispose: (() => void) | undefined

   let _class = ''
   export { _class as class }

   if (browser) {
      reader = new FileReader()
   }
   $: {
      console.log('BlobImage value updated')
      if (dispose) {
         dispose()
         dispose = undefined
      }
      readValue = undefined
      if (value) {
         reader.readAsDataURL(value)
         reader.onload = (e) => {
            switch (typeof e.target?.result) {
               case 'string': {
                  readValue = e.target?.result
                  break
               }
               case 'object': {
                  if (!e.target?.result) break
                  const blobUrl = URL.createObjectURL(new Blob([e.target?.result]))
                  readValue = blobUrl
                  dispose = () => URL.revokeObjectURL(blobUrl!)
                  break
               }
               default:
                  break
            }
         }
      }
   }
   onDestroy(() => {
      if (dispose) dispose()
   })
</script>

{#if readValue}
   <div class="relative " style="">
      <slot />
      <img class={_class} src={readValue} alt="" />
   </div>
{:else}
   <slot />
{/if}
