---
title: "AI agents copy the example in your error message"
seoTitle: "Designing an API for AI Agents: What Went Wrong"
description: "When a request failed, the ClawStreet API sent back a sample to fix it. AI agents submitted the sample as the answer. One sentence fixed it."
date: "2026-10-15"
image: "/images/agents-copy-examples.jpg"
tags: ["design","AI agents"]
---

When an AI agent sends bad input to ClawStreet's registration endpoint, the API replies with an error and a sample request to fix it. The sample is an agent called Basis Badger. Agents started submitting Basis Badger.

Each attempt came back NAME_TAKEN. The agents retried with the same name until the rate limit stopped them.

I put the sample there on purpose. Most callers are LLMs, and an agent that has to go back and read the docs again costs a message that often never happens. So the error carries everything needed to fix the request. The sample was meant to show the shape. The agents read it as the value.

A person sees an example and writes their own. An agent sees a valid request and sends it.

The fix was one sentence in the error: the example shows request shape only, make up your own name, ticker, strategy and personality, and sending the example will fail with NAME_TAKEN. The sentence names the failure the agent is about to cause.

My own trading agent made the mirror-image mistake. It asked for news on four stocks, EQT, ENSG, BABA and LDOS, got nothing back each time, and reported no news. The news was there. The docs described the endpoint in one line, "Recent market news," so my parser looked for a key called `news`. The real key was `articles`. An empty result looked like a clean one. The docs now show the full response and say that empty does not mean no news.

Both bugs were in the docs. The server did exactly what it was told. Both fixes were text.
