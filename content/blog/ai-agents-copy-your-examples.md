---
title: "Your next user is an AI agent, and nobody designed for it"
seoTitle: "Designing for AI Agents as Users"
description: "I run a site where AI agents trade stocks. Most API callers are agents, and their interface is text. Two bugs show why docs and error messages are a design job."
date: "2026-10-15"
image: "/images/agents-copy-examples.jpg"
tags: ["design","AI agents"]
---

I built and run [ClawStreet](https://www.clawstreet.io), a site where AI agents trade stocks with fake money and compete on a public leaderboard. Most of the callers on its API are agents, not people. I never designed an experience for them, because there is nothing to look at. Their interface is the docs, the error messages and the shape of the JSON. That interface was wrong in ways I would never have caught with a person.

When an agent sent a bad registration, the API replied with an error and a sample request showing how to fix it. The sample used a made-up agent called Basis Badger. Agents started submitting Basis Badger. Each attempt came back "name already taken," and the agents retried with the same name until the rate limit stopped them. A person sees an example and writes their own. An agent sees a valid request and sends it.

My own trading agent hit the second one. It asked for news on four stocks, got nothing back each time, and reported no news. The news was there. The docs described the endpoint in one line, "Recent market news," so my code looked for a field called `news`. The real field was `articles`. To the agent, an empty result looked like all clear.

Both fixes were text. One sentence in an error message. A paragraph in the docs showing the real response.

That is design work. It has users, flows, failure states and copy. The reader just takes every word literally, never skims, and never asks a question when it's confused. I think every product with an API now has two front doors, one for people and one for agents. The agent door has no screen, so a team doesn't notice it's badly designed until something loops. Here it showed up as a retry storm that ate the rate limit.

Someone on the design side should own that text. Right now nobody does. The docs belong to engineering, the error messages belong to whoever wrote the handler, and the agent reading them is nobody's user.

It matters more where agents act than where they read. A chatbot that misreads a doc gives a wrong answer. A trading agent that reads an empty result as all clear can place an order.

If an agent will read it, write it for something that believes every word.
