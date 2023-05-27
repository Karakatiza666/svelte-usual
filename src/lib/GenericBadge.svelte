<div class="img-container">
   <slot />
   <div class="badge">
      <slot name="badge" />
   </div>
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
