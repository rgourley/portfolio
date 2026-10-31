---
title: "The best lighting prompts for realistic AI photos, 25 tested"
seoTitle: "Best Lighting Prompts for Realistic AI Images (25 Tested)"
description: "25 lighting prompts for realistic AI images, tested on two scenes where only the light changes. Golden hour, sunset, fog, streetlights, an open fridge at night, plus the prompts that failed and why. Made with Z-Image Turbo."
date: "2026-10-31"
image: "/images/lighting/light-kitchen-dawn.jpg"
tags: ["AI images","ComfyUI"]
---

Same woman, same kitchen, same seed. I changed one phrase in the prompt, and a plain bright morning turned into the first gray-pink light of dawn, the room still dark around her and the coffee the only thing she's awake for. The counter and the window barely moved.

I think light is the part of a prompt people skip most, and it's the part that does the most. In my [movie stills tests](/blog/z-image-turbo-cinematic-movie-stills), the frames that looked fake almost never had a bad grade. They had no light source, so Z-Image lit everything evenly, and even light looks like stock no matter what film you put on top.

So I took two scenes and changed nothing but the light. A woman at a bus shelter on the edge of a small town, always on seed 5151. A woman pouring coffee in a small old kitchen, always on seed 3131. Same camera, same blocking, same film look. Every prompt below is the full prompt, so you can copy it and get the same picture.

All of these were made with Z-Image Turbo, a free open model that runs on your own computer. The seeds only reproduce there. The wording should carry over to other image models, like Flux, Stable Diffusion, ChatGPT or Gemini, because it describes real light the way a photographer would, not a Z-Image trick. I haven't tested them there, so expect different pictures and maybe a phrase or two that needs changing.

## The two base prompts

The light phrase drops into the same spot every time. The bus stop:

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, LIGHT GOES HERE, 35mm lens, 35mm film grain
```

The kitchen:

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, LIGHT GOES HERE, 35mm motion picture film, fine grain
```

I tried a corner grocery store before the bus stop, and it failed in a useful way. The store's lit window became the main light in every night version, so sodium lamps, headlights and rain all came out looking the same. A glowing window in the frame beats whatever light you write. If you want the light to change, keep big bright things out of the scene.

## Daylight, outside

