---
title: "Film and camera prompts tested: Polaroid, Portra, Cinestill, Leica and RED on Z-Image and Krea 2"
seoTitle: "Film Photo AI Prompts Tested: Portra 400, Polaroid, Leica, RED"
description: "Same prompt, same seed, 11 film and camera looks added to the end, on Z-Image Turbo and Krea 2 Turbo. Which names change the look, which just add polish, and which draw a camera into your photo."
date: "2026-10-30"
image: "/images/film-looks/film-looks-hero.jpg"
tags: ["AI images","ComfyUI"]
---

I typed "shot on a RED cinema camera" at the end of a prompt about a roadside peach stand, and Z-Image drew a RED camera on the tailgate of the truck.

Prompt guides often say to add a camera or film name, like "shot on a Leica" or "Kodak Portra 400," to make an AI image look like real film. My guess going in was that it's mostly placebo, words people copy from each other's prompts. That turned out to be half right. I took one day scene and one night scene, kept the prompt and seed the same, and added 11 different looks to the end. I ran every version on Z-Image Turbo and Krea 2 Turbo, the two models from my [Z-Image Turbo vs Krea 2 test](/blog/z-image-turbo-vs-krea-2-turbo).

Film names work. Polaroid, Tri-X, Cinestill and Portra changed the look on both models in ways you'd recognize. Professional and cinema camera names mostly don't. On Krea they made the picture a little cleaner, and on Z-Image they sometimes put the camera in the scene. Krea was the better model for this, because it kept the same people and layout and only changed the look.

![Krea 2 Turbo with "Cinestill 800T" added to the prompt](/images/film-looks/film-looks-hero.jpg#wide)

## How I tested

Both models ran in ComfyUI on an RTX 5080 with 16 GB of VRAM. Z-Image Turbo used 8 steps, CFG 1, `res_multistep` and shift 3. Krea 2 Turbo fp8 used 8 steps, CFG 1 and `euler`. No LoRAs and no negative prompts. The base prompt and seed never changed, only the words added at the end. Every image is 832×1040 and the first seed.

These are the two base prompts:

> Day: *a man in his sixties selling peaches from the back of a pickup truck at a roadside stand in Georgia, a woman picking through a basket, dusty gravel shoulder, late summer afternoon sun, ordinary faces, nobody looking at the camera*
>
> Night: *two friends in their twenties sharing fries at a 24-hour diner booth at 2am, one laughing mid-sentence, the other looking at his phone, ketchup and coffee cups on the table, dark parking lot outside the window, ordinary faces*

Each image below is one look. The day scene is on top and the night scene underneath, with Z-Image on the left and Krea on the right. Click an image to see it larger. I made the header image separately at 16:9, with "late-night diner" in place of "24-hour diner."

## No look added

![No look added: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-none.jpg#wide)

This is the baseline. Krea's peach seller is looking toward the camera, and both diner scenes are clean and evenly lit. Krea painted "24-HOUR" on the diner window, because the words "24-hour diner" were in the prompt.

## iPhone

> *..., shot on an iPhone, phone photo, HDR, slightly over-sharpened*

![iPhone: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-iphone.jpg#wide)

Z-Image made a believable bright phone snapshot. Krea's peach seller now poses for the camera, which works against a candid shot.

## 2000s digicam

> *..., 2000s digital point-and-shoot camera photo, Canon PowerShot, on-camera flash, JPEG artifacts*

![2000s digicam: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-digicam.jpg#wide)

Z-Image got the flat, flash-lit look of an old digital camera, but printed "Canon" on a shirt. Krea again has the seller looking at the camera.

## Disposable camera with flash

> *..., disposable camera photo with on-camera flash, Kodak Gold 200, harsh flash, slight light leak*

![Disposable flash: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-disposable.jpg#wide)

Z-Image's flash snapshot is convincing, though it printed "Kodak" on a cup. Krea changed very little. There's a bit more contrast, but no real flash look.

## Polaroid

> *..., Polaroid instant photo, faded colors, soft focus, chemical color shifts*

![Polaroid: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-polaroid.jpg#wide)

This had the biggest effect on both models: a white instant-film border, faded color and soft focus. Both also pulled the camera back, so the people are smaller in the frame.

## Kodak Portra 400

> *..., shot on Kodak Portra 400 35mm film, film grain, soft warm tones*

![Portra 400: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-portra400.jpg#wide)

Both shifted to warmer, softer film color. It's subtle, and it's the safest choice if you want a real-looking photo without a heavy style.

## Cinestill 800T

> *..., shot on Cinestill 800T film, tungsten balanced, red halation glow around lights, grain*

![Cinestill 800T: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-cinestill.jpg#wide)

At night both got cooler tones and glowing lights, and Krea's red lamps are the best of the set. In daylight, Krea moved the people into a lit box truck to get the tungsten light it was asked for.

## Kodak Tri-X black and white

> *..., black and white photo on Kodak Tri-X 400 film, heavy grain, high contrast*

![Tri-X black and white: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-trix.jpg#wide)

Both made grainy, high-contrast black and white. Z-Image also added a stray glowing sign to the diner window.

## Leica M11

> *..., shot on a Leica M11 with a Summilux 35mm lens, professional documentary photography*

![Leica M11: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-leica.jpg#wide)

Krea barely changed, just got slightly cleaner. Z-Image looks a little more like documentary film.

## Hasselblad

> *..., shot on a Hasselblad medium format camera, 80mm lens, professional editorial photography, rich tonal range*

![Hasselblad: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-hasselblad.jpg#wide)

Krea got cleaner and more polished. Z-Image took it literally and put a camera in the peach seller's hand.

## ARRI Alexa

> *..., shot on an ARRI Alexa 35, cinematic film still, soft contrast, natural skin tones*

![ARRI Alexa: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-arri.jpg#wide)

Both got softer contrast and a slightly graded look. They're more polished, not more real.

## RED V-Raptor

> *..., shot on a RED V-Raptor cinema camera, anamorphic lens, cinematic color grade, film still*

![RED V-Raptor: day top, night bottom; Z-Image left, Krea right](/images/film-looks/film-looks-red.jpg#wide)

This is the one that put a cinema camera on the truck's tailgate, and a monitor on the diner table. Krea barely changed.

## What I'd add to a prompt

For a natural film photo, I'd add "shot on Kodak Portra 400 35mm film, film grain, soft warm tones." For night scenes, Cinestill 800T. For black and white, Tri-X 400. For an instant photo with a border, Polaroid. These worked on both models.

For a cheap flash snapshot, the disposable camera wording worked on Z-Image. On Krea it made people look at the camera.

I'd leave out Leica, Hasselblad, ARRI, RED, "cinematic" and "professional" if you want something that looks like real film. They made Krea more polished, and Z-Image drew cameras into the scene.

On Z-Image, it's probably better to describe the film than name the brand, since it printed "Kodak," "KODAX" and "Canon" onto cups, crates and shirts. Something like "35mm film photo, visible grain, slightly faded colors, soft highlights" is where I'd start. I didn't test that wording here.

A film name won't fix a staged scene. It works best on top of a prompt that already says where the light comes from, where the camera is and what people are doing, which my [Z-Image Turbo vs Krea 2 test](/blog/z-image-turbo-vs-krea-2-turbo) covers. And if you ask Z-Image for a RED camera, check the tailgate.

*Tested on an RTX 5080 with 16 GB of VRAM.*
