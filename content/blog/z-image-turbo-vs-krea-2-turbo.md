---
title: "Z-Image Turbo vs Krea 2: Why Short Prompts Look Fake (8 Tests)"
seoTitle: "Krea 2 vs Z-Image Turbo: Short vs Detailed Prompts"
description: "8 everyday scenes, same seeds, on a 16 GB RTX 5080. Short prompts made both models look staged. Adding camera and lighting details fixed most of it."
date: "2026-10-30"
image: "/images/zimage-vs-krea/zimage-vs-krea-hero.jpg"
tags: ["AI images","ComfyUI"]
---

Krea 2 Turbo turned a laundromat into a cartoon. Nothing in the prompt asked for one. It was a short, plain description of a student folding towels at night, the kind most people type.

I ran Krea 2 Turbo against Z-Image Turbo on eight everyday scenes. Both make an image in 8 steps. With short prompts, both made pictures that look real at a glance and staged up close: smiling people lined up like extras, postcard skylines, garbled signs. Then I rewrote the same eight prompts with details about the light, the camera and what each person is doing, and kept the same seeds. Most of the fake look went away.

With the detailed prompts, Krea was slightly better. It followed directions like "flat ugly light" and "ordinary face" more closely. Z-Image was about twice as fast, at 6 seconds an image against 13.

I think most of the "AI look" people complain about comes from the prompt, not the model. Two different models made the same mistakes from the same short prompts, and both mostly stopped making them when I described the light and the camera.

