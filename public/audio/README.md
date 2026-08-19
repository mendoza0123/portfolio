# Audio recordings

Files here are served from the site root, e.g. `public/audio/x.mp3` -> `/audio/x.mp3`.

| File | Used by |
| --- | --- |
| `monika-calling-agent.mp3` | `VOICE_AGENT_DEMOS` -> `vapi-monika.audioUrl` in `src/data/portfolioData.ts` |

To swap a recording, drop the new file here and point that agent's `audioUrl` at it.
Use hyphenated filenames — spaces need URL encoding.

The Voice AI Studio reads the real duration off the file, so nothing needs updating
when the length changes. If a transcript only covers part of a recording, set
`clipStart` / `clipEnd` (seconds) on that agent; if its timestamps are already exact
audio offsets, also set `absoluteTiming: true` to stop them being stretched.
