---
title: "Asset trading for Advanced Traders"
description: "Designing powerful tools for beginner to institutional traders"
date: "2025-12-02"
tags: ["Strategy","Technical Design","UX","UI Design"]
featured: true
order: 2
image: "http://localhost:3001//images/1764914892122-kraken.png"

client: "Kraken"
year: "2022"
---



**Role:** Director of Product Design  
**Timeline:** 2022 - 2025  
**Platform:** Web, Desktop, Mobile

## The Challenge

Kraken is one of the world's largest cryptocurrency exchanges, handling over $200B in trading volume. The platform serves everyone from first-time crypto buyers to institutional traders moving millions of dollars per trade.

The problem: these users have completely different needs. A beginner wants simplicity and confidence that they won't accidentally lose money. An institutional trader wants speed, precision, and advanced tools like margin trading, futures, and algorithmic order types. Most platforms pick a side. They either dumb things down for beginners or build complex interfaces that intimidate casual users.

The core design challenge: how do you design a trading platform that feels approachable to beginners while giving professional traders the power and speed they demand?

:::testimonial
image: /images/jay.jpg
name: Jay F.
bio: Day Trader
quote: The interface on cryptowatch is my favorite UI I have ever used as a trader....
:::

## Approach

**Understanding the User Spectrum**

I led a design team responsible for the trading experience across web, desktop, and mobile. Early on, we mapped out the full user journey from someone buying their first Bitcoin to institutional traders running sophisticated trading strategies. The insight wasn't that we needed two separate products. It was that we needed adaptive interfaces that could scale with user expertise.

**Progressive Disclosure at Scale**

The strategy was progressive disclosure, but not in the traditional sense. We didn't just hide advanced features behind menus. We designed the information architecture so beginners could complete core tasks without encountering complexity they didn't need, while power users could access everything without friction.

This meant rethinking navigation, order entry flows, and how we surfaced market data. A first-time user should be able to buy Bitcoin in three clicks. An institutional trader should be able to place a stop-limit order with custom triggers without leaving their keyboard.

**Cross-Platform Consistency**

Trading happens everywhere. Some users monitor positions on mobile and execute trades on desktop. Others run real-time analysis on web and use mobile for alerts. We couldn't design three separate experiences. The mental model, interaction patterns, and visual language needed to be consistent across platforms while respecting the constraints and affordances of each.

**Iterative Validation**

We ran continuous user testing with both novice and expert traders. The most valuable sessions were watching traders use the platform under real market conditions, not controlled test scenarios. When markets are volatile and money is on the line, you see which design decisions hold up and which ones fall apart.

![821512-1741895132-65c29dd2bf5f0d980151c151-648ce8092f428f65d918ed78-cryptowatch-5-p-1080.avif](/images/1764916663818-821512-1741895132-65c29dd2bf5f0d980151c151-648ce8092f428f65d918ed78-cryptowatch-5-p-1080.avif)

## Solution Highlights

**Smart Order Entry**

Redesigned order entry to adapt based on user behavior and market conditions. For beginners, the interface guides them through simple buy/sell decisions with clear explanations. For advanced traders, the same interface expands to show limit orders, stop losses, margin options, and order book depth without requiring multiple screens.

**Real-Time Market Data**

Created visualization systems that make market movements, order book dynamics, and trading volume legible at a glance. The challenge was information density. Professional traders want as much data as possible. Beginners get overwhelmed by too many numbers. The solution was layered interfaces where users could progressively reveal more detail as they needed it.

**Portfolio Management**

Designed portfolio views that work across asset classes and account types. Users can see their total holdings, track performance, and understand risk exposure without needing a finance degree. For institutional users, the same views support multi-account management, margin tracking, and P&L attribution.

**Mobile Trading Experience**

Built a mobile experience that doesn't compromise on functionality while remaining touch-friendly and legible on small screens. Mobile isn't just for monitoring. Many users execute real trades on mobile, so the interface needed to be both fast and forgiving of touch errors that could be expensive.


## Impact & Results

**$200B in Trading Volume**

The platform facilitated over $200B in trading volume, serving users across the full spectrum from retail to institutional. The design supported high-velocity trading without sacrificing accessibility for newcomers.

**24% Increase in New User Profile Creation**

By analyzing user feedback and implementing UX improvements focused on onboarding clarity and reducing friction, we increased new user profile creation by 24%. This reflected our success in making crypto trading less intimidating for first-time users.

**100% On-Time Delivery for Two Consecutive Quarters**

Led alignment between design, product, and engineering to prioritize features effectively. This cross-functional collaboration resulted in 100% on-time delivery for two quarters, demonstrating that design leadership isn't just about craft but about operational excellence.

**User Feedback from Professional Traders**

Professional traders consistently cited the interface as their favorite trading UI. This validation came from users who trade for a living and have used every major platform. When your interface becomes a competitive advantage for professional users while remaining accessible to beginners, you've solved the core tension.

## Reflections

The hardest part wasn't designing for beginners or experts separately. It was designing one system that served both without compromising either. Early versions tried to be everything to everyone and ended up being mediocre for both audiences. The breakthrough was accepting that different users would see different versions of the same underlying system.

The biggest insight: speed matters more than you think. Professional traders will forgive visual quirks if the platform is fast and reliable. But no amount of polish saves a slow interface when money is moving. Performance became a design constraint, not an engineering afterthought. We designed with latency budgets in mind, optimizing for perceived speed through skeleton states, optimistic updates, and immediate feedback.

If I were starting over, I'd invest more in understanding the emotional side of trading. Trading isn't just a technical activity. It's stressful, emotionally charged, and mistakes are costly. The best interfaces acknowledge this by building in friction at the right moments (confirmations before large trades) and removing it everywhere else (instant access to account status, clear error recovery).






