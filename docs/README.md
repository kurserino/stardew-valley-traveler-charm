**Traveler Charm** is a [Stardew Valley](https://www.stardewvalley.net/) mod that adds a magical
charm, taught by the Wizard, that teleports you to any other player in a multiplayer game.

## Contents
* [Install](#install)
* [Use](#use)
* [Configure](#configure)
* [Compatibility](#compatibility)
* [For mod developers](#for-mod-developers)
* [See also](#see-also)

## Install
1. [Install the latest version of SMAPI](https://smapi.io/).
2. Download the latest release from [GitHub releases](https://github.com/kurserino/stardew-valley-traveler-charm/releases)
   and unzip it into your `Mods` folder.
3. Run the game using SMAPI.

## Use
### Getting the charm
The morning after you first meet the Wizard in his tower, he sends you a letter that teaches the
**Traveler Charm** recipe. Craft it in the crafting menu with:

| Ingredient | Amount |
| ---------- | ------ |
| Bat Wing   | 3      |
| Quartz     | 1      |

The recipe stays learned, so you can craft more charms whenever you need them. The charm can't be
bought, sold or shipped.

### Teleporting
Hold the charm and press the configured button (the use-tool button by default):

* with one other player online, you teleport straight to them;
* with several, pick who to visit from a list showing each player's name and location.

Like a Warp Totem, each teleport uses up one charm, so craft a few to carry with you. You can't
teleport while playing alone, during festivals or cutscenes, or with a menu open; the charm is
only used up when you actually teleport.

## Configure
If you install [Generic Mod Config Menu][], you can click the cog button (⚙) on the title screen
or the "mod options" button at the bottom of the in-game menu to configure the mod. You can also
edit the `config.json` file the mod creates in its folder after you run the game once.

| Option | Values | Default | What it does |
| ------ | ------ | ------- | ------------ |
| Button map | Tool button, Action button | Tool button | The button that uses the charm. |
| Sprite | Charm, Ring, Amulet, Compass, Feather | Charm | How the charm looks to you. Applies right away. |
| Animation | Totem, Wand, Hearts, Instant | Totem | The teleport effect: like a Warp Totem, like the Return Scepter, floating hearts, or none. Nearby players see it too. |

Each player's options apply only to them.

## Compatibility
Traveler Charm is compatible with Stardew Valley 1.6+ on Linux/macOS/Windows, in single-player
(where the charm has no one to visit) and multiplayer, including split-screen. It works with as
many players as the game allows.

Every player who wants to craft or use the charm needs the mod installed.

Removing the mod doesn't break your save: charms turn into Error Items, and work again if you
reinstall the mod.

## For mod developers
### Building
You need the [.NET 6 SDK](https://dotnet.microsoft.com/download) and Stardew Valley 1.6 with
SMAPI installed. Run `dotnet build`: the mod is deployed to your `Mods` folder and a release zip
is written to `_releases/`. If the game isn't in its default location, set `GamePath` as
described in the [mod build package docs](https://smapi.io/package/readme).

### Debug mode
Set `"DebugMode": true` in `config.json` to enable these SMAPI console commands (they don't
appear in Generic Mod Config Menu, and SMAPI warns at launch while debug mode is on):

| Command | What it does |
| ------- | ------------ |
| `travelercharm_materials [count]` | Adds the materials for `count` charms (default 1): 3 Bat Wings and 1 Quartz each. |
| `travelercharm_give [count]` | Adds `count` Traveler Charms (default 1). |

Both need a loaded save. Items that don't fit in your inventory drop at your feet.

## See also
* [Generic Mod Config Menu][]

[Generic Mod Config Menu]: https://www.nexusmods.com/stardewvalley/mods/5098