![Overcast](/images/lighting/light-bus-overcast.jpg#grid)
![Hard midday sun](/images/lighting/light-bus-noon.jpg#grid)
![Golden hour](/images/lighting/light-bus-golden.jpg#grid)
![Sunset](/images/lighting/light-bus-sunset.jpg#grid)
![Morning fog](/images/lighting/light-bus-fog.jpg#grid)
![Snow at dusk](/images/lighting/light-bus-snow.jpg#grid)

Overcast

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, flat overcast midday, soft even light, no shadows, 35mm lens, 35mm film grain
```

Hard midday sun

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, harsh midday sun straight overhead, hard short shadows, bright pavement, 35mm lens, 35mm film grain
```

Golden hour

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, golden hour, the warm sun low behind her, glowing backlight, long shadows stretching across the road, 35mm lens, 35mm film grain
```

Sunset

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, the sun just touching the horizon at the end of the road, orange and pink sky, the woman almost a silhouette, 35mm lens, 35mm film grain
```

Morning fog

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, early morning fog, the road fading into white a short way off, soft gray light, 35mm lens, 35mm film grain
```

Snow at dusk

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, snow falling at dusk, fresh snow on the road and the shelter roof, blue shadows, 35mm lens, 35mm film grain
```

Golden hour and sunset are different lights, and Z-Image knows it. Golden hour keeps the sun up behind her, warm on everything, with long shadows across the road. Sunset puts the sun on the horizon and turns her nearly into a silhouette against a pink sky. If you want her lit, ask for golden hour. If you want the sky to be the picture, ask for sunset.

Overcast is the one I'd use least. It's what Z-Image gives you when you say nothing about light, which is why so many AI pictures look like a cloudy Tuesday.

## Night, outside

![Blue hour](/images/lighting/light-bus-bluehour.jpg#grid)
![Sodium streetlight](/images/lighting/light-bus-sodium.jpg#grid)
![The shelter's fluorescent tube](/images/lighting/light-bus-tube.jpg#grid)
![Headlights](/images/lighting/light-bus-headlights.jpg#grid)
![Wet road after rain](/images/lighting/light-bus-rain.jpg#grid)
![Police lights](/images/lighting/light-bus-police.jpg#grid)

Blue hour

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, deep blue hour after sunset, the sky still glowing on the horizon, no lights on yet, 35mm lens, 35mm film grain
```

Sodium streetlight

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, night, lit by a single orange sodium streetlight above the shelter, deep shadows around it, 35mm lens, 35mm film grain
```

The shelter's fluorescent tube

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, night, lit only by the shelter's single fluorescent tube, cold green-white light, the road beyond pitch black, 35mm lens, 35mm film grain
```

Headlights

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, night, the bright headlights of a car coming down the road toward her, long shadows behind her, 35mm lens, 35mm film grain
```

Wet road after rain

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, night after rain, the wet road reflecting a single streetlight, puddles on the asphalt, 35mm lens, 35mm film grain
```

Police lights

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, night, the red and blue flashing lights of a police car parked just out of frame washing over her and the shelter, 35mm lens, 35mm film grain
```

The fluorescent tube is my favorite of these. "Cold green-white" gave it the sick color real tubes have, and "the road beyond pitch black" kept the rest of the town from lighting up.

Sodium and rain came out closer than I wanted, because both are one streetlight at night. The rain version earns its spot with the reflections, so write about the wet road, not the weather. The police car ignored "just out of frame" and parked up the road. The color still works.

## Daylight, inside

![Morning](/images/lighting/light-kitchen-morning.jpg#grid)
![Hard midday sun](/images/lighting/light-kitchen-noon.jpg#grid)
![Late afternoon](/images/lighting/light-kitchen-golden.jpg#grid)
![Rainy day](/images/lighting/light-kitchen-overcast.jpg#grid)
![Dawn](/images/lighting/light-kitchen-dawn.jpg#grid)

Morning

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, soft morning light through the window, cool and pale, gentle shadows, 35mm motion picture film, fine grain
```

Hard midday sun

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, hard midday sun through the window, a sharp bright rectangle of light on the floor and counter, 35mm motion picture film, fine grain
```

Late afternoon

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, late afternoon golden light through the window, long warm beams across the room, dust in the air, 35mm motion picture film, fine grain
```

Rainy day

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, rainy overcast day, soft gray window light, the room dim, 35mm motion picture film, fine grain
```

Dawn

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, the first gray-pink light of dawn through the window, the room still mostly dark, 35mm motion picture film, fine grain
```

Inside, the window does the work, and the trick is to say what the light lands on. "A sharp bright rectangle of light on the floor and counter" put the patch of sun on the floor at midday. "Long warm beams across the room, dust in the air" gave the afternoon its beams. Without those words, both looked like the morning one.

## Night, inside

This is where most of my time went, and where Z-Image is best. Every one of these is a single small source, and the rest of the room stays dark.

![Open fridge](/images/lighting/light-kitchen-fridge.jpg#grid)
![Streetlight through blinds](/images/lighting/light-kitchen-blinds.jpg#grid)
![TV in the next room](/images/lighting/light-kitchen-tv.jpg#grid)
![One pendant lamp](/images/lighting/light-kitchen-pendant.jpg#grid)
![Under-cabinet light](/images/lighting/light-kitchen-undercabinet.jpg#grid)
![Bare fluorescent tube](/images/lighting/light-kitchen-fluorescent.jpg#grid)
![Blue hour and one lamp](/images/lighting/light-kitchen-bluehour.jpg#grid)
![Phone screen](/images/lighting/light-kitchen-phone.jpg#grid)

Open fridge

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, the room dark, lit only by the cold light from the open refrigerator, 35mm motion picture film, fine grain
```

Streetlight through blinds

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, streetlight coming through window blinds, stripes of orange light across the room, 35mm motion picture film, fine grain
```

TV in the next room

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, the room dark, flickering blue television light coming through the doorway from the next room, 35mm motion picture film, fine grain
```

One pendant lamp

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, one warm pendant lamp hanging low over the counter, the corners of the room in shadow, 35mm motion picture film, fine grain
```

Under-cabinet light

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, the room dark, only the small warm light under the cabinets lighting the counter, 35mm motion picture film, fine grain
```

Bare fluorescent tube

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, lit only by a single bare fluorescent tube on the ceiling, cold green-white light, 35mm motion picture film, fine grain
```

Blue hour and one lamp

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, blue hour outside the window, the room lit by one small warm lamp on the counter, 35mm motion picture film, fine grain
```

Phone screen

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, the room dark, her face and hands lit only by the glow of a phone screen propped on the counter, 35mm motion picture film, fine grain
```

The pattern that worked every time: name the source, say where it is, and say the room is dark. "The room dark, lit only by" shows up in most of these on purpose. Leave it out and Z-Image turns on a ceiling light to be helpful.

The phone screen is the weakest. The phone is there and glowing, but it barely lights her face. A small source needs the rest of the frame to be very dark, and Z-Image doesn't like going that dark on its own.

## What failed

Neon signs. Ask for "a red neon sign" and you get a small sign that lights almost nothing, and in the kitchen it spelled "DALET." Ask for neon glow "from somewhere out of frame" and the whole scene turns red, with no lettering anywhere.

![Kitchen: "a red neon sign outside the window"](/images/lighting/light-kitchen-neonsign.jpg#grid)
![Kitchen: "red neon glow coming in through the window from somewhere outside"](/images/lighting/light-kitchen-neonglow.jpg#grid)
![Bus stop: "a buzzing red neon sign on the shop across the road"](/images/lighting/light-bus-neonsign.jpg#grid)
![Bus stop: "neon glow spilling across the wet road from somewhere out of frame"](/images/lighting/light-bus-neonglow.jpg#grid)

Neon glow, kitchen

```text
medium wide shot of a small old apartment kitchen, a woman in a sweater standing at the counter on the right third pouring coffee, looking down at the cup, a window on the left wall, 35mm lens, night, the room dark, red neon glow coming in through the window from somewhere outside, 35mm motion picture film, fine grain
```

Neon glow, bus stop

```text
wide shot, eye-level camera, a young woman in a long coat waiting alone at a bus shelter on an empty two-lane road at the edge of a small town, placed on the right third of the frame with the empty road on the left, looking down the road away from the camera, not posing, night, red and blue neon glow spilling across the wet road from somewhere out of frame, 35mm lens, 35mm film grain
```

Lightning. Write "lightning" and you get a bolt in the sky. Write around it, like "a sudden flash lighting the whole road cold white for an instant," and you get no bolt, but no flash either. A flash is a moment, and Z-Image draws states, not moments. I cut it from both scenes.

Moonlight. I asked for "a full moon low in the sky, cold silver moonlight on the road, no streetlights." There's no moon, and there are streetlights all the way down the road. Writing "no" in a prompt puts the thing in, which I've now hit with fuel hoses, text and streetlights. Describe what you want lit, not what you want gone.

![The lightning prompt with the bolt written out of it: an ordinary night](/images/lighting/light-bus-lightning.jpg#grid)
![Moonlight with "no streetlights": streetlights, and no moon](/images/lighting/light-bus-moon.jpg#grid)

## The template

Every light that worked had the same parts: what the source is, where it is, and what it lights or leaves dark. They go right after the scene and before the film look.

```text
[shot and lens], [who, where, doing what], [light source], [where it is], [what it lights and what stays dark], 35mm motion picture film, fine grain
```

If you run ComfyUI, the [free workflow from the movie stills post](/downloads/z-image-turbo-movie-stills-8-looks.json) has a lighting dropdown with 27 setups, most of them night interiors, written with the wording that worked here.

Start with the fridge. Then try the blinds.
