---
title: "How to Debloat a Smart TV With Claude Code"
seoTitle: "How to Debloat a Smart TV With Claude Code (Android and LG)"
description: "People are pointing Claude Code at their smart TVs to strip out the ads and trackers. I worked on a major smart TV interface, so here's why it happens, and how to do it on Android TV and LG without breaking anything."
date: "2026-10-19"
image: "/images/debloat-tv-hero.webp"
tags: ["design","AI","smart TV"]
---

Earlier in my career I designed part of a major smart TV interface. I won't say whose. There was the same friction in every review.

The design team wanted the home screen to do one thing well: get the user to what they wanted to watch, fast. Product and the business side wanted a row for a partner, then a banner, then a promoted app, then a new data feature that needed a background service. Each request was reasonable on its own. Each came with a revenue number attached. We lost many of those arguments, and I don't think anyone was acting in bad faith. A TV is sold near cost, so the screen has to earn money after the sale. The slow TV you own now is what that math looks like from the couch.

So I wasn't surprised when people started pointing coding agents at their televisions.

## How are people debloating their TVs?

Mostly through a few open source projects, and which one you use depends on your TV brand.

### Android TV and Google TV

The one getting the most attention is [Clean Your TV](https://github.com/Gathin23/cleanyourtv), also called tv-vibehack. It's a repo built around one long prompt. You paste the prompt into Claude Code or a similar tool and tell it your TV model. It connects to the set over Wi-Fi and then:

- backs up what's installed
- asks which apps you actually use
- switches off the manufacturer's ad and telemetry packages
- installs a plain launcher as the home screen

The author says nothing gets deleted, and a restore script turns it all back on.

A developer named Mert Cobanov [reportedly did something similar](https://www.itechpost.com/articles/237433/20260928/how-use-claude-code-debloat-your-smart-tv-without-removing-critical-tv-bloatware.htm) on a Google TV, telling Claude not to uninstall anything and to keep a change log.

### LG webOS

A similar repo is available for LG TVs. A developer named OmkarK97 ported the launcher to webOS as [webos-vibehack](https://github.com/OmkarK97/webos-vibehack), tested on an LG OLED C6. LG locks its system down more than Google does, so it works differently:

- You install it through LG's own Developer Mode with a free developer account. Nothing is rooted, and firmware updates keep working.
- There's no debloat step, because webOS can't disable packages. You turn off LG's ad and viewing-data options in the settings instead.
- webOS always sends the Home button to LG's home screen. To get around that, a small script on another device on your network watches the TV and switches back to the new launcher within a fraction of a second.

If you're willing to root the TV, [Glasshouse](https://github.com/rorygallagher2024/glasshouse) goes further, with app removal, an ad and telemetry blocker and a dashboard. I'm not covering that here.

### Tools that don't use AI

There are also tools that do the same job with buttons, like [ADB AppControl](https://adbappcontrol.com/en/tv/) and [Android TV Tools](https://www.androidauthority.com/android-tv-tools-windows-tool-3411045/). The scripts and package lists have existed for years. What changed is that you no longer need to know which of 200 cryptic package names is safe to turn off. The agent reads the list, sorts it, and asks you about the ones it isn't sure of.

### Why now

Smart TVs use a technology called automatic content recognition, or ACR, to track what's on your screen. In December 2025 Texas [sued five TV makers over it](https://therecord.media/texas-sues-5-smart-tv-makers-over-acr-tech), alleging it was switched on during setup without clear consent. Those are allegations, and the cases are still going. Turning ACR off is the first thing in the no-tools section below.

## Before you start

I'm a designer, not a lawyer, and I'm not affiliated with any TV maker or any of the projects above. This is for your own TV, for personal use and for learning how it works. Changing system software can void a warranty, break an app, stop firmware updates, or in a bad case leave the TV stuck on a boot screen. Terms of service differ by manufacturer, so read yours. If you do this, you do it at your own risk.

The step-by-step below is for Android TV and Google TV, which covers Sony, TCL, Hisense, Philips, Nvidia Shield and a lot of others. LG has its own section after it. Fire TV gets the debloat half only, since Amazon won't let you swap the home screen. I haven't found a comparable project for Samsung's Tizen, so on a Samsung the settings route is your best option.

## The no-tools version

Start here. It takes five minutes and needs no code.

Open your TV's settings and turn off anything about viewing information, interest-based ads, personalized recommendations or content recognition. The names change by brand and the menus are buried, so try searching the settings for "ads" and "viewing."

On an LG, the webos-vibehack docs give these two places, though the names vary a little by webOS version:

- Settings, General, System, Additional Settings, Home Settings: turn off Home Promotion and Content Recommendation.
- Settings, Support, Privacy & Terms, User Agreements: untick Viewing Information and Interest-Based Recommendations.

## The step-by-step

**1. Turn on debugging.** Go to Settings, System, About, and tap Build several times until it says you're a developer. Then open Developer options and switch on USB debugging and, if it's listed, Network or Wireless debugging. Write down the TV's IP address from the network settings.

**2. Put adb on your computer.** It's Google's free command-line tool for talking to Android devices, part of the platform-tools download. Check that it runs:

```
adb version
```

**3. Connect.** Use the IP address you wrote down:

```
adb connect YOUR.TV.IP.ADDRESS:5555
```

The TV will ask whether to allow this computer. Say yes. Newer versions of Android use a pairing code first, and your TV shows it on screen.

**4. Back up before touching anything.** This is the step people skip. Save the full package list to a file:

```
adb shell pm list packages -f > before.txt
```

Keep that file somewhere you'll find it.

**5. Hand it to Claude Code.** Open a terminal in an empty folder and describe the job in plain words. Mine looked roughly like this:

> My TV is connected over adb at this address. List every installed package and sort them into three groups: needed for the TV to boot and update, apps I use, and ads, telemetry or preloaded junk. Don't change anything yet. Show me the third group and explain each item. When I approve, disable packages with pm disable-user, never uninstall, do it in small batches, and write every change to a log file so it can be reversed.

The important parts are "don't change anything yet" and "disable, never uninstall." A disabled package can come back with one command. An uninstalled one can't.

**6. Read the list yourself.** The agent will be confident about most items and unsure about a few. Take the unsure ones seriously. Anything with "setup," "provision," "launcher," "update," or the manufacturer's name in it deserves a second look.

**7. Disable in small batches and test.** After each batch, check that the TV still wakes up, opens your streaming apps, and plays sound. If something breaks, you know which batch did it.

**8. Optional: swap the launcher.** This is what makes the TV feel different, since the ads live on the home screen. The projects above install a plain launcher with a few rows of apps. One warning from the Clean Your TV page is worth repeating: if you disable the stock launcher, make sure a replacement is already running and set as default, and don't disable the setup wizard along with it, or some Google TVs can end up in a crash loop.

**9. Know your way back.** To undo a package, use the enable command with the package's name:

```
adb shell pm enable PACKAGE.NAME
```

If the TV stops responding to your computer, go to Settings, Apps, find the disabled ones and re-enable them from the TV itself. When you're done, turn USB debugging off again.

## If you have an LG

The webOS route is closer to installing an app than modifying the system. Here is the short version of what webos-vibehack asks for, and its README has the exact commands.

1. Make a free account on LG's developer site, install the Developer Mode app from the LG Content Store on the TV, and sign in.
2. Turn on Dev Mode Status (the TV restarts), then turn on Key Server and note the IP address and passphrase it shows.
3. On a Mac on the same Wi-Fi, connect with LG's ares command-line tool, then clone the repo and run its install script. Right now the install steps are macOS only.
4. Accept the pairing prompt on the TV. The script reads your installed apps and builds the launcher around them.
5. Optionally run the Home-button watcher on something that stays on, like a Raspberry Pi. Without it, Home still opens LG's screen and the new launcher is one more app you open yourself.

Two things to know. Developer Mode sessions expire, so every so often you'll open the app and press Extend Session Time or your installed apps stop launching. And the README says deleting the Developer Mode app removes everything, which is the undo button here. It also says pairing can fail on newer firmware and offers a workaround, so read the troubleshooting section before you assume something is broken.

## What I take from this

I keep thinking about how much work this takes. A person has to enable developer mode, run commands, and trust an AI with a device in their living room, all to get a home screen that doesn't show ads. That is a lot to ask for what used to be the default experience.

None of those decisions were made by a villain, and I'd defend most of the people in those meetings. But every row added is a small trade between what the user needs and what the quarter needs, and the user doesn't get a vote. Now they're voting with a terminal.

If you work on a product like this, treat that as a signal. When your customers start modifying the device to get the experience you shipped without the extras, the extras have a cost, and it isn't on your dashboard yet.
