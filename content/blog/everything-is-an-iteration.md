---
title: "Everything is an iteration"
seoTitle: "Running More Experiments With AI Agents"
description: "AI agents made it almost free to try an idea, so you can run far more experiments. The hard part now is deciding what to test and when to kill it."
date: "2026-11-03"
image: "/images/everything-is-an-iteration-hero.webp"
tags: ["AI agents","process"]
---

I've sat in a lot of roadmap meetings where a room full of people argued over which of three ideas to build. Today that meeting costs more than prototyping all three would. Most companies still pick one bet a quarter, staff it, and defend it, because prototyping and building used to be the expensive part.

With agentic workflows that math flipped, and the strategy should flip with it. When prototypes are cheap, teams can stop predicting which idea is right and just find out. Have agents build out several working versions instead of one, keep the one that holds up, and throw the rest away without treating it as a loss.

:::iterations

:::

## Why teams still run so few experiments

Everyone agrees you should run more experiments, and most teams still don't. It isn't laziness. An experiment used to cost someone weeks, and when a test costs weeks you protect it. You plan it, defend it in a review, and when it fails it feels like your failure, because weeks of your life are in it. So you run fewer and pick safer ones.

The companies building with agents have started treating that cost as gone. When Anthropic wrote up how its own teams use Claude Code, one team described treating it like a slot machine. Save your work, let it run for half an hour, then keep the result or throw it out and start fresh. No trying to rescue a bad attempt. Shopify's CEO Tobi Lütke put it into policy in his 2025 memo: the prototype phase of any project should be dominated by AI exploration, and teams have to show why AI can't do a job before asking for more people.

## What agents change

An agent cuts the cost of building something to minutes. A spike against an API you've never used, or several versions of a layout, isn't weeks of anyone's time anymore.

That changes what's worth trying. If a long-shot idea takes twenty minutes to test, test it. It used to lose to whatever was already on the roadmap.

It also changes the order. Build the part you don't understand first, because that's where the surprises are and finding them early is cheap. More and more of the users on a product are AI agents, and they do things no person would, like sending back an example word for word instead of filling in their own. No spec predicts that. Ship a small version and watch what happens.

:::pullquote
text: Build the part you don't understand first. That's where the surprises are, and finding them early is cheap.
:::

Teams that work this way stop treating a revert as a mistake. It's how an experiment ends.

## The fear doesn't get cheaper

Agents made building cheap. They did nothing about the fear of being wrong.

It shows up most in decisions that feel permanent and aren't. Most of what we decide in a day can be undone, and we still treat it like it can't. Agent work makes this obvious, because nearly all of it is reversible by default. It sits on a branch, in a draft, or behind a dry run. Anthropic's own Claude Code guidance leans on that: commit often, run several sessions side by side in separate copies of the code, and compare what comes back. The things that can't be undone are a short list, and those get a human looking at them first. Everything else, just try.

What's left is ego. When people ask for options, part of them wants the agent to confirm the one they already pictured. Sometimes it does. Often another concept wins, and the hard part is letting go of the one they wanted. Teams that get good at this stop asking whose idea it was and start asking which version held up.

## Cheap experiments still need a way to die

Cheap experiments pile up if nobody cleans them up, and the ones nobody removes end up in the product.

Agents make this worse in a way most people don't expect. An agent learns how your project works by reading it. Leave a losing experiment in place and the next session treats it as the pattern to follow, and copies it somewhere new. One forgotten test turns into three. The fix is boring: when an experiment loses, delete it that day.

It also helps to write the stopping rules down where the agent reads them. One of mine says there's a single source for anything that matters, and nothing gets to compute it a second way. Another says that if a fix needs two more fixes, the first one was wrong, so undo it and try something simpler. Both are about ending experiments. An agent will keep patching something forever if you let it. It has to be told when a test is over.

So the job moved. Leaders spend less time on what gets built and more on what counts as a result and when to stop. Those rules are what let a team run more experiments without the work filling up with the ones that half worked.

## Experiment on the setup too

There's one experiment most teams skip: the setup itself. That's the harness the agent runs in, the rules it reads, and which model does which job. Teams usually set these up once and never touch them again, even though they shape every result. Test them like anything else. Change one thing, run the same task, and see what's different.

Everything is an iteration, including the way you work. The ideas, the prototypes, the rules and the setup can all be tried, kept or thrown away. The teams that get the most out of agents will be the ones that try more of them and let go of what doesn't hold up.
