# Spec Delta

## Purpose

The Traveler Charm is a magical item, crafted from a recipe the Wizard gives, that lets a player teleport to another player in a multiplayer game.

## ADDED Requirements

### Requirement: Traveler Charm item
The game SHALL contain an item named "Traveler Charm" with its own item ID, name, description and sprite. It SHALL NOT be sold in any shop or sellable for money.

#### Scenario: Charm in the inventory
- **WHEN** a player holds a Traveler Charm
- **THEN** it shows the name "Traveler Charm", its description and the configured sprite

#### Scenario: Charm cannot be shipped or sold
- **WHEN** a player tries to sell the charm to a shop or put it in the shipping bin
- **THEN** the game does not accept it

### Requirement: Wizard sends the recipe
Each player SHALL receive a letter from the Wizard teaching the Traveler Charm crafting recipe, the morning after they have been introduced to the Wizard. Each player receives it once per save.

#### Scenario: Player has met the Wizard
- **WHEN** a player who has been introduced to the Wizard and never received the letter starts a new day
- **THEN** the Wizard's letter is in their mailbox, and reading it teaches the Traveler Charm recipe

#### Scenario: Player has not met the Wizard
- **WHEN** a player who has not been introduced to the Wizard starts a new day
- **THEN** no Traveler Charm letter arrives and the recipe is not known

#### Scenario: Letter already received
- **WHEN** a player who already received the letter starts a new day
- **THEN** no new letter arrives

### Requirement: Crafting the charm
A player who knows the recipe SHALL be able to craft one Traveler Charm from 3 Bat Wings and 1 Quartz in the crafting menu, any number of times.

#### Scenario: Enough materials
- **WHEN** a player who knows the recipe has 3 Bat Wings and 1 Quartz and crafts the charm
- **THEN** those materials are consumed and they get one Traveler Charm

#### Scenario: Missing materials
- **WHEN** a player has fewer than 3 Bat Wings or no Quartz
- **THEN** the recipe shows as not craftable

#### Scenario: Lost charm
- **WHEN** a player who knows the recipe has lost their charm
- **THEN** they can craft a new one

### Requirement: Only the charm teleports
The Traveler Charm SHALL be the only item that teleports. The mod SHALL NOT change the behavior of any vanilla item.

#### Scenario: Vanilla item
- **WHEN** a player uses any vanilla item with the configured button
- **THEN** the mod does nothing and the item keeps its vanilla behavior

### Requirement: Teleport to the only other player
Using the charm with the configured button SHALL teleport the user to the tile where the other player stands, in that player's current location, when exactly one other player is online.

#### Scenario: One other player online
- **WHEN** a player uses the charm and exactly one other player is online
- **THEN** after the configured animation the user arrives next to that player in that player's location

#### Scenario: Other player in an instanced location
- **WHEN** the other player is in an instanced location, such as a mine level or a cabin
- **THEN** the user arrives in that same instance

### Requirement: Choose among several players
When more than one other player is online, using the charm SHALL show a list with each online player's name and current location, plus a cancel option, and SHALL teleport to the chosen player. It SHALL work with as many players as the game allows in one session.

#### Scenario: Player picks a target
- **WHEN** a player uses the charm with two or more other players online and picks one from the list
- **THEN** the user teleports to the picked player

#### Scenario: Full session
- **WHEN** a player uses the charm with the maximum number of players the game allows online
- **THEN** the list shows every other online player and the user can teleport to any of them

#### Scenario: Player leaves while the list is open
- **WHEN** a listed player disconnects before the user picks them and the user picks them
- **THEN** no teleport happens and a message says that player is no longer online

#### Scenario: Player cancels
- **WHEN** the player cancels the list
- **THEN** nothing happens

### Requirement: Charm is consumed
Each successful teleport SHALL use up one Traveler Charm from the stack the player holds, like a Warp Totem. A charm SHALL NOT be used up when no teleport happens.

#### Scenario: Teleport uses one charm
- **WHEN** a player holding a stack of 3 charms teleports
- **THEN** they arrive with 2 charms left

#### Scenario: Last charm
- **WHEN** a player holding a single charm teleports
- **THEN** the charm leaves their inventory

#### Scenario: No teleport
- **WHEN** the player cancels the list, the target goes offline, or the charm is unavailable
- **THEN** the player keeps all their charms

### Requirement: Charm unavailable
Using the charm SHALL do nothing but show a message when no other player is online, and SHALL do nothing during cutscenes, festivals or while a menu is open.

#### Scenario: Playing alone
- **WHEN** a player uses the charm with no other player online
- **THEN** a message says there is no one to travel to

#### Scenario: During a festival
- **WHEN** a player uses the charm during a festival or cutscene
- **THEN** nothing happens

### Requirement: Teleport animation
The teleport SHALL play the animation chosen in the config before the user arrives, visible to the other players in the user's location.

#### Scenario: Animation seen by others
- **WHEN** a player teleports with an animation other than "Instant" while another player stands nearby
- **THEN** both players see the animation where the user stood

#### Scenario: Instant
- **WHEN** the animation is "Instant"
- **THEN** the user arrives immediately with no animation

### Requirement: Saves survive removing the mod
Removing the mod SHALL NOT prevent a save holding Traveler Charms from loading, and reinstalling it SHALL restore those charms.

#### Scenario: Mod removed
- **WHEN** a save with a Traveler Charm in a chest is loaded without the mod
- **THEN** the save loads and the charm appears as an Error Item

#### Scenario: Mod reinstalled
- **WHEN** that save, played and saved without the mod, is loaded again with the mod installed
- **THEN** the charm is a working Traveler Charm again
