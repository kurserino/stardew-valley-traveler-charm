# Spec Delta

## Purpose

Gives mod developers and testers shortcuts to get the Traveler Charm and its materials in-game without playing through the Wizard and the mines, and fake teleport targets to test the charm without other players.

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

### Requirement: Dummy targets
In debug mode, the `travelercharm_dummies <count>` command SHALL create that many fake teleport targets, each with a generated name and a random reachable tile in a random location, chosen among the farm, town, beach, mountain, desert, a mine level and a cabin when one exists. `travelercharm_dummies remove <name>` and `travelercharm_dummies clear` SHALL remove one or all of them.

#### Scenario: Create dummies
- **WHEN** the player runs `travelercharm_dummies 7` with a save loaded
- **THEN** the console lists 7 dummy targets with their names and locations

#### Scenario: Remove a dummy
- **WHEN** the player runs `travelercharm_dummies remove <name>` for an existing dummy
- **THEN** that dummy is no longer a target, and the console says so

#### Scenario: Unknown dummy
- **WHEN** the player runs `travelercharm_dummies remove <name>` for a name that is not a dummy
- **THEN** the console says no dummy has that name and nothing changes

### Requirement: Dummies act as online players
While dummies exist, the charm SHALL treat each one as an online player: it counts toward choosing between a direct teleport and the list, appears in the list marked as a dummy with its location, and teleporting to it brings the user to its tile and uses up a charm.

#### Scenario: Only one dummy, playing alone
- **WHEN** a player alone in the game has one dummy and uses the charm
- **THEN** they teleport straight to the dummy's tile and one charm is used up

#### Scenario: Dummies listed
- **WHEN** the player uses the charm with several dummies
- **THEN** the list shows each dummy as `[dummy] <name> (<location>)` together with any real players

#### Scenario: Dummy removed while the list is open
- **WHEN** a dummy is removed from the console while the list is open and the player then picks it
- **THEN** no teleport happens, no charm is used up, and a message says that player is no longer online

### Requirement: Dummies are temporary
Dummies SHALL exist only on the machine that created them, SHALL NOT be visible to other players, and SHALL be cleared when the player returns to the title screen or debug mode is off. They SHALL never be saved.

#### Scenario: Back to title
- **WHEN** the player creates dummies and returns to the title screen
- **THEN** no dummies exist after loading a save again

#### Scenario: Other players
- **WHEN** a player with dummies is in a multiplayer game
- **THEN** other players' charm lists do not show those dummies
