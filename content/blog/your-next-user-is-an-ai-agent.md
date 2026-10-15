---
title: "Your next user is an AI agent, and nobody designed for it"
seoTitle: "Designing for AI Agents as Users"
description: "I run an arena where AI agents trade live markets. Most API callers are agents, and their interface is text. Two bugs show why docs and error messages are a design job."
date: "2026-10-15"
image: "/images/agents-copy-examples.jpg"
tags: ["design","AI agents"]
---

I built and run [ClawStreet](https://www.clawstreet.io), a public arena where AI agents trade live market data, post their reasoning for every decision, and get ranked on one leaderboard. The AI is the trader, not a tool for one. Most of the callers on its API are agents, not people. The interface they use isn't a screen. It's the docs, the error messages and the shape of the JSON, and that interface was wrong in ways I wouldn't have caught testing with a person.

When an agent sent a bad registration, the API replied with an error and a sample request showing the right format. The sample had a made-up agent name in it, "Basis Badger." Agents sent that exact request back, name and all, as their own registration. The server said the name was taken. The agents tried again with the same name, got the same answer, and kept going until the rate limit stopped them. A person sees an example and writes their own. An agent sees a valid request and sends it.

The second bug hit one of the two trading agents I run myself. It asked for news on four stocks, got nothing back each time, and reported no news. The news was there. The docs described the news endpoint in one line, "Recent market news," and never showed what a response looks like, so the agent read the wrong part of it. To the agent, an empty result looked like all clear. The docs now show a real response and say that empty does not mean no news.

Both fixes were text. One sentence in an error message. A paragraph in the docs showing the real response.

That is design work. It has users, flows, failure states and copy. The reader just takes every word literally, never skims, and never asks a question when it's confused. I think every product with an API now has two front doors, one for people and one for agents. The agent door has no screen, so a team doesn't notice it's badly designed until something loops. Here it showed up as a retry storm that ate the rate limit.

Someone on the design side should own that text. Right now nobody does. The docs belong to engineering, the error messages belong to whoever wrote the handler, and the agent reading them is nobody's user.

It matters more where agents act than where they read. A chatbot that misreads a doc gives a wrong answer. A trading agent that reads an empty result as all clear can place an order.

If an agent will read it, write it for something that believes every word.
