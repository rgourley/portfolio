---
title: "How to make AI images look like movie stills: 100 Z-Image tests"
seoTitle: "Cinematic AI Photo Prompts: A Z-Image Turbo Guide"
description: "Typing 'cinematic' does almost nothing. I ran over 100 16:9 frames through Z-Image Turbo to find what does: the lens, the light source, the grade, the film, and where everyone stands."
date: "2026-10-31"
image: "/images/movie-stills/movie-stills-hero.jpg"
tags: ["AI images","ComfyUI"]
---

The best frame I got all day came from describing how Akira Kurosawa shot weather, not from typing his name. With his name, Z-Image gave me a flat, colorful village scene. With "long telephoto lens, wind blowing rain and cloth across the frame, black and white, hard contrast," it gave me a hooded rider on a stone bridge with the cloak whipping sideways.

I wanted 16:9 frames that look like they came out of a movie, so I ran more than 100 of them through Z-Image Turbo on my RTX 5080. I think the word "cinematic" is close to useless. What works is writing down the decisions a cinematographer would make: where the camera sits, what lens is on it, where the light comes from, what the color grade is and where each person stands.

![Z-Image Turbo, a man leaning on his car at a gas station, with Jean-Pierre Jeunet's color and lens cues](/images/movie-stills/movie-stills-hero.jpg#wide)

## How I tested

Every image is Z-Image Turbo at 1344×768, 8 steps, CFG 1, `res_multistep` and shift 3, with no LoRA. Every image is the first seed, with no re-rolls or fixes. When I compare two versions of a prompt, they share the same seed, so only the words changed. Click any image to see it full size.

## "Cinematic film still" vs the shot written out

I started with ten small drama scenes. Each one ran twice: once as "cinematic film still of" plus the subject, and once with the shot fully described. The short version won zero of ten.

> Short: *cinematic film still of a lone woman walking across a desert highway at dusk*
>
> Written out: *extreme wide shot of a lone woman in a long coat walking across an empty desert highway at dusk, tiny in the frame, low sun behind distant mountains, long shadows, dust in the air, warm orange sky fading to blue, anamorphic lens, horizon in the lower third, muted film color, fine grain*

!["cinematic film still of..."](/images/movie-stills/ms-desert-short.jpg#grid)
![The shot written out](/images/movie-stills/ms-desert-full.jpg#grid)

The short prompt gave her shorts and a flat gray sky, walking straight at the camera like an ad. The long one put her small on the road with the sun on the horizon, which is a shot someone planned.

!["cinematic film still of..."](/images/movie-stills/ms-forest-short.jpg#grid)
![The shot written out](/images/movie-stills/ms-forest-full.jpg#grid)

Same pattern in the fog. The short version is a close-up of a girl staring into the lens. Writing "the red coat the only color in the frame" and "centered composition" turned her into a small red mark between tall pines.

!["cinematic film still of..."](/images/movie-stills/ms-subway-short.jpg#grid)
![The shot written out](/images/movie-stills/ms-subway-full.jpg#grid)

The subway platform got green fluorescent tubes and a train's headlight coming out of the tunnel behind her. The short version is a clean modern station.

Z-Image still got details wrong. My tired detective in a motel room came out as a uniformed police officer in both versions. A family of four at dinner had five kids. An old propeller plane got a modern glass cockpit.

## A framing cheat sheet

Next I tried bigger movies, each with one named framing technique. Most of the names worked. Each image below is captioned with the words that did the work. Click any one to see it full size.

![Extreme wide shot for scale: "extreme wide shot, the ship filling the top half of the frame, the people barely visible specks"](/images/movie-stills/movie-stills-scifi-desert.jpg#grid)
![One-point perspective: "perfectly symmetrical one-point perspective shot down a long corridor, a lone figure in the exact center"](/images/movie-stills/movie-stills-scifi-corridor.jpg#grid)
![Frame within a frame: "shot from inside a dark cabin looking out through the open doorway, the door frame a black border around the sunlit scene"](/images/movie-stills/movie-stills-western-cowboy.jpg#grid)
![Low-angle wide shot: "low-angle wide shot, the knight small in the lower left corner, looking up at an enormous castle"](/images/movie-stills/movie-stills-fantasy-castle.jpg#grid)
![Dutch angle: "tilted dutch angle shot, wide 21mm lens, the flashlight the only light"](/images/movie-stills/movie-stills-horror-hallway.jpg#grid)
![Worm's-eye view: "worm's-eye view from the street looking up, ultra wide lens, people running past in the foreground"](/images/movie-stills/movie-stills-monster-city.jpg#grid)
![Extreme close-up with patterned light: "extreme close-up, hard light through venetian blinds casting stripes of shadow across her face"](/images/movie-stills/movie-stills-noir-blinds.jpg#grid)
![Silhouette against backlight: "the traveler a dark silhouette, shafts of golden light breaking through mist behind them"](/images/movie-stills/movie-stills-fantasy-forest.jpg#grid)
![Over-the-shoulder: "over-the-shoulder shot, the captain a dark silhouette in the foreground, looking out a giant window"](/images/movie-stills/movie-stills-scifi-bridge.jpg#grid)
![Foreground face, deep background: "a face in extreme close-up filling one side of the foreground while the scene stretches deep into the background"](/images/movie-stills/ms-explorer-leone.jpg#grid)
![Handheld close-up: "handheld close-up, other soldiers out of focus behind him, eyes looking up past the camera"](/images/movie-stills/movie-stills-war-trench.jpg#grid)
![Blocking on the thirds: "a detective standing in the foreground on the left third with her back half turned, a suspect sitting at a table on the right third"](/images/movie-stills/ms-crime-kurosawa.jpg#grid)

The scale in the sci-fi desert wasn't something I had to fight for. The white corridor is the cleanest composition in the whole test. The western doorway did exactly what it does in old westerns, though my first version had a rider in a modern helmet who looked ready for a dressage show. Adding "wide-brimmed hat, long dusty duster coat, worn leather saddle, 1880s frontier" fixed it on every seed I tried.

The Dutch angle is subtler than I asked for, but it reads. The one that missed was a car chase I described as a "low-angle shot from the road surface," which came out at normal eye level.

The blocking shot is the one I'd copy most. Writing where each person stands, which way they face and what's between them held up in every version I ran.

## Naming a director does very little

I ran six original scenes twice each. One version said "in the style of a [director] film." The other wrote out what that director's films look like. Writing it out won all six.

!["in the style of an Akira Kurosawa film"](/images/movie-stills/ms-kurosawa-named.jpg#grid)
![His visual traits written out](/images/movie-stills/ms-kurosawa-described.jpg#grid)

With his name, Z-Image made villagers sitting in a circle, in color, on a calm day. Written out, with the telephoto lens, rain blown sideways, deep focus and black and white, it looks like a Kurosawa frame.

!["in the style of a Stanley Kubrick film"](/images/movie-stills/ms-kubrick-lyndon-named.jpg#grid)
![The Barry Lyndon traits written out](/images/movie-stills/ms-kubrick-lyndon-described.jpg#grid)

"In the style of a Stanley Kubrick film" gave me card players under normal room light. Writing "lit only by clusters of candles, very shallow depth of field, composed like an 18th-century oil painting" got the *Barry Lyndon* look.

These first tests also copied the directors' subjects, like samurai, gunfighters and aristocrats in wigs. That's the wrong lesson to take from them. What's worth borrowing is how they shot, not what they shot.

## The same shot in eight film languages

So I fixed the subject and the seed and changed only the camera, light, color and film. Each scene below ran with these eight additions, pasted after the scene description. Copy any of them:

Kurosawa cues

```text
long telephoto lens compressing the background, strong wind blowing dust, rain or cloth across the frame, everything in deep focus, black and white, hard contrast, heavy 1950s film grain
```

David Lean cues

```text
extreme wide shot from very far away, the person tiny and the landscape filling almost the whole frame, large-format 65mm film, deep focus, low sun with a pink and gold sky and long blue shadows, rich saturated color
```

Sergio Leone cues

```text
a face in extreme close-up filling one side of the foreground while the rest of the scene stretches deep into the background, both in focus, harsh light, bleached yellow and brown palette, widescreen, coarse grain
```

Jean-Pierre Jeunet cues

```text
wide-angle lens close to the subject so the background bends around them, heavy saturated grade of emerald green and golden amber with deep red accents, warm glowing light, slightly off-kilter playful composition, film grain
```

Barry Lyndon cues

```text
lit only by candles and soft window light, very shallow focus from an extremely fast lens, everything outside the light falling into warm darkness, soft painterly look like an 18th-century oil painting, muted warm colors, fine grain
```

Wong Kar-wai cues

```text
shot through smeared glass, step-printed motion blur on everything moving, saturated red and green neon light, tight intimate handheld framing, heavy grain, 1990s
```

Modern anamorphic blockbuster

```text
anamorphic lens with oval bokeh and long horizontal blue lens flares, fast tungsten motion picture film, teal shadows and warm orange highlights, low camera angle, very wide widescreen framing, modern big-budget cinematography
```

1970s 35mm

```text
1970s 35mm film, slow zoom lens, warm faded colors with brown and amber tones, soft contrast, visible grain, available light only, gritty realism
```

Every subject was placed on the left or right third of the frame and told to look away from the camera.

If you run ComfyUI, [download the workflow](/downloads/z-image-turbo-movie-stills-8-looks.json) and drag it onto the canvas. It has one box for your scene and makes all eight looks from the same seed in about a minute on a 16 GB card. It needs [Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo), the Qwen3 4B text encoder and the Z-Image VAE. With the scene and seed it ships with, it reproduces the rider below exactly.

![Rider, Kurosawa cues](/images/movie-stills/ms-rider-kurosawa.jpg#grid)
![Rider, David Lean cues](/images/movie-stills/ms-rider-lean.jpg#grid)
![Rider, Sergio Leone cues](/images/movie-stills/ms-rider-leone.jpg#grid)
![Rider, Jean-Pierre Jeunet cues](/images/movie-stills/ms-rider-jeunet.jpg#grid)
![Rider, Barry Lyndon cues](/images/movie-stills/ms-rider-lyndon.jpg#grid)
![Rider, Wong Kar-wai cues](/images/movie-stills/ms-rider-wkw.jpg#grid)
![Rider, Modern anamorphic blockbuster](/images/movie-stills/ms-rider-anamorphic.jpg#grid)
![Rider, 1970s 35mm](/images/movie-stills/ms-rider-seventies.jpg#grid)

The Kurosawa version of the rider is the one I described at the top of this post. The horse is standing on the bridge wall instead of the walkway, which is easy to miss and impossible to unsee.

![Explorer, Kurosawa cues](/images/movie-stills/ms-explorer-kurosawa.jpg#grid)
![Explorer, David Lean cues](/images/movie-stills/ms-explorer-lean.jpg#grid)
![Explorer, Sergio Leone cues](/images/movie-stills/ms-explorer-leone.jpg#grid)
![Explorer, Jean-Pierre Jeunet cues](/images/movie-stills/ms-explorer-jeunet.jpg#grid)
![Explorer, Barry Lyndon cues](/images/movie-stills/ms-explorer-lyndon.jpg#grid)
![Explorer, Wong Kar-wai cues](/images/movie-stills/ms-explorer-wkw.jpg#grid)
![Explorer, Modern anamorphic blockbuster](/images/movie-stills/ms-explorer-anamorphic.jpg#grid)
![Explorer, 1970s 35mm](/images/movie-stills/ms-explorer-seventies.jpg#grid)

The David Lean cues only work when there's a landscape to get lost in. Here they do: a tiny figure, a huge dome and the sun right behind it. Jeunet's green sky and amber ground turn the same desert into something from a children's book.

![Kitchen, Kurosawa cues](/images/movie-stills/ms-kitchen-kurosawa.jpg#grid)
![Kitchen, David Lean cues](/images/movie-stills/ms-kitchen-lean.jpg#grid)
![Kitchen, Sergio Leone cues](/images/movie-stills/ms-kitchen-leone.jpg#grid)
![Kitchen, Jean-Pierre Jeunet cues](/images/movie-stills/ms-kitchen-jeunet.jpg#grid)
![Kitchen, Barry Lyndon cues](/images/movie-stills/ms-kitchen-lyndon.jpg#grid)
![Kitchen, Wong Kar-wai cues](/images/movie-stills/ms-kitchen-wkw.jpg#grid)
![Kitchen, Modern anamorphic blockbuster](/images/movie-stills/ms-kitchen-anamorphic.jpg#grid)
![Kitchen, 1970s 35mm](/images/movie-stills/ms-kitchen-seventies.jpg#grid)

Barry Lyndon cues finally made sense indoors at night: a single candle on the table and warm darkness around her. Lean's cues had nothing to work with in a kitchen, so Z-Image put a giant sunset in the window.

![Alley, Kurosawa cues](/images/movie-stills/ms-alley-kurosawa.jpg#grid)
![Alley, David Lean cues](/images/movie-stills/ms-alley-lean.jpg#grid)
![Alley, Sergio Leone cues](/images/movie-stills/ms-alley-leone.jpg#grid)
![Alley, Jean-Pierre Jeunet cues](/images/movie-stills/ms-alley-jeunet.jpg#grid)
![Alley, Barry Lyndon cues](/images/movie-stills/ms-alley-lyndon.jpg#grid)
![Alley, Wong Kar-wai cues](/images/movie-stills/ms-alley-wkw.jpg#grid)
![Alley, Modern anamorphic blockbuster](/images/movie-stills/ms-alley-anamorphic.jpg#grid)
![Alley, 1970s 35mm](/images/movie-stills/ms-alley-seventies.jpg#grid)

Wong Kar-wai's red and green split light is the strongest version of the alley. The Leone cues do the same thing every time: Z-Image adds a stranger's head in the foreground. It's the right structure, and after the third one it gets funny.

![Interrogation, Kurosawa cues](/images/movie-stills/ms-crime-kurosawa.jpg#grid)
![Interrogation, David Lean cues](/images/movie-stills/ms-crime-lean.jpg#grid)
![Interrogation, Sergio Leone cues](/images/movie-stills/ms-crime-leone.jpg#grid)
![Interrogation, Jean-Pierre Jeunet cues](/images/movie-stills/ms-crime-jeunet.jpg#grid)
![Interrogation, Barry Lyndon cues](/images/movie-stills/ms-crime-lyndon.jpg#grid)
![Interrogation, Wong Kar-wai cues](/images/movie-stills/ms-crime-wkw.jpg#grid)
![Interrogation, Modern anamorphic blockbuster](/images/movie-stills/ms-crime-anamorphic.jpg#grid)
![Interrogation, 1970s 35mm](/images/movie-stills/ms-crime-seventies.jpg#grid)

This one tests blocking. The prompt put the detective in the left foreground with her back half turned and the suspect seated on the right, under one bare light, with an empty chair between them. All eight versions kept that staging. Writing where each person stands is one of the most reliable things you can put in a prompt. The detective still became a uniformed officer, two versions printed "POLICE" on her back, and the anamorphic version doubled the suspect.

![Bus stop, Kurosawa cues](/images/movie-stills/ms-busstop-kurosawa.jpg#grid)
![Bus stop, David Lean cues](/images/movie-stills/ms-busstop-lean.jpg#grid)
![Bus stop, Sergio Leone cues](/images/movie-stills/ms-busstop-leone.jpg#grid)
![Bus stop, Jean-Pierre Jeunet cues](/images/movie-stills/ms-busstop-jeunet.jpg#grid)
![Bus stop, Barry Lyndon cues](/images/movie-stills/ms-busstop-lyndon.jpg#grid)
![Bus stop, Wong Kar-wai cues](/images/movie-stills/ms-busstop-wkw.jpg#grid)
![Bus stop, Panavision anamorphic, Kodak Vision3 500T](/images/movie-stills/ms-busstop-panavision.jpg#grid)
![Bus stop, 1970s 35mm](/images/movie-stills/ms-busstop-seventies.jpg#grid)

In this earlier version I named the film and lens brands, "Panavision" and "Kodak Vision3 500T." The flares look right, and a garbled "Kodk" logo showed up on the bus. Brand names turn into text. Describing the lens and the film without the names kept the look and lost the logo.

## The fuel hose

The header image took six rounds. The first version had the man holding the fuel nozzle against his chest. Describing the nozzle "plugged into the fuel cap on the rear fender" put it on the front door in four out of four seeds. Then I wrote "no fuel hose or nozzle in the frame," and got four pictures of fuel hoses. Naming a thing, even to rule it out, puts it in the picture. What finally worked was moving him to the hood and never mentioning the hose at all.

*Tested October 31, 2026, on an RTX 5080 with 16 GB of VRAM.*
