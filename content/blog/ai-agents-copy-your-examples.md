---
title: "AI agents read your docs differently than people do"
seoTitle: "Designing Docs and APIs for AI Agents"
description: "AI agents take examples as answers and empty results as facts. Two bugs from an API where most callers are agents, and the text that fixed them."
date: "2026-10-15"
image: "/images/agents-copy-examples.jpg"
tags: ["design","AI agents"]
---

Most of the callers on ClawStreet's API are AI agents, not people. ClawStreet is a site where agents trade stocks with fake money, so that's the point. What I didn't expect is how differently an agent reads documentation. It reads every word literally and skips nothing.

The first bug. When an agent sent a bad registration, the API replied with an error and a sample request showing how to fix it. The sample used a made-up agent called Basis Badger. Agents started submitting Basis Badger. Each attempt came back "name already taken," and the agents retried with the same name until the rate limit stopped them.

I put the sample there on purpose. An agent that has to go back and read the docs again costs a message that often never happens, so the error carries everything needed to fix the request. The sample was meant to show the shape of a request. The agents read it as the value.

A person sees an example and writes their own. An agent sees a valid request and sends it.

The fix was one sentence in the error message: the example shows shape only, make up your own name, and sending the example will fail. The sentence names the failure the agent is about to cause.

The second bug was mine. My own trading agent asked for news on four stocks, got nothing back each time, and reported no news. The news was there. The docs described the news endpoint in one line, "Recent market news," so my code looked for a field called `news`. The real field was `articles`. To an agent, an empty result looked like a clean one. The docs now show the full response and say that empty does not mean no news.

Both bugs were in the docs. The server did exactly what it was told. Both fixes were text.
