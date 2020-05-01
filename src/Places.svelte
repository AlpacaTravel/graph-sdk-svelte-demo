<script>
  import Items from "./Items.svelte";
  import Item from "./Item.svelte";

  // Manage the selection of an item
  let item = null;
  const setItem = i => {
    item = i;

    // Scroll to top on selection
    window.scrollTo(0, 0);
  };
</script>

{#if item}
  <Item {item} />
{/if}

<Items onItem={setItem} />
