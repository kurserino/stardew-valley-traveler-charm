# Proposal

## Why

The mod piggybacks on a vanilla item and a typed "your love" name, which ties it to marriage, interferes with that item's own use and needs manual setup. A dedicated item makes teleporting to another player a general multiplayer feature, obtained in a way that fits the game.

## What Changes

- Each teleport uses up one charm, like a Warp Totem.
- Rename the mod to **Traveler Charm** (name, `UniqueID`, assembly and namespace), and the GitHub repository to `kurserino/stardew-valley-traveler-charm` with the `stardew-valley`, `smapi`, `smapi-mod` and `stardew-valley-mod` topics.
- Add the docs SMAPI mods usually ship: `docs/README.md` (install, configure, compatibility, multiplayer notes) and a `LICENSE`. Release notes and the first release are out of scope: version 1.0 comes later and will present the mod only as Traveler Charm.
- Add a new item, the **Traveler Charm**: using it teleports the player to another online player.
- The Wizard sends each player the charm's crafting recipe by mail (3 Bat Wings + 1 Quartz); the charm is crafted in the normal crafting menu and cannot be bought or sold.
- Works with any number of players up to the game's multiplayer limit (the original mod assumed a single second player): with one other player online the charm teleports to them; with several, the player picks one from a list showing each player's name and location.
- Config (Generic Mod Config Menu): button mapping (kept), charm sprite from a set of predefined variants, and teleport animation.
- A debug mode for development, off by default, adds console commands that give the recipe's materials and the charm itself.
- **BREAKING**: the mod no longer reacts to any vanilla item; only the Traveler Charm teleports.
- **BREAKING**: the `YourLoveName` config option is removed; the target is chosen when the charm is used.
- **BREAKING**: the new `UniqueID` makes SMAPI treat it as a new mod; the old mod's config is not carried over.

## Capabilities

### New Capabilities

- `traveler-charm`: the Traveler Charm item, how players obtain it, and teleporting to another player with it.
- `mod-config`: the player-facing configuration options and their effects.
- `dev-tools`: the debug mode and its console commands for testing.

### Modified Capabilities

None (no specs exist yet).

## Impact

- GitHub repository name, topics and the local `origin` remote; `docs/`, `LICENSE`.
- `manifest.json`, `.csproj`, `.sln`, `ModEntry.cs`, `Framework/ModConfig.cs`; new content-loading code, a sprite sheet asset (`assets/`) and translations (`i18n/`).
- Depends on `migrate-to-smapi-4` (data-driven items, mail and qualified IDs need Stardew Valley 1.6).
- Saves: items persist by string ID; removing the mod turns charms into Error Items without breaking the save.
