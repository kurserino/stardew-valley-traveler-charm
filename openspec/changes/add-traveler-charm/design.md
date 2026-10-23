# Design

## Context

See proposal.md - Why. After `migrate-to-smapi-4` the mod runs on SMAPI 4 / Stardew Valley 1.6, where items, mail and shops are data assets that mods edit through `Helper.Events.Content.AssetRequested`. Today all logic lives in `ModEntry.OnButtonPressed`, which matches the Wedding Ring and finds the target by the typed `YourLoveName`, with a host/name special case. Requirements are in `specs/traveler-charm`, `specs/mod-config` and `specs/dev-tools`.

## Goals / Non-Goals

**Goals:**
- A self-contained item added purely through 1.6 data assets, with no dependency on Json Assets or Content Patcher.
- Keep the code small: one content-editing class, one teleport class, `ModEntry` wiring them up.

**Non-Goals:**
- Teleporting to NPCs, or to players who are offline.
- Controller-specific menus beyond the vanilla question dialogue.

## Decisions

- **Item data**: add `kurserino.TravelerCharm_TravelerCharm` to `Data/Objects` (type `Basic`, category none, price 0, `ExcludeFromShippingCollection`), with `Texture` pointing at the mod's sprite sheet loaded under `Mods/kurserino.TravelerCharm/Charm` and `SpriteIndex` set from the config. Price 0 plus not being in any shop covers "not sellable"; the shipping bin rejects it through `canBeShipped` being false for price-0 basic items, to be confirmed in-game (task 2.2). Alternative: Json Assets - rejected, it is an extra dependency and 1.6 makes it unnecessary.
- **Strings**: name, description, letter and messages go in `i18n/default.json` so they can be translated; the asset edits read them from `Helper.Translation` when the asset loads.
- **Recipe**: add `kurserino.TravelerCharm_TravelerCharm` to `Data/CraftingRecipes` as `767 3 80 1/Home/kurserino.TravelerCharm_TravelerCharm/false/none/<translated name>` (Bat Wing `767`, Quartz `80`; unlock condition `none` because the letter teaches it). Since the recipe stays known, a lost charm is simply crafted again. Alternative: a trade shop at the Wizard's tower - rejected by the user in favor of the normal crafting menu.
- **Wizard letter**: add an entry to `Data/Mail` written in the Wizard's voice with `%item craftingRecipe kurserino.TravelerCharm_TravelerCharm %%`, which teaches the recipe when the letter is read. On `DayStarted`, for the local player, if they have seen the Wizard introduction event and do not have the mail flag, add the key with `Game1.player.mailbox.Add(key)` so it shows that same morning, and set the flag. Per player, since each player runs the mod on their own machine. Alternative: a `Data/TriggerActions` entry with a `PLAYER_HAS_SEEN_EVENT` condition - equally valid and pure data; chosen if the event condition is confirmed simpler to express there.
- **Wizard introduction**: identified by the vanilla event where the player first meets the Wizard in his tower (event `112`, to be verified against `Data/Events/WizardHouse` in task 3.1).
- **Target selection**: online players are `Game1.getOnlineFarmers()` minus the local player, with no fixed limit, so it covers every player the session allows (8 in 1.6, more with mods that raise the cap). One target warps directly; several use `Game1.currentLocation.createQuestionDialogue` with one answer per player, labelled `Name (location display name)`, plus "Cancel". Answers carry the player's `UniqueMultiplayerID`; on pick, the target is looked up again and must still be online. This replaces `YourLoveName` and the old logic, which only handled the host and one other player.
- **Warp**: same target computation as today (`uniqueName` for instanced locations, the target's tile), done with `Game1.warpFarmer` after the animation. Energy is checked when the charm is used and spent right before the warp, so a cancelled choice costs nothing.
- **Animations**: built from vanilla effects and sounds, broadcast with `Game1.Multiplayer.broadcastSprites` so nearby players see them:
  - Totem: player jitter, `"warrior"` sound, glow and sprinkles, fade to black, warp (as the Warp Totem).
  - Wand: `"wand"` sound, the player's raise-hand frame, flash, warp (as the Return Scepter).
  - Hearts: heart emote and floating heart sprites, fade, warp.
  - Instant: warp immediately.
  The warp runs in a `DelayedAction` timed to the animation, with the player frozen (`CanMove = false`) meanwhile.
- **Sprite sheet**: one 16x16-per-cell PNG with five cells (Charm, Ring, Amulet, Compass, Feather) in `assets/charm.png`, drawn as pixel art in the game's style with its dark outline and limited palette. The sheet is produced by a script kept in `tools/` so variants can be adjusted and regenerated. Changing the sprite in GMCM invalidates `Data/Objects` so the new `SpriteIndex` applies at once.
- **Wedding Ring support**: when on, the button handler also accepts `(O)801`. Pressing the button on another farmer with the ring still lets vanilla handle proposals: the handler ignores the press when the cursor tile has a farmer, so proposals keep working.
- **Debug mode**: `DebugMode` in `ModConfig`, default `false`, not registered in GMCM. When true, `Entry` registers `travelercharm_materials [count]` and `travelercharm_give [count]` with `Helper.ConsoleCommands` and logs a warning that debug mode is on. Items are created with `ItemRegistry.Create` and added with `Game1.player.addItemToInventory`; any leftover is dropped with `Game1.createItemDebris`. Commands check `Context.IsWorldReady` first. Alternative: a hotkey - rejected, console commands need no key conflicts and accept a count; SMAPI's own `player_add` exists, but these need no item IDs.
- **Rename**: `UniqueID` `kurserino.TravelerCharm`, name "Traveler Charm", assembly/namespace `TravelerCharm`, project files renamed to match.
- **Repository**: there is no official repo prefix for Stardew Valley mods; the user chose `stardew-valley-traveler-charm`. Discovery on GitHub goes through topics, so the repo gets `stardew-valley`, `smapi`, `smapi-mod` and `stardew-valley-mod`. Renamed with `gh repo rename`; GitHub redirects the old URL, and the local `origin` is updated to the new one.
- **Docs and license**: `docs/README.md` follows the reference mods' sections (Install, Configure, Compatibility, See also), and `docs/release-notes.md` starts at 1.0.0 for Traveler Charm. License MIT, the most common among reference mods, unless the user picks another before applying.

## Risks / Trade-offs

- [Mod removed with charms in the world] → 1.6 keeps unknown items as Error Items with their ID, so saves load; covered by a spec scenario and checked in task 5.3.
- [A long list overflows the question dialogue with many players or mods raising the cap] → checked with a full 8-player list in task 4.2; if it overflows, switch to a paged dialogue (7 players per page plus "More").
- [Animations desync between players] → only sprites are broadcast; the warp itself is local and SMAPI syncs positions as usual.
- [Mail recipe syntax] → `%item craftingRecipe` takes the recipe key; verified in task 3.2 by reading the letter and checking the crafting menu.
- [Debug mode left on in a release] → defaults to `false`, and the SMAPI console warns at every launch while it is on.
- [No automated test project] → each task names an in-game check in a two- or three-player session (local split-screen works for this).

## Migration Plan

Players remove "Teleport To Your Love" and install "Traveler Charm". The old config is not migrated; `YourLoveName` has no equivalent.
