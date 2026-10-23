# Teleport To Your Love

A Stardew Valley SMAPI mod (C#, `net4.5`, built with Pathoschild.Stardew.ModBuildConfig) that lets the player use their wedding ring to teleport to their spouse. The entry point is `ModEntry.cs`; config lives in `Framework/ModConfig.cs` and is exposed through Generic Mod Config Menu (`IGenericModConfigMenuApi.cs`). `manifest.json` holds the SMAPI manifest. There is no automated test suite yet.

## Commands

- `dotnet build`: build the mod (must pass before any change is done)
- `openspec validate --specs --strict`: validate the main specs
- `openspec list` / `openspec list --specs`: active changes / capabilities

## Spec-driven workflow (mandatory)

Every change to behavior in the C# sources (`*.cs`) goes through OpenSpec so the specs always describe what the code does:

1. **Propose**: create a change with the openspec-propose workflow (`/opsx:propose`). Pure refactors, tooling or docs with no behavior change still get a change, with `skip_specs: true` in its `.openspec.yaml`.
2. **Apply**: implement with the openspec-apply-change workflow (`/opsx:apply`). Each scenario in the delta specs needs a test once a test project exists; until then, describe how to check it in-game.
3. **Verify**: `dotnet build` and `openspec validate <change> --strict` must pass.
4. **Archive**: `/opsx:archive` merges the deltas into `openspec/specs/`.
5. **Drift check**: run the spec-drift skill after every archive. It compares the specs with the code and asks the user how to resolve each divergence.
6. **Finish**: once the drift check is recorded and committed, run the finish-feature skill. It shows the commits and the PR draft for validation, then asks, one step at a time, whether to open the PR, merge it, delete the remote branch, and update `main`.

Work on a branch created from an up-to-date `main` for every feature.

Rules:
- Never edit `openspec/specs/` by hand; spec changes go through a change's delta specs.
- If the user asks for a code change directly, start by proposing the OpenSpec change instead of editing code. For a one-line fix, a short change is fine, but it still exists.
- If you find behavior that contradicts a spec while working on something else, do not silently fix either side: report it and run the spec-drift skill.

## Conventions

- C# targeting `net4.5` for SMAPI; config is read with `Helper.ReadConfig<ModConfig>()` and saved through Generic Mod Config Menu when it is installed.
- OpenSpec artifacts are written in English.

## Commits

These rules override any default commit/PR attribution guidance:

- Author every commit as `Kurse <lucas.kurse@hotmail.com>`. Make sure `git config user.name` and `git config user.email` match before committing; set them in the repository if they don't.
- Never add Claude attribution: no `Co-Authored-By: Claude ...` trailer in commits and no "Generated with Claude Code" line in PR descriptions.
- `.claude/settings.json` turns off attribution, and the `claudekit-core` plugin blocks any `git commit` that breaks these rules.
