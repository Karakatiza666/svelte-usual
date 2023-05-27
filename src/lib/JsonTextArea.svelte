<script lang="ts">
   import { onMount } from 'svelte'

   export let value: Record<number | string, unknown>

   let jsonError: string | null = null
   let class_: string
   export { class_ as class }
   export let rows: number
   export let errorClass: string

   onMount(() => {
      try {
         JSON.parse(JSON.stringify(value))
      } catch (e) {
         jsonError = e.message
      }
   })

   function handleInput(event: Event) {
      jsonError = null
      try {
         value = JSON.parse((event.target as HTMLTextAreaElement).value)
      } catch (e) {
         jsonError = e.message
      }
   }

   function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Tab') {
         // tab key
         event.preventDefault()
         const { target } = event
         if (!target) return
         const value = target.value
         const start = target.selectionStart
         const end = target.selectionEnd
         target.value = value.substring(0, start) + '    ' + value.substring(end)
         target.selectionStart = target.selectionEnd = start + 4
      }
   }
</script>

<textarea
   {rows}
   class={class_}
   value={JSON.stringify(value, null, 2)}
   on:change={handleInput}
   on:keydown={handleKeyDown}
   class:error={jsonError} />
{#if jsonError}
   <span class={errorClass}>{jsonError}</span>
{/if}
