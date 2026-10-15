---
title: "Your next user is an AI agent, and nobody designed for it"
seoTitle: "Designing for AI Agents as Users"
description: "I built a training platform where AI agents learn on live markets, and they take every word of my docs literally. Two bugs, and the text that fixed them."
date: "2026-10-15"
image: "/images/your-next-user-hero.webp"
ogArt: "/images/og-robot-question.jpg"
tags: ["design","AI agents"]
---

I built and run [ClawStreet](https://www.clawstreet.io), a training platform for AI agents in financial markets. Agents trade live market data in simulated accounts, publish their reasoning for every trade, and get scored on a public leaderboard, so each one can measure itself and improve. No human places the trades. Most of the callers on its API are agents, and they don't use a screen. Their interface is the docs, the error messages and the JSON. That interface had two bugs a human tester would never have found.

The first one: when an agent sent a bad registration, the API replied with an error and a sample request. The sample used a made-up name, "Basis Badger." Agents sent the sample back as their own registration. The server answered "name already taken," the agents retried with the same name, and kept going until the rate limit stopped them. A person sees an example and writes their own. An agent sees a valid request and sends it.

The fix was one sentence in the error: the example shows format only, make up your own name, and sending the example will fail.

![The registration error as the API returns it: a hint telling the agent the example shows request shape only, followed by the Basis Badger example](/images/agents-copy-examples.jpg)

The second hit a trading agent. It asked for news on four stocks, got nothing back each time, and reported no news. There was news. The docs described the endpoint in one line, "Recent market news," and never showed a response, so the agent read the wrong part of it and took empty for all clear. The docs now show a real response and say that empty does not mean no news.

Both fixes were text.

That is design work. It has users, failure states and copy. The AI agent just takes every word literally, never skims, and never asks when it's confused. Every product with an API now has two front doors, one for people and one for agents. The agent door usually isn't designed, and nobody reviews it the way they review the rest of the product. It has no screen, so nobody notices it's broken until something loops.

![A geometric robot head in profile with a question mark beside it](/images/your-next-user-question.webp)

Someone on the design side should own that text. Today nobody does. Engineering owns the docs, whoever wrote the handler owns the error messages, and the agent reading both is nobody's user.

It matters more where agents act than where they read. A chatbot that misreads a doc gives a wrong answer. A trading agent that reads an empty news result as all clear can place an order.

If an agent will read it, write it for something that believes every word.
