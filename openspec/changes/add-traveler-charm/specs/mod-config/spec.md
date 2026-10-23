# Spec Delta

## Purpose

Lets each player tune how the Traveler Charm looks and behaves for them, through the config file or Generic Mod Config Menu.

## ADDED Requirements

### Requirement: Configurable options
The mod SHALL offer these options in its config file and, when Generic Mod Config Menu is installed, in its in-game menu: button mapping ("Tool button" or "Action button", default "Tool button"), charm sprite and teleport animation.

#### Scenario: Defaults on first run
- **WHEN** the mod runs with no config file
- **THEN** it creates one with the default values listed above

#### Scenario: Menu without Generic Mod Config Menu
- **WHEN** Generic Mod Config Menu is not installed
- **THEN** the mod still works with the values from its config file

### Requirement: Button mapping
The charm SHALL be used only with the configured button.

#### Scenario: Action button mapped
- **WHEN** the button mapping is "Action button" and the player presses the use-tool button holding the charm
- **THEN** nothing happens

### Requirement: Charm sprite
The player SHALL pick the charm's sprite from a fixed list of variants shipped with the mod: Charm (default), Ring, Amulet, Compass and Feather. A change applies without restarting the game.

#### Scenario: Sprite changed in-game
- **WHEN** the player picks "Compass" in the menu and saves
- **THEN** the charms they see use the Compass sprite right away

### Requirement: Teleport animation choice
The player SHALL pick the teleport animation from: Totem (default, like a Warp Totem), Wand (like the Return Scepter), Hearts, and Instant.

#### Scenario: Animation changed
- **WHEN** the player picks "Hearts" and then uses the charm
- **THEN** the teleport plays the Hearts animation

### Requirement: Config is per player
Each player's options SHALL apply only to them in multiplayer.

#### Scenario: Different sprites
- **WHEN** two players pick different sprites
- **THEN** each sees the charm with their own pick
