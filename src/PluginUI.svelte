<script>
  import { Button, Input, Text, Tooltip } from "figma-ui3-kit-svelte";
  import {
    PluginLayout,
    FieldGroup,
    Footer,
    sendToPlugin,
  } from "figma-plugin-utilities";

  let bezierInput = "0, 0, 0.58, 1";
  let error = "";

  $: isDisabled = bezierInput.trim() === "" || !!error;

  $: {
    // Validate reactively so the button state stays in sync as the user types.
    error = "";
    const stringValues = bezierInput.split(",").map((v) => v.trim());
    if (bezierInput.trim() !== "") {
      if (stringValues.length !== 4) {
        error = "Enter four numbers, separated by commas.";
      } else {
        const numericValues = stringValues.map((v) => parseFloat(v));
        if (numericValues.some(isNaN)) {
          error = "Enter four numbers, separated by commas.";
        } else if (
          numericValues[0] < 0 ||
          numericValues[0] > 1 ||
          numericValues[2] < 0 ||
          numericValues[2] > 1
        ) {
          error =
            "Set x1 and x2, the first and third numbers, between 0 and 1.";
        }
      }
    }
  }

  function handleGenerate() {
    if (isDisabled) return;

    const numericValues = bezierInput
      .split(",")
      .map((v) => parseFloat(v.trim()));
    sendToPlugin("generate-curve", { values: numericValues });
  }
</script>

<div class="plugin-container">
  <PluginLayout>
    <FieldGroup label="Cubic bezier values" labelFor="bezier-input">
      <Text variant="body-small" color="--figma-color-text-secondary">P1.x, P1.y, P2.x, P2.y</Text>
      <Input
        bind:value={bezierInput}
        placeholder="e.g., 0.42, 0, 0.58, 1"
        id="bezier-input"
        invalid={!!error}
        errorMessage={error}
        on:keydown={(e) => e.key === "Enter" && handleGenerate()}
      />
    </FieldGroup>
  </PluginLayout>

  <Footer variant="full">
    <Tooltip
      label={isDisabled ? error || "Enter the four numbers of the curve." : ""}
      disabled={!isDisabled}
    >
      <Button
        variant="primary"
        on:click={handleGenerate}
        fullWidth
        ariaDisabled={isDisabled}>Create curve</Button
      >
    </Tooltip>
  </Footer>
</div>

<style>
  .plugin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