![Krea 2 Turbo, round 2 record store prompt, made at 16:9 for this header](/images/zimage-vs-krea/zimage-vs-krea-hero.jpg#wide)

I also tried 11 film and camera looks, from Polaroid to a RED cinema camera, on both models. That's a separate post: [Film and camera prompts tested](/blog/film-camera-prompts-z-image-vs-krea-2).

## How I tested

Both ran in ComfyUI on an RTX 5080 with 16 GB of VRAM. Z-Image Turbo was the bf16 build at 8 steps, CFG 1, `res_multistep` and shift 3. Krea 2 Turbo was the fp8 build from [Comfy-Org/Krea-2](https://huggingface.co/Comfy-Org/Krea-2) at 8 steps, CFG 1 and `euler`. No LoRAs and no negative prompts. Each prompt used the same seed on both models at 832×1040, and every image is the first seed with no re-rolls or fixes.

In each grid below, the short prompt is on top and the detailed prompt is underneath. Z-Image is on the left and Krea on the right.

## Fishing at dawn

> Short: *an old man in a faded baseball cap sitting on a wooden dock at dawn holding a fishing rod, thermos beside him, mist on a still lake, quiet everyday moment*
>
> Detailed adds: *early dawn with weak blue light, the sun not up yet, his face mostly in shadow, shot on an iPhone, slightly underexposed, a little noise in the shadows, ordinary wrinkled face*

![Fishing dock: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-fishing-dock.jpg#wide)

The short versions are pretty and look like a calendar, with perfect mist and a clean side profile. Krea's hands and reel are more convincing. The detailed versions trade the glow for cold blue light before sunrise, and both look like someone actually took them.

## Laundromat at night

> Short: *a college student folding towels at a laundromat late at night, rows of washing machines, buzzing fluorescent lights, tired expression, phone snapshot*
>
> Detailed adds: *a real photograph, harsh flickering overhead fluorescent tubes, greenish color cast, flat ugly light, dark windows behind, under-eye bags, messy hair, shot on a phone at chest height, slightly crooked, slight motion blur on the hands*

![Laundromat: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-laundromat.jpg#wide)

This is the cartoon. Z-Image's short version is a real photo, apart from garbled lettering on the machines. With "a real photograph" and the light described, Krea made the best image in the whole test: green fluorescent light, a stained counter and a tired face. Z-Image's detailed version is solid, but its washers turn into odd open-top tubs.

## Food truck at lunch

> Short: *a cook handing a paper tray of tacos out of a food truck window to a customer, lunchtime line on a sunny sidewalk in Austin, handwritten menu board*
>
> Detailed: *dropped the menu board and added people in line ignoring each other, one looking at her phone, one with his back to the camera, one mid-bite, nobody looking at the camera, harsh noon sun, hard shadows, squinting, candid phone snapshot, awkward crop*

![Food truck: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-food-truck.jpg#wide)

Both menu boards in the short versions are gibberish, with words like "Chekstrive" and "Bridleos." Krea's line is four people standing in a row, all smiling at the customer. The detailed prompt fixed both problems. With no sign there's no fake text, and the people are on their phones, eating or facing away.

## Rooftop garden in Brooklyn

> Short: *a woman in her forties watering tomato plants in buckets on an apartment rooftop garden in Brooklyn, water towers and skyline behind, golden hour*
>
> Detailed: *replaced "skyline behind" with a tar roof, AC units and vent pipes, neighboring brick rooftops, one rusty water tower off to the side and a distant hazy skyline small on the horizon. Added late afternoon sun low from the left, long shadows, her face half in shadow, shot on a phone from across the roof*

![Rooftop garden: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-rooftop-garden.jpg#wide)

The short versions are postcards. Twin spotless water towers stand in front of a Manhattan skyline crammed in right behind the roof, which you wouldn't see from Brooklyn. The detailed versions look like a real roof, with AC units, vent pipes, one rusty tower and the city far away. Krea's long, low shadows are the more convincing light.

## Pond hockey

> Short: *kids playing pickup hockey on a frozen pond in Minnesota, breath visible, snowbanks, one kid in goal with mismatched pads, overcast winter afternoon*
>
> Detailed adds: *flat gray overcast light, no shadows, dull colors, late afternoon getting dark, shot on a parent's phone from the snowbank, slight motion blur on the skaters, a bit of digital noise, nobody posing*

![Pond hockey: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-hockey-kids.jpg#wide)

Z-Image ignored "overcast" in the short version and gave bright sun, and its kids have mushy faces. Krea put the goalie in a real net. In the detailed versions, both look like a parent's phone shot from the snowbank.

## Used record store

> Short: *a man flipping through vinyl records in crowded bins at a cramped used record store, posters on the walls, warm tungsten light, candid*
>
> Detailed: *dropped the posters and added a single warm tungsten bulb overhead mixed with cold daylight from the door, uneven light, dark corners, shot over his shoulder on a phone, focus missed slightly, ordinary face, unwashed hair*

![Record store: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-record-store.jpg#wide)

The short versions have walls of posters with garbled band names. The detailed versions swap them for a bare bulb and the light from the door, and both look like a real cramped shop.

## Hands on a pottery wheel

> Short: *close-up of two hands shaping a clay bowl on a spinning pottery wheel, wet clay splatter, apron, studio window light*
>
> Detailed adds: *dried clay cracking on the knuckles, short dirty fingernails, one window on the left casting hard side light, right side of the frame in shadow, clay dust in the air, shot on an iPhone, slightly soft focus, motion blur on the spinning wheel*

![Pottery hands: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-hands-pottery.jpg#wide)

Hands are still the hard part. Z-Image's fingers melt into clay blobs in both versions. Krea's hands have a better shape but look waxy. The side light in the detailed versions helps both, and Krea's is the more believable picture.

## Bus window at night

> Short: *a teenage girl with headphones looking out of a rain-streaked city bus window at night, blurred streetlights, reflection in the glass*
>
> Detailed adds: *cheap headphones, lit only by the bus's dim overhead fluorescent light, greenish cast, her faint reflection in the dirty glass, ordinary face, a few pimples, tired, shot on a phone from the seat across the aisle, grainy, slightly blurry*

![Bus window: short prompt on top, detailed below; Z-Image left, Krea right](/images/zimage-vs-krea/zimage-vs-krea-bus-window.jpg#wide)

The short versions look like music video stills, with glowing bokeh and model faces. In the detailed version, Krea moved the camera across the aisle and got the dim green light right, but the reflection in the window is a different person looking at the camera. Z-Image ignored "ordinary face, a few pimples" and kept the model face.

## Speed and license

Z-Image Turbo took about 6 seconds an image and Krea 2 Turbo about 13, with each model loaded, from ComfyUI's log.

[Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) is Apache 2.0 and allows commercial use. Krea 2 uses Krea's own community license, which limits commercial use above a revenue threshold, so read it before you sell anything made with it. If you're choosing between these and FLUX, see [Z-Image Turbo vs FLUX 3 klein](/blog/z-image-turbo-vs-flux-3-klein).

## What made the detailed prompts work

I added the same four things to every scene. First, where the light comes from: "one window on the left," "a single bare bulb overhead," "harsh noon sun." Without it, both models fall back to soft, even light with no shadows, and that's a big part of what looks fake. Second, what the light is like, such as "flat ugly fluorescent" or "slightly underexposed." Third, where the camera is: "from across the roof," "over his shoulder," "from the snowbank." Fourth, what each person is doing, plus "ordinary face" and a flaw or two.

I also took out anything with lettering. Every sign, menu, poster and machine label in the short prompts came out garbled on both models. That includes words that only suggest a sign. In my film test, "24-hour diner" became "24-HOUR" painted on the window.

*Tested October 30, 2026, on an RTX 5080 with 16 GB of VRAM.*
