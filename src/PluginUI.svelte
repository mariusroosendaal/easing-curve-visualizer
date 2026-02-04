<script>
  import { Button, Input, Label, Text } from "figma-ui3-kit-svelte";

  let bezierInput = "0, 0, 0.58, 1";
  let error = "";

  function handleGenerate() {
    error = "";

    // Parse the input
    const stringValues = bezierInput.split(",").map((v) => v.trim());

    if (stringValues.length !== 4) {
      error = "Please enter exactly 4 comma-separated values.";
      return;
    }

    const numericValues = stringValues.map((v) => parseFloat(v));

    if (numericValues.some(isNaN)) {
      error = "Please ensure all values are valid numbers.";
      return;
    }

    parent.postMessage(
      {
        pluginMessage: {
          type: "generate-curve",
          values: numericValues,
        },
      },
      "*",
    );
  }
</script>

<div class="wrapper">
  <div class="content">
    <Label>Cubic Bezier Values</Label>

    <div class="field">
      <Text variant="body-small" color="secondary">P1.x, P1.y, P2.x, P2.y</Text>
      <Input
        bind:value={bezierInput}
        placeholder="e.g., 0.42, 0, 0.58, 1"
        on:keydown={(e) => e.key === "Enter" && handleGenerate()}
      />
      {#if error}
        <Text variant="body-small" color="danger">{error}</Text>
      {/if}
    </div>

    <Button variant="primary" on:click={handleGenerate}>Generate</Button>
  </div>
</div>

<style>
  .wrapper {
    padding: var(--size-xxsmall);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--size-xsmall);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--size-xxxsmall);
  }
</style>
