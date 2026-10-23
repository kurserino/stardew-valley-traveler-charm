# Proposal

## Why

The mod targets SMAPI 3 / Stardew Valley 1.5 (`net4.5`, ModBuildConfig 4.1.1), which no longer loads on the current game. Stardew Valley 1.6 also makes items, mail and shops data-driven, which the upcoming Traveler Charm (`add-traveler-charm`) depends on.

## What Changes

- Retarget the project to `net6.0` with ModBuildConfig 4.x for SMAPI 4 / Stardew Valley 1.6.
- Update `manifest.json` `MinimumApiVersion` to `4.0.0`.
- Fix any SMAPI 4 API breaks in the current code. The old item check is left as is: `add-traveler-charm` deletes it.
- Remove the dead commented-out MSBuild settings and the unused framework references from the `.csproj`.
- Follow the build layout of the reference SMAPI mod repositories (Pathoschild/StardewMods, CJBok/SDV-Mods): shared settings in `Directory.Build.props` (target framework, `Nullable`, `LangVersion`, release zip folder) and an `.editorconfig`.
- **BREAKING**: the mod no longer loads on Stardew Valley 1.5 / SMAPI 3.

## Capabilities

### New Capabilities

None. Behavior stays the same; the change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- `TeleportToYourLove.csproj`, `manifest.json`, `ModEntry.cs`; new `Directory.Build.props` and `.editorconfig`.
- Players must be on Stardew Valley 1.6+ with SMAPI 4+.
- Build machine needs the .NET 6+ SDK and a Stardew Valley 1.6 install with SMAPI for ModBuildConfig to find the game assemblies.
