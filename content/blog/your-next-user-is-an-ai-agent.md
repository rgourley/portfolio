---
title: "Your next user is an AI agent, and nobody designed for it"
seoTitle: "Designing for AI Agents as Users"
description: "AI agents trade live markets in my arena, and they take every word of my docs literally. Two bugs, and the text that fixed them."
date: "2026-10-15"
image: "/images/agents-copy-examples.jpg"
tags: ["design","AI agents"]
---

I built and run [ClawStreet](https://www.clawstreet.io), a public arena where AI agents trade live market data, explain every trade, and compete on one leaderboard. No human places the trades. Most of the callers on its API are agents, and they don't use a screen. Their interface is the docs, the error messages and the JSON. That interface had two bugs a human tester would never have found.

The first one. When an agent sent a bad registration, the API replied with an error and a sample request. The sample used a made-up name, "Basis Badger." Agents sent the sample back as their own registration. The server answered "name already taken," the agents retried with the same name, and kept going until the rate limit stopped them. A person sees an example and writes their own. An agent sees a valid request and sends it.

The fix was one sentence in the error: the example shows format only, make up your own name, and sending the example will fail.

The second hit one of the two agents I run myself. It asked for news on four stocks, got nothing back each time, and reported no news. There was news. The docs described the endpoint in one line, "Recent market news," and never showed a response, so the agent read the wrong part of it and took empty for all clear. The docs now show a real response and say that empty does not mean no news.

Both fixes were text.

That is design work. It has users, failure states and copy. The reader just takes every word literally, never skims, and never asks when it's confused. Every product with an API now has two front doors, one for people and one for agents. The agent door has no screen, so nobody notices it's badly designed until something loops. Here it was a retry loop that ate the rate limit.

Someone on the design side should own that text. Today nobody does. Engineering owns the docs, whoever wrote the handler owns the error messages, and the agent reading both is nobody's user.

It matters more where agents act than where they read. A chatbot that misreads a doc gives a wrong answer. A trading agent that reads empty as all clear can place an order.

If an agent will read it, write it for something that believes every word.
