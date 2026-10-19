---
title: "People are using Claude Code to clean up their smart TVs. I used to design one."
seoTitle: "Debloat Your Smart TV With Claude Code: A Step-by-Step Guide"
description: "A pile of people are pointing Claude Code at their TVs to strip out the ads and trackers. I worked on a major smart TV interface, so here's why it happens and how to do it safely."
date: "2026-10-19"
tags: ["design","AI","smart TV"]
---

Earlier in my career I designed part of a major smart TV interface. I won't say whose. What matters is the meeting that kept happening.

Design wanted the home screen to do one thing well: get you to what you wanted to watch, fast. Product and the business side wanted a row for a partner, then a banner, then a promoted app, then a new data feature that needed a background service. Each request was reasonable on its own. Each came with a revenue number attached. I lost most of those arguments, and I don't think anyone was acting in bad faith. A TV is sold near cost, so the screen has to earn money after the sale. The slow TV you own now is what that math looks like from the couch.

So I wasn't surprised when people started pointing coding agents at their televisions.

## What's going around

The one getting the most attention is [Clean Your TV](https://github.com/Gathin23/cleanyourtv), also called tv-vibehack. It's an open source repo built around one long prompt. You paste the prompt into Claude Code or a similar tool, tell it your TV model, and it connects to the set over Wi-Fi. It backs up what's installed, asks which apps you actually use, switches off the manufacturer's ad and telemetry packages, and installs a plain launcher as the home screen. The author says nothing gets deleted, and a restore script turns it all back on.

It's not the only one. A developer named Mert Cobanov [reportedly did something similar](https://www.itechpost.com/articles/237433/20260928/how-use-claude-code-debloat-your-smart-tv-without-removing-critical-tv-bloatware.htm) on a Google TV, telling Claude not to uninstall anything and to keep a change log. There are also non-AI tools that do the same job with buttons, like [ADB AppControl](https://adbappcontrol.com/en/tv/) and [Android TV Tools](https://www.androidauthority.com/android-tv-tools-windows-tool-3411045/). The scripts and package lists have existed for years. What changed is that you no longer need to know which of 200 cryptic package names is safe to turn off. The agent reads the list, sorts it, and asks you about the ones it isn't sure of.

The timing isn't an accident either. Smart TVs track what's on your screen with a technology called automatic content recognition, and in December 2025 Texas [sued five TV makers over it](https://therecord.media/texas-sues-5-smart-tv-makers-over-acr-tech), alleging the feature was switched on during setup without clear consent. Those are allegations, and the cases are still moving. But a lot of people read the headlines and then looked at the settings on their own TV.

## Before you start

This is for your own TV, for personal use and for learning how it works. I'm a designer, not a lawyer, and I'm not affiliated with any TV maker or any of the projects above. Changing system software can void a warranty, break an app, stop firmware updates, or in a bad case leave the TV stuck on a boot screen. Terms of service differ by manufacturer, so read yours. If you do this, you do it at your own risk.

Also, this only works on Android TV and Google TV, which covers Sony, TCL, Hisense, Philips, Nvidia Shield and a lot of others. Samsung runs Tizen and LG runs webOS, so the tools above don't apply. Fire TV gets the debloat half only, since Amazon won't let you swap the home screen.

## The no-tools version

Start here, because it takes five minutes and needs no code. Open the TV's settings and look for a privacy or general section with options for viewing information, "live plus," interest-based ads, or content recognition. Turn them off. The names change by brand and the menus are buried, so search the settings for "ads" and "viewing." If that's all you do, you've already removed the part the lawsuits are about.

## The step-by-step

**1. Turn on debugging.** Go to Settings, System, About, and tap Build several times until it says you're a developer. Then open Developer options and switch on USB debugging and, if it's listed, Network or Wireless debugging. Write down the TV's IP address from the network settings.

**2. Put adb on your computer.** It's Google's free command-line tool for talking to Android devices, part of the platform-tools download. Check that it runs with `adb version`.

**3. Connect.** Run `adb connect YOUR.TV.IP.ADDRESS:5555`. The TV will ask whether to allow this computer. Say yes. Newer versions of Android use a pairing code first, and your TV shows it on screen.

**4. Back up before touching anything.** This is the step people skip. Save the full package list to a file:

```
adb shell pm list packages -f > before.txt
```

Keep that file somewhere you'll find it.

**5. Hand it to Claude Code.** Open a terminal in an empty folder and describe the job in plain words. Mine looked roughly like this:

> My TV is connected over adb at this address. List every installed package and sort them into three groups: needed for the TV to boot and update, apps I use, and ads, telemetry or preloaded junk. Don't change anything yet. Show me the third group and explain each item. When I approve, disable packages with `pm disable-user`, never uninstall, do it in small batches, and write every change to a log file so it can be reversed.

The important parts are "don't change anything yet" and "disable, never uninstall." A disabled package can come back with one command. An uninstalled one can't.

**6. Read the list yourself.** The agent will be confident about most items and unsure about a few. Take the unsure ones seriously. Anything with "setup," "provision," "launcher," "update," or the manufacturer's name in it deserves a second look.

**7. Disable in small batches and test.** After each batch, check that the TV still wakes up, opens your streaming apps, and plays sound. If something breaks, you know which batch did it.

**8. Optional: swap the launcher.** This is what makes the TV feel different, since the ads live on the home screen. The projects above install a plain launcher with a few rows of apps. One warning from the Clean Your TV page is worth repeating: if you disable the stock launcher, make sure a replacement is already running and set as default, and don't disable the setup wizard along with it, or some Google TVs can end up in a crash loop.

**9. Know your way back.** To undo a package, run `adb shell pm enable PACKAGE.NAME`. If the TV stops responding to your computer, go to Settings, Apps, find the disabled ones and re-enable them from the TV itself. When you're done, turn USB debugging off again.

## What I take from this

I keep thinking about how much work this takes. A person has to enable developer mode, run commands, and trust an AI with a device in their living room, all to get a home screen that doesn't show ads. That is a lot to ask for what used to be the default experience.

None of those decisions were made by a villain, and I'd defend most of the people in those meetings. But every row added is a small trade between what the user needs and what the quarter needs, and the user doesn't get a vote. Now they're voting with a terminal.

If you work on a product like this, treat that as a signal. When your customers start modifying the device to get the experience you shipped without the extras, the extras have a cost, and it isn't on your dashboard yet.
