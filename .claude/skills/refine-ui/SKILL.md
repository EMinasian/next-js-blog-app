---
name: refine-ui
description: Orchestrates a full UI refinement pass on this Next.js app — a senior-ui-designer agent plans major/minor UI improvements (interrogating the user on anything ambiguous), the user is asked for any further considerations, then a senior-nextjs-developer agent plans the implementation, gets it approved via plan mode, and implements it. Trigger phrase — "refine the UI" / "refine UI" / requests to improve, redesign, or polish the app's UI.
---

# Refine UI

This skill runs **inline in the main conversation** — not as a background Workflow — because several steps require pausing to ask the user real questions, which background agents/workflows cannot do. Follow these steps yourself using the Agent and AskUserQuestion tools; do not delegate the whole flow to a single subagent.

## Steps

1. **Scope check (only if genuinely ambiguous).** If the user hasn't said whether this is app-wide or scoped to a specific page/feature, ask once via AskUserQuestion. Skip this if scope is already clear from what they said.

2. **Design pass.** Call Agent with `subagent_type: "senior-ui-designer"`, telling it the scope and where the app lives. Ask it to inspect the real codebase and return a `UI Improvement Plan` (its own instructions define the exact format: Major Improvements / Minor Improvements / Open Questions). Keep track of this agent's id/name — you'll continue the same agent, not spawn a new one, for every later revision.

3. **Clarify open questions.** If the returned plan has a non-empty `## Open Questions` section:
   - Ask the user those questions via AskUserQuestion (batch up to 4 per call).
   - Send the answers back to the **same** designer agent (continue it by id/name) and ask it to return a revised full plan.
   - Repeat until a returned plan has no open questions left.

4. **Further considerations.** Once the plan has no open questions, ask the user via AskUserQuestion: "Anything else you'd like factored into this UI refinement before implementation planning starts?" with a clear "No, proceed" option (free text via "Other" for anything they add). If they add anything, send it to the same designer agent and get back a final revised plan.

5. **Hand off to the developer.** Call Agent with `subagent_type: "senior-nextjs-developer"`, passing the finalized UI Improvement Plan in full. Explicitly ask it to do the **plan pass only** — produce an implementation plan (files, changes, order, risks) without editing anything yet.

6. **Plan-mode approval.** Run the developer agent's implementation plan through this session's real plan-approval gate: enter plan mode if you aren't already in it, then call ExitPlanMode with that implementation plan as the content, so the user gets the standard approval prompt. Do not proceed to step 7 until the user approves. If they request changes, send them back to the same developer agent for a revised plan and re-run this step.

7. **Implement.** Once approved, continue the same senior-nextjs-developer agent (by id/name) and tell it to proceed with the implementation pass: make the approved changes, then run lint/build and fix anything it broke.

8. **Wrap up.** Summarize what changed in 2-3 sentences, and call out anything from the plan that was descoped or deferred.

## Notes

- Reuse the same designer agent instance across steps 2-4, and the same developer agent instance across steps 5-7 (via SendMessage-style continuation) — don't spawn fresh agents for each revision, they need the prior context.
- Keep each AskUserQuestion batch small and concrete; never re-ask something the user already answered earlier in the same flow.
