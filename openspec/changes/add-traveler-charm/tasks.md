# Tasks

## 1. Rename

- [ ] 1.1 Rename the mod to Traveler Charm: `manifest.json` (`Name`, `UniqueID` `kurserino.TravelerCharm`, `EntryDll`, `Description`), project, solution, assembly and namespace `TravelerCharm`; verify `dotnet build` produces `TravelerCharm.dll` and SMAPI lists "Traveler Charm" on launch
- [x] 1.2 Rename the GitHub repository to `stardew-valley-traveler-charm`, add the `stardew-valley`, `smapi`, `smapi-mod` and `stardew-valley-mod` topics, and point `origin` at the new URL; verify with `gh repo view --json name,repositoryTopics` and `git fetch`
- [ ] 1.3 Add `docs/README.md` (Install, Configure, Compatibility, See also), `docs/release-notes.md` and `LICENSE`; verify the README's install steps and config options match the mod
- [ ] 1.4 Update `CLAUDE.md` with the new name and file layout, and verify no reference to "TeleportToYourLove" or "teleport-to-your-love" remains (`grep -ri`, excluding `openspec/`)

## 2. Item and art

- [ ] 2.1 Draw the five sprite variants (Charm, Ring, Amulet, Compass, Feather) as 16x16 pixel art with a script in `tools/` that writes `assets/charm.png`; verify the script regenerates the same file and the sheet is 80x16
- [ ] 2.2 Add `i18n/default.json` with the item name, description, letter and messages, and add the Traveler Charm to `Data/Objects` through `AssetRequested` with price 0; verify with the debug `travelercharm_give` (task 3.3) that it shows the right name, description and sprite, and that shops and the shipping bin refuse it

## 3. Recipe, Wizard letter and debug mode

- [ ] 3.1 Confirm the Wizard introduction event ID in `Data/Events/WizardHouse` and record it in design.md; verify with `debug ebi <id>` that it plays the Wizard's first meeting
- [ ] 3.2 Add the recipe (3 Bat Wings + 1 Quartz) to `Data/CraftingRecipes` and the Wizard's letter teaching it to `Data/Mail`, delivered once per player on the day after that event; verify in-game: no letter before meeting the Wizard, the letter the next morning teaches the recipe, crafting consumes the materials and gives a charm, the recipe stays greyed out without materials, and no second letter arrives
- [ ] 3.3 Add `DebugMode` (default `false`, not in GMCM) and, when on, the `travelercharm_materials [count]` and `travelercharm_give [count]` console commands; verify both commands with and without a count, on the title screen (refused), with a full inventory (items dropped), and that with debug mode off SMAPI reports them as unknown

## 4. Teleport

- [ ] 4.1 Replace the Wedding Ring / `YourLoveName` handler with the charm handler: configured button, unavailable cases (alone, festival, cutscene, open menu) with their messages, and the energy check; verify each case in a split-screen session spends no energy and shows the expected message
- [ ] 4.2 Warp to the only other player, or show the player list (name and location) with Cancel when there are several, looking the target up again on pick; verify with two, three and eight players (the list fits on screen), a target in a mine level and in a cabin, a target who disconnects while the list is open, and that cancelling costs no energy
- [ ] 4.3 Spend the configured energy right before the warp; verify energy drops by the configured cost and that a player below the cost cannot teleport
- [ ] 4.4 Implement the Totem, Wand, Hearts and Instant animations, broadcast to nearby players; verify each one in split-screen from both players' views

## 5. Config

- [ ] 5.1 Replace `ModConfig` with the new options and defaults, and register them in GMCM (button mapping, sprite, animation, energy cost 0-100, Wedding Ring support); verify a fresh `config.json` holds the defaults and that the mod still works without GMCM installed
- [ ] 5.2 Invalidate `Data/Objects` when the sprite changes and accept `(O)801` when Wedding Ring support is on (ignoring presses aimed at a farmer so proposals still work); verify the sprite changes without restarting, the ring teleports only with support on, and a proposal with the ring still works
- [ ] 5.3 Verify save safety: save with a charm in a chest, remove the mod and load (Error Item, no crash), save, reinstall and load (working charm again)

## Workflow follow-up

- Implement after `migrate-to-smapi-4` is applied.
- Archive with `/opsx:archive`, then run spec-drift and finish-feature.
