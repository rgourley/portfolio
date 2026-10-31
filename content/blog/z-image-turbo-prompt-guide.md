---
title: "Z-Image Turbo prompt guide: I built one prompt a piece at a time to see what each part does"
seoTitle: "Z-Image Turbo Prompt Guide: What Each Part Actually Does"
description: "One deep-sea diver, one bus stop, one seed. Each step adds one part of the prompt so you can see exactly what it changes, plus nine shot types to copy and the mistakes that cost me the most time."
date: "2026-10-31"
image: "/images/prompt-guide/prompt-guide-hero.jpg"
tags: ["AI images","ComfyUI"]
---

I typed "a deep-sea diver at a bus stop" into Z-Image Turbo, and it put the bus stop at the bottom of the ocean.

That's a fair reading of seven words. It's also the problem with most prompts. Z-Image fills every gap you leave with the most common version of the thing, and the most common version of a diver is underwater, in modern scuba gear, lit like an aquarium. Everything I wanted, the brass helmet, the empty country road, the sun going down behind him, had to be written down.

![A deep-sea diver in a brass helmet at a rural bus stop at golden hour, from a worm's-eye view](/images/prompt-guide/prompt-guide-hero.jpg#wide)

Most Z-Image prompt guides tell you to write four parts: subject, lighting, camera, film. That's right, as far as it goes. What they don't show you is what each part does to the picture, because they paste example prompts without the images that came out. So I built one prompt a piece at a time, on the same seed, and kept every result.

Everything here is [Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) at 1344×768, 8 steps, CFG 1, on my RTX 5080. First seed, no fixes. Click any image to see it full size.

## One prompt, built in six steps

### 1. The idea

```text
a deep-sea diver at a bus stop
```

![Step 1: the bare idea. The bus stop is underwater.](/images/prompt-guide/pg-step-1-idea.jpg#wide)

This is what you get for a short prompt: the model's default. It's not wrong. It just isn't yours.

### 2. Who, wearing what, where

```text
a deep-sea diver in a dented old brass helmet and canvas suit sitting alone on the bench of a rural bus stop, water dripping onto the road, empty fields all around
```

![Step 2: the subject and place described. He's on dry land now, under flat gray light.](/images/prompt-guide/pg-step-2-subject.jpg#wide)

He's out of the water, and the helmet is the old brass kind. "Water dripping onto the road" put puddles under the bench, which is the detail that makes it funny. But the light is flat and gray, because I didn't say anything about it.

### 3. Where the light comes from

```text
..., golden hour, the sun low directly behind him, glowing backlight on the brass, long shadows stretching across the road, warm dust in the air
```

![Step 3: light added. Golden hour from behind.](/images/prompt-guide/pg-step-3-light.jpg#wide)

This is the biggest jump of the six. I put light third on purpose. In my earlier tests I added it near the end, and three steps in a row looked the same dull gray. Name where the light comes from, not just the mood. "Nice lighting" gives Z-Image nothing. "The sun low directly behind him" gives it a direction, a color and a shadow.

### 4. The camera, written first

```text
worm's-eye view from the road surface looking up, ultra wide lens, a deep-sea diver ...
```

![Step 4: a worm's-eye view from the road.](/images/prompt-guide/pg-step-4-camera.jpg#wide)

The camera words go at the front of the prompt. My first version had "low angle" tacked onto the end of a long prompt, and Z-Image ignored it completely. With the angle written first, it took. In my tests, Z-Image paid more attention to what came first.

### 5. Blocking: where he sits and where he looks

```text
..., the helmet turned down the empty road away from the camera, small in the lower right of the frame with a huge sky above, ...
```

![Step 5: blocking added. He's smaller and looking away down the road.](/images/prompt-guide/pg-step-5-blocking.jpg#wide)

This is the step other guides skip. If you don't say where a person looks, Z-Image often has them look at the lens, and that's what makes AI images feel like stock photos. Say which part of the frame they're in, and that they're looking away.

### 6. The film look

```text
..., fast tungsten motion picture film, teal shadows and warm orange highlights, film grain
```

![Step 6: the film look. Teal shadows, warm highlights, grain.](/images/prompt-guide/pg-step-6-look.jpg#wide)

The grade comes last, and it does the least. That surprised me. When my early tests looked fake, I blamed the color. It was almost always the light or the blocking.

## Same shot, different light

Light is where I'd spend your words. Same prompt and seed as above, only the light changed:

![Golden hour, the sun low behind him](/images/prompt-guide/pg-light-golden.jpg#grid)
![Night, lit only by the bus stop's single fluorescent tube](/images/prompt-guide/pg-light-tube.jpg#grid)
![Night, a car's headlights coming down the road toward him](/images/prompt-guide/pg-light-headlights.jpg#grid)
![Blue hour after sunset, no lights on yet](/images/prompt-guide/pg-light-bluehour.jpg#grid)

```text
golden hour, the sun low directly behind him, glowing backlight, long shadows stretching across the road
```

```text
night, lit only by the bus stop's single flickering fluorescent tube, the fields pitch black
```

```text
night, the bright headlights of a car coming down the road straight toward him, long shadows behind him
```

```text
deep blue hour after sunset, the sky still glowing on the horizon, no lights on yet
```

Each one is a different scene, even though nothing else moved.

## Camera angles are less reliable

I'd like to tell you every angle works. It doesn't. Same diver, same seed, camera words first:

![Close-up from the side, 85mm lens: this one worked](/images/prompt-guide/pg-cam-closeup.jpg#grid)
![Extreme wide shot from far across the field: barely wider than before](/images/prompt-guide/pg-cam-far.jpg#grid)
![Tilted Dutch angle: not tilted](/images/prompt-guide/pg-cam-dutch.jpg#grid)

The close-up worked. The extreme wide shot only pulled back a little, and the Dutch angle didn't tilt at all. With a lot of detail about the subject in the prompt, Z-Image tends to keep the subject at a comfortable size no matter what you ask. The worm's-eye view in step 4 worked because I put it first and kept it simple. If an angle matters, put it first and say it plainly. If it still doesn't land, change the seed before you rewrite the prompt.

## Nine shot types to copy

Each of these is the full prompt, with "35mm motion picture film, fine grain" added at the end.

![Insert / product shot](/images/prompt-guide/pg-shot-insert.jpg#grid)
![Close-up](/images/prompt-guide/pg-shot-closeup.jpg#grid)

```text
top-down flat lay product shot of a vintage steel dive watch on the weathered teak deck of a sailboat beside a coiled rope, the complete steel bracelet closed in an oval, the whole watch fully inside the frame with empty deck on every side, no hands, no person, water drops on the crystal and the wood, golden hour light raking across the deck, 50mm lens
```

```text
close-up of a woman's face in a dark room lit only by the flame of a match she is lifting to a candle, warm light on her cheek and eyes, everything else black, 85mm lens, very shallow focus
```

For the watch, my first versions cropped the bracelet or added a wrist cut off at the edge of the frame. "Top-down flat lay" and "the whole watch fully inside the frame with empty deck on every side" fixed both.

![Establishing shot](/images/prompt-guide/pg-shot-establishing.jpg#grid)
![Two-shot](/images/prompt-guide/pg-shot-twoshot.jpg#grid)

```text
extreme wide establishing shot of a lone white lighthouse on a cliff above a stormy sea at blue hour, its beam cutting through rain, waves breaking far below, long telephoto lens
```

```text
medium two-shot through the windshield of a father and his teenage daughter sitting in silence in a parked pickup truck at night in the rain, lit only by the green dashboard glow, both looking away from each other out their own windows, rain streaks on the glass, 35mm lens
```

My first two-shot was two old friends laughing in a red convertible on a coast road. It looked exactly like a prescription drug ad. A two-shot needs something between the people. Silence works.

![Over-the-shoulder](/images/prompt-guide/pg-shot-ots.jpg#grid)
![Point of view](/images/prompt-guide/pg-shot-pov.jpg#grid)

```text
over-the-shoulder shot from behind a painter standing at an easel on a cliff above the sea, her shoulder and brush dark and soft in the foreground, the half-finished painting and the real sunset beyond, 50mm lens
```

```text
point of view shot looking straight down from the very top of a tall concrete diving tower, the outdoor pool tiny and far below, dizzying height, bare toes curled over the edge of the platform at the bottom of the frame, swimmers like specks in the turquoise water, golden hour, ultra wide lens
```

The first diving board version looked a meter above the water. "Very top of a tall concrete diving tower," "tiny and far below" and "swimmers like specks" gave it height.

![Overhead](/images/prompt-guide/pg-shot-overhead.jpg#grid)
![Architecture, exterior](/images/prompt-guide/pg-shot-exterior.jpg#grid)

```text
top-down overhead shot of a long wooden table set for a summer dinner party in a garden at dusk, candles, bowls of pasta, bread, wine glasses, hands reaching for food, string lights at the edges
```

```text
wide exterior shot of a 1960s mid-century modern house in the desert at blue hour, seen from across the front garden, the house set back behind cactus, agave and a gravel path, low flat roof with a deep overhang, a rough stone wall, warm lamp light glowing through the glass with only hints of furniture inside, a vintage car parked in the carport, palm trees against the deep blue sky, eye-level camera, 35mm lens
```

The house took two tries. My first prompt asked for glass walls glowing with lamp light, and Z-Image opened the whole living room up to the camera like a dollhouse. Pushing the house back behind the garden and asking for "only hints of furniture inside" made it look like a real photo of a real house.

![Architecture, interior](/images/prompt-guide/pg-shot-interior.jpg#wide)

```text
wide shot of a grand empty old library with tall wooden shelves and rolling ladders, shafts of morning sunlight through high windows with dust in the air, one person reading at a long table far away, symmetrical one-point perspective
```

## The mistakes that cost me the most time

### Naming film and camera brands

A lot of guides tell you to write "shot on Kodak Portra 400." On Z-Image, brand names can turn into text in the picture. In my [film and camera test](/blog/film-camera-prompts-z-image-vs-krea-2), it printed "Kodak" on a coffee cup, "Canon" on a shirt, and drew a whole RED cinema camera on the back of a truck.

![Z-Image with "disposable camera, Kodak Gold 200": "Kodak" ended up printed on a cup](/images/film-looks/film-looks-disposable.jpg#wide)

It doesn't happen every time. This diver came out almost identical both ways:

![The diver with "shot on Kodak Portra 400"](/images/prompt-guide/pg-brand.jpg#grid)
![The diver with "35mm color film photo, visible grain, slightly faded warm colors, soft highlights"](/images/prompt-guide/pg-described.jpg#grid)

A diver on an empty road gives it nowhere to print a logo. A kitchen full of cups and cereal boxes does. Describing the film gets you the same look with no risk, so that's what I use.

### Writing "no" in the prompt

Z-Image Turbo has no negative prompt. It runs at CFG 1, and at CFG 1 the negative prompt isn't used at all. So people write "no text" or "no people" into the main prompt instead, and it backfires. Naming a thing, even to rule it out, puts it in the picture.

![The prompt said "no fuel hose or nozzle in the frame"](/images/prompt-guide/pg-nohose.jpg#wide)

I wrote "no fuel hose or nozzle in the frame" and got this, on all four seeds. What finally worked was moving him to the hood of the car and never mentioning the hose at all. Describe what you want, not what you don't. If you really need a negative prompt, the slower [Z-Image base](/blog/z-image-turbo-vs-z-image-base) model supports one.

### Writing "cinematic"

![Short: "cinematic film still of a lone woman walking across a desert highway at dusk"](/images/movie-stills/ms-desert-short.jpg#grid)
![The shot written out: extreme wide shot, tiny in the frame, low sun behind distant mountains, anamorphic lens, horizon in the lower third](/images/movie-stills/ms-desert-full.jpg#grid)

"Cinematic film still of" got me a woman walking straight at the camera under a gray sky, like a jeans ad. Writing down the actual decisions, how far away the camera is, where the sun is, where the horizon sits, got me a shot someone planned. I tested that across [more than 100 movie stills](/blog/z-image-turbo-cinematic-movie-stills), and "cinematic" lost every time.

### Words that imply lettering

Signs, menus, posters, book covers and machine labels almost always come out as garbled fake words. That includes words that only suggest a sign. "24-hour diner" got "24-HOUR" painted on the window. Leave lettering out of the prompt and add any real text afterward.

## The order I use now

```text
[camera: shot size, angle, lens], [who, wearing what, doing what, where], [where they sit in the frame and where they look], [where the light comes from], [the film look, described not named]
```

If you'd rather pick than type, my [free ComfyUI workflow](/downloads/z-image-turbo-movie-stills-8-looks.json) has all of this as dropdowns: shot size, angle, lens, placement, where they look, 27 lighting setups and weather. It builds the prompt for you and renders it in eight film looks from one seed.

The diver is still my favorite test. If a prompt can get him out of the ocean and onto the right bench in the right light, it can handle most things.
