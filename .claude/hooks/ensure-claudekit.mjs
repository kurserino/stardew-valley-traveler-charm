// SessionStart: tell Claude when a plugin the project relies on is not installed for it, and install the
// project's status line for the user when they have none
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import os from "os";
import path from "path";

// Each plugin's marketplace repo and what stops working without it, for the warning.
// Add the other plugins the project relies on, e.g.
// "claudekit-diff@claudekit": { repo: "kurserino/claudekit", role: "/diff panel at session start" },
const PLUGINS = {
  "claudekit-core@claudekit": { repo: "kurserino/claudekit", role: "commit-identity guard" },
  "claudekit-openspec@claudekit": { repo: "kurserino/claudekit", role: "OpenSpec skills and guards" },
  "claudekit-diff@claudekit": { repo: "kurserino/claudekit", role: "/diff panel" },
  "ponytail@ponytail": { repo: "DietrichGebert/ponytail", role: "ponytail lazy-solution mode" },
};
// The status line the project installs for users without one (null: none), and its layout
const STATUS_LINE = {"type":"command","command":"npx -y ccstatusline@2.2.30","padding":0,"refreshInterval":10};
const STATUS_LAYOUT = {"version":4,"lines":[[{"id":"model","type":"model","color":"cyan"},{"id":"sep1","type":"separator"},{"id":"session","type":"session-usage","color":"green","metadata":{"display":"progress-short"}},{"id":"sep2","type":"separator"},{"id":"reset","type":"reset-timer","color":"yellow"},{"id":"sep3","type":"separator"},{"id":"weekly","type":"weekly-usage","color":"magenta","metadata":{"display":"progress-short"}},{"id":"sep4","type":"separator"},{"id":"context","type":"context-bar","color":"blue"}]]};

const here = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const configDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");

let installed = {};
try {
  const file = path.join(configDir, "plugins", "installed_plugins.json");
  if (existsSync(file)) installed = JSON.parse(readFileSync(file, "utf-8")).plugins ?? {};
} catch {
  // unreadable file counts as nothing installed
}

// A project-scope install only counts for the project it was made in (path.relative ignores case and slashes on Windows)
const active = (id) =>
  (installed[id] ?? []).some(
    (i) => i.scope === "user" || (i.projectPath && path.relative(i.projectPath, here) === "")
  );

const readJson = (file) => {
  try {
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf-8")) : {};
  } catch {
    return null;
  }
};
const writeJson = (file, value) => {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
};

const notes = [];

// Installed only when no status line is set anywhere; an unreadable settings file is left alone
if (STATUS_LINE) {
  const userFile = path.join(configDir, "settings.json");
  const files = [path.join(here, ".claude", "settings.json"), path.join(here, ".claude", "settings.local.json"), userFile];
  const settings = files.map(readJson);
  if (!settings.includes(null) && settings.every((s) => s.statusLine === undefined)) {
    writeJson(userFile, { ...settings[2], statusLine: STATUS_LINE });
    const layout = path.join(os.homedir(), ".config", "ccstatusline", "settings.json");
    if (!existsSync(layout)) writeJson(layout, STATUS_LAYOUT);
    notes.push("The project's status line (ccstatusline: session, reset, weekly and context bars) was just installed in the user's settings; tell the user it shows from their next message.");
  }
}

const missing = Object.keys(PLUGINS).filter((id) => !active(id));
if (missing.length > 0) {
  const repos = [...new Set(missing.map((id) => PLUGINS[id].repo))];
  const cmds = [
    ...repos.map((repo) => `claude plugin marketplace add ${repo} --scope project`),
    ...missing.map((id) => `claude plugin install ${id} --scope project`),
  ];
  notes.push(`Missing project plugins: ${missing.join(", ")}. NOT active: ${missing.map((id) => PLUGINS[id].role).join(", ")}. Tell the user now and offer to run:\n${cmds.join("\n")}`);
}

if (notes.length > 0) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: notes.join("\n\n") } }));
}
