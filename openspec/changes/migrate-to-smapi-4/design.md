# Design

## Context

See proposal.md - Why. The project is a single SMAPI mod: `ModEntry.cs`, `Framework/ModConfig.cs` and the Generic Mod Config Menu API interface. The `.csproj` is an SDK-style project with a large block of commented-out legacy MSBuild settings.

## Goals / Non-Goals

**Goals:**
- Build and load on SMAPI 4 / Stardew Valley 1.6 with no change in what the player sees.

**Non-Goals:**
- Any new behavior, renaming or new item; that is `add-traveler-charm`.

## Decisions

- **`net6.0` + ModBuildConfig 4.x**: what SMAPI 4 requires. ModBuildConfig finds the game folder, references the game and SMAPI assemblies and deploys the mod to `Mods/` on build, so the explicit `System.*` / `Microsoft.Build` references are dropped.
- **Qualified item IDs**: 1.6 identifies items by string IDs; `QualifiedItemId == "(O)801"` replaces `ParentSheetIndex == 801`, which is no longer reliable across item types.
- **GMCM interface kept as is**: the copied `IGenericModConfigMenuApi` methods used (`Register`, `AddTextOption`) keep their signatures in current GMCM.

## Risks / Trade-offs

- [The game install is not found on the build machine] → set `GamePath` in the `.csproj` or a `stardewvalley.targets` file, as ModBuildConfig documents.
- [No automated tests] → verify by building and checking in-game that the Wedding Ring still teleports in a two-player session.
