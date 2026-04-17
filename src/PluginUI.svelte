<script>
  import { Button, Input, Text } from "figma-ui3-kit-svelte";
  import {
    PluginLayout,
    FieldGroup,
    Footer,
    sendToPlugin,
  } from "figma-plugin-utilities";

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

    sendToPlugin("generate-curve", { values: numericValues });
  }
</script>

<div class="plugin-container">
  <PluginLayout>
    <FieldGroup label="Cubic bezier values">
      <Text variant="body-small" color="secondary">P1.x, P1.y, P2.x, P2.y</Text>
      <Input
        bind:value={bezierInput}
        placeholder="e.g., 0.42, 0, 0.58, 1"
        on:keydown={(e) => e.key === "Enter" && handleGenerate()}
      />
      {#if error}
        <Text variant="body-small" color="danger">{error}</Text>
      {/if}
    </FieldGroup>
  </PluginLayout>

  <Footer variant="full">
    <Button variant="primary" on:click={handleGenerate} fullWidth
      >Create curve</Button
    >
  </Footer>
</div>

<style>
  .plugin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
