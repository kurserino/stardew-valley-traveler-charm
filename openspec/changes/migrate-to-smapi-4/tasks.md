# Tasks

## 1. Project and manifest

- [ ] 1.1 Retarget `TeleportToYourLove.csproj` to `net6.0` with ModBuildConfig 4.x, remove the commented-out legacy settings and explicit framework references, and verify `dotnet build` succeeds
- [ ] 1.2 Add `Directory.Build.props` (target framework, `LangVersion`, `Nullable`, `ModZipPath` to a git-ignored `_releases/`) and an `.editorconfig` matching the existing C# style (2-space indent); verify `dotnet build` writes the release zip to `_releases/` with no nullable warnings
- [ ] 1.3 Set `MinimumApiVersion` to `4.0.0` in `manifest.json` and verify SMAPI loads the mod without warnings in its console

## 2. Code

- [ ] 2.1 Replace the `ParentSheetIndex == 801` check with `QualifiedItemId == "(O)801"` and fix any other SMAPI 4 API breaks, verifying `dotnet build` succeeds with no warnings from the changed code
- [ ] 2.2 In a two-player session, verify that using the Wedding Ring still warps to the configured player and that the GMCM options still show and save
