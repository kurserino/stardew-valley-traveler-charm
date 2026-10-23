# Spec Delta

## Purpose

Gives mod developers and testers shortcuts to get the Traveler Charm and its materials in-game without playing through the Wizard and the mines.

## ADDED Requirements

### Requirement: Debug mode
The mod SHALL have a debug mode, off by default, turned on only by setting `DebugMode` to `true` in its config file. It SHALL NOT appear in the Generic Mod Config Menu.

#### Scenario: Debug mode off
- **WHEN** debug mode is off and a player types a debug command in the SMAPI console
- **THEN** the command does not exist and SMAPI reports it as unknown

#### Scenario: Debug mode on
- **WHEN** `DebugMode` is `true` and the game starts
- **THEN** the debug commands are available in the SMAPI console and SMAPI logs that debug mode is on

### Requirement: Give materials
In debug mode, the `travelercharm_materials` command SHALL add the materials for one charm (3 Bat Wings and 1 Quartz) to the local player's inventory, times an optional count.

#### Scenario: Default count
- **WHEN** the player runs `travelercharm_materials` with a save loaded
- **THEN** 3 Bat Wings and 1 Quartz are added to their inventory

#### Scenario: With a count
- **WHEN** the player runs `travelercharm_materials 2`
- **THEN** 6 Bat Wings and 2 Quartz are added

### Requirement: Give charm
In debug mode, the `travelercharm_give` command SHALL add Traveler Charms to the local player's inventory, one by default or the given count.

#### Scenario: Give one charm
- **WHEN** the player runs `travelercharm_give` with a save loaded
- **THEN** one Traveler Charm is added to their inventory

### Requirement: Debug commands need a loaded save
The debug commands SHALL refuse to run before a save is loaded, and SHALL drop items that do not fit in a full inventory at the player's feet.

#### Scenario: Title screen
- **WHEN** a debug command runs on the title screen
- **THEN** the console says a save must be loaded and nothing happens

#### Scenario: Full inventory
- **WHEN** the player's inventory is full and a debug command runs
- **THEN** the items drop on the ground next to the player
