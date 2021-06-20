<script>
  import { setContext } from "svelte";
  import { initRouterStore } from "./stores/router.js";

  export let layout = null;
  export let template = null;

  const router = initRouterStore({ layout, template });

  setContext("router", router);
  setContext("test", "toto");
</script>

<svelte:component
  this={$router.layout.componentModule}
  {...$router.layout.props}
>
  <svelte:component
    this={$router.template.componentModule}
    {...$router.template.props}
  />
</svelte:component>
