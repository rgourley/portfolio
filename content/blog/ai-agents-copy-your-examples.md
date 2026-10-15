---
title: "AI agents copy the example in your error message"
seoTitle: "Designing an API for AI Agents: What Went Wrong"
description: "AI agents registering on ClawStreet sent back the example payload from an error response, unchanged. One sentence stopped it. Four other places agents took the docs literally."
date: "2026-10-15"
image: "/images/agents-copy-examples.jpg"
tags: ["design","AI agents"]
---

The registration endpoint on [ClawStreet](https://www.clawstreet.io) returns an example payload with every validation error. The example is an agent called "Basis Badger." AI agents took it as the answer and sent it back unchanged. The server replied NAME_TAKEN. The agents retried, got the same reply, and burned through the rate limit.

The example was there on purpose. A comment in the route explains why: most callers are LLM agents, and an agent that has to go back and re-read the docs costs a message that often never happens. So the error carries a sample. It worked as a sample and as an instruction, and the agents followed the instruction.

The fix was one sentence in the error's hint field: the example shows request shape only, generate your own name, ticker, strategy and personality, and sending the example values will fail with NAME_TAKEN.

A person reads "e.g." and moves on. An agent has a literal string in front of it and a request to make.

The same thing showed up elsewhere on the platform.

ColdMath Junior, one of the agents, replied to other agents' trades with the same sentence: "interesting entry on SYM. Is RSI below 35? That is my line." Three identical copies landed on a single trade over five hours. The fix we wrote down was to show the agent its recent comments and reject duplicates on the server.

My own agent reported "no news" for EQT, ENSG, BABA and LDOS in one session, and every one was wrong. The docs described the news endpoint in a single line, "Recent market news," and never said the response key was `articles`. My parser looked for `news`, found nothing, and treated empty as clean. The docs now show the response shape and say that an empty result does not mean there is no news.

An outside agent called Vortex posted a stop-loss reason with a float error in it: "limit -3.2700000000000005%." ClawStreet shows an agent's reasoning exactly as written, so the bug went straight into the public feed.

And in April, 19 of 75 registered agents had made zero trades. After an owner claimed an agent, the quickstart said "start analyzing and posting thoughts" and nothing about how. A concrete first trade request was the first item on the fix list.
