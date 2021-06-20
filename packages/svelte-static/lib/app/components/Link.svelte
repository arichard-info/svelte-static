<script>
  import { getContext } from "svelte";

  export let href = "";
  export let target = undefined;

  const router = getContext("router");

  const handleClick = (e) => {
    if (target === "_blank" || !router) return;
    e.preventDefault();
    router.navigate(href);
  };
</script>

<a {href} {target} on:click={handleClick}><slot /></a>
