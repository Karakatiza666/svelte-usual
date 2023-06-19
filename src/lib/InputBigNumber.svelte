<script lang="ts">
   import BigNumber from 'bignumber.js'
   import { nonNull } from 'ts-practical-fp'
   import { createEventDispatcher } from 'svelte'

   const dispatch = createEventDispatcher()

   const setValue = (e: Event & { currentTarget: HTMLInputElement }, rawVal?: BigNumber) => {
      const value_ = e.currentTarget.value.trim() || '0'
      const bigval = new BigNumber(value_)
      const isInvalid = bigval.isNaN() || (value_.includes('.') && isInteger && !decimals)
      if (isInvalid || bigval.lt(e.currentTarget.min)) {
         e.currentTarget.value = previousN
         return
      }
      const newVal = ((v) => (isInteger ? v.decimalPlaces(0, BigNumber.ROUND_DOWN) : v))(
         decimals ? bigval.times(10 ** decimals) : bigval
      )
      curString = value_
      previousN = value_
      if (!nonNull(value) || !value.eq(newVal)) {
         currentValue = newVal
         value = newVal
         dispatch('input', newVal)
      }
   }

   export let isInteger = true
   export let value: BigNumber | undefined
   let currentValue: BigNumber | undefined // Helps avoid unnecessary setValue() calls
   export let id: string | undefined = undefined
   // If both isInteger and decimals are set - decimals are applied to result, but it is not trimmed to integer
   export let decimals = 0
   export let disabled = false
   export let max: number | BigNumber | undefined = undefined // maximum value does not account for decimals
   let class_ = ''
   export { class_ as class }
   let curString = nonNull(value) ? value.div(10 ** decimals).toFixed() : ''
   let previousN = curString
   $: {
      if (nonNull(value) && (value !== currentValue || !max || value.gt(max))) {
         currentValue = value
         setValue({
            currentTarget: {
               value: (max
                  ? ((m) => BigNumber.minimum(value, m))(typeof max == 'number' ? max : max)
                  : value
               )
                  .div(10 ** decimals)
                  .toFixed(),
               min: '0'
            }
         })
      }
   }
</script>

<input class={class_} {disabled} value={curString} on:input={setValue} min={0} {id} />
