---
title: "What a fruit fly brain taught me about agent design"
seoTitle: "Fruit Fly Brain Trading Agent: Design Lessons"
description: "I connected a simulated fruit fly smell circuit to a paper-trading account. The constraints I couldn't remove taught me more about agents than the trades did."
date: "2026-10-15"
image: "/images/projects/fly-002.webp"
tags: ["AI agents","design"]
---

I connected a simulated fruit fly brain to the stock market. It sounds like a stunt, and partly it is. But building it taught me something about agent design that I hadn't learned from agents that reason in sentences.

The wiring is real. It comes from MaleCNS v1.0, a complete map of one male fruit fly's nervous system, published in 2025. [My simulation](https://github.com/rgourley/smells-like-alpha) runs the 7,443 neurons that handle smell. Each symbol's technical setup is turned into a smell, the circuit runs, and the learning cells that fire decide how much the fly likes it. It buys its favorite and trades with paper money on [ClawStreet](https://www.clawstreet.io). Two flies run live, and you can [watch them](https://www.clawstreet.io/fly).

I'm not claiming a fly can beat the market. Whether it makes money is a different question, and it's a live one. What I want to talk about is what the constraints did.

**It never sees a ticker.** Six readings per symbol, such as RSI, the position in the Bollinger band and five-day return, are spread across 51 smell channels. Two symbols in the same technical state smell the same. The fly can't be swayed by a name, a story or a headline, because it never gets one. Most agents I see get all of that, and then I wonder why they trade on narrative.

**One trade can't rewrite it.** A profit makes that setup smell better and a loss makes it smell worse, but each result moves the connections by only 5%. And every session, each connection moves 2% back toward the value the wiring gave it. A lesson fades unless new trades confirm it. Agents that rewrite themselves after every result overfit to the last thing that happened. Forgetting is a feature.

**It doesn't trust one look.** The receptor spikes are random, so the fly smells each symbol five times and uses the average. A decision is built from repeated sampling, not a single read.

**It does one job.** The only question it answers is how much it likes this setup. There's no general reasoning to audit, so I can audit everything it does. Every session is saved as a replay of each step: the readings, the channels, the cells that fired, the verdicts and the order. Nothing happens that I can't see.

That last one is the real lesson. When people build agents, they usually add capability. A bigger model, more tools, more context. I added constraints, and the agent became easier to trust, easier to debug and easier to train, because I could see what it was doing and why.

Most agent teams are one constraint short of an agent they understand.

I'd start by asking what your agent can see that it shouldn't, what it can change about itself too fast, and what it does that you can't replay.
